// Complete Profile Page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('complete-profile-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userEmail = sessionStorage.getItem('loggedInUser');
            if (!userEmail) {
                alert('Silakan login terlebih dahulu');
                window.location.href = 'login.html';
                return;
            }
            
            const user = Storage.get(userEmail);
            if (!user) {
                alert('Data pengguna tidak ditemukan');
                window.location.href = 'login.html';
                return;
            }
            
            // Update user profile
            user.profession = document.getElementById('profession').value;
            user.location = document.getElementById('location').value;
            user.bio = document.getElementById('bio').value;
            user.skills = document.getElementById('skills').value.split(',').map(s => s.trim());
            user.profileCompleted = true;
            
            // Save updated user
            Storage.set(userEmail, user);
            
            alert('Profil berhasil dilengkapi!');
            window.location.href = '../../pages/dashboard/index.html';
        });
    }
});

