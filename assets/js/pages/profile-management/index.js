// Mock Data for Profile
const profileData = {
    name: "Jake Gyll",
    title: "Product Designer",
    company: "Twitter",
    location: "Manchester, UK",
    email: "jakegyll@email.com",
    phone: "+44 1245 572 135",
    languages: "English, French",
    avatar: "https://i.pravatar.cc/120?img=12",
    about: [
        "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.",
        "For 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups."
    ],
    skills: [
        "Communication",
        "Analytics",
        "Facebook Ads",
        "Content Planning",
        "Community Manager"
    ],
    socialLinks: {
        instagram: "instagram.com/jakegyll",
        twitter: "twitter.com/jakegyll",
        website: "www.jakegyll.com"
    },
    portfolios: [
        {
            id: 1,
            title: "Clinically - clinic & health care website",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&auto=format"
        },
        {
            id: 2,
            title: "Growthly - SaaS Analytics & Sales Website",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format"
        },
        {
            id: 3,
            title: "Planne - Project Management App",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format"
        },
        {
            id: 4,
            title: "Funiro - E-commerce furniture",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format"
        }
    ],
    experiences: [
        {
            id: 1,
            role: "Product Designer",
            company: "Twitter",
            type: "Full Time",
            period: "Jun 2019 - Present (1y 1m)",
            location: "Manchester, UK",
            description: "Created and executed social media plans for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
            logo: "🐦"
        },
        {
            id: 2,
            role: "Growth Marketing Designer",
            company: "GoDaddy",
            type: "Full Time",
            period: "Jun 2011 - May 2019 (8y)",
            location: "Manchester, UK",
            description: "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives",
            logo: "🌐"
        }
    ],
    educations: [
        {
            id: 1,
            name: "Harvard University",
            degree: "Postgraduate degree, Applied Psychology",
            years: "2010 - 2012",
            description: "As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.",
            logo: "H"
        },
        {
            id: 2,
            name: "University of Toronto",
            degree: "Bachelor of Arts, Visual Communication",
            years: "2005 - 2009",
            description: "",
            logo: "T"
        }
    ],
    performance: {
        rating: 90,
        respondRate: 90,
        orderCompletion: 1298
    },
    ratingBars: [
        { stars: 5, percentage: 95 },
        { stars: 4, percentage: 80 },
        { stars: 3, percentage: 15 },
        { stars: 2, percentage: 30 },
        { stars: 1, percentage: 8 }
    ],
    reviews: [
        {
            id: 1,
            reviewerName: "James Brown",
            reviewerAvatar: "https://i.pravatar.cc/48?img=11",
            rating: 5,
            text: "Jake adalah designer yang sangat profesional dan detail-oriented. Hasil kerjanya selalu melebihi ekspektasi dan selalu tepat waktu. Komunikasi yang sangat baik dan mudah diajak kolaborasi. Sangat direkomendasikan untuk proyek UI/UX design!",
            date: "2 days ago"
        },
        {
            id: 2,
            reviewerName: "Sarah Miller",
            reviewerAvatar: "https://i.pravatar.cc/48?img=13",
            rating: 4,
            text: "Pengalaman bekerja dengan Jake sangat menyenangkan. Design yang dihasilkan modern dan user-friendly. Ada beberapa revisi minor yang diperlukan, tapi overall sangat puas dengan hasilnya. Akan hire lagi untuk proyek berikutnya!",
            date: "2 days ago"
        },
        {
            id: 3,
            reviewerName: "Michael Chen",
            reviewerAvatar: "https://i.pravatar.cc/48?img=8",
            rating: 5,
            text: "Excellent work! Jake sangat memahami kebutuhan project dan mampu translate ide menjadi design yang outstanding. Responsif, profesional, dan hasil akhirnya sangat memuaskan. Highly recommended untuk siapa saja yang mencari UI/UX designer berkualitas!",
            date: "2 days ago"
        }
    ]
};

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadProfileData();
    setupTabs();
    loadSkills();
    loadPortfolios();
    loadExperiences();
    loadEducations();
    loadRatingBars();
    loadReviews();
});

