# Câu hỏi về Hệ thống & Hạ tầng (System & Infrastructure)

Tài liệu này tập trung vào Bảo mật, CI/CD, Micro-frontends và hạ tầng vận hành.

---

## 1. Bảo mật (Security)

### Q1: Bảo mật trong Fintech (Security)
- **Câu hỏi:** "Ứng dụng Loan/Trading của anh xử lý các cuộc tấn công XSS và CSRF như thế nào?"
- **Gợi ý trả lời:**
    - "Chống XSS: Sanitize đầu vào, cơ chế escape của React, và **CSP (Content Security Policy)**."
    - "Chống CSRF: Dùng **SameSite Cookie** và Anti-CSRF Token."
    - "Lưu Token: Tránh `localStorage`, ưu tiên **HttpOnly Cookie**."

---

## 1. CI/CD & Deployment Flow (Quy trình 5 bước)

Tại LG CNS, việc tự động hóa là bắt buộc. Anh hãy trình bày luồng CI/CD như sau:
1.  **Code Check-in:** Dev push code lên Git.
2.  **Build & Lint:** Hệ thống (Jenkins/Github Actions) tự động chạy Lint (check code style) và Build dự án.
3.  **Automated Testing:** Chạy Unit Test và Integration Test. Nếu pass mới đi tiếp.
4.  **Security Scan:** Quét lỗ hổng bảo mật (SonarQube) để đảm bảo an toàn.
5.  **Deployment:** Deploy bản build lên môi trường Staging/Production theo chiến lược **Blue-Green** hoặc **Canary**.

---

## 2. Micro-frontends (MFE) Architecture

Với các dự án lớn, việc chia nhỏ module là sống còn.
- **Quy trình tích hợp:** Mỗi team phát triển một module (vd: Team A làm Trading, Team B làm Profile). Các module này được tích hợp vào một "Shell App" chung thông qua **Webpack Module Federation**.
- **Lợi ích:** Các team có thể deploy độc lập mà không cần chờ nhau, giảm rủi ro hỏng toàn bộ hệ thống.

---

## 3. Monitoring & Error Tracking

"Làm sao anh biết hệ thống đang gặp lỗi?"
- Bước 1: Dùng **Sentry** để bắt các lỗi runtime ở trình duyệt của user.
- Bước 2: Dùng **Google Analytics/Mixpanel** để đo lường trải nghiệm (vào trang lag bao lâu).
- Bước 3: Alert hệ thống qua Slack/Telegram khi có tỷ lệ lỗi tăng đột biến.
 **Unit & Integration Test**.
        3. **Build & Optimize**.
        4. **Security Scan** (Snyk/npm audit)."

### Q4: CDN & Caching Strategy
- **Gợi ý trả lời:**
    - "Dùng CDN để cache file static gần người dùng."
    - "File có hash: Cache lâu dài (`immutable`). File `index.html`: Dùng `no-cache` để luôn kiểm tra bản mới."

---

## 3. Giám sát (Monitoring)

### Q5: Monitoring & Error Tracking
- **Gợi ý trả lời:**
    - "Dùng RUM (Real User Monitoring) như **Sentry** để bắt lỗi và theo dõi **Core Web Vitals** (LCP, FID, CLS)."
    - "Thiết lập cảnh báo tự động trên Slack/Email."
