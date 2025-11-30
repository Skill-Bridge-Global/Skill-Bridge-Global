// Mock Data for Certification Center
const taskRecommendations = [
    {
        id: 1,
        title: "UI/UX Fundamental",
        type: "ui-ux",
        image: "https://via.placeholder.com/400x150/667eea/ffffff?text=UI/UX+Fundamental"
    },
    {
        id: 2,
        title: "UI/UX Expert",
        type: "ui-ux",
        image: "https://via.placeholder.com/400x150/764ba2/ffffff?text=UI/UX+Expert"
    },
    {
        id: 3,
        title: "React",
        type: "frontend",
        image: "https://via.placeholder.com/400x150/f093fb/ffffff?text=React"
    }
];

const yourTasks = [
    {
        id: 1,
        name: "UI/UX Fundamental",
        type: "ui-ux",
        date: "21 March",
        progress: "done"
    },
    {
        id: 2,
        name: "React",
        type: "frontend",
        date: "21 April",
        progress: "in-progress"
    },
    {
        id: 3,
        name: "Web Developer",
        type: "web-developer",
        date: "12 May",
        progress: "in-progress"
    }
];

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load tasks
    loadTaskRecommendations();
    loadYourTasks();
    
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

function setupFilters() {
    const typeFilter = document.getElementById('type-filter');
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
}

function applyFilters() {
    const typeFilter = document.getElementById('type-filter').value;
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    
    let filteredTasks = taskRecommendations;
    
    // Apply type filter
    if (typeFilter) {
        filteredTasks = filteredTasks.filter(t => t.type === typeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
        filteredTasks = filteredTasks.filter(t => 
            t.title.toLowerCase().includes(searchQuery)
        );
    }
    
    loadTaskRecommendations(filteredTasks);
}

function loadTaskRecommendations(tasks = taskRecommendations) {
    const tasksGrid = document.getElementById('tasks-grid');
    if (!tasksGrid) return;
    
    let html = '';
    tasks.forEach(task => {
        const badgeClass = `badge-${task.type.replace('-', '')}`;
        const typeText = task.type === 'ui-ux' ? 'UI/UX' : 
                        task.type === 'frontend' ? 'FRONTEND' : 
                        'WEB DEVELOPER';
        
        html += `
            <div class="task-card" onclick="startTask(${task.id})">
                <div class="task-image" style="background: ${getGradient(task.type)}"></div>
                <div class="task-content">
                    <span class="task-type-badge ${badgeClass}">${typeText}</span>
                    <h3 class="task-title">${task.title}</h3>
                </div>
            </div>
        `;
    });
    
    tasksGrid.innerHTML = html || '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #6B7280;">No tasks found</p>';
}

function loadYourTasks() {
    const tasksBody = document.getElementById('tasks-tbody');
    if (!tasksBody) return;
    
    let html = '';
    yourTasks.forEach(task => {
        const pillClass = `pill-${task.type.replace('-', '')}`;
        const statusClass = `status-${task.progress}`;
        const typeText = task.type === 'ui-ux' ? 'UI/UX' : 
                        task.type === 'frontend' ? 'FRONTEND' : 
                        'WEB DEVELOPER';
        const statusText = task.progress === 'done' ? 'DONE' : 'ON PROGRESS';
        
        html += `
            <tr>
                <td class="task-name">${task.name}</td>
                <td><span class="task-type-pill ${pillClass}">${typeText}</span></td>
                <td class="task-date">${task.date}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            </tr>
        `;
    });
    
    tasksBody.innerHTML = html;
}

function getGradient(type) {
    switch(type) {
        case 'ui-ux':
            return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        case 'frontend':
            return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        case 'web-developer':
            return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        default:
            return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

function startTask(taskId) {
    const task = taskRecommendations.find(t => t.id === taskId);
    if (task) {
        if (confirm(`Start task: ${task.title}?`)) {
            alert('Task started! You can now begin your learning journey.');
            // Here you would typically navigate to the task details page
            // window.location.href = `course-detail.html?id=${taskId}`;
        }
    }
}