function checkAuth() {
    const userEmail = sessionStorage.getItem('loggedInUser');
    if (!userEmail) {
        window.location.href = '../auth/login.html';
        return;
    }
}

function loadProfileData() {
    // Load from storage or use mock data
    const userEmail = sessionStorage.getItem('loggedInUser');
    let userData = Storage.get(userEmail);
    
    if (userData) {
        // Merge with mock data
        profileData.name = userData.fullname || profileData.name;
        profileData.email = userData.email || profileData.email;
    }
    
    // Update UI
    document.getElementById('profile-display-name').textContent = profileData.name;
    document.getElementById('profile-email').textContent = profileData.email;
    document.getElementById('profile-phone').textContent = profileData.phone;
    document.getElementById('profile-languages').textContent = profileData.languages;
    document.getElementById('profile-avatar').src = profileData.avatar;
    
    // Social links
    document.getElementById('profile-instagram').textContent = profileData.socialLinks.instagram;
    document.getElementById('profile-twitter').textContent = profileData.socialLinks.twitter;
    document.getElementById('profile-website').textContent = profileData.socialLinks.website;
    
    // About content
    const aboutContent = document.getElementById('about-content');
    aboutContent.innerHTML = profileData.about.map(p => `<p>${p}</p>`).join('');
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function loadSkills() {
    const skillsList = document.getElementById('skills-list');
    if (!skillsList) return;
    
    let html = '';
    profileData.skills.forEach(skill => {
        html += `<span class="skill-badge">${skill}</span>`;
    });
    
    skillsList.innerHTML = html;
}

function loadPortfolios() {
    const portfoliosGrid = document.getElementById('portfolios-grid');
    if (!portfoliosGrid) return;
    
    let html = '';
    profileData.portfolios.forEach(portfolio => {
        html += `
            <div class="portfolio-item" onclick="viewPortfolio(${portfolio.id})">
                <img src="${portfolio.image}" alt="${portfolio.title}" class="portfolio-image">
                <div class="portfolio-title">${portfolio.title}</div>
            </div>
        `;
    });
    
    portfoliosGrid.innerHTML = html;
}

function loadExperiences() {
    const experiencesList = document.getElementById('experiences-list');
    if (!experiencesList) return;
    
    let html = '';
    profileData.experiences.slice(0, 2).forEach(exp => {
        html += `
            <div class="experience-item">
                <div class="experience-logo">${exp.logo}</div>
                <div class="experience-content">
                    <div class="experience-header">
                        <div>
                            <h4 class="experience-title">${exp.role}</h4>
                            <p class="experience-company">${exp.company} · ${exp.type} · ${exp.period}</p>
                            <p class="experience-location">${exp.location}</p>
                        </div>
                        <button class="icon-btn" onclick="editExperience(${exp.id})">✏️</button>
                    </div>
                    <p class="experience-description">${exp.description}</p>
                </div>
            </div>
        `;
    });
    
    experiencesList.innerHTML = html;
}

function loadEducations() {
    const educationsList = document.getElementById('educations-list');
    if (!educationsList) return;
    
    let html = '';
    profileData.educations.forEach(edu => {
        html += `
            <div class="education-item">
                <div class="education-logo">${edu.logo}</div>
                <div class="education-content">
                    <div class="education-header">
                        <div>
                            <h4 class="education-name">${edu.name}</h4>
                            <p class="education-degree">${edu.degree}</p>
                            <p class="education-years">${edu.years}</p>
                        </div>
                        <button class="icon-btn" onclick="editEducation(${edu.id})">✏️</button>
                    </div>
                    ${edu.description ? `<p class="education-description">${edu.description}</p>` : ''}
                </div>
            </div>
        `;
    });
    
    educationsList.innerHTML = html;
}

function loadRatingBars() {
    const ratingBars = document.getElementById('rating-bars');
    if (!ratingBars) return;
    
    let html = '';
    profileData.ratingBars.forEach(bar => {
        html += `
            <div class="rating-bar">
                <span class="rating-number">${bar.stars}</span>
                <span class="star-icon">⭐</span>
                <div class="bar-container">
                    <div class="bar-fill" style="width: ${bar.percentage}%"></div>
                </div>
            </div>
        `;
    });
    
    ratingBars.innerHTML = html;
}

function loadReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;
    
    let html = '';
    profileData.reviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        html += `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <img src="${review.reviewerAvatar}" alt="${review.reviewerName}" class="reviewer-avatar">
                        <div>
                            <h4 class="reviewer-name">${review.reviewerName}</h4>
                            <span class="view-order-link">View order</span>
                        </div>
                    </div>
                    <div class="review-stars">
                        ${stars.split('').map(s => `<span class="star-filled">${s}</span>`).join('')}
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
                <p class="review-date">${review.date}</p>
            </div>
        `;
    });
    
    reviewsContainer.innerHTML = html;
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form if exists
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

