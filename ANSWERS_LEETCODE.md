# Thuật toán (LeetCode) Kinh điển cho Phóng vấn Frontend

Đây là danh sách 6 bài toán "Huyền thoại" thường xuyên xuất hiện nhất trong các buổi phỏng vấn (từ Big Tech đến SI như LG CNS). Nắm vững 6 dạng này là anh đã phủ được 70% các bài Test Easy/Medium.

---

## 1. Two Sum (Mảng & Hash Map)
- **Đề bài:** Cho mảng `nums` và số `target`. Tìm chỉ số của 2 số có tổng bằng `target`.
- **Giải pháp:** Dùng Hash Map để lưu `{giá trị: chỉ số}` đã đi qua.
- **Mẹo ghi nhớ:** *"Tìm một nửa còn thiếu"*.
- **Ví dụ (`nums=[2, 7], target=9`):** 
    - Duyệt số 2, tìm 7 (9-2). Map chưa có -> Lưu `Map{2: 0}`.
    - Duyệt số 7, tìm 2 (9-7). Map đã có số 2 tại index 0 -> Trả về `[0, 1]`.
```javascript
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) return [map.get(diff), i];
        map.set(nums[i], i);
    }
};
```

---

## 2. Valid Parentheses (Ngăn xếp - Stack)
- **Đề bài:** Kiểm tra chuỗi ngoặc `()[]{}` có đóng mở đúng thứ tự không.
- **Giải pháp:** Dùng **Stack**. Gặp ngoặc mở thì đẩy vào, gặp ngoặc đóng thì lấy ra so khớp.
- **Mẹo ghi nhớ:** *"Vào sau ra trước"*. Cái ngoặc mở cuối cùng phải khớp với cái ngoặc đóng đầu tiên xuất hiện.
- **Ví dụ (`s="()[]{}"`):** 
    - Gặp `(` -> Stack: `[`(`]`.
    - Gặp `)` -> Lấy `(` ra khớp -> Stack: `[]`.
```javascript
var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', ']': '[', '}': '{' };
    for (let char of s) {
        if (!map[char]) stack.push(char); // Ngoặc mở
        else if (stack.pop() !== map[char]) return false; // Ngoặc đóng ko khớp
    }
    return stack.length === 0;
};
```

---

## 3. Best Time to Buy and Sell Stock (Greedy / Sliding Window)
- **Đề bài:** Cho mảng giá chứng khoán theo ngày. Tìm lợi nhuận lớn nhất nếu chỉ được mua 1 lần và bán 1 lần.
- **Giải pháp:** Giữ kỷ lục "giá thấp nhất từng thấy" và "lợi nhuận cao nhất có thể".
- **Mẹo ghi nhớ:** *"Mua đáy bán đỉnh"*. Luôn cập nhật giá mua rẻ nhất và tính thử lời nếu bán ở giá hôm nay.
```javascript
var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (let price of prices) {
        if (price < minPrice) minPrice = price; // Cập nhật giá mua rẻ nhất
        else if (price - minPrice > maxProfit) maxProfit = price - minPrice; // Tính lời
    }
    return maxProfit;
};
```

---

## 4. Valid Anagram (Tần suất ký tự)
- **Đề bài:** Kiểm tra 2 chuỗi có được tạo ra từ cùng các ký tự với số lượng giống nhau không (Vd: "anagram" và "nagaram").
- **Giải pháp:** Dùng một Object để đếm số lần xuất hiện của từng chữ cái.
- **Mẹo ghi nhớ:** *"Bảng điểm danh"*. Cộng điểm cho chuỗi 1, trừ điểm cho chuỗi 2. Cuối cùng bảng điểm phải toàn số 0.
```javascript
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let char of s) count[char] = (count[char] || 0) + 1;
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    return true;
};
```

---

## 5. Climbing Stairs (Đệ quy / Quy hoạch động)
- **Đề bài:** Có `n` bậc thang. Mỗi lần có thể bước 1 hoặc 2 bậc. Có bao nhiêu cách để lên đỉnh?
- **Giải pháp:** Thực chất là dãy số **Fibonacci**. Cách thứ `n` = Cách thứ `n-1` + Cách thứ `n-2`.
- **Mẹo ghi nhớ:** *"Lùi lại một bước"*. Để đứng ở bậc 10, anh chỉ có thể đi từ bậc 9 (bước 1 bước) hoặc bậc 8 (bước 2 bước).
```javascript
var climbStairs = function(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2; // f(1), f(2)
    for (let i = 3; i <= n; i++) {
        let current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
};
```

---

## 6. Merge Sorted Array (Hai con trỏ - Two Pointers)
- **Đề bài:** Cho 2 mảng đã sắp xếp. Gộp mảng 2 vào mảng 1 sao cho vẫn giữ nguyên thứ tự sắp xếp.
- **Giải pháp:** Duyệt ngược từ cuối mảng về đầu để không phải dịch chuyển phần tử.
- **Mẹo ghi nhớ:** *"Điền vào chỗ trống từ cuối"*. So sánh 2 số lớn nhất ở cuối mỗi mảng, số nào lớn hơn thì đặt vào vị trí cuối cùng.
```javascript
var merge = function(nums1, m, nums2, n) {
    let i = m - 1; // Cuối mảng 1
    let j = n - 1; // Cuối mảng 2
    let k = m + n - 1; // Vị trí cuối cùng thực tế
    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
        else nums1[k--] = nums2[j--];
    }
};
```
