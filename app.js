// Kinexys Operations Portal - JavaScript

// Tab Functionality
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabGroup = this.closest('.tabs-container');
      const tabId = this.dataset.tab;
      
      // Remove active from all tabs in this group
      tabGroup.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Activate clicked tab
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Search Functionality
function initSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const tableId = this.dataset.table;
      const table = document.getElementById(tableId);
      
      if (table) {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
      }
    });
  });
}

// Step Wizard Functionality
let currentStep = 1;

function setStep(step) {
  currentStep = step;
  updateStepUI();
}

function nextStep() {
  if (currentStep < 3) {
    currentStep++;
    updateStepUI();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepUI();
  }
}

function updateStepUI() {
  // Update step indicators
  document.querySelectorAll('.step').forEach((el, index) => {
    const stepNum = index + 1;
    el.classList.remove('active', 'completed');
    if (stepNum === currentStep) {
      el.classList.add('active');
    } else if (stepNum < currentStep) {
      el.classList.add('completed');
    }
  });
  
  // Update step lines
  document.querySelectorAll('.step-line').forEach((el, index) => {
    const stepNum = index + 1;
    el.classList.toggle('completed', stepNum < currentStep);
  });
  
  // Update step content
  document.querySelectorAll('.step-content').forEach((el, index) => {
    el.style.display = (index + 1 === currentStep) ? 'block' : 'none';
  });
}

// Notification Actions
function markAsRead(id) {
  const notification = document.querySelector(`[data-notification-id="${id}"]`);
  if (notification) {
    notification.classList.remove('unread');
    updateNotificationCount();
  }
}

function dismissNotification(id) {
  const notification = document.querySelector(`[data-notification-id="${id}"]`);
  if (notification) {
    notification.remove();
    updateNotificationCount();
  }
}

function markAllAsRead() {
  document.querySelectorAll('.notification-item.unread').forEach(el => {
    el.classList.remove('unread');
  });
  updateNotificationCount();
}

function updateNotificationCount() {
  const count = document.querySelectorAll('.notification-item.unread').length;
  const badge = document.querySelector('.notification-badge .badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Category Filter
function filterByCategory(category) {
  const cards = document.querySelectorAll('.report-card');
  const badges = document.querySelectorAll('.category-filter');
  
  badges.forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Format Currency (Indian format)
function formatCurrency(amount, currency = 'INR') {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Row Click Handler
function handleRowClick(type, id) {
  console.log(`Viewing ${type}:`, id);
  // In a real app, this would open a detail drawer/modal
  alert(`Opening details for ${type}: ${id}`);
}

// Chart Animation (simple bars)
function animateChart() {
  const bars = document.querySelectorAll('.chart-bar');
  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.height = bar.dataset.height + 'px';
    }, index * 100);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initTabs();
  initSearch();
  updateStepUI();
  updateNotificationCount();
  
  // Animate chart if present
  setTimeout(animateChart, 500);
  
  // Add current page indicator
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('href').includes(currentPage) || 
        (currentPage === '' && item.getAttribute('href').includes('index'))) {
      item.classList.add('active');
    }
  });
});

// Utility: Get current time for "last updated"
function getLastUpdated() {
  return new Date().toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}
