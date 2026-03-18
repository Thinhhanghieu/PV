# Kiến thức về Xác thực & Phân quyền (Authentication & Authorization)

Với 4 năm kinh nghiệm tại LG CNS (môi trường Enterprise/SI), anh sẽ được hỏi rất kỹ về cách thiết kế hệ thống Auth an toàn và bền vững.

---

## 1. Các cơ chế Xác thực phổ biến

### A. Session-based Authentication
- **Cách hoạt động:** Server tạo một session và lưu trong bộ nhớ/database, gửi `Session ID` về browser qua Cookie.
- **Ưu điểm:** Có thể thu hồi (revoke) session ngay lập tức từ server.
- **Nhược điểm:** Khó scale (phải dùng Sticky Session hoặc Redis) và không phù hợp với Mobile app/Cross-domain.

### B. Token-based Authentication (JWT) - Quy trình chi tiết sau Login
Đây là "bản đồ" 6 bước anh cần trình bày khi phỏng vấn:

1.  **Bước 1: Nhận kết quả từ Server:** Server trả về 3 thứ: `accessToken` (ngắn hạn), `refreshToken` (dài hạn), và `userProfile` (tên, email, quyền).
2.  **Bước 2: Xử lý Lưu trữ (Storage):**
    - `accessToken`: Lưu vào Memory (biến JS hoặc Redux/Zustand) để bảo mật.
    - `refreshToken`: Nhận qua Cookie HttpOnly từ server (tự động lưu bởi trình duyệt).
    - `userProfile`: Lưu vào Global State để hiển thị UI (avt, name).
3.  **Bước 3: Điều hướng (Redirect):** Sau khi lưu xong, chuyển hướng User vào trang Dashboard (Private Route).
4.  **Bước 4: Gọi API có xác thực:** Cấu hình **Axios Interceptor** để tự động nhét `Authorization: Bearer <accessToken>` vào Header của tất cả request sau đó.
5.  **Bước 5: Xử lý Token hết hạn (Silent Refresh):**
    - Nếu API trả về **401 Unauthorized** -> Interceptor tạm dừng các request khác.
    - Gọi API `/refresh-token` để lấy Access Token mới.
    - Ghi đè Access Token mới vào Header và **Retry** (gọi lại) các request bị lỗi trước đó.
6.  **Bước 6: Logout:** Xóa sạch State trong App, gọi API Logout để server hủy session (nếu cần), sau đó redirect về trang Login.

---

## 2. Quản lý Token trong Frontend (JWT)

Đây là phần "sát sườn" nhất với FE Dev.

### Q1: Lưu trữ Token ở đâu an toàn nhất? (XSS vs CSRF)
Phần này nhà tuyển dụng rất hay hỏi để kiểm tra xem anh hiểu về Security đến đâu.

#### 1. XSS (Cross-Site Scripting) - "Kẻ trộm lẻn vào túi"
- **Dễ hiểu:** Hãy tưởng tượng anh đi vào một cửa hàng (website), một kẻ xấu lén nhét một "mẩu giấy có lệnh" vào túi anh. Khi anh mở túi ra đọc, anh vô tình làm theo lệnh đó (Vd: "Hãy đưa ví tiền cho hắn").
- **Trong Code:** Kẻ xấu chèn một đoạn `<script>` độc hại vào website (qua comment, URL...). Nếu anh lưu Token trong **LocalStorage**, đoạn script này có thể chạy `localStorage.getItem('token')` và gửi về server của nó.
- **Phòng chống:** Sanitize dữ liệu (dùng DOMPurify), sử dụng CSP (Content Security Policy).

#### 2. CSRF (Cross-Site Request Forgery) - "Chữ ký giả mạo"
- **Dễ hiểu:** Anh đang đăng nhập vào Ngân hàng. Kẻ xấu gửi cho anh một link "Nhận quà". Khi anh click, nó tự động gửi một lệnh từ máy anh tới Ngân hàng: "Chuyển 1 tỷ cho tôi". Vì trình duyệt của anh đang có **Cookie** đăng nhập, Ngân hàng tưởng đó là lệnh THẬT của anh và thực hiện ngay.
- **Trong Code:** Kẻ xấu lợi dụng việc trình duyệt tự động gửi kèm Cookie khi gọi API.
- **Phòng chống:** Dùng **SameSite Cookie (Strict/Lax)**, sử dụng Anti-CSRF Token hoặc kiểm tra Header `Origin/Referer`.

---

### 💡 Tóm tắt so sánh:
| Đặc điểm | XSS | CSRF |
| :--- | :--- | :--- |
| **Mục tiêu** | Đánh cắp dữ liệu (Token, Cookie) | Thực hiện hành động trái phép (Chuyển tiền, đổi Pass) |
| **Cách thức** | Chèn script độc hại chạy trên máy nạn nhân | Lợi dụng quyền đăng nhập hiện có của nạn nhân |
| **Lưu Token** | LocalStorage cực kỳ sợ XSS | Cookie sợ CSRF (nếu không set SameSite) |

**=> Giải pháp Senior:** Lưu `Access Token` trong memory (State), và lưu `Refresh Token` trong **HttpOnly Cookie** với thuộc tính `SameSite=Lax/Strict`. Cách này chống được cả XSS (script không đọc được HttpOnly) và CSRF (SameSite chặn request từ site khác).

