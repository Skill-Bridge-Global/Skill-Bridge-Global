// Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling untuk navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Button click handlers
    document.querySelectorAll('.btn-primary, .btn-secondary, .nav-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            
            if (text === 'Mulai Sekarang' || text === 'Daftar Gratis Sekarang') {
                e.preventDefault();
                window.location.href = 'pages/auth/registrasi.html';
            } else if (text === 'Pelajari Lebih Lanjut') {
                e.preventDefault();
                const featuresSection = document.querySelector('#features');
                if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

