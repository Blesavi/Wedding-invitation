document.addEventListener("DOMContentLoaded", function () {
    // Provera da li je forma već popunjena
    const hasSubmitted = localStorage.getItem('formSubmitted');
    const form = document.getElementById('rsvp-form');
    
    function hideAllFormElements() {
        // Sakrivanje cele forme
        const formElements = document.querySelectorAll('.form-group, .submit-btn, .rsvp-header, #guests-group, #guests-names-group');
        formElements.forEach(element => {
            if (element) {
                element.style.display = 'none';
            }
        });
    }
    
    if (hasSubmitted) {
        if (form) {
            // Sakrivanje svih elemenata forme
            hideAllFormElements();
            
            const confirmationMessage = document.getElementById('confirmation-message');
            if (confirmationMessage) {
                confirmationMessage.style.display = 'block';
                confirmationMessage.innerHTML = `
                    <i class="fas fa-exclamation-circle" style="font-size: 40px; margin-bottom: 20px; display: block; color: #e4dc9e;"></i>
                    <h3 style="color: #e4dc9e; margin-bottom: 15px;">Већ сте потврдили своје присуство!</h3>
                    <p style="color: #e4dc9e; font-size: 18px; margin-top: 10px;">Ако желите да промените свој одговор, молимо вас да контактирате младенце директно.</p>
                    <p style="color: #e4dc9e; font-size: 18px; margin-top: 10px;">Контакт телефон: 061 39 140 96</p>
                `;
                confirmationMessage.classList.add('visible');
            }
        }
    }

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

    // Handle radio button changes
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log("Radio changed to:", this.value);
            if (this.value === 'not-coming' || hasSubmitted) {
                hideGuestFields();
                // Reset values
                document.getElementById('guests').value = '0';
                document.getElementById('guests-names').value = '';
            } else if (!hasSubmitted) {
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
    const submitButton = document.getElementById('submit-rsvp');
    
    if (form && !hasSubmitted) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            if (!name) {
                alert('Молимо унесите ваше име и презиме.');
                return;
            }

            const attendance = document.querySelector('input[name="attendance"]:checked');
            if (!attendance) {
                alert('Молимо изаберите да ли долазите.');
                return;
            }

            const guests = parseInt(document.getElementById('guests').value) || 0;
            const guestsNames = document.getElementById('guests-names').value.trim();

            // Validate guest names if guests are coming
            if (attendance.value === 'coming' && guests > 0) {
                // Split names by comma and trim whitespace
                const guestNamesList = guestsNames.split(',').map(name => name.trim()).filter(name => name.length > 0);
                
                if (guestNamesList.length === 0 && guests > 0) {
                    alert('Молимо унесите имена и презимена гостију који долазе са вама.');
                    return;
                }
                
                if (guestNamesList.length !== guests) {
                    alert(`Унели сте ${guests} гостију, али сте навели ${guestNamesList.length} имена. Молимо унесите тачан број имена гостију.`);
                    return;
                }
            }

            const message = document.getElementById('message').value;

            const data = {
                redniBroj: "",  // This will be filled in by the server
                name: name,     // "Ime i Prezime"
                attendance: attendance.value === 'coming' ? 'Da' : 'Ne',  // "Dolazi"
                guests: guests, // "Broj gostiju"
                guestsNames: guestsNames, // "Dodatni gosti"
                message: message, // "Poruka"
                timestamp: new Date().toISOString()
            };

            try {
                const scriptURL = 'https://script.google.com/macros/s/AKfycbz8x_PKU4tIpkNYN_Fh-wvCBwzFmAZpC-UZ-436hW2HMSTia7nvbTa4DSd0hja5Jlbe/exec';
                
                // Show loading state
                const submitButton = document.getElementById('submit-rsvp');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Шаљем...';
                submitButton.disabled = true;

                // Using fetch with no-cors mode
                const response = await fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors', // Changed to no-cors
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8', // Changed content type
                    },
                    body: JSON.stringify(data)
                });

                // Čuvanje informacije da je forma popunjena
                localStorage.setItem('formSubmitted', 'true');
                
                // Sakrivanje svih elemenata forme
                hideAllFormElements();

                console.log('Server response:', response); // Log full response

                // Since no-cors mode won't give us response details, we'll assume success if we get here
                // Show confirmation message with animation
                const confirmationMessage = document.getElementById('confirmation-message');
                const comingMessage = document.getElementById('coming-message');
                const notComingMessage = document.getElementById('not-coming-message');
                
                // Show appropriate message based on attendance choice
                if (attendance.value === 'coming') {
                    comingMessage.style.display = 'block';
                    notComingMessage.style.display = 'none';
                } else {
                    comingMessage.style.display = 'none';
                    notComingMessage.style.display = 'block';
                }
                
                // Show confirmation message
                confirmationMessage.style.display = 'block';
                confirmationMessage.classList.add('visible');
                
                // Smooth scroll to confirmation message
                confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
            } catch (error) {
                console.error('Detailed error:', error); // Log detailed error
                
                // Reset button state
                const submitButton = document.getElementById('submit-rsvp');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;

                // Show user-friendly error message
                alert('Дошло је до грешке при слању форме. Молимо покушајте поново или нас контактирајте директно на телефон.\n\nДетаљи грешке: ' + error.message);
            }
        });

        // Add real-time validation for guest names
        const guestsInput = document.getElementById('guests');
        const guestsNamesInput = document.getElementById('guests-names');

        guestsInput.addEventListener('change', function() {
            const guests = parseInt(this.value) || 0;
            if (guests > 0) {
                guestsNamesInput.setAttribute('required', 'required');
                // Use correct grammar form based on number of guests
                const placeholderText = guests === 1 
                    ? 'Унесите име и презиме госта, раздвојено зарезом'
                    : `Унесите ${guests} имена и презимена, раздвојена зарезима`;
                guestsNamesInput.setAttribute('placeholder', placeholderText);
            } else {
                guestsNamesInput.removeAttribute('required');
                guestsNamesInput.setAttribute('placeholder', 'Унесите имена гостију, раздвојена зарезима');
            }
        });
    }

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
        audio.volume = 0.2; // Postavlja jačinu zvuka на 20%
    }

    // Funkcija za kreiranje efekta sa srcima
    const createHeartEffect = (x, y) => {
        const numHearts = 25;
        const minRadius = 30;
        const maxRadius = 200;
        
        // Ravnomerno raspoređujemo uglove, ali dodajemo malo nasumičnosti
        const angleStep = (2 * Math.PI) / numHearts;
        
        for (let i = 0; i < numHearts; i++) {
            const smallHeart = document.createElement('div');
            smallHeart.className = 'small-heart';
            smallHeart.style.left = `${x}px`;
            smallHeart.style.top = `${y}px`;
            
            // Osnovni ugao za ravnomernu distribuciju
            const baseAngle = i * angleStep;
            // Dodajemo malu nasumičnu varijaciju ugla (±15 stepeni)
            const randomAngleOffset = (Math.random() - 0.5) * Math.PI / 6;
            const angle = baseAngle + randomAngleOffset;
            
            // Nasumična razdaljina, ali са бољом дистрибуцијом
            const radius = minRadius + Math.pow(Math.random(), 0.7) * (maxRadius - minRadius);
            
            // Различите брзине за различита срца
            const duration = 0.8 + Math.random() * 0.6; // 0.8-1.4 секунде
            
            // Рачунамо крајње координате
            const targetX = Math.cos(angle) * radius;
            const targetY = Math.sin(angle) * radius;
            
            // Насумичне величине срца (али у мањем опсегу)
            const scale = 0.9 + Math.random() * 0.2; // 90-110% оригиналне величине
            smallHeart.style.transform = `scale(${scale})`;
            
            smallHeart.style.setProperty('--tx', `${targetX}px`);
            smallHeart.style.setProperty('--ty', `${targetY}px`);
            smallHeart.style.setProperty('--duration', `${duration}s`);
            smallHeart.style.setProperty('--rotation', `${Math.random() * 360}deg`);
            
            smallHeart.style.animation = `moveAndFade var(--duration) ease-out forwards`;
            
            document.body.appendChild(smallHeart);

            setTimeout(() => {
                smallHeart.remove();
            }, duration * 1000);
        }
    };

    // Постављање евент листенера на срце
    const heartElement = document.querySelector('.heart');
    if (heartElement) {
        heartElement.style.cursor = 'pointer';
        heartElement.addEventListener('click', function (event) {
            const rect = heartElement.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Покретање/заустављање музике
            const audio = document.querySelector('audio');
            if (audio) {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            }
            
            // Креирање ефекта са срцима
            createHeartEffect(x, y);
        });
    }
});