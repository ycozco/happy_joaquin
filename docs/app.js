document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('gift-box');
    const landing = document.getElementById('landing');
    const messageContent = document.getElementById('message-content');
    const restartBtn = document.getElementById('restart');
    const bg = document.getElementById('particles-js');

    // Simple particle system
    function createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 2;
        const duration = Math.random() * 5 + 5;

        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'rgba(201, 168, 106, 0.4)';
        particle.style.borderRadius = '50%';
        particle.style.top = '-10px';
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.zIndex = '1';
        particle.style.boxShadow = '0 0 10px rgba(201, 168, 106, 0.2)';

        bg.appendChild(particle);

        const animation = particle.animate([
            { transform: 'translateY(0) translateX(0)', opacity: 0 },
            { transform: `translateY(110vh) translateX(${Math.random() * 50 - 25}px)`, opacity: 0.8 },
            { transform: `translateY(110vh) translateX(${Math.random() * 100 - 50}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });

        animation.onfinish = () => particle.remove();
    }

    setInterval(createParticle, 200);

    // Gift Box Interaction
    giftBox.addEventListener('click', () => {
        // Confetti burst
        for (let i = 0; i < 50; i++) {
            setTimeout(createConfetti, i * 10);
        }

        // Animation sequence
        giftBox.style.animation = 'none';
        giftBox.style.transform = 'scale(1.2)';
        giftBox.style.opacity = '0';
        giftBox.style.transition = 'all 0.5s ease-out';

        setTimeout(() => {
            landing.classList.add('hidden');
            setTimeout(() => {
                landing.style.display = 'none';
                messageContent.style.display = 'block';
                setTimeout(() => {
                    messageContent.classList.add('active');
                }, 100);
            }, 500);
        }, 300);
    });

    restartBtn.addEventListener('click', () => {
        messageContent.classList.remove('active');
        setTimeout(() => {
            messageContent.style.display = 'none';
            landing.style.display = 'block';
            setTimeout(() => {
                landing.classList.remove('hidden');
                giftBox.style.opacity = '1';
                giftBox.style.transform = 'scale(1)';
                giftBox.style.animation = 'bounce 2s infinite ease-in-out';
            }, 100);
        }, 500);
    });

    function createConfetti() {
        const confetti = document.createElement('div');
        const colors = ['#c9a86a', '#f1e1c2', '#fff'];
        const size = Math.random() * 8 + 4;

        confetti.style.position = 'absolute';
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.zIndex = '100';
        confetti.style.borderRadius = '2px';

        landing.appendChild(confetti);

        const velocityX = (Math.random() - 0.5) * 1500;
        const velocityY = (Math.random() - 1) * 1000;

        confetti.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${velocityX}px, ${velocityY}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => confetti.remove();
    }
});
