# Tình huống Dự án & Phương pháp STAR (Project Scenarios)

Tài liệu này tổng hợp các tình huống dự án thực tế về Loan và Trading, cùng với cách trả lời theo phương pháp STAR.

---

## 1. Case Study: Dự án Tài chính (Loan Project)

**Câu hỏi: "Hãy kể về một lần bạn xử lý logic nghiệp vụ cực kỳ phức tạp ở Frontend?"**
1.  **Bối cảnh (Situation):** Dự án cho vay (Loan) với quy trình đăng ký 5 bước. Mỗi bước có hàng chục trường dữ liệu và **Logic ràng buộc chéo (Cross-field dependencies)** cực kỳ dày đặc.
2.  **Thách thức (Task - Challenge):** 
    - Các trường xuất hiện dựa trên điều kiện của trường khác (Vd: Nếu chọn "Vay tín chấp" thì hiện trường Lương, ẩn trường Tài sản đảm bảo).
    - Code cũ xử lý bằng hàng trăm dòng `if-else` lồng nhau ngay trong Component, dẫn đến việc cực kỳ khó debug và dễ sót case validation.
3.  **Hành động (Action - Senior approach):**
    - **Metadata-driven UI:** Tôi đã tách toàn bộ logic ràng buộc sang một file cấu hình JSON (Metadata). Thay vì code tay từng `if`, tôi viết một "Engine" nhỏ để đọc cấu hình này.
    - **Logic Centralization:** Xây dựng một **Custom Hook (`useFormLogic`)** để tập trung toàn bộ việc tính toán trạng thái (ẩn/hiện, bắt buộc/không) cho toàn bộ form.
    - **Schema Validation:** Sử dụng thư viện **Zod** để định nghĩa schema và validate toàn bộ dữ liệu phức tạp đó một cách tường minh.
4.  **Kết quả (Result):** Giảm 40% lượng code thừa, thời gian thêm một loại hình vay mới từ 2 ngày xuống còn 4 giờ, và tỷ lệ bug logic sau khi go-live giảm về 0.

---

## 2. Case Study: Dự án Trading (Real-time Performance)

**Câu hỏi: "Bạn làm gì khi app bị lag vì dữ liệu cập nhật quá nhanh (Trading)?"**

Đây là **Luồng xử lý dữ liệu (Data Pipeline)** 5 bước để đảm bảo app chạy mượt ở 60 FPS:

1.  **WebSocket (Raw Data):** Nhận luồng dữ liệu thô (JSON) từ server với tần suất cực cao (Vd: 100 log/giây).
2.  **Web Worker (Offload):** Tôi đẩy toàn bộ dữ liệu thô này sang **Web Worker** qua `postMessage`. 
    - *Tại sao?* Để Main Thread hoàn toàn rảnh tay xử lý các tương tác của người dùng (Click, Scroll).
    - *Nhận cái gì?* Worker nhận mảng các biến giá thô, thực hiện tính toán chỉ số kỹ thuật (RSI, MACD) hoặc lọc dữ liệu (Filter).
3.  **useRef (Data Buffering):** Khi Worker gửi data đã xử lý về, tôi **Không** set vào State ngay. Tôi lưu nó vào một biến **`useRef`** (Vd: `latestDataRef.current`).
    - *Tại sao?* Vì `useRef` thay đổi KHÔNG gây re-render. Điều này giúp tránh việc React bị quá tải do số lần re-render quá lớn.
4.  **requestAnimationFrame (Throttled UI Update):** Tôi dùng **`requestAnimationFrame`** (hoặc `setInterval` 100ms) để tạo một vòng lặp "pulling":
    - Cứ mỗi 16.6ms (chu kỳ 1 frame của màn hình), tôi mới lấy dữ liệu mới nhất từ `useRef` và cập nhật vào `useState` một lần duy nhất.
5.  **Virtualization:** Với các bảng lệnh (Orderbook) hàng ngàn dòng, tôi dùng `react-window` để chỉ render ~20 dòng thực sự hiển thị trên màn hình.

**Kết quả:** CPU Usage giảm từ 80% xuống 15%, không còn hiện tượng "Janky UI" (giật lag), app phản hồi tức thì với thao tác của User.

---

## 1. Tình huống Dự án cụ thể

### Tình huống 1: "Hãy kể về một tính năng phức tạp anh từng build (Dự án Trading)"
- **S (Situation):** Dự án Trading cần hiển thị biểu đồ và bảng lệnh cập nhật thời gian thực qua WebSocket. Message đổ về quá lớn gây giật lag.
- **T (Task)::** Tối ưu hóa render để đảm bảo mượt mà.
- **A (Action):**
    - Triển khai **Throttling/Batching** (render mỗi 100-200ms).
    - Dùng `React.memo` và `useMemo` chặt chẽ.
    - Áp dụng **Canvas API** cho đồ họa phức tạp.
- **R (Result):** CPU usage giảm 50%, UI mượt mà.

### Tình huống 2: "Khó khăn lớn nhất anh gặp phải là gì? (Dự án Loan/Cho vay)"
- **S (Situation):** Quy trình Loan 10 bước, hàng trăm trường dữ liệu, logic phụ thuộc chéo.
- **T (Task):** Quản lý state khổng lồ, đảm bảo đồng nhất và cho phép lưu nháp.
- **A (Action):**
    - Thiết kế **Form State tập trung** (Redux) + cơ chế **Versioning**.
    - Lưu nháp tự động vào `indexedDB`.
    - Tách nhỏ sub-components, giao tiếp qua `FormContext`.
    - Viết bộ **Schema Validation động** (Yup).
- **R (Result):** Tỷ lệ hoàn tất hồ sơ tăng 25%, giảm sai sót dữ liệu.

---

## 2. Phương pháp STAR cho câu hỏi tình huống chung
*Dùng cho các câu hỏi: "Kể về một lần anh giải quyết khó khăn..."*

- **S (Situation):** Bối cảnh dự án, khó khăn gặp phải.
- **T (Task):** Mục tiêu cần đạt được.
- **A (Action):** Những hành động cụ thể **BẠN** đã thực hiện.
- **R (Result):** Kết quả đạt được (nến kèm con số).
