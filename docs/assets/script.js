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

    // Kontrola za info karticu o taksiju
    const taxiInfoButton = document.getElementById('taxiInfoButton');
    const taxiInfoCard = document.getElementById('taxiInfoCard');
    const closeTaxiInfo = document.getElementById('closeTaxiInfo');
    
    if (taxiInfoButton && taxiInfoCard && closeTaxiInfo) {
        // Prikazivanje info kartice
        taxiInfoButton.addEventListener('click', function() {
            taxiInfoCard.classList.add('visible');
        });
        
        // Zatvaranje info kartice
        closeTaxiInfo.addEventListener('click', function() {
            taxiInfoCard.classList.remove('visible');
        });
        
        // Zatvaranje kad se klikne van kartice
        document.addEventListener('click', function(event) {
            if (taxiInfoCard.classList.contains('visible') && 
                !taxiInfoCard.contains(event.target) && 
                event.target !== taxiInfoButton) {
                taxiInfoCard.classList.remove('visible');
            }
        });
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

            // Validacija gostiju - ako je broj gostiju 0, a unesena su imena gostiju
            if (attendance === 'coming' && parseInt(guests) === 0 && guestsNames.length > 0) {
                alert('Унели сте имена гостију али сте навели да немате госте (број: 0). Молимо вас да повећате број гостију или обришите имена.');
                return;
            }

            // Validacija - provera da li broj imena gostiju odgovara broju gostiju
            if (attendance === 'coming' && parseInt(guests) > 0 && guestsNames.length > 0) {
                // Računamo koliko ima imena (razdvojenih zarezom)
                const namesArray = guestsNames.split(',').map(name => name.trim()).filter(name => name.length > 0);
                if (namesArray.length > parseInt(guests)) {
                    alert(`Унели сте ${namesArray.length} имена гостију, али сте навели да долази ${guests} гост(а). Молимо вас ускладите број гостију или обришите вишак имена.`);
                    return;
                }
            }

            const data = {
                name: name,
                attendance: attendance === 'coming' ? 'Да' : 'Не',
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
        console.log('Creating calendar event:', { title, description, startDate, endDate });

        // Format dates for Google Calendar URL
        startDate = startDate.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1$2$3T$4$5$6Z');
        endDate = endDate.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1$2$3T$4$5$6Z');

        // Create Google Calendar URL
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&dates=${startDate}/${endDate}&location=${encodeURIComponent('Црква Светог Пантелејмона, Улица Краља Милутина 12, Ниш')}`;

        console.log('Generated Google Calendar URL:', googleCalendarUrl);

        // Create and click a temporary link
        const link = document.createElement('a');
        link.href = googleCalendarUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function addWeddingToCalendar() {
        console.log('addWeddingToCalendar clicked');
        const startDate = '20250712T190000';
        const endDate = '20250713T020000';
        createCalendarEvent(
            'Венчање - Срђан и Анђела',
            'Венчање у цркви Светог Пантелејмона (17:00) и прослава у ресторану Мадера (19:00)',
            startDate,
            endDate
        );
    }

    function addRsvpReminderToCalendar() {
        console.log('addRsvpReminderToCalendar clicked');
        const startDate = '20250608T120000';
        const endDate = '20250608T130000';
        createCalendarEvent(
            'Потврда доласка - Венчање Срђан и Анђела',
            'Крајњи рок за потврду доласка на венчање Срђана и Анђеле',
            startDate,
            endDate
        );
    }

    // Add touch event handlers for calendar buttons
    const calendarButtons = document.querySelectorAll('.calendar-btn');
    calendarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Sprečava podrazumevano ponašanje
            if (this.classList.contains('reminder-btn')) {
                addRsvpReminderToCalendar();
            } else {
                addWeddingToCalendar();
            }
        });

        button.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Sprečava dvostruko pokretanje na mobilnim uređajima
            if (this.classList.contains('reminder-btn')) {
                addRsvpReminderToCalendar();
            } else {
                addWeddingToCalendar();
            }
        }, { passive: false });
    });

    // Funkcionalnost za slider sa slikom i videom restorana
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slide');
    const video = document.getElementById('restaurantVideo');

    // Inicijalizacija slidera
    let currentSlide = 0;
    
    // Funkcija za promenu slajda
    function goToSlide(index) {
        // Sakrij sve slajdove prvo
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Prikaži trenutni slajd
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Pauziraj video kad se prebaci na sliku
        if (index === 0 && video) {
            video.pause();
        }
        
        // Pusti video kad se prebaci na video
        if (index === 1 && video) {
            // Dajemo malu pauzu pre puštanja da bi tranzicija izgledala glatko
            setTimeout(() => {
                video.play().catch(e => {
                    // Hendlovanje greške - korisnik možda treba da prvo klikne na video
                    console.log("Video zahteva interakciju korisnika za reprodukciju");
                });
            }, 500);
        }
        
        currentSlide = index;
    }

    // Event listeneri za dugmad
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
            goToSlide(currentSlide);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
            goToSlide(currentSlide);
        });
    }
    
    // Event listeneri za tačkice indikatora
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });

    // Inicijalno postavljanje na prvi slajd
    goToSlide(0);
});