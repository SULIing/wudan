// Preloader Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        mobileMenu.classList.add('hidden');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission Handler (Cloudflare Functions Simulation)
const form = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.innerHTML;
    
    // Change button state
    btn.innerHTML = 'UPLOADING...';
    btn.disabled = true;
    btn.style.borderColor = 'var(--cp-yellow)';

    // Simulate API Payload
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            statusDiv.textContent = 'TRANSMISSION SUCCESSFUL';
            statusDiv.className = 'text-xs font-code text-cp-yellow block';
            form.reset();
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        statusDiv.textContent = 'ERROR: CONNECTION FAILED';
        statusDiv.className = 'text-xs font-code text-cp-red block';
    } finally {
        // Reset button after 2 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.borderColor = '';
            statusDiv.className = 'text-xs font-code hidden';
        }, 3000);
    }
});

// Glitch Effect Randomizer (Optional Enhancement)
const glitchElements = document.querySelectorAll('.glitch');
setInterval(() => {
    glitchElements.forEach(el => {
        if(Math.random() > 0.95) {
            el.style.transform = `translate(${Math.random()*2 - 1}px, ${Math.random()*2 - 1}px)`;
            setTimeout(() => el.style.transform = 'translate(0,0)', 100);
        }
    });
}, 2000);