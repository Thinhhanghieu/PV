/**
 * CASE: Data Manipulation
 * 
 * PHỎNG VẤN: "Làm sao để gom nhóm dữ liệu hoặc biến đổi cấu trúc mảng?"
 */

// 1. Group By: Gom nhóm danh sách Loan theo trạng thái
const loans = [
    { id: 1, amount: 1000, status: "Approved" },
    { id: 2, amount: 500, status: "Pending" },
    { id: 3, amount: 2000, status: "Approved" },
    { id: 4, amount: 300, status: "Rejected" },
];

function groupByStatus(items) {
    return items.reduce((acc, obj) => {
        const key = obj.status;
        if (!acc[key]) acc[key] = [];
        acc[key].push(obj);
        return acc;
    }, {});
}

// Kết quả: { Approved: [...], Pending: [...], Rejected: [...] }
console.log("Grouped Loans:", groupByStatus(loans));


// 2. Flat Array to Tree: Chuyển mảng phẳng thành cây (Menu/Category)
const categories = [
    { id: 1, name: "Finance", parentId: null },
    { id: 2, name: "Loans", parentId: 1 },
    { id: 3, name: "Personal Loan", parentId: 2 },
    { id: 4, name: "Trading", parentId: 1 },
];

function arrayToTree(items) {
    const root = [];
    const map = {};

    items.forEach(item => {
        map[item.id] = { ...item, children: [] };
    });

    items.forEach(item => {
        const node = map[item.id];
        if (item.parentId === null) {
            root.push(node);
        } else {
            map[item.parentId].children.push(node);
        }
    });

    return root;
}

console.log("Category Tree:", JSON.stringify(arrayToTree(categories), null, 2));
