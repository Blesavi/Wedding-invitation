document.addEventListener("DOMContentLoaded", function () {
    // Timer code
    const timerElement = document.getElementById("timer");

    function updateCountdown() {
        const weddingDate = new Date("2025-07-12T17:00:00");
        const now = new Date();
        const timeDifference = weddingDate - now;

        if (timeDifference <= 0) {
            timerElement.innerHTML = "00 : 00 : 00 : 00";
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        timerElement.innerHTML = `
            ${String(days).padStart(2, "0")} : 
            ${String(hours).padStart(2, "0")} : 
            ${String(minutes).padStart(2, "0")} : 
            ${String(seconds).padStart(2, "0")}
        `;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Floating flowers animation
    const floatingFlowers = document.getElementById('floatingFlowers');
    const flowerImages = [
        'assets/belocvece.png',
        'assets/bohocvece1.png'
    ];

    for (let i = 0; i < 15; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.backgroundImage = `url('${flowerImages[i % flowerImages.length]}')`;
        flower.style.width = `${Math.random() * 50 + 30}px`;
        flower.style.height = flower.style.width;
        flower.style.left = `${Math.random() * 100}%`;
        flower.style.top = `${Math.random() * 100}%`;
        flower.style.opacity = Math.random() * 0.2 + 0.05;
        flower.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        flower.style.animationDelay = `${Math.random() * 5}s`;

        floatingFlowers.appendChild(flower);
    }

    // Heart effect and audio functionality
    const heartElement = document.querySelector('.heart');
    const audio = document.querySelector('audio');
    
    if (audio) {
        audio.volume = 0.2;
    }

    if (heartElement) {
        heartElement.style.cursor = 'pointer';
        
        heartElement.addEventListener('click', function(event) {
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            if (audio) {
                if (audio.paused) {
                    audio.play().catch(e => console.error('Greška pri pokretanju zvuka:', e));
                } else {
                    audio.pause();
                }
            }
            
            createHeartEffect(x, y);
        });
    }

    // Function for creating heart effect
    function createHeartEffect(x, y) {
        const numHearts = 25;
        const minRadius = 30;
        const maxRadius = 200;
        const angleStep = (2 * Math.PI) / numHearts;
        
        for (let i = 0; i < numHearts; i++) {
            const smallHeart = document.createElement('div');
            smallHeart.className = 'small-heart';
            smallHeart.innerHTML = '❤';
            smallHeart.style.left = `${x}px`;
            smallHeart.style.top = `${y}px`;
            
            const angle = i * angleStep + (Math.random() - 0.5) * 0.5;
            const radius = minRadius + Math.pow(Math.random(), 0.7) * (maxRadius - minRadius);
            const duration = 0.8 + Math.random() * 0.6;
            
            const targetX = Math.cos(angle) * radius;
            const targetY = Math.sin(angle) * radius;
            
            smallHeart.style.setProperty('--tx', `${targetX}px`);
            smallHeart.style.setProperty('--ty', `${targetY}px`);
            smallHeart.style.setProperty('--rotation', `${Math.random() * 360}deg`);
            smallHeart.style.animation = `moveAndFade ${duration}s ease-out forwards`;
            
            document.body.appendChild(smallHeart);
            
            setTimeout(() => {
                smallHeart.remove();
            }, duration * 1000);
        }
    }
});