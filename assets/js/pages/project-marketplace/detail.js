// Project Detail Data
const projectDetailData = {
    id: 1,
    company: "Canva",
    title: "Junior UI/UX Designer",
    tool: "Figma",
    duration: "1 Week",
    type: "Remote",
    salary: "$800",
    jobType: "Project Based",
    applied: 5,
    capacity: 10,
    applyBefore: "December 05, 2025",
    jobPosted: "November 25, 2025",
    categories: ["Marketing", "Design"],
    skills: [
        "User Interface Design",
        "Prototyping",
        "Figma",
        "User Experience Basics",
        "Design Systems"
    ],
    description: `You will collaborate with the design team to complete a full landing page redesign for our upcoming holiday campaign. The project involves updating the visual layout, improving the user flow, and creating a more modern and engaging user interface.

You will work closely with a senior designer who will provide guidance throughout the process. The primary tasks include creating wireframes, designing high-fidelity UI components, preparing responsive layouts, and building an interactive prototype that will be used for internal reviews and stakeholder presentations.

This role is suitable for junior designers who want hands-on experience working with real project requirements, design systems, and collaborative workflows.`,
    requirements: [
        "Basic understanding of UI/UX principles and layout structure.",
        "Ability to create wireframes and high-fidelity designs using Figma.",
        "Able to build simple interactive prototypes.",
        "Good attention to detail and consistency.",
        "Willing to collaborate and receive design feedback."
    ]
};

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadProjectDetail();
});

function checkAuth() {
    const userEmail = sessionStorage.getItem('loggedInUser');
    if (!userEmail) {
        window.location.href = '../auth/login.html';
        return;
    }
}

function loadProjectDetail() {
    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    // In real app, fetch from API based on ID
    // For now, use mock data
    const project = projectDetailData;
    
    // Update Company Logo
    document.getElementById('company-logo-text').textContent = project.company;
    
    // Update Job Info
    document.getElementById('job-title').textContent = project.title;
    document.getElementById('job-tool').textContent = project.tool;
    document.getElementById('job-duration').textContent = project.duration;
    document.getElementById('job-type').textContent = project.type;
    
    // Update Description
    const descriptionContent = document.getElementById('description-content');
    descriptionContent.innerHTML = project.description.split('\n\n').map(p => `<p>${p}</p>`).join('');
    
    // Update Requirements
    const requirementList = document.getElementById('requirement-list');
    let requirementsHtml = '';
    project.requirements.forEach(req => {
        requirementsHtml += `
            <li class="requirement-item">
                <span class="check-icon">✓</span>
                <span class="requirement-text">${req}</span>
            </li>
        `;
    });
    requirementList.innerHTML = requirementsHtml;
    
    // Update About This Role
    document.getElementById('applied-count').textContent = project.applied;
    document.getElementById('capacity-count').textContent = project.capacity;
    const progress = (project.applied / project.capacity) * 100;
    document.getElementById('application-progress').style.width = progress + '%';
    document.getElementById('apply-before').textContent = project.applyBefore;
    document.getElementById('job-posted').textContent = project.jobPosted;
    document.getElementById('job-type-detail').textContent = project.jobType;
    document.getElementById('job-salary').textContent = project.salary;
    
    // Update Categories
    const categoriesContainer = document.getElementById('categories-container');
    let categoriesHtml = '';
    project.categories.forEach(cat => {
        categoriesHtml += `<span class="tag category">${cat}</span>`;
    });
    categoriesContainer.innerHTML = categoriesHtml;
    
    // Update Required Skills
    const skillsContainer = document.getElementById('skills-container');
    let skillsHtml = '';
    project.skills.forEach(skill => {
        skillsHtml += `<span class="tag skill">${skill}</span>`;
    });
    skillsContainer.innerHTML = skillsHtml;
}

function applyToProject() {
    if (confirm('Are you sure you want to apply for this project?')) {
        // In real app, send application to backend
        alert('Application submitted successfully! The client will review your application.');
        
        // Update applied count
        const appliedCount = parseInt(document.getElementById('applied-count').textContent);
        const capacity = parseInt(document.getElementById('capacity-count').textContent);
        
        if (appliedCount < capacity) {
            document.getElementById('applied-count').textContent = appliedCount + 1;
            const newProgress = ((appliedCount + 1) / capacity) * 100;
            document.getElementById('application-progress').style.width = newProgress + '%';
        }
    }
}

