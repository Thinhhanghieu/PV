/**
 * CASE: LÀM CHỦ BẤT ĐỒNG BỘ (ASYNC MASTERY)
 * 
 * PHỎNG VẤN: "Giải thích thứ tự log và cách tối ưu hóa nhiều API call song song."
 */

// --- 1. THỬ THÁCH THỨ TỰ THỰC THI (EVENT LOOP) ---
console.log("1. Đồng bộ (Sync) bắt đầu");

setTimeout(() => {
    console.log("2. Macrotask (setTimeout) - 0ms");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Microtask (Promise) - Chạy sau Stack, trước Macrotask");
});

console.log("4. Đồng bộ (Sync) kết thúc");

/** KẾT QUẢ: 1 -> 4 -> 3 -> 2 */


// --- 2. TỐI ƯU HÓA GỌI API SONG SONG ---
const mockFetch = (id, time) => new Promise(resolve => {
    setTimeout(() => resolve(`Data ${id}`), time);
});

async function handleAPIs() {
    console.time("APIs Performance");

    // --- CÁCH TỆ (Tuần tự - Chờ nhau) ---
    // const d1 = await mockFetch(1, 1000);
    // const d2 = await mockFetch(2, 1000); // Mất tổng cộng 2s

    // --- CÁCH TỐT (Song song - Cùng lúc) ---
    const [res1, res2] = await Promise.all([
        mockFetch(1, 1000),
        mockFetch(2, 1000)
    ]); // Mất tổng cộng chỉ 1s

    console.log("Results:", res1, res2);
    console.timeEnd("APIs Performance");
}

// handleAPIs();


// --- 3. XỬ LÝ LỖI TRONG CHUỖI ASYNC ---
async function safeFetch() {
    try {
        const data = await Promise.reject("API Lỗi rồi!");
    } catch (error) {
        console.error("Cần dùng try-catch để bắt lỗi async/await:", error);
    } finally {
        console.log("Luôn chạy dù thành công hay thất bại (Dùng để tắt Loading)");
    }
}

// safeFetch();

/**
 * TỔNG KẾT CHO SENIOR:
 * 1. Hiểu Microtasks (Promise) ưu tiên hơn Macrotasks (setTimeout).
 * 2. Luôn ưu tiên Promise.all cho các API không phụ thuộc lẫn nhau.
 * 3. Dùng try-catch-finally để xử lý luồng logic sạch sẽ.
 */
