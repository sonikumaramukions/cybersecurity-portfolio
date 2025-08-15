// ===== ENHANCED TYPING EFFECT =====
(function(){
  const el = document.querySelector('.typing');
  if(!el) return;
  const text = el.getAttribute('data-text') || '';
  let i = 0;
  let isDeleting = false;
  let currentText = '';
  
  function typeWriter() {
    if (isDeleting) {
      currentText = text.substring(0, currentText.length - 1);
    } else {
      currentText = text.substring(0, i + 1);
    }
    
    el.textContent = currentText;
    
    let typeSpeed = 100;
    
    if (isDeleting) {
      typeSpeed /= 2;
    }
    
    if (!isDeleting && currentText === text) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && currentText === '') {
      isDeleting = false;
      i = 0;
      typeSpeed = 500; // Pause before restart
    } else {
      if (!isDeleting) i++;
    }
    
    setTimeout(typeWriter, typeSpeed);
  }
  
  typeWriter();
})();

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== UPDATE FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== ENHANCED PROJECT DATA =====
const projects = [

  { 
    title: "codealpha_network_packet_sniffer",
    desc: "This is a basic network packet sniffer built using Python and Scapy. It captures and displays live network traffic, including IP, TCP, UDP, and ICMP packet details.",
    stack: "Python · Scapy · Network Analysis",
    link: "https://github.com/sonikumaramukions/codealpha_Tasks_network_packet_sniffer",
    category: "cybersecurity",
    featured: true
  },
  { 
    title: "CodeAlpha – Secure Coding Review (Task 3)",
    desc: "Initially, I developed and tested the vulnerable Python application in the terminal. Later, with the help of ChatGPT, I converted the script into a live Flask web application to simulate and demonstrate vulnerabilities like SQL Injection in a real browser environment.",
    stack: "Python · flask(for web anaylisis) · Manual vulnerability testing",
    link: "https://github.com/sonikumaramukions/codealpha_Task_vulnerable_app",
    category: "cybersecurity",
    featured: true
  },
  { 
    title: "Text Detection in Images using Python", 
    desc: "Advanced text detection and extraction from images using Tesseract OCR and OpenCV. This cybersecurity tool can be used for analyzing images in security investigations and extracting text from screenshots or documents.", 
    stack: "Python · OpenCV · Tesseract OCR · Computer Vision", 
    link: "https://github.com/sonikumaramukions/Text_detection_in_image_using_python",
    category: "AI/ML",
    featured: true
  },
  { 
    title: "Shopkatha – Lending Management System", 
    desc: "Developed a web application for shopkeepers to manage customer lending records with Aadhaar verification, WhatsApp contact integration, and lending history tracking.", 
    stack: "PHP · MySQL · HTML · CSS", 
    link: "https://github.com/sonikumaramukions/Shopkeeper_management_system-Shopkatha",
    category: "web",
    featured: false
  },
  { 
    title: "BlockVault – Blockchain Document Storage System", 
    desc: "Decentralized file management system that stores documents in IPFS and metadata in Ethereum smart contracts. Integrated MetaMask for user authentication and Ganache for testing.", 
    stack: "Solidity · JavaScript · IPFS", 
    link: "https://github.com/sonikumaramukions/IPFS_with_Solidity",
    category: "blockchain",
    featured: true
  },
  { 
    title: "Speech Recognition and Transcription Tool", 
    desc: "Python tool to convert live speech to text using speech recognition and AI-based audio parsing. Useful for security monitoring and audio analysis in cybersecurity investigations.", 
    stack: "Python · SpeechRecognition", 
    link: "https://github.com/sonikumaramukions/Speechtotext",
    category: "web",
    featured: false
  },
  { 
    title: "Student Performance Lookup System", 
    desc: "Database management project with 6 SQL tables linked through PHP. Demonstrates secure data handling and database security practices.", 
    stack: "PHP · MySQL · HTML · CSS · XAMPP", 
    link: "https://github.com/sonikumaramukions/DBMS_PROJECT_STUDENT_PERFORMANCE_LOOKUP_PROJECT",
    category: "web",
    featured: false
  }
  
];

