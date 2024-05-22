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
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slide = document.querySelector('.offer__slide');
    
    
    const arrSliders = [];
   
    fetch('http://localhost:3000/sliders')
        .then(response=> response.json())
        .then(data => {
            data.forEach(el => {
                arrSliders.push(el);
            })
            
            total.innerText = '0' + (showSlider.length+2);
            console.log(arrSliders);
            current.innerText = '01';
            showSlider(arrSliders[0].img, arrSliders[0].altimg);
            //return arrSliders;
        })
    
    function showNums(n) {
        let num = +current.innerText - 1;
        if (num == 0 && n==-1) {
            num=3;
        } else if(n==-1) num--;  
        if (num == 3 && n==0) {
            num = 0;
        } else if(n==0) num++;
        showSlider(arrSliders[num].img, arrSliders[num].altimg);
        current.innerText = '0'+(num+1);
    }
    function showSlider(img, altimg) {
        slide.innerHTML = '';
        slide.innerHTML = `<img src='${img}' alt='${altimg}'></img>`;
        
    }
    prev.addEventListener('click', (e) => {
        showNums(-1);
        
    })
    next.addEventListener('click', (e) => {
        showNums(0);
        
    })
    
})