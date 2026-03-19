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

## 4. Các kịch bản phỏng vấn thực tế

### Q1: Làm sao để chạy 3 API song song để tối ưu thời gian?
- **Trả lời:** Dùng `Promise.all([api1, api2, api3])`. Tổng thời gian sẽ bằng API lâu nhất thay vì cộng dồn (Sequential).

### Q2: Sự khác biệt giữa `Promise.all` và `Promise.allSettled`?
- `Promise.all`: Thất bại ngay lập tức nếu có 1 API lỗi.
- `Promise.allSettled`: Chờ tất cả xong hết (kể cả lỗi) mới trả về kết quả. Rất hữu ích khi anh muốn hiển thị những gì tải được lên UI thay vì báo lỗi cả trang.

### Q3: Vấn đề Async trong vòng lặp `forEach`?
- **Lưu ý:** `forEach` không hỗ trợ async/await (nó sẽ không đợi). 
- **Giải pháp:** Dùng vòng lặp `for...of` hoặc `Promise.all(array.map(...))`.