// ===== PROJECT FILTERING SYSTEM =====
function createProjectFilters() {
  const filterContainer = document.createElement('div');
  filterContainer.className = 'project-filters';
  filterContainer.innerHTML = `
    <div class="filter-buttons">
      <button class="filter-btn active" data-filter="all">All Projects</button>
      <button class="filter-btn" data-filter="cybersecurity">Cybersecurity</button>
      <button class="filter-btn" data-filter="web">Web Development</button>
      <button class="filter-btn" data-filter="ai-ml">AI/ML</button>
      <button class="filter-btn" data-filter="blockchain">Blockchain</button>
    </div>
  `;
  
  const projectSection = document.getElementById('projects');
  const projectGrid = document.getElementById('project-grid');
  projectSection.insertBefore(filterContainer, projectGrid);
  
  // Add filter functionality
  const filterBtns = filterContainer.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      filterProjects(filter);
    });
  });
}

function filterProjects(category) {
  const projectCards = document.querySelectorAll('.card');
  projectCards.forEach(card => {
    const projectData = card.dataset;
    let shouldShow = false;
    
    if (category === 'all') {
      shouldShow = true;
    } else if (category === 'ai-ml' && projectData.category === 'AI/ML') {
      shouldShow = true;
    } else if (projectData.category === category) {
      shouldShow = true;
    }
    
    if (shouldShow) {
      card.style.display = 'block';
      card.style.animation = 'fadeIn 0.5s ease-in';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===== ENHANCED PROJECT RENDERING =====
function renderProjects() {
  const grid = document.getElementById('project-grid');
  if (grid) {
    projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.category = p.category;
      card.dataset.featured = p.featured;
      
      const featuredBadge = p.featured ? '<span class="featured-badge">⭐ Featured</span>' : '';
      
      card.innerHTML = `
        ${featuredBadge}
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <p class="stack">${p.stack}</p>
        <p><a href="${p.link}" target="_blank" rel="noreferrer">GitHub / Demo →</a></p>
      `;
      grid.appendChild(card);
    });
  }
}

// ===== SKILL ANIMATIONS =====
function animateSkills() {
  const skillCards = document.querySelectorAll('.skill-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInUp 0.6s ease-out';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  skillCards.forEach(card => observer.observe(card));
}

// ===== NAVIGATION HIGHLIGHTING =====
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav .links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ===== THEME TOGGLE (FOR FUTURE USE) =====
function initThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '🌙';
  themeToggle.title = 'Toggle theme';
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
  });
  
  const nav = document.querySelector('.nav-inner');
  nav.appendChild(themeToggle);
}

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend integration)
    setTimeout(() => {
      // Reset form
      form.reset();
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Show success message
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      
      // Log form data (for development - remove in production)
      console.log('Contact Form Submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });
      
    }, 2000);
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
      <span class="notification-message">${message}</span>
      <button class="notification-close">×</button>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    hideNotification(notification);
  }, 5000);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    hideNotification(notification);
  });
}

function hideNotification(notification) {
  notification.classList.remove('show');
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 300);
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
  renderProjects();
  createProjectFilters();
  animateSkills();
  highlightActiveSection();
  initContactForm();
  // initThemeToggle(); // Uncomment when you want to add theme toggle
});

// ===== ADD CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .project-filters {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .filter-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .filter-btn {
    background: var(--panel);
    border: 1px solid var(--line);
    color: var(--fg);
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }
  
  .filter-btn:hover,
  .filter-btn.active {
    background: var(--glow1);
    color: var(--bg);
    border-color: var(--glow1);
  }
  
  .featured-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: linear-gradient(90deg, var(--glow1), var(--glow2));
    color: var(--bg);
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .card {
    position: relative;
  }
  
  .nav .links a.active {
    color: var(--glow1);
    text-decoration: underline;
  }
  
  .theme-toggle {
    background: none;
    border: 1px solid var(--line);
    color: var(--fg);
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2rem;
  }
  
  .theme-toggle:hover {
    background: var(--panel);
    border-color: var(--glow1);
  }
  
  /* Notification styles */
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 350px;
  }
  
  .notification.show {
    transform: translateX(0);
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .notification-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  .notification-message {
    flex: 1;
    color: var(--fg);
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
  }
  
  .notification-close:hover {
    color: var(--fg);
  }
  
  .notification-success {
    border-left: 4px solid var(--accent);
  }
  
  .notification-error {
    border-left: 4px solid #ff5f56;
  }
  
  .notification-info {
    border-left: 4px solid var(--glow1);
  }
  
  @media (max-width: 768px) {
    .notification {
      right: 10px;
      left: 10px;
      max-width: none;
      transform: translateY(-100px);
    }
    
    .notification.show {
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
