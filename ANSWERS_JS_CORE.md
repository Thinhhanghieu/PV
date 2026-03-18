# Tổng hợp câu hỏi JavaScript (Từ Cơ bản đến Mid-Senior)

Tài liệu này liệt kê các câu hỏi JavaScript hay gặp, phân loại theo cấp độ để anh dễ ôn luyện.

---

## 🟢 Cấp độ 1: Cơ bản (Junior / Fresh)

1.  **Phân biệt `var`, `let`, `const`?**
    - `var`: Function-scoped, có hoisting (giá trị là `undefined`), có thể khai báo lại.
    - `let`: Block-scoped, không khai báo lại được trong cùng scope, nằm trong "Temporal Dead Zone" cho đến khi khai báo.
    - `const`: Giống `let` nhưng không thể gán lại giá trị (tuy nhiên vẫn có thể thay đổi thuộc tính bên trong object/array).

2.  **Các kiểu dữ liệu trong JS?**
    - 7 Kiểu nguyên thủy (Primitive): `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`. (Truyền tham trị).
    - Kiểu tham chiếu (Reference): `Object` (bao gồm `Array`, `Function`). (Truyền tham chiếu).

3.  **Phân biệt `==` và `===`?**
    - `==` (Abstract Equality): So sánh giá trị sau khi ép kiểu (Type coercion). Vd: `'5' == 5` là `true`.
    - `===` (Strict Equality): So sánh cả giá trị và kiểu dữ liệu. Vd: `'5' === 5` là `false`. **Khuyên dùng `===`**.

4.  **`null` khác gì `undefined`?**
    - `undefined`: Biến đã được khai báo nhưng chưa được gán giá trị.
    - `null`: Giá trị đại diện cho "không có gì" hoặc "giá trị trống" được gán một cách chủ động.

5.  **Arrow Function khác gì Function truyền thống?**
    - Arrow function không có `this` riêng (mượn `this` từ scope bên ngoài), không có `arguments`, không dùng làm Constructor được.

---

## 🟡 Cấp độ 2: Trung cấp (Junior-Mid)

6.  **Closure là gì?**
    - Là một hàm có khả năng ghi nhớ và truy cập vào các biến thuộc scope của hàm cha ngay cả khi hàm cha đã thực thi xong.
    - **Ví dụ cơ bản:**
      ```javascript
      function createCounter() {
          let count = 0; // Biến này nằm trong scope của hàm cha
          return function() {
              count++; // Hàm con vẫn truy cập được count
              return count;
          };
      }
      const counter = createCounter();
      console.log(counter()); // 1
      console.log(counter()); // 2
      ```
    - **Ứng dụng vào việc gì?**
      - **Tạo biến Private (Encapsulation):** Giấu các biến không muốn cho bên ngoài truy cập trực tiếp (giống như các dự án SI yêu cầu tính bảo mật cao).
      - **Currying:** Chuyển đổi hàm nhiều tham số thành chuỗi các hàm 1 tham số.
      - **Memoization (Caching):** Lưu lại kết quả của các tính năng tốn kém hiệu năng (vd: tính lãi suất Loan phức tạp).
      - **Module Pattern:** Tạo ra các module đóng gói logic riêng biệt.
      - **Event Listeners:** Truyền tham số vào callback của event mà không cần dùng biến global.

7.  **Hoisting là gì?**
    - Là cơ chế của JS Engine đưa các phần khai báo (declaration) lên đầu scope trước khi thực thi code. Lưu ý: `var` được hoist với `undefined`, `let/const` được hoist nhưng không truy cập được (TDZ).

8.  **`this` keyword hoạt động như thế nào?**
    - `this` trỏ về đối tượng "sở hữu" phương thức đang được gọi. Giá trị của `this` được xác định tại thời điểm gọi hàm (Runtime), trừ Arrow function.
    - Có thể thay đổi `this` bằng `call()`, `apply()`, hoặc `bind()`.

9.  **Prototypal Inheritance là gì?**
    - Mỗi đối tượng trong JS đều có một thuộc tính nội bộ trỏ đến một đối tượng khác gọi là `prototype`. Các đối tượng "kế thừa" các thuộc tính và phương thức từ prototype của chúng thông qua Prototype Chain.

10. **Higher-order function là gì?**
    - Là hàm nhận hàm khác làm đối số (Callback) hoặc trả về một hàm khác. Vd: `map`, `filter`, `reduce`.

---

## 🔴 Cấp độ 3: Mid-Senior

11. **Event Loop (Deep Dive)?**
    - Là cơ chế điều phối Call Stack và các hàng đợi Task. Ưu tiên chạy hết code Sync, sau đó là TOÀN BỘ Microtasks (Promise), sau cùng mới là MỘT Macrotask (setTimeout). (Xem thêm `ANSWERS_TECHNICAL.md`).

12. **Xử lý Bất đồng bộ (Async/Await vs Promise)?**
    - Async/Await thực tế là "Syntactic Sugar" xây dựng trên Promise. Nó làm code trông như đồng bộ, dễ đọc hơn. Lưu ý: Luôn dùng `try-catch` với Async/Await.

13. **Cơ chế Garbage Collection?**
    - JS dùng thuật toán "Mark-and-sweep". Nó bắt đầu từ gốc (Root/Global), đánh dấu tất cả các đối tượng có thể truy cập được. Những đối tượng không được đánh dấu sẽ bị dọn dẹp khỏi bộ nhớ.

14. **Currying là gì?**
    - Là kỹ thuật tách một hàm nhận vào N đối số thành chuỗi N hàm, mỗi hàm nhận 1 đối số. Giúp tái sử dụng code và tạo các hàm chuyên biệt hơn từ một hàm tổng quát.

15. **Event Delegation là gì?**
    - Thay vì gán Event Listener cho từng phần tử con, ta gán 1 listener duy nhất cho phần tử cha. Dựa trên cơ chế **Event Bubbling** để bắt sự kiện của con. Giúp tiết kiệm bộ nhớ và xử lý tốt các phần tử được thêm động vào DOM.

---

## 🚀 Câu hỏi "Hack não" (Senior / Lead)

16. **Tại sao `0.1 + 0.2 !== 0.3`?**
    - Vì JS lưu số theo chuẩn IEEE 754 (Binary floating-point). Một số hệ thập phân khi chuyển sang nhị phân sẽ bị vô hạn tuần hoàn, dẫn đến làm tròn sai số cực nhỏ. Cách xử lý: Dùng `toFixed()` hoặc `Math.round()`.

17. **Làm thế nào để implement Private Variable?**
    - Dùng **Closure** để bao đóng biến bên trong một hàm. Hoặc dùng **Private Class Fields** (`#variableName`) trong ES2020+.

18. **Module System: CommonJS vs ESM?**
    - CommonJS (`require`): Load module đồng bộ (Synchronous), phù hợp Node.js server.
    - ESM (`import`): Load module tĩnh (Static/Async), tối ưu cho bundling (Tree-shaking) ở browser.

19. **Memory Leak là gì?**
    - Là hiện tượng bộ nhớ không được giải phóng mặc dù không còn dùng đến. Nguyên nhân: Quên remove event listeners, quên clear `setInterval`, hoặc tạo biến global vô ý.

20. **Strict Mode (`'use strict'`)?**
    - Giúp code an toàn hơn bằng cách báo lỗi thay vì bỏ qua các lỗi im lặng (vd: gán giá trị cho biến chưa khai báo), cấm dùng các từ khóa dự phòng của JS tương lai.
