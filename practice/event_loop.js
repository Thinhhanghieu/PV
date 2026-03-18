/**
 * CASE: Event Loop - Macrotasks vs Microtasks
 * 
 * PHỎNG VẤN: "Thứ tự log của đoạn code này là gì và tại sao?"
 */

console.log("1. Script start"); // Đồng bộ

setTimeout(() => {
    console.log("2. setTimeout (Macrotask)"); // Đẩy vào Macrotask Queue
}, 0);

Promise.resolve()
    .then(() => {
        console.log("3. Promise 1 (Microtask)"); // Đẩy vào Microtask Queue
    })
    .then(() => {
        console.log("4. Promise 2 (Microtask)"); // Đẩy vào Microtask Queue sau 3
    });

console.log("5. Script end"); // Đồng bộ

/**
 * GIẢI THÍCH:
 * 1. Thực thi các lệnh đồng bộ: Log "1" và "5".
 * 2. Sau khi Call Stack trống, Event Loop kiểm tra Microtask Queue trước.
 * 3. Thực thi hết Microtask: Log "3" và "4".
 * 4. Cuối cùng thực thi Macrotask: Log "2".
 * 
 * KẾT QUẢ: 1 -> 5 -> 3 -> 4 -> 2
 */
