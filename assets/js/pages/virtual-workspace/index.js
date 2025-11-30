// Mock Data for Virtual Workspace
const projectsData = [
    {
        id: 1,
        projectName: "E-commerce Website Redesign",
        client: {
            name: "Jane Doe",
            role: "Senior Designer",
            avatar: "https://i.pravatar.cc/40?img=5"
        },
        status: "active",
        priority: "high",
        dueDate: "Dec 15, 2025",
        progress: 75,
        team: [
            "https://i.pravatar.cc/32?img=11",
            "https://i.pravatar.cc/32?img=13",
            "https://i.pravatar.cc/32?img=8"
        ],
        teamCount: 5
    },
    {
        id: 2,
        projectName: "Mobile App UI/UX",
        client: {
            name: "John Smith",
            role: "Product Manager",
            avatar: "https://i.pravatar.cc/40?img=12"
        },
        status: "active",
        priority: "medium",
        dueDate: "Dec 20, 2025",
        progress: 45,
        team: [
            "https://i.pravatar.cc/32?img=9",
            "https://i.pravatar.cc/32?img=14"
        ],
        teamCount: 3
    },
    {
        id: 3,
        projectName: "Brand Identity Design",
        client: {
            name: "Sarah Johnson",
            role: "Marketing Director",
            avatar: "https://i.pravatar.cc/40?img=10"
        },
        status: "pending",
        priority: "low",
        dueDate: "Dec 10, 2025",
        progress: 20,
        team: [
            "https://i.pravatar.cc/32?img=15"
        ],
        teamCount: 2
    },
    {
        id: 4,
        projectName: "Dashboard Development",
        client: {
            name: "Mike Wilson",
            role: "CTO",
            avatar: "https://i.pravatar.cc/40?img=16"
        },
        status: "active",
        priority: "high",
        dueDate: "Dec 18, 2025",
        progress: 90,
        team: [
            "https://i.pravatar.cc/32?img=17",
            "https://i.pravatar.cc/32?img=18",
            "https://i.pravatar.cc/32?img=19",
            "https://i.pravatar.cc/32?img=20"
        ],
        teamCount: 6
    },
    {
        id: 5,
        projectName: "Landing Page Design",
        client: {
            name: "Emily Davis",
            role: "Founder",
            avatar: "https://i.pravatar.cc/40?img=21"
        },
        status: "completed",
        priority: "medium",
        dueDate: "Nov 28, 2025",
        progress: 100,
        team: [
            "https://i.pravatar.cc/32?img=22"
        ],
        teamCount: 2
    },
    {
        id: 6,
        projectName: "Social Media Campaign",
        client: {
            name: "David Brown",
            role: "Creative Director",
            avatar: "https://i.pravatar.cc/40?img=23"
        },
        status: "on-hold",
        priority: "low",
        dueDate: "Dec 25, 2025",
        progress: 30,
        team: [
            "https://i.pravatar.cc/32?img=24",
            "https://i.pravatar.cc/32?img=25"
        ],
        teamCount: 3
    },
    {
        id: 7,
        projectName: "Product Photography",
        client: {
            name: "Lisa Anderson",
            role: "E-commerce Manager",
            avatar: "https://i.pravatar.cc/40?img=26"
        },
        status: "active",
        priority: "medium",
        dueDate: "Dec 12, 2025",
        progress: 60,
        team: [
            "https://i.pravatar.cc/32?img=27",
            "https://i.pravatar.cc/32?img=28"
        ],
        teamCount: 2
    },
    {
        id: 8,
        projectName: "Video Production",
        client: {
            name: "Robert Taylor",
            role: "Content Manager",
            avatar: "https://i.pravatar.cc/40?img=29"
        },
        status: "pending",
        priority: "high",
        dueDate: "Dec 22, 2025",
        progress: 15,
        team: [
            "https://i.pravatar.cc/32?img=30",
            "https://i.pravatar.cc/32?img=31",
            "https://i.pravatar.cc/32?img=32"
        ],
        teamCount: 4
    }
];

const conversationsData = [
    {
        id: 1,
        name: "John Smith",
        preview: "Hey, how's the project going?",
        avatar: "https://i.pravatar.cc/48?img=11",
        time: "2m ago"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        preview: "Can you review my design?",
        avatar: "https://i.pravatar.cc/48?img=5",
        time: "1h ago"
    },
    {
        id: 3,
        name: "Mike Wilson",
        preview: "Thanks for your help!",
        avatar: "https://i.pravatar.cc/48?img=13",
        time: "3h ago"
    }
];

