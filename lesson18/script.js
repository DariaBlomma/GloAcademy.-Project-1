window.addEventListener('DOMContentLoaded', () => {
    'strict';
    function countTimer(deadline) {
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

            const idInterval =  setInterval(updateClock, 1000);
            if (timer.timeRemaining <= 0) {
                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        updateClock();

        // to get remaining days
        // hours = Math.floor((timeRemaining / 60 / 60) % 24);
        // days = Math.floor(timeRemaining / 60 / 60 / 24);
    }

    countTimer('22 april 2021');
    // setInterval(countTimer, 1000, '01 july 2021');




});
