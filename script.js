// ===== FORCE SCROLL TO TOP ON PAGE LOAD/REFRESH =====
// This must be at the very top before any other code
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Immediately scroll to top
window.scrollTo(0, 0);

// Force scroll to top on page load
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Override any hash navigation on load
if (window.location.hash) {
    // Remove the hash without refreshing
    history.replaceState(null, null, ' ');
}

// Ensure page starts at top after DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
});

// Final check on window load
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 0);
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===== STICKY HEADER =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== ACTIVE NAVIGATION =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (name.length < 3) {
            alert('❌ Nama harus minimal 3 karakter');
            document.getElementById('name').focus();
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('❌ Format email tidak valid\nContoh: nama@email.com');
            document.getElementById('email').focus();
            return false;
        }
        
        const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
        if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
            alert('❌ Format nomor WhatsApp tidak valid\nContoh: 0813-7641-2663 atau +6281376412663');
            document.getElementById('phone').focus();
            return false;
        }
        
        if (message.length < 10) {
            alert('❌ Pesan harus minimal 10 karakter');
            document.getElementById('message').focus();
            return false;
        }
        
        // If validation passes, continue with WhatsApp
        const formData = {
            name: name,
            email: email,
            phone: phone,
            message: message
        };
        
        // Create WhatsApp message
        const whatsappMessage = `*Pesan Baru dari Website*%0A%0A` +
            `*Nama:* ${formData.name}%0A` +
            `*Email:* ${formData.email}%0A` +
            `*No. WA:* ${formData.phone}%0A` +
            `*Pesan:*%0A${formData.message}`;
        
        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/6281376412663?text=${whatsappMessage}`, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('✅ Terima kasih! Anda akan diarahkan ke WhatsApp untuk melanjutkan percakapan.');
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .program-card, .mentor-card, .testimonial-card, .blog-card').forEach(el => {
    observer.observe(el);
});

// ===== UPDATE CURRENT DATE =====
const updateDate = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = `${dayName}, ${day} ${month} ${year}`;
    }
};

// Update date on load
updateDate();

console.log('Sieger Lingua International - Website loaded successfully! 🎓');


// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 1);
    } else {
        counter.innerText = target;
    }
};

// Trigger counter animation when in viewport
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (counter.innerText === '0') {
                animateCounter(counter);
            }
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-bg-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
    }
});

// ===== HERO ANIMATION ON LOAD =====
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.animate-slide-up, .animate-fade-in');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationPlayState = 'running';
        }, index * 100);
    });
});

// ===== SMOOTH REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.feature-card, .program-card, .blog-card, .mentor-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(el);
});

// ===== INTERACTIVE STAT CARDS =====
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== ADD LOADING ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});


// ===== ENHANCED FAQ WITH CATEGORIES =====
const faqCategoryBtns = document.querySelectorAll('.faq-category-btn');
const faqItemsEnhanced = document.querySelectorAll('.faq-item-enhanced');

// FAQ Category Filtering
faqCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        
        // Update active button
        faqCategoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter FAQ items
        faqItemsEnhanced.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Enhanced FAQ Accordion
faqItemsEnhanced.forEach(item => {
    const question = item.querySelector('.faq-question-enhanced');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItemsEnhanced.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== ANIMATED STATISTICS COUNTER =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateStatCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.getAttribute('data-suffix') || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.getAttribute('data-suffix') || '');
        }
    };
    
    updateCounter();
};

// Observe stat items
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('counted')) {
                statNumber.classList.add('counted');
                animateStatCounter(statNumber);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// ===== PROGRESS BAR ANIMATION =====
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const percentage = progressBar.getAttribute('data-percentage');
            
            setTimeout(() => {
                progressBar.style.width = percentage + '%';
            }, 200);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    skillObserver.observe(item);
});

// ===== TESTIMONIAL CAROUSEL =====
const testimonialTrack = document.querySelector('.testimonial-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (testimonialTrack && prevBtn && nextBtn) {
    const cardWidth = 380; // Card width + gap
    
    prevBtn.addEventListener('click', () => {
        testimonialTrack.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        testimonialTrack.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    });
    
    // Auto-scroll (optional)
    let autoScrollInterval;
    
    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            if (testimonialTrack.scrollLeft + testimonialTrack.clientWidth >= testimonialTrack.scrollWidth - 10) {
                testimonialTrack.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                testimonialTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }, 5000);
    };
    
    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };
    
    // Start auto-scroll
    startAutoScroll();
    
    // Stop on user interaction
    testimonialTrack.addEventListener('mouseenter', stopAutoScroll);
    testimonialTrack.addEventListener('mouseleave', startAutoScroll);
    prevBtn.addEventListener('click', stopAutoScroll);
    nextBtn.addEventListener('click', stopAutoScroll);
}

// ===== COMPARISON TABLE HIGHLIGHT =====
const comparisonRows = document.querySelectorAll('.comparison-table tbody tr');

comparisonRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(221, 0, 0, 0.05)';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
    });
});

// ===== TIMELINE ANIMATION =====
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    timelineObserver.observe(item);
});

// ===== INTERACTIVE FEATURE CARDS =====
const featureCardsInteractive = document.querySelectorAll('.feature-card.interactive');

featureCardsInteractive.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const number = this.querySelector('.feature-number');
        if (number) {
            number.style.color = 'rgba(221, 0, 0, 0.15)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const number = this.querySelector('.feature-number');
        if (number) {
            number.style.color = 'rgba(221, 0, 0, 0.08)';
        }
    });
});

// ===== LAZY LOADING IMAGES =====
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== SCROLL PROGRESS INDICATOR =====
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #DD0000, #FFCE00);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ===== ACHIEVEMENT SECTION ANIMATION =====
const achievementStats = document.querySelectorAll('.achievement-stat h3');

const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const isPercentage = finalValue.includes('%');
            const numericValue = parseInt(finalValue);
            
            if (!isNaN(numericValue)) {
                let current = 0;
                const increment = numericValue / 50;
                
                const updateValue = () => {
                    current += increment;
                    if (current < numericValue) {
                        target.textContent = Math.floor(current) + (isPercentage ? '%' : '');
                        requestAnimationFrame(updateValue);
                    } else {
                        target.textContent = finalValue;
                    }
                };
                
                updateValue();
            }
            
            achievementObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

achievementStats.forEach(stat => {
    achievementObserver.observe(stat);
});

// ===== FEATURE HIGHLIGHT ITEMS ANIMATION =====
const featureHighlights = document.querySelectorAll('.feature-highlight-item');

const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
            highlightObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

featureHighlights.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    highlightObserver.observe(item);
});

// ===== COPY TO CLIPBOARD (For sharing) =====
const copyToClipboard = (text) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Link berhasil disalin!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link berhasil disalin!');
    }
};

// ===== NOTIFICATION SYSTEM =====
const showNotification = (message, duration = 3000) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #16a34a;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideInUp 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
};

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATION: DEBOUNCE SCROLL =====
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== ACCESSIBILITY: KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
    
    // Tab key navigation for FAQ
    if (e.key === 'Enter' && e.target.classList.contains('faq-question-enhanced')) {
        e.target.click();
    }
});

// ===== LOG INITIALIZATION =====
console.log('✅ Enhanced Interactive Features Loaded:');
console.log('- FAQ Categories & Accordion');
console.log('- Animated Statistics Counter');
console.log('- Progress Bars');
console.log('- Testimonial Carousel');
console.log('- Timeline Animations');
console.log('- Scroll Progress Indicator');
console.log('- Notification System');
console.log('🚀 Sieger Lingua International - Ready!');

