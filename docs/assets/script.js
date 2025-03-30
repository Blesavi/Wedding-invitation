document.addEventListener("DOMContentLoaded", function () {
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
});

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

// RSVP Form Handling
document.getElementById('submit-rsvp').addEventListener('click', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const guests = document.getElementById('guests').value;
    const guestsNames = document.getElementById('guests-names').value;
    const message = document.getElementById('message').value;

    if (!name) {
        alert('Молимо унесите ваше име и презиме.');
        return;
    }

    document.getElementById('confirmation-message').style.display = 'block';
    document.getElementById('rsvp-form').reset();

    document.getElementById('confirmation-message').scrollIntoView({ behavior: 'smooth' });
});

// Show/hide guests fields based on attendance
document.querySelectorAll('input[name="attendance"]').forEach(radio => {
    radio.addEventListener('change', function () {
        const guestsGroup = document.getElementById('guests-group');
        const guestsNamesGroup = document.getElementById('guests-names-group');

        if (this.value === 'coming') {
            guestsGroup.style.display = 'block';
            guestsNamesGroup.style.display = 'block';
        } else {
            guestsGroup.style.display = 'none';
            guestsNamesGroup.style.display = 'none';
        }
    });
});

const audio = document.querySelector('audio');
if (audio) {
    audio.volume = 0.2; // Postavlja jačinu zvuka na 20%
}