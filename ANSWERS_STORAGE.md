# Phân biệt các loại Lưu trữ trên Trình duyệt (Web Storage)

Đây là bảng so sánh 3 loại lưu trữ phổ biến nhất mà lập trình viên Frontend cần nắm vững để trả lời phỏng vấn Senior.

---

## 1. Bảng so sánh tổng quan

| Đặc điểm | Local Storage | Session Storage | Cookie |
| :--- | :--- | :--- | :--- |
| **Dung lượng** | Lớn (Khoảng 5-10MB) | Lớn (Khoảng 5MB) | Rất nhỏ (Khoảng 4KB) |
| **Thời gian sống** | Vĩnh viễn (đến khi bị xóa) | Đến khi đóng Tab/Browser | Có thể set thời gian hết hạn |
| **Gửi lên Server** | Không (Chỉ ở Client) | Không (Chỉ ở Client) | **Có** (Gửi kèm mỗi request) |
| **Bảo mật (XSS)** | Dễ bị script đọc được | Dễ bị script đọc được | Có thể chặn bằng `HttpOnly` |
| **Bảo mật (CSRF)** | Không bị | Không bị | Có thể bị (Cần `SameSite`) |

---

## 2. Chi tiết từng loại

### A. Local Storage
- **Mục đích:** Lưu trữ dữ liệu lâu dài trên máy người dùng.
- **Ứng dụng:** Lưu Theme (Dark/Light mode), cài đặt người dùng, hoặc các dữ liệu offline đơn giản.
- **Lưu ý:** Tuyệt đối không lưu thông tin nhạy cảm (Password, Token cực quan trọng) vì script độc hại có thể đọc được dễ dàng qua XSS.

### B. Session Storage
- **Mục đích:** Lưu trữ dữ liệu tạm thời trong một phiên làm việc (Tab).
- **Ứng dụng:** Lưu dữ liệu form đang nhập dở, các trạng thái UI tạm thời mà anh muốn nó mất đi khi người dùng đóng tab.
- **Đặc điểm:** Nếu anh mở tab mới từ cùng một trang, dữ liệu Session sẽ không được dùng chung.

### C. Cookie
- **Mục đích:** Chủ yếu dùng để xác thực (Authentication) và theo dõi người dùng (Tracking).
- **Ứng dụng:** Lưu Session ID, Access Token, Refresh Token (nên dùng `HttpOnly`).
- **Ưu đãi từ trình duyệt:** Browser tự động gửi Cookie kèm theo các request HTTP, giúp server nhận diện được user mà client không cần code thủ công.

---

## 3. Câu hỏi phỏng vấn Senior

1.  **"Tại sao nên lưu Refresh Token trong Cookie thay vì LocalStorage?"**
    - Trả lời: Để bật flag **HttpOnly**. Khi đó, script (XSS) không thể truy cập vào token này, giúp tăng mức độ bảo mật cho hệ thống.
2.  **"Làm sao để dùng chung dữ liệu giữa các Tab?"**
    - Trả lời: Dùng **LocalStorage**. Ngoài ra có thể dùng **Broadcast Channel API** hoặc sự kiện `'storage'` để đồng bộ dữ liệu giữa các tab theo thời gian thực.
3.  **"Cookie có nhược điểm gì lớn nhất?"**
    - Trả lời: Dung lượng quá nhỏ (4KB) và làm chậm request vì mỗi khi gọi API, trình duyệt đều gửi kèm cookie (nếu không được tối ưu).
