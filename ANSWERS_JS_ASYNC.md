# Xử lý Bất đồng bộ trong JavaScript (JS Asynchronous Deep Dive)

Đây là tài liệu chi tiết về cách JavaScript xử lý các tác vụ không đồng bộ, giúp anh trả lời phỏng vấn ở mức độ Senior/Technical Lead.

---

## 1. Cơ chế Event Loop (Quy trình 4 bước)

JS là đơn luồng (Single-threaded). Để xử lý nhiều việc cùng lúc mà không bị block UI, nó dùng Event Loop theo chu trình sau:

1.  **Call Stack (Thực thi đồng bộ):** Chạy hết toàn bộ code đồng bộ (Vd: `console.log`, gán biến).
2.  **Web APIs (Xử lý ngầm):** Khi gặp `setTimeout`, `fetch`, `Event Listener`, JS đẩy chúng sang Web APIs của trình duyệt để xử lý song song.
3.  **Microtask Queue (Ưu tiên số 1):** Sau khi Stack trống, JS kiểm tra hàng đợi này. Nó sẽ chạy **TẤT CẢ** các task ở đây (Vd: `Promise.then/catch`, `process.nextTick`).
4.  **Macrotask Queue (Ưu tiên số 2):** Cuối cùng, JS lấy **DUY NHẤT 1** task từ đây (Vd: `setTimeout`, `setInterval`) đưa vào Stack để chạy, rồi quay lại bước 3.

---

## 2. Promise Lifecycle (Vòng đời của một lời hứa)

Một Promise luôn nằm trong 1 trong 3 trạng thái:
- **Pending:** Đang chờ xử lý (Vd: Đang đợi API trả về).
- **Fulfilled:** Thành công -> Kích hoạt `.then()`.
- **Rejected:** Thất bại -> Kích hoạt `.catch()`.

**Điểm Senior cần lưu ý:** Promise callback là **Microtask**. Điều này giải thích tại sao `Promise.resolve().then()` luôn chạy TRƯỚC `setTimeout(..., 0)` dù code nằm sau.

---

## 3. Async/Await: Bản chất thực sự

Nhiều người nghĩ `async/await` là cái gì đó mới, nhưng thực tế nó là **Syntactic Sugar** (cú pháp bọc ngoài) cho:
- **Generators:** Cơ chế cho phép tạm dừng (yield) và tiếp tục hàm.
- **Promises:** Xử lý kết quả trả về.

Khi anh dùng `await`, JS sẽ "tạm dừng" hàm đó, đưa phần code còn lại vào **Microtask Queue** và tiếp tục thực thi các code đồng bộ khác bên ngoài.

---

---

## 5. Deep Dive: `Promise.all` hoạt động thế nào "under the hood"?

Đây là câu hỏi "bẫy" để phân loại Senior. Hãy giải thích theo 5 bước nội bộ sau:

1.  **Khởi tạo:** `Promise.all` nhận vào một Iterable (thường là mảng). Nó tạo ra một **Promise Mới** để trả về và 2 biến nội bộ: `count` (biến đếm số Promise đã xong) và `results` (mảng chứa kết quả).
2.  **Duyệt mảng (Đồng bộ):** Nó duyệt qua mảng đầu vào theo thứ tự. Nếu phần tử nào không phải Promise, nó sẽ bọc lại bằng `Promise.resolve()`.
3.  **Đăng ký Handler:** Với mỗi Promise, nó đăng ký một `.then()` thành công và một `.catch()` thất bại.
4.  **Tương tác Event Loop (Microtasks):**
    - Khi một Promise con hoàn thành, callback thành công của nó được đẩy vào **Microtask Queue**.
    - Khi Event Loop thực thi callback này, nó sẽ gán kết quả vào `results` **đúng chỉ số (index)** ban đầu và tăng `count`.
    - **Lưu ý:** Thứ tự các Promise xong có thể lộn xộn, nhưng mảng `results` luôn bảo toàn đúng thứ tự truyền vào.
5.  **Kết thúc:**
    - **Thành công:** Khi `count` bằng đúng độ dài mảng đầu vào, Promise chính sẽ được **Resolve** với mảng `results`.
    - **Thất bại (Fail-fast):** Chỉ cần một Promise con bị **Reject**, Promise chính sẽ bị Reject ngay lặp tức với lỗi đó, không chờ các Promise còn lại nữa.

**Ẩn dụ:** Giống như anh đi ăn lẩu cùng 3 người bạn. Anh là `Promise.all`, 3 người bạn là 3 Promise con. Anh chỉ bắt đầu ăn (`resolve`) khi **TẤT CẢ** bạn anh đã đến đủ. Nếu có 1 người báo bận (`reject`), anh hủy kèo đi nhậu luôn (`reject ngay lập tức`).
