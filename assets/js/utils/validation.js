// Form Validation Functions
const Validation = {
    email(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    password(password, minLength = 8) {
        return password.length >= minLength;
    },

    required(value) {
        return value && value.trim().length > 0;
    },

    minLength(value, min) {
        return value && value.length >= min;
    },

    maxLength(value, max) {
        return value && value.length <= max;
    },

    match(value1, value2) {
        return value1 === value2;
    }
};

