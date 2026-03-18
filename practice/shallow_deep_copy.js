/**
 * CASE: Shallow Copy vs Deep Copy
 * 
 * PHỎNG VẤN: "Tại sao khi tôi thay đổi bản sao thì bản gốc cũng bị thay đổi?"
 */

const original = {
    name: "LG CNS",
    address: {
        city: "Hanoi",
        district: "Cau Giay"
    },
    skills: ["React", "JS"]
};

// 1. SHALLOW COPY (Sử dụng Spread Operator)
const shallowCopy = { ...original };

shallowCopy.name = "New Company"; // Tầng 1: Không ảnh hưởng gốc
shallowCopy.address.city = "Saigon"; // Tầng 2: ẢNH HƯỞNG GỐC (Vì chung tham chiếu)

console.log("--- Shallow Copy Results ---");
console.log("Original City:", original.address.city); // Saigon
console.log("Shallow Copy City:", shallowCopy.address.city); // Saigon


// 2. DEEP COPY (Sử dụng structuredClone - Modern JS)
const deepCopy = structuredClone(original);

deepCopy.address.city = "Da Nang"; // Tầng 2: KHÔNG ảnh hưởng gốc

console.log("\n--- Deep Copy Results ---");
console.log("Original City:", original.address.city); // Saigon (vẫn giữ giá trị cũ của nó)
console.log("Deep Copy City:", deepCopy.address.city); // Da Nang


// 3. DEEP COPY (Cách cũ: JSON.stringify - Cẩn thận mất data)
const jsonDeepCopy = JSON.parse(JSON.stringify(original));
/**
 * LƯU Ý: Cách JSON này sẽ làm mất các thuộc tính là:
 * - Function
 * - Undefined
 * - Symbol
 * - Date (bị biến thành string)
 */

/**
 * TỔNG KẾT:
 * - Dùng Spread `{...}` cho Object đơn giản (1 tầng).
 * - Dùng `structuredClone()` cho Object phức tạp, lồng nhau (Nested).
 */
