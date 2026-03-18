/**
 * CASE: Closure Applications
 * 
 * PHỎNG VẤN: "Closure ứng dụng vào thực tế như thế nào?"
 */

// 1. Tạo biến Private (Encapsulation)
function createBankAccount(initialBalance) {
    let balance = initialBalance; // BIẾN PRIVATE

    return {
        deposit: function(amount) {
            balance += amount;
            console.log(`Deposited ${amount}. Balance: ${balance}`);
        },
        withdraw: function(amount) {
            if (amount > balance) {
                console.log("Insufficient funds");
                return;
            }
            balance -= amount;
            console.log(`Withdrew ${amount}. Balance: ${balance}`);
        },
        getBalance: function() {
            return balance; // Chỉ có thể xem qua hàm này
        }
    };
}

const myAccount = createBankAccount(1000);
myAccount.deposit(500);
console.log(myAccount.balance); // undefined (không thể truy cập trực tiếp)
console.log(myAccount.getBalance()); // 1500


// 2. Memoization (Caching kết quả tính toán)
// Ứng dụng: Tính toán lãi suất vay (Loan Interest) tốn nhiều tài nguyên
function memoizeInterestCalculation() {
    const cache = {}; // Lưu trữ kết quả

    return function(amount, rate, term) {
        const key = `${amount}-${rate}-${term}`;
        if (key in cache) {
            console.log("Fetching from cache...");
            return cache[key];
        }
        
        console.log("Calculating complex interest...");
        // Giả lập tính toán nặng
        const result = (amount * rate * term) / 100; 
        cache[key] = result;
        return result;
    };
}

const calculate = memoizeInterestCalculation();
console.log(calculate(1000, 5, 12)); // Calculating... 600
console.log(calculate(1000, 5, 12)); // Fetching from cache... 600


// 3. Giữ State trong Callback (Event Listeners)
function setupButton(name) {
    const btn = { name };
    // Closure giúp callback nhớ được biến 'name'
    return function() {
        console.log(`Button ${name} clicked!`);
    };
}

const loginBtnClick = setupButton("Login");
loginBtnClick(); // Button Login clicked!

/**
 * TỔNG KẾT:
 * Closure cực kỳ hữu ích để ĐÓNG GÓI dữ liệu, TỐI ƯU HIỆU NĂNG thông qua Cache
 * và quản lý trạng thái trong các hàm callback bất đồng bộ.
 */
