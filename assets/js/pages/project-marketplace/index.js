// Mock Data for Project Marketplace
const projectsData = [
    {
        id: 1,
        title: "Junior UI/UX Design",
        type: "project-based",
        company: "Creative, Inc",
        tags: ["Remote", "1 Week", "$800"],
        icon: "🎨"
    },
    {
        id: 2,
        title: "Social Media Graphic Designer",
        type: "freelance",
        company: "PixelForge Studio",
        tags: ["Remote", "2 Weeks", "$500"],
        icon: "📱"
    },
    {
        id: 3,
        title: "Mobile App UI Redesign",
        type: "project-based",
        company: "AppFlow Tech",
        tags: ["Remote", "3 Weeks", "$1,200"],
        icon: "📱"
    },
    {
        id: 4,
        title: "Logo & Brand Identity Designer",
        type: "contract",
        company: "Nova Branding",
        tags: ["Remote", "1 Week", "$350"],
        icon: "🎯"
    },
    {
        id: 5,
        title: "Junior Web Designer",
        type: "remote",
        company: "BlueWave Digital",
        tags: ["Remote", "2 Week", "$600"],
        icon: "🌐"
    },
    {
        id: 6,
        title: "E-commerce UI Designer",
        type: "project-based",
        company: "ShopSmart",
        tags: ["Remote", "1 Week", "$900"],
        icon: "🛒"
    },
    {
        id: 7,
        title: "Dashboard UI/UX Designer",
        type: "contract",
        company: "DataSee Analytics",
        tags: ["Remote", "2 Weeks", "$1,100"],
        icon: "📊"
    },
    {
        id: 8,
        title: "Marketing Landing Page Design",
        type: "freelance",
        company: "BoostLab",
        tags: ["Remote", "1 Week", "$500"],
        icon: "🚀"
    },
    {
        id: 9,
        title: "Junior Interaction Designer",
        type: "project-based",
        company: "Interface Co",
        tags: ["Remote", "1 Week", "$750"],
        icon: "✨"
    }
];

const applicationsData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "Digital Solutions Co. (Melbourne, Australia)",
        status: "pending",
        statusText: "Applied",
        date: "Applied on Mar 15, 2024"
    },
    {
        id: 2,
        title: "UI/UX Designer",
        company: "StartUp Innovation Lab (Berlin, Germany)",
        status: "accepted",
        statusText: "Accepted",
        date: "Accepted on Mar 12, 2024"
    },
    {
        id: 3,
        title: "WordPress Plugin Developer",
        company: "Plugin Masters (Sydney, Australia)",
        status: "rejected",
        statusText: "Not Applied",
        date: "Position filled - Mar 08, 2024"
    }
];

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load projects
    loadProjects(projectsData);
    
    // Load applications
    loadApplications();
    
    // Setup tabs
    setupTabs();
    
    // Setup filters
    setupFilters();
    
    // Setup search
    setupSearch();
});

function checkAuth() {
    const userEmail = sessionStorage.getItem('loggedInUser');
    if (!userEmail) {
        window.location.href = '../auth/login.html';
        return;
    }
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function setupFilters() {
    const typeFilter = document.getElementById('type-filter');
    const timeFilter = document.getElementById('time-filter');
    const seniorityFilter = document.getElementById('seniority-filter');
    const salaryFilter = document.getElementById('salary-filter');
    
    [typeFilter, timeFilter, seniorityFilter, salaryFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
}

function applyFilters() {
    const typeFilter = document.getElementById('type-filter').value;
    const timeFilter = document.getElementById('time-filter').value;
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    
    let filteredProjects = projectsData;
    
    // Apply type filter
    if (typeFilter) {
        filteredProjects = filteredProjects.filter(p => p.type === typeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
        filteredProjects = filteredProjects.filter(p => 
            p.title.toLowerCase().includes(searchQuery) ||
            p.company.toLowerCase().includes(searchQuery)
        );
    }
    
    loadProjects(filteredProjects);
}

function loadProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    let html = '';
    projects.forEach(project => {
        const badgeClass = `badge-${project.type}`;
        const badgeText = project.type.replace('-', ' ').split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        html += `
            <div class="project-card" onclick="viewProjectDetail(${project.id})" style="cursor: pointer;">
                <div class="project-header">
                    <div class="project-icon">${project.icon}</div>
                    <span class="project-badge ${badgeClass}">${badgeText}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-footer">
                    <span class="company-name">${project.company}</span>
                    <button class="apply-btn" onclick="event.stopPropagation(); applyToProject(${project.id})">
                        Apply →
                    </button>
                </div>
            </div>
        `;
    });
    
    projectsGrid.innerHTML = html || '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #6B7280;">No projects found</p>';
}

function loadApplications() {
    const applicationsContainer = document.getElementById('applications-container');
    if (!applicationsContainer) return;
    
    let html = '';
    applicationsData.forEach(app => {
        html += `
            <div class="application-card">
                <span class="application-status-badge status-${app.status}">${app.statusText}</span>
                <h3 class="application-title">${app.title}</h3>
                <p class="application-company">${app.company}</p>
                <p class="application-date">${app.date}</p>
            </div>
        `;
    });
    
    applicationsContainer.innerHTML = html;
}

function viewProjectDetail(projectId) {
    // Navigate to detail page with project ID
    window.location.href = `detail.html?id=${projectId}`;
}

function applyToProject(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (project) {
        if (confirm(`Apply to ${project.title} at ${project.company}?`)) {
            // Navigate to detail page to apply
            window.location.href = `detail.html?id=${projectId}`;
        }
    }
}

