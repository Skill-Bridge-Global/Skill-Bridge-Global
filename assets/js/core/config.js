// Configuration and Constants
const CONFIG = {
    API_BASE_URL: '', // Will be set when backend is ready
    STORAGE_KEYS: {
        USER: 'loggedInUser',
        TOKEN: 'authToken'
    },
    ROUTES: {
        HOME: '/',
        LOGIN: '/pages/auth/login.html',
        REGISTER: '/pages/auth/registrasi.html',
        DASHBOARD: '/pages/dashboard/index.html'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

