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

    // RSVP form handling
    const radioButtons = document.querySelectorAll('input[name="attendance"]');
    const guestsGroup = document.getElementById('guests-group');
    const guestsNamesGroup = document.getElementById('guests-names-group');
    const submitButton = document.getElementById('submit-rsvp');

    // Handle radio button changes
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log("Radio changed to:", this.value);
            if (this.value === 'not-coming') {
                guestsGroup.style.display = 'none';
                guestsNamesGroup.style.display = 'none';
                // Reset values
                document.getElementById('guests').value = '0';
                document.getElementById('guests-names').value = '';
            } else {
                guestsGroup.style.display = 'block';
                guestsNamesGroup.style.display = 'block';
            }
        });
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
    submitButton.addEventListener('click', function (e) {
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

    // Set initial state based on the checked radio
    let checkedRadio = document.querySelector('input[name="attendance"]:checked');
    if (checkedRadio) {
        console.log("Inicijalno izabran radio:", checkedRadio.value);
        if (checkedRadio.value !== 'coming') {
            guestsGroup.style.display = 'none';
            guestsNamesGroup.style.display = 'none';
        } else {
            guestsGroup.style.display = 'block';
            guestsNamesGroup.style.display = 'block';
        }
    } else {
        console.log("Nije izabran nijedan radio dugmić");
    }
});

const audio = document.querySelector('audio');
if (audio) {
    audio.volume = 0.2; // Postavlja jačinu zvuka na 20%
}