const meetingsData = [
    {
        id: 1,
        title: "Project Kickoff Meeting",
        date: "Nov 30, 2025",
        time: "10:00 AM - 11:00 AM",
        participants: [
            "https://i.pravatar.cc/32?img=11",
            "https://i.pravatar.cc/32?img=5",
            "https://i.pravatar.cc/32?img=13"
        ],
        participantCount: 5
    },
    {
        id: 2,
        title: "Design Review",
        date: "Dec 01, 2025",
        time: "2:00 PM - 3:00 PM",
        participants: [
            "https://i.pravatar.cc/32?img=8",
            "https://i.pravatar.cc/32?img=9"
        ],
        participantCount: 3
    },
    {
        id: 3,
        title: "Client Presentation",
        date: "Dec 02, 2025",
        time: "4:00 PM - 5:00 PM",
        participants: [
            "https://i.pravatar.cc/32?img=12",
            "https://i.pravatar.cc/32?img=14",
            "https://i.pravatar.cc/32?img=15"
        ],
        participantCount: 6
    }
];

// Current page for pagination
let currentPage = 1;
const projectsPerPage = 8;
let filteredProjects = [...projectsData];
let sortColumn = 'project';
let sortDirection = 'asc';

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Setup tabs
    setupTabs();
    
    // Load projects
    loadProjects();
    
    // Setup pagination
    setupPagination();
    
    // Load conversations
    loadConversations();
    
    // Load meetings
    loadMeetings();
    
    // Setup select all
    setupSelectAll();
    
    // Setup search and filters
    setupSearchAndFilters();
    
    // Setup sorting
    setupSorting();
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

