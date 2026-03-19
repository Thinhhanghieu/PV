# English Self-Introduction (Senior Frontend Developer)

## 1. Professional Script (Thinh - 4 Years of Experience)

"Hello, my name is **Thinh**. I am a **Senior Frontend Developer** with **4 years of experience** specializing in the **Fintech domain**, specifically in **Loan management systems** and **Real-time Trading platforms**.

Throughout my career, I have developed a strong expertise in building complex, high-performance web applications:

- In my **Loan projects**, I architected a metadata-driven UI approach for complex dynamic forms with intricate cross-field dependencies. This significantly improved maintainability and allowed us to deploy new loan products much faster.
- In the **Trading domain**, I focused heavily on **Performance Optimization**. I implemented advanced patterns using **Web Workers** for background data processing and **requestAnimationFrame** for UI synchronization to handle high-frequency WebSocket updates (100+ updates/sec), ensuring a smooth 60 FPS experience.

I am very interested in joining **LG CNS** because of your reputation for delivering large-scale, enterprise-level solutions. I believe my experience in System Integration (SI) and my focus on building scalable, performant frontends would be a great fit for your team. Thank you."

---

## 2. Potential Follow-up Questions (Skill-based)

Dưới đây là các câu hỏi nhà tuyển dụng có thể hỏi xoay quanh Skill của anh sau khi anh giới thiệu:

### A. Về Performance (Dự án Trading)
1. **"Why use Web Workers instead of just Throttling?"**
   - *Trả lời:* Web Workers giúp tách biệt hoàn toàn việc xử lý dữ liệu nặng ra khỏi Main Thread, đảm bảo UI không bao giờ bị đứng (block) ngay cả khi tính toán phức tạp. Throttling chỉ giảm số lần render, nhưng nếu logic xử lý vẫn ở Main Thread thì vẫn có rủi ro gây lag.
2. **"How does `requestAnimationFrame` help in your Trading app?"**
   - *Trả lời:* Nó giúp đồng bộ hóa việc cập nhật UI với tần số quét của màn hình (thường là 60Hz), giúp chuyển động mượt mà hơn và tránh việc render thừa khi màn hình chưa sẵn sàng.

### B. Về Architecture (Dự án Loan)
1. **"What are the benefits of a metadata-driven UI?"**
   - *Trả lời:* Nó giúp tách biệt giữa Logic hiển thị và Code. Khi cần thêm một loại hình vay mới, chúng ta chỉ cần cập nhật file cấu hình (JSON) thay vì sửa code trong Component, giúp giảm thiểu rủi ro lỗi regression.
2. **"How do you handle complex cross-field validation?"**
   - *Trả lời:* Tôi dùng **Schema Validation (Zod/Yup)** kết hợp với một **Centralized Form State**. Việc validate được thực hiện dựa trên toàn bộ context của form thay vì từng field riêng lẻ.

### C. Về Core JS & React
1. **"Local Storage vs Cookie: Which one is better for Auth tokens?"**
   - *Trả lời:* Ưu tiên **HttpOnly Cookie** để chống XSS. Nếu dùng Local Storage, phải cực kỳ cẩn thận với vấn đề bảo mật.
2. **"How do you coordinate data between multiple open tabs?"**
   - *Trả lời:* Dùng **Broadcast Channel API** cho các thông báo thời gian thực hoặc sự kiện **`storage`** cho các thay đổi dữ liệu bền vững.

---

## 3. Chiến thuật trả lời (Tips)
- **Be Specific:** Khi nói về dự án, hãy nêu số liệu (Vd: "Handle 100+ updates per second").
- **Focus on 'Why':** Đừng chỉ nói "Tôi dùng X", hãy nói "Tôi dùng X vì nó giải quyết được vấn đề Y".
- **Bridge to LG CNS:** Luôn cố gắng liên hệ kinh nghiệm SI của anh với môi trường làm việc tại LG CNS (Ổn định, Quy trình, Chất lượng).
