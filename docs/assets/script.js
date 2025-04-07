document.addEventListener("DOMContentLoaded", function () {
    // Music hint handling
    const musicHint = document.getElementById('music-hint');
    const hintShown = localStorage.getItem('musicHintShown');
    
    if (!hintShown) {
        // Show the hint
        if (musicHint) {
            setTimeout(() => {
                musicHint.style.display = 'flex';
            }, 1000);

            // Auto-hide after 3 seconds (changed from 2)
            setTimeout(() => {
                musicHint.style.opacity = '0';
                setTimeout(() => {
                    musicHint.style.display = 'none';
                }, 500);
            }, 3000); // Changed from 2000 to 3000
        }
        
        // Mark hint as shown
        localStorage.setItem('musicHintShown', 'true');
    } else {
        // Hide the hint if already shown
        if (musicHint) {
            musicHint.style.display = 'none';
        }
    }

    const form = document.getElementById('rsvp-form');
    const initialConfirmation = document.getElementById('initial-confirmation');
    const returnConfirmation = document.getElementById('return-confirmation');
    const rsvpDeadline = document.getElementById('rsvp-deadline');
    const hasSubmitted = localStorage.getItem('formSubmitted') === 'true';

    // Inicijalno sakrivanje/prikazivanje elemenata
    if (hasSubmitted) {
        if (form) form.style.display = 'none';
        if (returnConfirmation) {
            returnConfirmation.style.display = 'block';
            returnConfirmation.classList.add('visible');
        }
        if (initialConfirmation) initialConfirmation.style.display = 'none';
        if (rsvpDeadline) rsvpDeadline.style.display = 'none'; // Hide deadline text when already submitted
    } else {
        if (form) form.style.display = 'block';
        if (returnConfirmation) returnConfirmation.style.display = 'none';
        if (initialConfirmation) initialConfirmation.style.display = 'none';
        if (rsvpDeadline) rsvpDeadline.style.display = 'block';
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

    // Function for creating heart effect with custom duration
    function createHeartEffect(x, y, duration = 0.8) {
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

    // Heart effect and audio functionality
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
            
            // First wave - 20% slower (0.8s -> 1.0s)
            createHeartEffect(x, y, 1.0);
            
            // Second wave - slower
            setTimeout(() => {
                createHeartEffect(x, y, 1.2);
            }, 2000);
            
            // Third wave - even slower
            setTimeout(() => {
                createHeartEffect(x, y, 1.6);
            }, 4000);
        });
    }

    // Frame image click handler
    const frameImage = document.getElementById('frameImage');
    if (frameImage) {
        frameImage.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    }

    // Form handling
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const attendance = document.querySelector('input[name="attendance"]:checked').value;
            const guests = document.getElementById('guests').value;
            const guestsNames = document.getElementById('guests-names').value.trim();
            const message = document.getElementById('message').value.trim();

            const data = {
                name: name,
                attendance: attendance === 'coming' ? 'Da' : 'Ne',
                guests: guests,
                guestsNames: guestsNames,
                message: message,
                timestamp: new Date().toISOString()
            };

            try {
                const scriptURL = 'https://script.google.com/macros/s/AKfycbz8x_PKU4tIpkNYN_Fh-wvCBwzFmAZpC-UZ-436hW2HMSTia7nvbTa4DSd0hja5Jlbe/exec';
                
                // Show loading state
                const submitButton = document.getElementById('submit-rsvp');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Шаљем...';
                submitButton.disabled = true;

                const response = await fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                    body: JSON.stringify(data)
                });

                // Čuvamo informaciju o uspešnom slanju
                localStorage.setItem('formSubmitted', 'true');
                
                // Sakrivamo formu
                form.style.display = 'none';
                
                // Prikazujemo inicijalnu potvrdu
                if (initialConfirmation) {
                    initialConfirmation.style.display = 'block';
                    initialConfirmation.classList.add('visible');
                    // Scroll do poruke
                    initialConfirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Hide the RSVP deadline text
                document.getElementById('rsvp-deadline').style.display = 'none';
                
            } catch (error) {
                console.error('Error:', error);
                alert('Дошло је до грешке при слању форме. Молимо покушајте поново.');
                
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });

        // Guest fields handling
        const radioButtons = document.querySelectorAll('input[name="attendance"]');
        const guestsGroup = document.getElementById('guests-group');
        const guestsNamesGroup = document.getElementById('guests-names-group');
        
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'not-coming') {
                    if (guestsGroup) guestsGroup.style.display = 'none';
                    if (guestsNamesGroup) guestsNamesGroup.style.display = 'none';
                    // Reset values
                    document.getElementById('guests').value = '0';
                    document.getElementById('guests-names').value = '';
                } else {
                    if (guestsGroup) guestsGroup.style.display = 'block';
                    if (guestsNamesGroup) guestsNamesGroup.style.display = 'block';
                }
            });
        });
    }

    function createCalendarEvent(title, description, startDate, endDate) {
        // Check if it's iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        // Check if it's Android
        const isAndroid = /Android/.test(navigator.userAgent);

        if (isIOS || isAndroid) {
            // Mobile format
            const mobileCalendarUrl = `http://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&dates=${startDate}/${endDate}&location=${encodeURIComponent('Црква Светог Пантелејмона, Улица Краља Милутина 12, Ниш')}`;
            
            window.open(mobileCalendarUrl, '_blank');
        } else {
            // Desktop format
            const event = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'BEGIN:VEVENT',
                'CLASS:PUBLIC',
                `DESCRIPTION:${description}`,
                `DTSTART:${startDate}`,
                `DTEND:${endDate}`,
                `LOCATION:Црква Светог Пантелејмона, Улица Краља Милутина 12, Ниш`,
                `SUMMARY:${title}`,
                'TRANSP:TRANSPARENT',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\n');

            const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', `${title}.ics`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    
    function addWeddingToCalendar() {
        const startDate = '20250712T190000';
        const endDate = '20250713T020000'; // Changed to 02:00 next day
        createCalendarEvent(
            'Венчање - Срђан и Анђела',
            'Венчање у цркви Светог Пантелејмона (17:00) и прослава у ресторану Мадера (19:00)',
            startDate,
            endDate
        );
    }
    
    function addRsvpReminderToCalendar() {
        const startDate = '20250608T120000';
        const endDate = '20250608T130000';
        createCalendarEvent(
            'Потврда доласка - Венчање Срђан и Анђела',
            'Крајњи рок за потврду доласка на венчање Срђана и Анђеле',
            startDate,
            endDate
        );
    }
});