function loadProjects() {
    const tbody = document.getElementById('projects-tbody');
    if (!tbody) return;
    
    // Get paginated data
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    
    let html = '';
    paginatedProjects.forEach(project => {
        const statusClass = `status-${project.status}`;
        const priorityClass = `priority-${project.priority}`;
        
        html += `
            <tr>
                <td><input type="checkbox" class="project-checkbox" data-id="${project.id}"></td>
                <td>
                    <div class="project-info">
                        <div class="project-name">${project.projectName}</div>
                        <div class="client-info">
                            <img src="${project.client.avatar}" alt="${project.client.name}" class="client-avatar-small">
                            <div>
                                <div class="client-name">${project.client.name}</div>
                                <div class="client-role">${project.client.role}</div>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="client-cell">
                        <img src="${project.client.avatar}" alt="${project.client.name}" class="client-avatar">
                        <span>${project.client.name}</span>
                    </div>
                </td>
                <td>
                    <span class="status-badge ${statusClass}">${getStatusText(project.status)}</span>
                </td>
                <td>
                    <span class="priority-badge ${priorityClass}">${project.priority.toUpperCase()}</span>
                </td>
                <td>
                    <span class="due-date">${project.dueDate}</span>
                </td>
                <td>
                    <div class="progress-cell">
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" style="width: ${project.progress}%"></div>
                        </div>
                        <span class="progress-text">${project.progress}%</span>
                    </div>
                </td>
                <td>
                    <div class="team-members">
                        <div class="team-avatars">
                            ${project.team.map(avatar => 
                                `<img src="${avatar}" alt="Team member" class="team-avatar">`
                            ).join('')}
                        </div>
                        <span class="team-count">+${project.teamCount - project.team.length}</span>
                    </div>
                </td>
                <td>
                    <div class="actions-menu">
                        <button class="actions-btn" onclick="showActionsMenu(${project.id}, event)">⋮</button>
                        <div class="actions-dropdown" id="actions-menu-${project.id}">
                            <button onclick="viewProject(${project.id})">👁️ View</button>
                            <button onclick="editProject(${project.id})">✏️ Edit</button>
                            <button onclick="duplicateProject(${project.id})">📋 Duplicate</button>
                            <button onclick="archiveProject(${project.id})" class="danger">🗑️ Archive</button>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="9" style="text-align: center; padding: 2rem; color: #6B7280;">No projects found</td></tr>';
    
    // Update pagination info
    updatePaginationInfo();
}

function getStatusText(status) {
    const statusMap = {
        'active': 'Active',
        'pending': 'Pending',
        'completed': 'Completed',
        'on-hold': 'On Hold'
    };
    return statusMap[status] || status;
}

function setupSearchAndFilters() {
    const searchInput = document.getElementById('project-search');
    const statusFilter = document.getElementById('status-filter');
    const priorityFilter = document.getElementById('priority-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const searchQuery = document.getElementById('project-search').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const priorityFilter = document.getElementById('priority-filter').value;
    
    filteredProjects = projectsData.filter(project => {
        const matchesSearch = project.projectName.toLowerCase().includes(searchQuery) ||
                            project.client.name.toLowerCase().includes(searchQuery);
        const matchesStatus = !statusFilter || project.status === statusFilter;
        const matchesPriority = !priorityFilter || project.priority === priorityFilter;
        
        return matchesSearch && matchesStatus && matchesPriority;
    });
    
    // Apply sorting
    applySorting();
    
    // Reset to first page
    currentPage = 1;
    
    // Reload projects
    loadProjects();
    setupPagination();
}

function setupSorting() {
    const sortableHeaders = document.querySelectorAll('.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-sort');
            
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'asc';
            }
            
            // Update sort icons
            sortableHeaders.forEach(h => {
                const icon = h.querySelector('.sort-icon');
                if (h === this) {
                    icon.textContent = sortDirection === 'asc' ? '↑' : '↓';
                } else {
                    icon.textContent = '↓';
                }
            });
            
            applySorting();
            loadProjects();
        });
    });
}

function applySorting() {
    filteredProjects.sort((a, b) => {
        let aValue, bValue;
        
        switch(sortColumn) {
            case 'project':
                aValue = a.projectName.toLowerCase();
                bValue = b.projectName.toLowerCase();
                break;
            case 'client':
                aValue = a.client.name.toLowerCase();
                bValue = b.client.name.toLowerCase();
                break;
            case 'status':
                aValue = a.status;
                bValue = b.status;
                break;
            case 'priority':
                const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
                aValue = priorityOrder[a.priority] || 0;
                bValue = priorityOrder[b.priority] || 0;
                break;
            case 'dueDate':
                aValue = new Date(a.dueDate);
                bValue = new Date(b.dueDate);
                break;
            case 'progress':
                aValue = a.progress;
                bValue = b.progress;
                break;
            default:
                return 0;
        }
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

function updatePaginationInfo() {
    const totalItems = filteredProjects.length;
    const totalPages = Math.ceil(totalItems / projectsPerPage);
    const showingFrom = totalItems === 0 ? 0 : (currentPage - 1) * projectsPerPage + 1;
    const showingTo = Math.min(currentPage * projectsPerPage, totalItems);
    
    document.getElementById('showing-from').textContent = showingFrom;
    document.getElementById('showing-to').textContent = showingTo;
    document.getElementById('total-items').textContent = totalItems;
}

function showActionsMenu(projectId, event) {
    event.stopPropagation();
    
    // Close all other menus
    document.querySelectorAll('.actions-dropdown').forEach(menu => {
        if (menu.id !== `actions-menu-${projectId}`) {
            menu.classList.remove('active');
        }
    });
    
    // Toggle current menu
    const menu = document.getElementById(`actions-menu-${projectId}`);
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.actions-menu')) {
        document.querySelectorAll('.actions-dropdown').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

function viewProject(id) {
    alert(`View project ${id}`);
}

function editProject(id) {
    alert(`Edit project ${id}`);
}

function duplicateProject(id) {
    alert(`Duplicate project ${id}`);
}

function archiveProject(id) {
    if (confirm('Are you sure you want to archive this project?')) {
        filteredProjects = filteredProjects.filter(p => p.id !== id);
        loadProjects();
        setupPagination();
    }
}

function bulkAction(action) {
    const checked = document.querySelectorAll('.project-checkbox:checked');
    if (checked.length === 0) {
        alert('Please select at least one project');
        return;
    }
    
    const ids = Array.from(checked).map(cb => parseInt(cb.getAttribute('data-id')));
    
    if (action === 'archive') {
        if (confirm(`Archive ${ids.length} selected project(s)?`)) {
            filteredProjects = filteredProjects.filter(p => !ids.includes(p.id));
            loadProjects();
            setupPagination();
        }
    }
}

function addNewProject() {
    alert('Add new project - To be implemented');
}

function setupPagination() {
    const paginationNumbers = document.getElementById('pagination-numbers');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (!paginationNumbers) return;
    
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    
    function renderPagination() {
        let html = '';
        
        if (totalPages === 0) {
            paginationNumbers.innerHTML = '';
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }
        
        // Always show first page
        html += `<button class="page-number ${currentPage === 1 ? 'active' : ''}" data-page="1">1</button>`;
        
        if (currentPage > 3) {
            html += `<button class="page-number dots">...</button>`;
        }
        
        // Show pages around current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            html += `<button class="page-number ${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        if (currentPage < totalPages - 2) {
            html += `<button class="page-number dots">...</button>`;
        }
        
        // Always show last page
        if (totalPages > 1) {
            html += `<button class="page-number ${currentPage === totalPages ? 'active' : ''}" data-page="${totalPages}">${totalPages}</button>`;
        }
        
        paginationNumbers.innerHTML = html;
        
        // Add event listeners to page numbers
        document.querySelectorAll('.page-number:not(.dots)').forEach(btn => {
            btn.addEventListener('click', function() {
                currentPage = parseInt(this.getAttribute('data-page'));
                renderPagination();
                loadProjects();
            });
        });
        
        // Update prev/next buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderPagination();
            loadProjects();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderPagination();
            loadProjects();
        }
    });
    
    renderPagination();
}

