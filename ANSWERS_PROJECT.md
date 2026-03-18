# Tình huống Dự án & Phương pháp STAR (Project Scenarios)

Tài liệu này tổng hợp các tình huống dự án thực tế về Loan và Trading, cùng với cách trả lời theo phương pháp STAR.

---

## 1. Case Study: Dự án Tài chính (Loan Project)

**Câu hỏi: "Hãy kể về một lần bạn xử lý logic nghiệp vụ cực kỳ phức tạp?"**
1.  **Bối cảnh (Situation):** Dự án cho vay yêu cầu hệ thống validate hàng chục điều kiện phụ thuộc lẫn nhau (Tuổi, lương, lịch sử tín dụng, vùng miền...).
2.  **Thách thức (Task):** Code cũ dùng lồng nhiều `if-else`, rất khó bảo trì và dễ lỗi khi có thêm điều kiện mới.
3.  **Hành động (Action - Senior approach):**
    - Áp dụng **Strategy Pattern** để tách mỗi điều kiện validate thành một lớp/hàm riêng biệt.
    - Xây dựng một **Validation Engine** để chạy tuần tự các điều kiện này.
    - Viết Unit Test phủ 100% các case biên.
4.  **Kết quả (Result):** Thời gian thêm điều kiện mới giảm từ 2 ngày xuống 2 giờ, tỷ lệ bug logic về 0.

---

## 2. Case Study: Dự án Trading (Real-time Performance)

**Câu hỏi: "Bạn làm gì khi app bị lag vì dữ liệu cập nhật quá nhanh (Trading)?"**
1.  **Biểu hiện:** UI bị khựng (janky) do React re-render liên tục mỗi khi có giá mới từ WebSocket.
2.  **Giải pháp (Senior approach):**
    - Áp dụng **Throttling/Batching**: Thay vì render mỗi tick dữ liệu, tôi gom dữ liệu lại và chỉ cập nhật UI mỗi 100ms.
    - Dùng `useMemo` và `React.memo` cho các biểu đồ nến (candlestick chart).
    - Offload việc xử lý dữ liệu thô sang **Web Worker** để giải phóng main thread.
3.  **Kết quả:** CPU usage giảm 40%, FPS ổn định ở mức 60 ngay cả trên các máy cấu hình yếu.
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
