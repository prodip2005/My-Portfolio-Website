document.addEventListener('DOMContentLoaded', function() {
        // Scroll fade-in effect
        const sections = document.querySelectorAll('.fade-in-section');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });
        sections.forEach(section => observer.observe(section));

        // Typing effect
       // Typing effect (Updated for multiple taglines)
const taglineEl = document.getElementById('tagline');
// যে ট্যাগলাইনগুলো আপনি দেখাতে চান, সেগুলোর একটি অ্যারে তৈরি করুন
const taglines = [
    "CSE Student & Aspiring Machine Learning Engineer",
    "I Build Modern Web Applications with React & Tailwind",
    "Problem Solver & Competitive Programmer",
    "Exploring the World of Machine Learning"
];

let taglineIndex = 0;
let charIndex = 0;
const typingSpeed = 75; // অক্ষরের টাইপিং গতি (মিলিসেকেন্ডে)
const erasingSpeed = 50; // অক্ষরের মোছার গতি (মিলিসেকেন্ডে)
const delayBeforeNext = 1500; // পরবর্তী ট্যাগলাইন দেখানোর আগে অপেক্ষা (মিলিসেকেন্ডে)

function type() {
    // বর্তমান ট্যাগলাইনটি
    const currentTagline = taglines[taglineIndex];

    if (charIndex < currentTagline.length) {
        // টাইপ করা
        taglineEl.innerHTML += currentTagline.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        // পুরোটা টাইপ করার পর, মোছা শুরু করতে অপেক্ষা করা
        setTimeout(erase, delayBeforeNext);
    }
}

function erase() {
    const currentTagline = taglines[taglineIndex];

    if (charIndex > 0) {
        // মোছা
        taglineEl.innerHTML = currentTagline.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        // মোছা শেষ হলে, পরের ট্যাগলাইনটিতে যাওয়া
        taglineIndex = (taglineIndex + 1) % taglines.length;
        setTimeout(type, 500); // নতুন ট্যাগলাইন টাইপ শুরু করতে ছোট বিরতি
    }
}

// ফাংশনটি শুরু করা
setTimeout(type, 1000); // পেজ লোড হওয়ার পর 1 সেকেন্ড অপেক্ষা করে শুরু হবে

        // Tilt effect
        const tiltElements = document.querySelectorAll('.tilt-effect');
        tiltElements.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                card.style.boxShadow = `0 0 20px #67e8f9, 0 0 30px #06b6d4`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.boxShadow = '0 0 10px #67e8f9, 0 0 20px #06b6d4';
            });
        });

        // Particle effect
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particles = [];

        class Particle {
            constructor(x, y, size, color, speedX, speedY) {
                this.x = x; this.y = y; this.size = size; this.color = color;
                this.speedX = speedX; this.speedY = speedY;
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
                this.x += this.speedX; this.y += this.speedY;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = Math.random() * (innerWidth - size * 2) + size;
                let y = Math.random() * (innerHeight - size * 2) + size;
                let speedX = (Math.random() * 0.4) - 0.2;
                let speedY = (Math.random() * 0.4) - 0.2;
                let color = 'rgba(103, 232, 249, 0.5)';
                particles.push(new Particle(x, y, size, color, speedX, speedY));
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });
});
    


// Parallax 3D Card Effect (Replaces Tilt Effect)
const cards = document.querySelectorAll('.parallax-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // মাউস পজিশন x
        const y = e.clientY - rect.top;  // মাউস পজিশন y
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // মাউসের অবস্থান থেকে রোটেট মান হিসাব করা
        // মানগুলি সামান্য (যেমন 5 বা 10 ডিগ্রি) রাখা ভালো
        const rotateX = (centerY - y) / 10; 
        const rotateY = (x - centerX) / 10;
        
        // CSS transform প্রয়োগ
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // মাউস ঘোরানোর সাথে শ্যাডো ইফেক্ট পরিবর্তন (আরও গভীরতা বোঝাতে)
        card.style.boxShadow = `0 ${15 - rotateX/2}px ${35 + Math.abs(rotateX)}px rgba(0, 0, 0, 0.7)`;
    });

    card.addEventListener('mouseleave', () => {
        // মাউস চলে গেলে কার্ডটি স্বাভাবিক অবস্থায় ফিরে যাবে
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    });
});