function showEditProfileModal() {
    // Load current data
    const userEmail = sessionStorage.getItem('loggedInUser');
    const user = Storage.get(userEmail);
    
    if (user) {
        document.getElementById('modal-full-name').value = user.fullname || profileData.name;
        document.getElementById('modal-phone').value = user.phone || profileData.phone;
        document.getElementById('modal-email').value = user.email || profileData.email;
        document.getElementById('modal-dob').value = user.dob || '';
        document.getElementById('modal-gender').value = user.gender || 'male';
        
        if (user.accountType) {
            const accountRadio = document.querySelector(`input[name="modal-account-type"][value="${user.accountType}"]`);
            if (accountRadio) accountRadio.checked = true;
        }
        
        if (user.avatar) {
            document.getElementById('modal-profile-preview').src = user.avatar;
        }
    }
    
    showModal('edit-profile-modal');
}

function saveProfile() {
    const userEmail = sessionStorage.getItem('loggedInUser');
    if (!userEmail) return;
    
    const user = Storage.get(userEmail) || {};
    
    user.fullname = document.getElementById('modal-full-name').value;
    user.phone = document.getElementById('modal-phone').value;
    user.email = document.getElementById('modal-email').value;
    user.dob = document.getElementById('modal-dob').value;
    user.gender = document.getElementById('modal-gender').value;
    user.accountType = document.querySelector('input[name="modal-account-type"]:checked').value;
    user.avatar = document.getElementById('modal-profile-preview').src;
    
    Storage.set(userEmail, user);
    
    // Update profile display
    loadProfileData();
    
    alert('Profile saved successfully!');
    closeModal('edit-profile-modal');
}

function editAboutMe() {
    const aboutText = prompt('Edit About Me:', profileData.about.join('\n\n'));
    if (aboutText !== null) {
        profileData.about = aboutText.split('\n\n');
        loadProfileData();
    }
}

function showAddSkillModal() {
    const skill = prompt('Add new skill:');
    if (skill && skill.trim()) {
        profileData.skills.push(skill.trim());
        loadSkills();
    }
}

function editSkills() {
    const skillsText = prompt('Edit Skills (comma separated):', profileData.skills.join(', '));
    if (skillsText !== null) {
        profileData.skills = skillsText.split(',').map(s => s.trim()).filter(s => s);
        loadSkills();
    }
}

function showAddPortfolioModal() {
    showModal('portfolio-modal');
}

function showAddExperienceModal() {
    showModal('experience-modal');
}

function showAddEducationModal() {
    showModal('education-modal');
}

function editAdditionalDetails() {
    const email = prompt('Email:', profileData.email);
    if (email !== null) profileData.email = email;
    
    const phone = prompt('Phone:', profileData.phone);
    if (phone !== null) profileData.phone = phone;
    
    const languages = prompt('Languages (comma separated):', profileData.languages);
    if (languages !== null) profileData.languages = languages;
    
    loadProfileData();
}

function editSocialLinks() {
    const instagram = prompt('Instagram:', profileData.socialLinks.instagram);
    if (instagram !== null) profileData.socialLinks.instagram = instagram;
    
    const twitter = prompt('Twitter:', profileData.socialLinks.twitter);
    if (twitter !== null) profileData.socialLinks.twitter = twitter;
    
    const website = prompt('Website:', profileData.socialLinks.website);
    if (website !== null) profileData.socialLinks.website = website;
    
    loadProfileData();
}