---

## 2. Chi tiết hơn về các cơ chế Auth nâng cao

### A. OAuth2 & OpenID Connect (OIDC) - Chuẩn cho SI/Enterprise
Khi phỏng vấn LG CNS, anh nên nói sâu về luồng **Authorization Code Flow with PKCE** (đây là cách an toàn nhất cho Single Page App hiện nay):
1.  **Auth Request:** App redirect user đến Identity Server (vd: Keycloak, Auth0).
2.  **Login:** User đăng nhập tại Identity Server (App không thấy mật khẩu -> An toàn).
3.  **Code & PKCE:** Identity Server trả về một **Authorization Code**.
4.  **Exchange:** App gửi Code + mã xác thực PKCE lên server để đổi lấy **AccessToken** và **IDToken**.

### B. Single Sign-On (SSO) & Centralized Identity
- Giúp quản lý người dùng tập trung. Khi User đăng xuất ở một app, hệ thống có thể dùng **Back-channel Logout** để thông báo cho tất cả các app khác cùng đăng xuất.

### Q2: Cơ chế Silent Refresh (Refresh Token) hoạt động thế nào?
#### 2.1. Khi gọi `/refresh-token` cần truyền gì không?
Câu trả lời phụ thuộc vào cách server thiết kế (hãy nói cả 2 cách để thể hiện trình độ Senior):
- **Cách 1 (Bảo mật cao - Khuyên dùng):** Refresh Token được lưu trong **HttpOnly Cookie**. Khi gọi API, browser sẽ **TỰ ĐỘNG** gửi kèm cookie này lên server. 
    - *Lưu ý:* Phải set `withCredentials: true` trong cấu hình Axios để browser cho phép gửi cookie cross-site.
- **Cách 2:** Gửi Refresh Token trong **Request Body** hoặc **Header**. Cách này kém bảo mật hơn vì FE phải lưu Refresh Token ở đâu đó mà script có thể đọc được (dễ bị XSS).

#### 2.2. API trả ra 1 hay 2 cái token? (Refresh Token Rotation)
- **Thông thường:** Server chỉ trả về `accessToken` mới.
- **Nâng cao (Security Best Practice):** Server trả về **CẢ HAI**: `accessToken` mới và `refreshToken` mới.
    - Cơ chế này gọi là **Refresh Token Rotation**. Ngay khi dùng Refresh Token cũ để lấy token mới, cái cũ sẽ bị hủy (invalidated).
    - **Tác dụng:** Nếu kẻ xấu trộm được Refresh Token và dùng nó, khi User thật dùng để refresh, server sẽ phát hiện ra token cũ đã bị dùng -> lập tức block toàn bộ các session của user đó để bảo vệ tài khoản.

**Ví dụ Code Interceptor cập nhật:**
```javascript
// axios-instance.js
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // withCredentials: true để gửi cookie HttpOnly tự động
        const { data } = await axios.post('/refresh-token', {}, { withCredentials: true });
        
        // Nếu server dùng Rotation, nó sẽ tự set Cookie mới hoặc trả về trong data
        const newToken = data.accessToken;
        instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
```

---

## 3. Xác thực trong tập đoàn lớn (Enterprise Auth)

### C. Single Sign-On (SSO)
- **Khái niệm:** Một tài khoản dùng cho tất cả hệ thống (Vd: Dùng TK LG để vào Portal, Mail, Jira).
- **Giao thức:** **OAuth2** và **OpenID Connect (OIDC)**. OIDC là lớp Identity xây dựng trên OAuth2 để lấy thông tin User Profile (`id_token`).

### D. Multi-factor Authentication (MFA)
- Xác thực 2 lớp qua OTP (SMS/Email) hoặc Authenticator App (TOTP).

---

## 4. Phân quyền (Authorization)

### RBAC vs ABAC
1.  **RBAC (Role-Based):** Phân quyền dựa trên chức vụ (Vd: Admin, Manager, Editor). Rất phổ biến.
2.  **ABAC (Attribute-Based):** Phân quyền động dựa trên thuộc tính (Vd: Chỉ cho phép Editor truy cập bài viết NẾU bài đó do họ tạo ra VÀ đang trong giờ làm việc). Phức tạp và linh hoạt hơn.

---

## 5. Câu hỏi phỏng vấn thực tế

1.  **"Làm sao để xử lý tình trạng User mở nhiều Tab và Token hết hạn đồng thời?"**
    - Trả lời: Dùng cơ chế **Locking** hoặc kiểm tra biến `isRefreshing`. Chỉ cho tab đầu tiên gọi API refresh, các tab sau "đợi" kết quả rồi dùng chung token mới.
2.  **"Hệ thống của anh xử lý Logout như thế nào?"**
    - Trả lời: Client xóa token trong memory/cookie. Đồng thời gọi API logout để Server đưa token đó vào **Blacklist** (nếu cần bảo mật cao).
3.  **"Phân biệt Authentication và Authorization?"**
    - **Authentication:** Bạn là ai? (Vd: Đăng nhập).
    - **Authorization:** Bạn được làm gì? (Vd: Được xóa bài viết không?).
