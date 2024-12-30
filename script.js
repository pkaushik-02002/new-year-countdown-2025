// Burger Menu Functionality
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        nav.classList.add('active');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        nav.classList.remove('active');
        menuOpen = false;
    }
});

// Countdown Timer
const countdownDate = new Date('December 31, 2024 23:59:59').getTime();
const countdownElements = {
    days: document.querySelector('.days'),
    hours: document.querySelector('.hours'),
    minutes: document.querySelector('.minutes'),
    seconds: document.querySelector('.seconds')
};

// Fireworks Setup
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: Math.random() * -8
        };
        this.gravity = 0.2;
        this.life = 100;
        this.alpha = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
    }

    update() {
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
        this.life--;
    }
}

let particles = [];
let fireworksInterval;

function createFirework(x, y) {
    const colors = [
        '255, 0, 0',
        '0, 255, 0',
        '0, 0, 255',
        '255, 255, 0',
        '255, 0, 255',
        '0, 255, 255'
    ];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(particle => {
        particle.update();
        particle.draw();
        return particle.life > 0 && particle.alpha > 0;
    });

    requestAnimationFrame(animateFireworks);
}

// Start fireworks animation
function startCelebration() {
    document.querySelector('.countdown-wrapper').style.display = 'none';
    document.querySelector('.celebration').style.display = 'block';
    
    // Start fireworks
    animateFireworks();
    fireworksInterval = setInterval(() => {
        createFirework(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.5
        );
    }, 500);

    // Start confetti
    const confettiSettings = {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    };

    const confettiInterval = setInterval(() => {
        confetti(confettiSettings);
    }, 1000);

    // Stop celebrations after 10 seconds
    setTimeout(() => {
        clearInterval(fireworksInterval);
        clearInterval(confettiInterval);
    }, 10000);
}

// Update countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElements.days.textContent = days.toString().padStart(2, '0');
    countdownElements.hours.textContent = hours.toString().padStart(2, '0');
    countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
    countdownElements.seconds.textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        startCelebration();
    }
}

// Initialize countdown
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});