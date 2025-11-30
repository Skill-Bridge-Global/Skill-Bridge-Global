// Sidebar Navigation Component
const Sidebar = {
    init() {
        this.setActiveNav();
        this.bindEvents();
    },

    setActiveNav() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && currentPath.includes(link.getAttribute('href'))) {
                item.classList.add('active');
            }
        });
    },

    bindEvents() {
        // Handle navigation clicks
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const link = item.querySelector('a');
                if (link) {
                    e.preventDefault();
                    window.location.href = link.getAttribute('href');
                }
            });
        });

        // Handle logout
        const logoutBtn = document.querySelector('.nav-item:has-text("Log Out")');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    },

    handleLogout() {
        if (confirm('Apakah Anda yakin ingin logout?')) {
            sessionStorage.removeItem('loggedInUser');
            localStorage.removeItem('authToken');
            window.location.href = '/pages/auth/login.html';
        }
    }
};

// Initialize sidebar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Sidebar.init());
} else {
    Sidebar.init();
}