function setupSelectAll() {
    const selectAll = document.getElementById('select-all');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.project-checkbox');
            checkboxes.forEach(cb => cb.checked = this.checked);
        });
    }
}

function loadConversations() {
    const conversationsContainer = document.getElementById('conversations');
    if (!conversationsContainer) return;
    
    let html = '';
    conversationsData.forEach((conv, index) => {
        html += `
            <div class="conversation-item ${index === 0 ? 'active' : ''}" data-id="${conv.id}">
                <img src="${conv.avatar}" alt="${conv.name}" class="conversation-avatar">
                <div class="conversation-details">
                    <div class="conversation-name">${conv.name}</div>
                    <div class="conversation-preview">${conv.preview}</div>
                </div>
            </div>
        `;
    });
    
    conversationsContainer.innerHTML = html;
    
    // Add event listeners
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.conversation-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            loadMessages(this.getAttribute('data-id'));
        });
    });
    
    // Load first conversation messages
    if (conversationsData.length > 0) {
        loadMessages(conversationsData[0].id);
    }
}

function loadMessages(conversationId) {
    const messagesArea = document.getElementById('messages-area');
    if (!messagesArea) return;
    
    // Mock messages
    const messages = [
        { text: "Hey! How are you?", sent: false, time: "10:30 AM" },
        { text: "I'm good, thanks! Working on the new design.", sent: true, time: "10:32 AM" },
        { text: "That's great! Can't wait to see it.", sent: false, time: "10:35 AM" }
    ];
    
    let html = '';
    messages.forEach(msg => {
        html += `
            <div class="message ${msg.sent ? 'sent' : ''}">
                <img src="https://i.pravatar.cc/36?img=${msg.sent ? '1' : '11'}" class="message-avatar">
                <div class="message-bubble">
                    <div class="message-text">${msg.text}</div>
                    <div class="message-time">${msg.time}</div>
                </div>
            </div>
        `;
    });
    
    messagesArea.innerHTML = html;
}

function loadMeetings() {
    const meetingsList = document.getElementById('meetings-list');
    if (!meetingsList) return;
    
    let html = '';
    meetingsData.forEach(meeting => {
        html += `
            <div class="meeting-card">
                <div class="meeting-title">${meeting.title}</div>
                <div class="meeting-details">
                    <div class="meeting-detail">
                        <span>📅</span>
                        ${meeting.date}
                    </div>
                    <div class="meeting-detail">
                        <span>🕐</span>
                        ${meeting.time}
                    </div>
                </div>
                <div class="meeting-participants">
                    <div class="participant-avatars">
                        ${meeting.participants.map(avatar => 
                            `<img src="${avatar}" alt="Participant" class="participant-avatar">`
                        ).join('')}
                    </div>
                    <span class="meeting-detail">+${meeting.participantCount} participants</span>
                </div>
                <div class="meeting-actions">
                    <button class="meeting-btn primary">Join Meeting</button>
                    <button class="meeting-btn">View Details</button>
                </div>
            </div>
        `;
    });
    
    meetingsList.innerHTML = html;
}

