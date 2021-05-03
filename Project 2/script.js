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
            // console.log('in menu show');
            menuBlock.style.left = 0;
            showInterval = requestAnimationFrame(menuShow);
            count += 2;
            if (count < 101) {
                menuBlock.style.transform = `translate(${count}%)`; // 100%
            } else {
                cancelAnimationFrame(showInterval);
                count = 0;
            }
        };

        let hideInterval;
        let countHide = 0;
        const menuHide = () => {
            // console.log('in menu hide');
            hideInterval = requestAnimationFrame(menuHide);
            const width = menuBlock.clientWidth;
            countHide += 5;
            if (countHide < width) {
                menuBlock.style.left = `${countHide}px`;
            } else {
                cancelAnimationFrame(hideInterval);
                countHide = 0;
            }
        };

        const handlerMenu = () => {
            // console.log('in handler menu');
            countHide = 0;
            count = 0;
            menuBlock.style.left = 0;
            if (!menuBlock.style.transform || menuBlock.style.transform === `translate(-100%)` ||
            menuBlock.style.transform === `translate(100%)`) {
                menuBlock.style.transform = `translate(0)`;
            } else {
                menuBlock.style.transform = `translate(-100%)`;
            }

            // menuBlock.classList.toggle('active-menu');
        };

        document.body.addEventListener('click', event => {
            let target = event.target;
            // console.log('target: ', target);
            if (target.closest('.menu')) {
                console.log('menu click');
                if (window.innerWidth > 768) {
                    menuBlock.classList.add('shown');
                    console.log('will show menu');
                    menuShow();
                } else {
                    handlerMenu();
                }
            } else  if (target.classList.contains('close-btn')) {
                menuBlock.classList.remove('shown');
                if (window.innerWidth > 768) {
                    menuHide();
                } else {
                    handlerMenu();
                }
            } else if (target.closest('menu ul>li>a')) {
                menuBlock.classList.remove('shown');
                if (window.innerWidth > 768) {
                    menuHide();
                } else {
                    handlerMenu();
                }
            } else {
                target = target.closest('menu');
                if (!target && !event.target.closest('.menu') && menuBlock.classList.contains('shown')) {
                    menuBlock.classList.remove('shown');
                    if (window.innerWidth > 768) {
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
        const popup = document.querySelector('.popup');

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
        // popupBtns.forEach(item => {
        //     item.addEventListener('click', popupShow);
        // });

        // popup.addEventListener('click', event => {
        //     let target = event.target;
        //     if (target.classList.contains('popup-close')) {
        //         popupHide();
        //     } else {
        //         target = target.closest('.popup-content');
        //         if (!target) {
        //             popupHide();
        //         }
        //     }

        // });
        const popupHandler = () => {
            if (popup.style.display === '' ||  popup.style.display === 'none') {
                popup.style.opacity = 1;
                popup.style.display = 'block';
            } else {
                popup.style.opacity = 0;
                popup.style.display = 'none';
            }
        };

        document.addEventListener('click', event => {
            let target = event.target;
            if (target.matches('.popup-btn')) {
                if (window.innerWidth > 768) {
                    popupShow();
                } else {
                    popupHandler();
                }
            }

            if (target.matches('.popup')) {
                if (target.classList.contains('popup-close')) {
                    if (window.innerWidth > 768) {
                        popupHide();
                    } else {
                        popupHandler();
                    }
                } else {
                    target = target.closest('.popup-content');
                    if (!target && !event.target.matches('.popup-btn')) {
                        if (window.innerWidth > 768) {
                            popupHide();
                        } else {
                            popupHandler();
                        }
                    }
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

    //  slider
    const slider = () => {
        const slides = document.querySelectorAll('.portfolio-item'),
            ulDots = document.querySelector('.portfolio-dots');

        for (let i = 0; i < slides.length; i++) {
            const liDot = document.createElement('li');
            liDot.classList.add('dot');
            ulDots.append(liDot);
        }

        // const btn = document.querySelectorAll('.portfolio-btn'),
        const dots = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        dots[0].classList.add('dot-active');
        let currentSlide = 0;
        let interval;
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dots.forEach((item, index) => {
                    if (item === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide();
            }
        });
        startSlide(3000);
    };
    slider();

    // team photos
    const changePhotos = () => {
        const teamImgs = document.querySelectorAll('.command__photo'),
            teamWrapper = document.querySelector('.command'),
            initialSrc = [];

        teamImgs.forEach(item => {
            const src = item.getAttribute('src');
            initialSrc.push(src);
        });

        teamWrapper.addEventListener('mouseover', event => {
            teamImgs.forEach(item => {
                if (event.target === item) {
                    event.target.src = event.target.dataset.img;
                }
            });
        });
        teamWrapper.addEventListener('mouseout', event => {
            teamImgs.forEach((item, index) => {
                if (event.target === item) {
                    event.target.src = initialSrc[index];
                }
            });
        });
    };

    changePhotos();

    //validation
    const validation = () => {
        const numbers = event => {
            const target = event.target;
            if (target.matches('.calc-count') || target.matches('.calc-square') || target.matches('.calc-day')) {
                target.value = target.value.replace(/\D/g, '');
            }
        };

        const rusText = event => {
            const namePLaceholders = document.querySelectorAll('[placeholder="Ваше имя"');
            const messagePLaceholders = document.querySelectorAll('[placeholder="Ваше сообщение"');

            const target = event.target;
            namePLaceholders.forEach(item => {
                if (item === target) {
                    target.value = target.value.replace(/[^А-яё\s-]*/ig, '');
                    target.value = target.value.toLowerCase().replace(/^.|\s./g, match => match.toUpperCase());
                }
            });

            messagePLaceholders.forEach(item => {
                if (item === target) {
                    target.value = target.value.replace(/[^А-яё\s-]*/ig, '');
                }
            });
        };

        const email = event => {
            const target = event.target;
            const emailFields = document.querySelectorAll('[type="email"]');
            emailFields.forEach(item => {
                if (item === target) {
                    target.value = target.value.replace(/[^a-z-@_.!~*']/ig, '');
                    // [^A-z][^@-_\.!~\*']
                    // /[^A-z]+[^@\-\_\.\!\~\*\']*/ig
                }
            });
        };

        const phone = event => {
            const target = event.target;
            const telFields = document.querySelectorAll('[type="tel"');
            telFields.forEach(item => {
                if (item === target) {
                    target.value = target.value.replace(/[^-()\d]/g, '');
                    // /\D[^-()]/g
                }
            });
        };

        const calcBlock = document.querySelector('.calc-block');
        calcBlock.addEventListener('input', numbers);
        document.addEventListener('input', rusText);
        document.addEventListener('input', email);
        document.addEventListener('input', phone);
        document.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.replace(/-+/g, '-');
            target.value = target.value.replace(/\s+/g, ' ');
            target.value = target.value.replace(/^\s/g, '');
            target.value = target.value.replace(/\s$/g, '');
        }, true);

    };

    validation();

    //calculator
    const calculator = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcCount = document.querySelector('.calc-count'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');
        let calcInterval;
        let numCount = 0;
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            // totalValue.textContent = total;
            console.log('total: ', total);

            const calcAnimate = () => {
                calcInterval = requestAnimationFrame(calcAnimate);
                numCount += 10;
                if (numCount <= total) {
                    totalValue.textContent = numCount;
                } else if (totalValue.textContent > total) {
                    numCount = totalValue.textContent;
                    numCount -= 10;
                    totalValue.textContent = numCount;
                } else {
                    cancelAnimationFrame(calcInterval);
                    numCount = total;
                }

            };
            calcInterval = requestAnimationFrame(calcAnimate);
        };
        calcBlock.addEventListener('change', event => {
            const target = event.target;
            // if (target.matches('.calc-count') || target.matches('.calc-square') ||
            //  target.matches('.calc-day') || target.matches('.calc-type')) {
            //      console.log('works');
            //  }

            // if (target === calcType || target === calcSquare ||
            // target === calcDay || target === calcCount) {
            //     console.log('works');
            // }
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });


    };

    calculator(100);

});
