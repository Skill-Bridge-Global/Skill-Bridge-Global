// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validate login
            const user = Storage.get(email);
            if (user && user.password === password) {
                sessionStorage.setItem('loggedInUser', email);
                alert('Login berhasil!');
                window.location.href = '../dashboard/index.html';
            } else {
                alert('Email atau password salah!');
            }
        });
    }
});
