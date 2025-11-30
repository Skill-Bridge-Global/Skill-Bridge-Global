// Mock Data for Dashboard
const mockData = {
    applications: [
        {
            id: 1,
            title: "Senior Frontend Developer",
            company: "Digital Solutions Co. (Melbourne, Australia)",
            status: "applied",
            statusText: "Applied",
            date: "Accepted on Mar 15, 2024"
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
        },
        {
            id: 4,
            title: "Lead UI Designer",
            company: "Creative Digital Agency (Tokyo, Japan)",
            status: "rejected",
            statusText: "Not selected",
            date: "Not selected - Mar 05, 2024"
        }
    ],
    
    projects: [
        {
            id: 1,
            clientName: "James Brown",
            clientAvatar: "https://i.pravatar.cc/40?img=11",
            projectName: "Landing Page Redesign",
            price: "$1,200",
            timeline: "3 Days",
            progress: 90
        },
        {
            id: 2,
            clientName: "Audrey Jones",
            clientAvatar: "https://i.pravatar.cc/40?img=5",
            projectName: "WordPress E-commerce Site",
            price: "$2,500",
            timeline: "6 days",
            progress: 50
        },
        {
            id: 3,
            clientName: "Brian Fisher",
            clientAvatar: "https://i.pravatar.cc/40?img=13",
            projectName: "UI/UX Mobile App Design",
            price: "$1,800",
            timeline: "4 days",
            progress: 95
        },
        {
            id: 4,
            clientName: "Molly Mills",
            clientAvatar: "https://i.pravatar.cc/40?img=9",
            projectName: "Frontend Dashboard Development",
            price: "$3,200",
            timeline: "8 days",
            progress: 20
        },
        {
            id: 5,
            clientName: "Orlando Versa",
            clientAvatar: "https://i.pravatar.cc/40?img=8",
            projectName: "Responsive Website Builder",
            price: "$300",
            timeline: "4 days 2 hours",
            progress: 80
        }
    ],
    
    earningData: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        values: [3000, 4200, 3800, 5500, 4800, 6200, 5900, 6800, 7200, 6500, 7500, 7020]
    }
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load user data
    loadUserData();
    
    // Load applications
    loadApplications();
    
    // Load projects
    loadProjects();
    
    // Draw earning chart
    drawEarningChart();
});

function checkAuth() {
    const userEmail = sessionStorage.getItem('loggedInUser');
    if (!userEmail) {
        window.location.href = '../auth/login.html';
        return;
    }
}

function loadUserData() {
    const userEmail = sessionStorage.getItem('loggedInUser');
    if (!userEmail) return;
    
    const user = Storage.get(userEmail);
    if (user) {
        // Update user name
        const userNameEl = document.getElementById('user-name');
        if (userNameEl) {
            userNameEl.textContent = user.fullname || 'John';
        }
        
        // Update profile name
        const profileNameEl = document.getElementById('profile-name');
        if (profileNameEl) {
            profileNameEl.textContent = user.fullname || 'John Doe';
        }
        
        // Update profile avatar if available
        if (user.avatar) {
            const profileAvatar = document.getElementById('profile-avatar');
            if (profileAvatar) {
                profileAvatar.src = user.avatar;
            }
        }
    }
}

function loadApplications() {
    const applicationList = document.getElementById('application-list');
    if (!applicationList) return;
    
    let html = '';
    mockData.applications.forEach(app => {
        html += `
            <div class="application-item">
                <div class="application-info">
                    <p class="application-title">${app.title}</p>
                    <p class="application-company">${app.company}</p>
                </div>
                <div class="application-meta">
                    <span class="application-status status-${app.status}">${app.statusText}</span>
                    <span class="application-date">${app.date}</span>
                </div>
            </div>
        `;
    });
    
    applicationList.innerHTML = html;
}

function loadProjects() {
    const projectsBody = document.getElementById('projects-tbody');
    if (!projectsBody) return;
    
    let html = '';
    mockData.projects.forEach(project => {
        html += `
            <tr>
                <td>
                    <div class="client-cell">
                        <img src="${project.clientAvatar}" alt="${project.clientName}" class="client-avatar">
                        <div class="client-info">
                            <span class="client-name">${project.clientName}</span>
                            <span class="client-link">View order</span>
                        </div>
                    </div>
                </td>
                <td>${project.projectName}</td>
                <td>${project.price}</td>
                <td>${project.timeline}</td>
                <td>
                    <div class="progress-cell">
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" style="width: ${project.progress}%"></div>
                        </div>
                        <span class="progress-text">${project.progress}%</span>
                    </div>
                </td>
            </tr>
        `;
    });
    
    projectsBody.innerHTML = html;
}

function drawEarningChart() {
    const canvas = document.getElementById('earningChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = mockData.earningData;
    const width = canvas.width;
    const height = canvas.height;
    const padding = 10;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Find min and max values
    const maxValue = Math.max(...data.values);
    const minValue = Math.min(...data.values);
    const valueRange = maxValue - minValue;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate points
    const points = data.values.map((value, index) => {
        const x = padding + (chartWidth / (data.values.length - 1)) * index;
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
        return { x, y };
    });
    
    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 102, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 102, 255, 0.05)');
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.lineTo(point.x, point.y);
        } else {
            // Smooth curve
            const prevPoint = points[index - 1];
            const midX = (prevPoint.x + point.x) / 2;
            ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, (prevPoint.y + point.y) / 2);
            ctx.quadraticCurveTo(midX, (prevPoint.y + point.y) / 2, point.x, point.y);
        }
    });
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            const prevPoint = points[index - 1];
            const midX = (prevPoint.x + point.x) / 2;
            ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, (prevPoint.y + point.y) / 2);
            ctx.quadraticCurveTo(midX, (prevPoint.y + point.y) / 2, point.x, point.y);
        }
    });
    ctx.strokeStyle = '#0066FF';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw points
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#0066FF';
        ctx.fill();
    });
}

