'use strict'

//const { response } = require("express");

window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabcontent'),
        tabHeader = document.querySelector('.tabheader'),
        items = tabHeader.querySelectorAll('.tabheader__item'),
        btns = document.querySelectorAll('.btn'),
        modal = document.querySelector('.modal'),
        menu = document.querySelector('.menu'),
        container = menu.querySelector('.container');
    let deadline = '2024-06-15';  
    
    function showTab(i) {
        tabs[i].classList.remove('hide');
        tabs[i].classList.add('show');
    }

    function hideTabs() {
        tabs.forEach((tab) => {
            tab.classList.remove('show');
            tab.classList.add('hide');
        })
    }
    
    
    function setTimer(endTime) {
        const days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
        function updateTimer() {
            const t = findRemainingTime(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.time <= 0) {
                clearInterval(timerInterval);
            }
        }
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else return num;
    }
    function findRemainingTime(deadLine) {
        let days, minutes, hours, seconds;
        const time = new Date(deadLine) - new Date();
        if (time < 0) {
            days = 0;
            minutes = 0;
            hours = 0;
            seconds=0;
        } else {
            days = Math.floor(time / 86400000),
            hours = Math.floor((time % 86400000) / 3600000),
            minutes = Math.floor(((time % 86400000) % 3600000) / 60000),
            seconds = Math.floor((((time % 86400000) % 3600000) % 60000) / 1000);
        }
        return {
            'time': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
        
    }
    setTimer(deadline);
    hideTabs();
    showTab(0);
    
    tabHeader.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            items.forEach((item,i) => {
                item.classList.remove('tabheader__item_active');
                if (item == e.target) {
                    e.target.classList.add('tabheader__item_active');
                    hideTabs();
                    showTab(i);
                }
            })
        }
    })


    //modal
    function openModal() {
        modal.classList.add('show');
        clearInterval(showModalSoon);
    }
    function closeModal() {
        
        modal.classList.remove('show');
        modal.classList.add('hide');
    }

    btns.forEach((btn) => {
        btn.addEventListener('click', openModal);
    }) 
    
    
    modal.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal') || event.target.getAttribute('data-close')=='') {
            closeModal();
        }
    })
    document.addEventListener('keydown', (event) => {
        if (event.keyCode==27) {
            closeModal();
        }
    })
    const showModalSoon = setInterval(openModal, 500000000);
    window.addEventListener('scroll', (event) => {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight == document.documentElement.scrollHeight-1) {
        openModal();
    }
    })
    //cards
    const getData = async function (url) {
        const res = await fetch(url);
        return await res.json()
        }
    getData('http://localhost:3000/menu').then(data => {
        data.forEach(obje => {
        let el = document.createElement('div');
        el.classList.add('menu__item');
        el.innerHTML = createEl(obje);
        container.append(el);
    }) 
    })
    
    
    function createEl(obj) {
            return `<div class="menu__item">
                    <img src="${obj["img"]}" alt="vegy">
                    <h3 class="menu__item-subtitle">Меню ${obj["title"]}</h3>
                    <div class="menu__item-descr">${obj["descr"]}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${obj["price"]}</span> грн/день</div>
                    </div>
                </div>`;
        }
    
//forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Успех',
        failure:'что-то пошло не так'
    }
    
    const postData = async function (url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        return await res.json()
    }
    
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);
            
           
            
            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

           postData('http://localhost:3000/requests', json)
            .then(data => showThanksModal(message.success))
            .catch(()=>showThanksModal(message.failure));

        
            form.reset();
            setTimeout(() => statusMessage.textContent = '', 3000);
        })
        
    }
    forms.forEach(item => bindPostData(item));
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide')
        const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = ` <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
            </div>`;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => { 
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 3000);
    }
    /* fetch('http://localhost:3000/menu')
        .then(data => data.json() )
        .then(res => console.log(res)); */
    // слайдер
    const prev = document.querySelector('.offer__slider-prev'),
        slider = document.querySelector('.offer__slider'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slides = document.querySelectorAll('.offer__slide'),
        slidesField = document.querySelector('.offer__slider-inner'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    total.innerText = '0' + slides.length;
    current.innerText = '0'+slideIndex;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    })

    slider.style.position = 'relative';
    showSlider(slideIndex);
    
    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;`;
    slider.append(indicators);


    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;`;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    
    function showIndexesAndDot(n) {
        if (slideIndex == 1 && n==-1) {
            slideIndex=slides.length;
        } else if(n==-1) slideIndex--;  
        if (slideIndex == slides.length && n==0) {
            slideIndex = 1;
        } else if(n==0) slideIndex++;
        showSlider(n);
        dotActive(slideIndex - 1, dots);
        current.innerText = '0' + slideIndex;
    }
    function dotActive(d,arr) {
        arr.forEach(dot => {
            dot.style.opacity = '.5';
        })
        arr[d].style.opacity = 1
    }

    function showSlider(n) {
        if (offset == 0 && n==-1) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else if(n==-1) offset -= deleteNotDigits(width);  
        if (offset == deleteNotDigits(width) * (slides.length - 1) && n==0) {
             offset = 0;
        } else if (n == 0) offset += deleteNotDigits(width);
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g,'')
    }

    prev.addEventListener('click', (e) => {
        showIndexesAndDot(-1); 
    })

    next.addEventListener('click', (e) => {
        showIndexesAndDot(0);     
    }) 

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            dotActive(slideIndex - 1, dots);
            current.innerText = '0' + slideIndex;
        })
    })   
    //calc
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
        } else {
            if (sex == 'female') {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }
    calcTotal();
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => { 
            element.classList.remove(activeClass);
            if (element.getAttribute('id') == localStorage.getItem("sex")) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute('data-ratio') == localStorage.getItem("ratio")) {
                element.classList.add(activeClass);
            }
        })
    }

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        //console.log(elements);
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem("ratio", ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    console.log(sex);
                    localStorage.setItem("sex", sex);
                }
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                })
                e.target.classList.add(activeClass);
                calcTotal();
            })
        })
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        
        input.addEventListener('input', (e) => {
            console.log(e.target);
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (e.target.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal();
        })
    }
    initLocalSettings("#gender div", 'calculating__choose-item_active')
    initLocalSettings(".calculating__choose_big div", 'calculating__choose-item_active')
    getStaticInformation("#gender div", 'calculating__choose-item_active');
    getStaticInformation(".calculating__choose_big div", 'calculating__choose-item_active');
    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
})