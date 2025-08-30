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
        const taglineEl = document.getElementById('tagline');
        const tagline = "CSE Student & Aspiring Machine Learning Engineer";
        let i = 0;
        function typeWriter() {
            if (i < tagline.length) {
                taglineEl.innerHTML += tagline.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();

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