// Mock Data for Payment Escrow
const invoicesData = [
    {
        id: 1,
        invoiceNumber: "AB-01-12-3456",
        date: "04 Aug 2020",
        clientName: "Nichole Perkins",
        clientCompany: "Company",
        fee: 185,
        project: "UI/UX Design"
    },
    {
        id: 2,
        invoiceNumber: "AB-01-12-3456",
        date: "04 Aug 2020",
        clientName: "Nichole Perkins",
        clientCompany: "Company",
        fee: 185,
        project: "UI/UX Design"
    },
    {
        id: 3,
        invoiceNumber: "AB-01-12-3456",
        date: "04 Aug 2020",
        clientName: "Nichole Perkins",
        clientCompany: "Company",
        fee: 185,
        project: "UI/UX Design"
    }
];

const earningData = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    values: [3000, 4200, 3800, 5500, 4800, 6200, 5900, 6800, 7200, 6500, 7500, 7020]
};

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load user data
    loadUserData();
    
    // Load invoices
    loadInvoices();
    
    // Draw earning chart
    drawEarningChart();
    
    // Setup withdraw form
    setupWithdrawForm();
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
        const userNameEl = document.getElementById('user-name');
        if (userNameEl) {
            userNameEl.textContent = user.fullname || 'John Doe';
        }
    }
}

function loadInvoices() {
    const tbody = document.getElementById('invoice-tbody');
    if (!tbody) return;
    
    let html = '';
    invoicesData.forEach(invoice => {
        html += `
            <tr>
                <td>
                    <div class="invoice-number">
                        <span class="invoice-icon">📄</span>
                        ${invoice.invoiceNumber}
                    </div>
                </td>
                <td>${invoice.date}</td>
                <td>
                    <div class="client-info">
                        <div class="client-avatar"></div>
                        <div class="client-details">
                            <span class="client-name">${invoice.clientName}</span>
                            <span class="client-company">${invoice.clientCompany}</span>
                        </div>
                    </div>
                </td>
                <td class="fee-amount">$ ${invoice.fee}</td>
                <td><span class="project-badge">${invoice.project}</span></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

function drawEarningChart() {
    const canvas = document.getElementById('earningChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Find min and max values
    const maxValue = Math.max(...earningData.values);
    const minValue = Math.min(...earningData.values);
    const valueRange = maxValue - minValue;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate points
    const points = earningData.values.map((value, index) => {
        const x = padding + (chartWidth / (earningData.values.length - 1)) * index;
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
    
    // Draw month labels
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    earningData.labels.forEach((label, index) => {
        const x = padding + (chartWidth / (earningData.labels.length - 1)) * index;
        ctx.fillText(label, x, height - 5);
    });
}

function showWithdrawModal() {
    const modal = document.getElementById('withdraw-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeWithdrawModal() {
    const modal = document.getElementById('withdraw-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function setupWithdrawForm() {
    const form = document.getElementById('withdraw-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = document.getElementById('withdraw-amount').value;
        const method = document.getElementById('withdrawal-method').value;
        const accountDetails = document.getElementById('account-details').value;
        
        // Validate amount
        if (parseFloat(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        if (parseFloat(amount) > 5250.20) {
            alert('Insufficient balance');
            return;
        }
        
        // Process withdrawal
        alert(`Withdrawal request submitted!\nAmount: $${amount}\nMethod: ${method}\nAccount: ${accountDetails}\n\nYour withdrawal will be processed within 1-3 business days.`);
        
        // Close modal and reset form
        closeWithdrawModal();
        form.reset();
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('withdraw-modal');
    if (event.target === modal) {
        closeWithdrawModal();
    }
});

