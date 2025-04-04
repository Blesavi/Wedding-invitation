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

        const data = {
            name,
            attendance,
            guests,
            guestsNames,
            message
        };

        // Zamenite URL sa vašim Google Apps Script URL-om
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzQlzKdE_x9tYLaLKOKCcx1D-0rH_U0qQCxD6HmYa91Hw7xi2zjZsdIW6p7y9GSksYf/exec';

        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 'success') {
                document.getElementById('confirmation-message').style.display = 'block';
                document.getElementById('rsvp-form').reset();
                document.getElementById('confirmation-message').scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Дошло је до грешке. Покушајте поново.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Дошло је до грешке. Покушајте поново.');
        });
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

    // Postavljanje jačine zvuka
    const audio = document.querySelector('audio');
    if (audio) {
        audio.volume = 0.2; // Postavlja jačinu zvuka na 20%
    }

    // Funkcija za kreiranje efekta sa srcima
    const createHeartEffect = (x, y) => {
        const numHearts = 10;
        const radius = 100; // Razdaljina koju će srca preći

        for (let i = 0; i < numHearts; i++) {
            const smallHeart = document.createElement('div');
            smallHeart.className = 'small-heart';
            smallHeart.style.left = `${x}px`;
            smallHeart.style.top = `${y}px`;
            
            // Računanje ugla za svako srce (ravnomerno raspoređeno u krug)
            const angle = (i / numHearts) * 2 * Math.PI;
            
            // Postavljanje krajnjih koordinata za animaciju
            const targetX = Math.cos(angle) * radius;
            const targetY = Math.sin(angle) * radius;
            
            smallHeart.style.setProperty('--tx', `${targetX}px`);
            smallHeart.style.setProperty('--ty', `${targetY}px`);
            
            // Dodavanje animacije
            smallHeart.style.animation = 'moveAndFade 1s ease-out forwards';
            
            document.body.appendChild(smallHeart);

            // Uklanjanje srca nakon animacije
            setTimeout(() => {
                smallHeart.remove();
            }, 1000);
        }
    };

    // Postavljanje event listenera na srce
    const heartElement = document.querySelector('.heart');
    if (heartElement) {
        heartElement.style.cursor = 'pointer';
        heartElement.addEventListener('click', function (event) {
            const rect = heartElement.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Pokretanje/zaustavljanje muzike
            const audio = document.querySelector('audio');
            if (audio) {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            }
            
            // Kreiranje efekta sa srcima
            createHeartEffect(x, y);
        });
    }
});