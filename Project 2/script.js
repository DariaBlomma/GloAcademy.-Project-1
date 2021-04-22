window.addEventListener('DOMContentLoaded', () => {
    'strict';
    const  countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaining();
            const addZero = function(date, tag) {
                if (date < 10) {
                    return tag.textContent = `0${date}`;
                } else {
                    return tag.textContent = `${date}`;
                }
            };
            addZero(timer.hours, timerHours);
            addZero(timer.minutes, timerMinutes);
            addZero(timer.seconds, timerSeconds);

            // if (timer.timeRemaining > 0) {
            //     setTimeout(updateClock, 1000);
            // }

            // const idInterval =  setInterval(updateClock, 1000);
            if (timer.timeRemaining <= 0) {
                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        const idInterval =  setInterval(updateClock, 1000);

        // to get remaining days
        // hours = Math.floor((timeRemaining / 60 / 60) % 24);
        // days = Math.floor(timeRemaining / 60 / 60 / 24);
    };

    countTimer('01 june 2021');
    // setInterval(countTimer, 1000, '01 july 2021');

    // menu
    const toggleMenu = () => {
        const menuBtn = document.querySelector('.menu'),
            menuBlock = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menuBlock.querySelectorAll('ul>li');
        let removeInterval;
        let count = 0;
        const btnAnimate = () => {
            removeInterval = requestAnimationFrame(btnAnimate);
            count++;
            if (count < 101) {
                menuBlock.style.transform = `translate(${count}%)`;
            } else {
                cancelAnimationFrame(removeInterval);
            }
        };

        const handlerMenu = () => {
            if (!menuBlock.style.transform || menuBlock.style.transform === `translate(-100%)`) {
                menuBlock.style.transform = `translate(0)`;
            } else {
                menuBlock.style.transform = `translate(-100%)`;
            }

            // menuBlock.classList.toggle('active-menu');
        };

        if (screen.width > 768) {
            menuBtn.addEventListener('click', () => {
                removeInterval = requestAnimationFrame(btnAnimate);
                count = 0;
            });
        } else {
            menuBtn.addEventListener('click', handlerMenu);
        }
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(item => item.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtns = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');
        popupBtns.forEach(item => {
            item.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopUp();
});
