/**
 * CASE: Debounce & Throttle
 * 
 * Thường gặp trong dự án Trading (Throttling dữ liệu WebSocket)
 * hoặc Search bar (Debouncing gõ phím).
 */

// 1. DEBOUNCE: Chờ cho đến khi ngừng thao tác X ms thì mới thực thi
function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 2. THROTTLE: Chỉ thực thi tối đa 1 lần trong mỗi X ms
function throttle(fn, limit) {
    let inThrottle = false;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * VÍ DỤ SỬ DỤNG:
 */

// Giả sử update biểu đồ Trading
const updateChart = (data) => console.log("Updating chart with:", data);

// Chỉ cập nhật tối đa 200ms một lần dù message WebSocket về liên tục
const throttledUpdate = throttle(updateChart, 200);

// Giả sử fetch API tìm kiếm Loan
const searchLoan = (query) => console.log("Searching for:", query);

// Chờ người dùng ngừng gõ 500ms mới gọi API
const debouncedSearch = debounce(searchLoan, 500);
