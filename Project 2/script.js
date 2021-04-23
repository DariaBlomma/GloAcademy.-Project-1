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
                // eslint-disable-next-line no-use-before-define
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
        const menuBlock = document.querySelector('menu');

        let showInterval;
        let count = 0;
        const menuShow = () => {
            showInterval = requestAnimationFrame(menuShow);
            count += 2;
            if (count < 101) {
                menuBlock.style.transform = `translate(${count}%)`; // 100%
            } else {
                cancelAnimationFrame(showInterval);
            }
        };

        let hideInterval;
        let countHide = 0;
        const menuHide = () => {
            hideInterval = requestAnimationFrame(menuHide);
            const width = menuBlock.clientWidth;
            countHide += 5;
            if (countHide < width) {
                menuBlock.style.left = `${countHide}px`;
            } else {
                cancelAnimationFrame(hideInterval);
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

        document.body.addEventListener('click', event => {
            let target = event.target;
            if (target.closest('.menu')) {
                console.log('menu click');
                if (window.innerWidth > 768) {
                    countHide = 0;
                    menuBlock.style.left = 0;
                    menuShow();
                    count = 0;
                } else {
                    handlerMenu();
                }
            }
            if (target.classList.contains('close-btn')) {
                if (window.innerWidth > 768) {
                    count = 0;
                    menuHide();
                } else {
                    handlerMenu();
                }
            } else if (target.closest('menu ul>li>a')) {
                if (window.innerWidth > 768) {
                    count = 0;
                    menuHide();
                } else {
                    handlerMenu();
                }
            } else {
                target = target.closest('menu');
                if (!target && !event.target.closest('.menu')) {
                    if (window.innerWidth > 768) {
                        count = 0;
                        menuHide();
                    } else {
                        handlerMenu();
                    }
                }
            }

        });
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtns = document.querySelectorAll('.popup-btn');

        let popupIntervalShow;
        let count = 0;
        const popupShow = () => {
            popupIntervalShow = requestAnimationFrame(popupShow);
            count += 0.01;
            if (count < 1) {
                popup.style.display = 'block';
                popup.style.opacity = `${count}`;
            } else {
                cancelAnimationFrame(popupIntervalShow);
                count = 0;
            }
        };
        let popupIntervalHide;
        let countHide = 1;
        const popupHide = () => {
            popupIntervalHide = requestAnimationFrame(popupHide);
            countHide -= 0.01;
            if (countHide > 0) {
                popup.style.opacity = `${countHide}`;
            } else {
                popup.style.display = 'none';
                cancelAnimationFrame(popupIntervalHide);
                countHide = 1;
            }
        };
        // popupBtns.forEach(item => {
        //     item.addEventListener('click', () => {
        //         popup.style.display = 'block';
        //     });
        // });
        // popupClose.addEventListener('click', () => {
        //     popup.style.display = 'none';
        // });
        popupBtns.forEach(item => {
            item.addEventListener('click', popupShow);
        });

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popupHide();
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popupHide();
                }
            }

        });
    };
    togglePopUp();

    //scroll
    // const scroll = () => {
    //     const serviceBlock = document.getElementById('service-block'),
    //         link = document.querySelector('a[href="#service-block"] img');
    //     link.addEventListener('click', () => {
    //         serviceBlock.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'start'
    //         });
    //     });
    // };
    // scroll();

    // собираем все якоря; устанавливаем время анимации и количество кадров
    const scroll = () => {
    /*
        // для множества якорей
        const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
            animationTime = 300,
            framesCount = 20;

        anchors.forEach(item => {
        // каждому якорю присваиваем обработчик события
            item.addEventListener('click', e => {
                // убираем стандартное поведение
                e.preventDefault();
                // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
                // eslint-disable-next-line max-len
                const coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
                console.log('coordY: ', coordY);
                // item.getAttribute('href') это конкретный полный атрибут ссылки, напр #service-block
                // getBoundingClientRect().top координаты оносительно окна
                // window.pageYOffset высота прокрутки от документа
                //  их сумма даст координаты относительно документа
                // coordY это координата блока, до которого надо прокрутить

                // запускаем интервал, в котором
                const scroller = setInterval(() => {
                // считаем на сколько скроллить за 1 такт
                    const scrollBy = coordY / framesCount;
                    console.log('scrollBy: ', scrollBy);

                    // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
                    // и дно страницы не достигнуто
                    if(scrollBy > window.pageYOffset - coordY &&
                        window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                        console.log('window.pageYOffset - coordY: ', window.pageYOffset - coordY);
                        // то скроллим на к-во пикселей, которое соответствует одному такту
                        window.scrollBy(0, scrollBy);
                        // scrollBy скроллим каждый раз
                    } else {
                        // иначе добираемся до элемента и выходим из интервала
                        //  когда то, что прокрутили, стало больше координат элемента
                        window.scrollTo(0, coordY);
                        clearInterval(scroller);
                    }
                    // время интервала равняется частному от времени анимации и к-ва кадров
                }, animationTime / framesCount);
            });
        });
    */


        const anchor = document.querySelector('a[href="#service-block"]'),
            serviceBlock = document.getElementById('service-block'),
            animationTime = 300,
            framesCount = 20;

        anchor.addEventListener('click', e => {
            e.preventDefault();
            const coordY = serviceBlock.getBoundingClientRect().top + window.pageYOffset;
            const scroller = setInterval(() => {
                const scrollBy = coordY / framesCount;
                if (scrollBy > window.pageYOffset - coordY &&
                    window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                    window.scrollBy(0, scrollBy);
                } else {
                    window.scrollTo(0, coordY);
                    clearInterval(scroller);
                }
            }, animationTime / framesCount);
        });
    };
    scroll();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tab.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            // while (target !== tabHeader) {
            //     if (target.classList.contains('service-header-tab')) {
            //         tab.forEach((item, i) => {
            //             if (item === target) {
            //                 toggleTabContent(i);
            //             }
            //         });
            //         return;
            //     }
            //     target = target.parentNode;
            // }
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();
});
