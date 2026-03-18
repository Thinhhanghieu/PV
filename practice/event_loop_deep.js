/**
 * CASE: Event Loop Deep Dive - Phân biệt Microtask vs Macrotask nâng cao
 * 
 * PHỎNG VẤN: "Thứ tự log thực tế và tại sao Promise.then chạy trước setTimeout?"
 */

console.log("1. Start");

// Macrotask 1
setTimeout(() => {
    console.log("2. setTimeout 1");
    
    // Microtask lồng trong Macrotask
    Promise.resolve().then(() => {
        console.log("3. Promise inside setTimeout");
    });
}, 0);

// Microtask 1
Promise.resolve().then(() => {
    console.log("4. Promise 1");
});

// Microtask 2
Promise.resolve().then(() => {
    console.log("5. Promise 2");
    
    // Macrotask lồng trong Microtask
    setTimeout(() => {
        console.log("6. setTimeout inside Promise");
    }, 0);
});

console.log("7. End");

/**
 * PHÂN TÍCH QUY TRÌNH:
 * 1. Chạy sync: Log "1" và "7".
 * 2. Check Microtask Queue: 
 *    - Chạy Microtask 1: Log "4".
 *    - Chạy Microtask 2: Log "5", đồng thời đẩy Macrotask "6" vào hàng chờ.
 * 3. Hết sạch Microtask, giờ sang Macrotask Queue:
 *    - Chạy Macrotask 1: Log "2", đồng thời đẩy Microtask "3" vào hàng chờ.
 * 4. Microtask Queue vừa có task mới "3" -> ƯU TIÊN CHẠY NGAY:
 *    - Log "3".
 * 5. Quay lại Macrotask Queue:
 *    - Chạy Macrotask "6": Log "6".
 * 
 * KẾT QUẢ CUỐI CÙNG: 1 -> 7 -> 4 -> 5 -> 2 -> 3 -> 6
 * 
 * BÀI HỌC: Microtask luôn "chen ngang" Macrotask ngay khi Call Stack trống.
 */
