/**
 * CASE: Loan Validation (Complex Logic)
 * 
 * Thách thức: Form có các trường phụ thuộc lẫn nhau.
 */

const loanSchema = {
    amount: {
        required: true,
        validate: (val) => val > 0 || "Amount must be positive",
    },
    loanType: {
        required: true,
    },
    assetValue: {
        // Chỉ bắt buộc nếu loanType là 'Secured' (Có tài sản đảm bảo)
        dependsOn: "loanType",
        requiredIf: (deps) => deps.loanType === "Secured",
        validate: (val) => val > 1000 || "Asset value too low",
    }
};

function validateForm(data, schema) {
    const errors = {};

    for (const field in schema) {
        const rules = schema[field];
        const value = data[field];

        // Kiểm tra điều kiện phụ thuộc
        if (rules.requiredIf) {
            const isRequired = rules.requiredIf(data);
            if (isRequired && !value) {
                errors[field] = `${field} is required for this loan type`;
                continue;
            }
        }

        if (rules.required && !value) {
            errors[field] = `${field} is required`;
            continue;
        }

        if (value && rules.validate) {
            const result = rules.validate(value);
            if (result !== true) errors[field] = result;
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// TEST CASES
const testData1 = { amount: 5000, loanType: "Unsecured" };
console.log("Unsecured Test:", validateForm(testData1, loanSchema));

const testData2 = { amount: 5000, loanType: "Secured" }; // Thiếu assetValue
console.log("Secured Test (Fail):", validateForm(testData2, loanSchema));
