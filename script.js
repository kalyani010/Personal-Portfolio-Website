document.addEventListener('DOMContentLoaded', function() {
    // Animated typing effect in hero
    const animatedText = document.getElementById('animatedText');
    const phrases = [
        "Web Developer & Designer",
        "HTML, CSS, JavaScript Enthusiast",
        "UI/UX Explorer",
        "Let's build something amazing!"
    ];
    let phraseIndex = 0, charIndex = 0, typing = true;

    function typeLoop() {
        let phrase = phrases[phraseIndex];
        if (typing) {
            animatedText.textContent = phrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === phrase.length) {
                typing = false;
                setTimeout(typeLoop, 1200); // pause at end
                return;
            }
            setTimeout(typeLoop, 80);
        } else {
            animatedText.textContent = phrase.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                typing = true;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeLoop, 400);
                return;
            }
            setTimeout(typeLoop, 30);
        }
    }
    typeLoop();

    // Smooth scroll for nav links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Skills bar animation
    function animateSkills() {
        document.querySelectorAll('.progress').forEach(bar => {
            const value = bar.getAttribute('data-value');
            bar.style.width = value + "%";
        });
    }
    animateSkills();

    // Dark mode toggle
    const darkModeBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    let darkMode = localStorage.getItem('darkMode') === 'true';

    function setDarkMode(on) {
        body.classList.toggle('dark-mode', on);
        darkModeBtn.textContent = on ? "☀️" : "🌙";
        localStorage.setItem('darkMode', on);
    }
    setDarkMode(darkMode);

    darkModeBtn.addEventListener('click', () => {
        darkMode = !darkMode;
        setDarkMode(darkMode);
    });

    // Contact form validation and feedback
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        // Simple validation
        if (!name || !email || !message) {
            formMessage.style.color = "red";
            formMessage.textContent = "Please fill out all fields.";
            return;
        }

        // Email validation
        if (!validateEmail(email)) {
            formMessage.style.color = "red";
            formMessage.textContent = "Please enter a valid email address.";
            return;
        }

        // Success feedback
        formMessage.style.color = "green";
        formMessage.textContent = "Thank you for contacting me, " + name + "!";

        // Reset form
        form.reset();
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Gallery image click for popup
    document.querySelectorAll('.gallery-grid img').forEach(img => {
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.className = 'img-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = 'rgba(40,0,60,0.80)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = 1000;

            const bigImg = document.createElement('img');
            bigImg.src = img.src;
            bigImg.style.maxWidth = '90vw';
            bigImg.style.maxHeight = '90vh';
            bigImg.style.borderRadius = '12px';
            bigImg.style.boxShadow = '0 2px 24px rgba(0,0,0,0.5)';

            overlay.appendChild(bigImg);
            document.body.appendChild(overlay);

            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    });

    // Project modal popup for details
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.project').forEach(project => {
        project.addEventListener('click', function() {
            modalTitle.textContent = project.getAttribute('data-title');
            modalDesc.textContent = project.getAttribute('data-desc');
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});