function viewPortfolio(id) {
    const portfolio = profileData.portfolios.find(p => p.id === id);
    if (portfolio) {
        alert(`Viewing: ${portfolio.title}`);
    }
}

function editExperience(id) {
    const exp = profileData.experiences.find(e => e.id === id);
    if (!exp) {
        showAddExperienceModal();
        return;
    }
    
    // Pre-fill form with existing data
    document.getElementById('exp-role').value = exp.role;
    document.getElementById('exp-company').value = exp.company;
    document.getElementById('exp-city').value = exp.location;
    document.getElementById('exp-period').value = exp.period;
    document.getElementById('exp-description').value = exp.description;
    
    // Store editing ID
    document.getElementById('experience-form').dataset.editingId = id;
    
    showModal('experience-modal');
}

function editEducation(id) {
    const edu = profileData.educations.find(e => e.id === id);
    if (!edu) {
        showAddEducationModal();
        return;
    }
    
    // Pre-fill form with existing data
    document.getElementById('edu-program').value = edu.degree;
    document.getElementById('edu-institution').value = edu.name;
    document.getElementById('edu-city').value = '';
    document.getElementById('edu-period').value = edu.years;
    document.getElementById('edu-description').value = edu.description || '';
    
    // Store editing ID
    document.getElementById('education-form').dataset.editingId = id;
    
    showModal('education-modal');
}

// Form Submissions
document.addEventListener('DOMContentLoaded', function() {
    // Education Form
    const educationForm = document.getElementById('education-form');
    if (educationForm) {
        educationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const editingId = this.dataset.editingId;
            const educationData = {
                id: editingId ? parseInt(editingId) : Date.now(),
                name: document.getElementById('edu-institution').value,
                degree: document.getElementById('edu-program').value,
                years: document.getElementById('edu-period').value,
                description: document.getElementById('edu-description').value,
                logo: document.getElementById('edu-institution').value.charAt(0).toUpperCase()
            };
            
            if (editingId) {
                const index = profileData.educations.findIndex(e => e.id === parseInt(editingId));
                if (index !== -1) {
                    profileData.educations[index] = educationData;
                }
            } else {
                profileData.educations.push(educationData);
            }
            
            loadEducations();
            closeModal('education-modal');
            alert('Education saved successfully!');
        });
    }
    
    // Experience Form
    const experienceForm = document.getElementById('experience-form');
    if (experienceForm) {
        experienceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const editingId = this.dataset.editingId;
            const experienceData = {
                id: editingId ? parseInt(editingId) : Date.now(),
                role: document.getElementById('exp-role').value,
                company: document.getElementById('exp-company').value,
                type: 'Full Time',
                period: document.getElementById('exp-period').value,
                location: document.getElementById('exp-city').value,
                description: document.getElementById('exp-description').value,
                logo: document.getElementById('exp-company').value.charAt(0)
            };
            
            if (editingId) {
                const index = profileData.experiences.findIndex(e => e.id === parseInt(editingId));
                if (index !== -1) {
                    profileData.experiences[index] = experienceData;
                }
            } else {
                profileData.experiences.push(experienceData);
            }
            
            loadExperiences();
            closeModal('experience-modal');
            alert('Experience saved successfully!');
        });
    }
    
    // Portfolio Form
    const portfolioForm = document.getElementById('portfolio-form');
    if (portfolioForm) {
        portfolioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const portfolioData = {
                id: Date.now(),
                title: document.getElementById('port-project-name').value,
                image: document.getElementById('port-link').value || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format'
            };
            
            profileData.portfolios.push(portfolioData);
            loadPortfolios();
            closeModal('portfolio-modal');
            alert('Portfolio added successfully!');
        });
    }
    
    // Photo Upload Handler
    const modalPhotoUpload = document.getElementById('modal-photo-upload');
    if (modalPhotoUpload) {
        modalPhotoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('modal-profile-preview').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
