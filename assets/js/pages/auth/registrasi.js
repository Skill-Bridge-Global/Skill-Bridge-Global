// Registration Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Check if user already exists
            if (Storage.get(email)) {
                alert('Email sudah terdaftar! Silakan gunakan email lain atau login.');
                return;
            }
            
            // Create user object
            const user = {
                fullname: fullname,
                email: email,
                password: password,
                registrationDate: new Date().toISOString()
            };
            
            // Save to storage
            Storage.set(email, user);
            sessionStorage.setItem('loggedInUser', email);
            
            alert('Registrasi berhasil!');
            window.location.href = '../dashboard/index.html';
        });
    }
});
