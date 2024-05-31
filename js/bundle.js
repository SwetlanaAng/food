/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    const menu = document.querySelector('.menu'),
        container = menu.querySelector('.container');
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");

//import { } from '';

function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 3000);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
    
function openModal(modalSelector,showModalSoon) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    if (showModalSoon) {
        clearInterval(showModalSoon);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
}

function modal(triggerSeletor, modalSelector, showModalSoon) {
    const  btns = document.querySelectorAll(triggerSeletor),
        modal = document.querySelector(modalSelector),
        menu = document.querySelector('.menu'),
        container = menu.querySelector('.container');

    btns.forEach((btn) => {
        btn.addEventListener('click', ()=>openModal(modalSelector, showModalSoon));
    }) 
    
    
    modal.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal') || event.target.getAttribute('data-close')=='') {
            closeModal(modalSelector);
        }
    })
    document.addEventListener('keydown', (event) => {
        if (event.keyCode==27) {
            closeModal(modalSelector);
        }
    })
    window.addEventListener('scroll', (event) => {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight == document.documentElement.scrollHeight-1) {
        openModal(modalSelector, showModalSoon);
    }
    })
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ prevSelector, sliderSelector,
    nextSelector, currentSelector, totalSelector, slidesSelector,
    slidesFieldSelector, slidesWrapperSelector }) {
  const prev = document.querySelector(prevSelector),
        slider = document.querySelector(sliderSelector),
        next = document.querySelector(nextSelector),
        current = document.querySelector(currentSelector),
        total = document.querySelector(totalSelector),
        slides = document.querySelectorAll(slidesSelector),
        slidesField = document.querySelector(slidesFieldSelector),
        slidesWrapper = document.querySelector(slidesWrapperSelector),
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabHeaderSelector, itemsSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabHeader = document.querySelector(tabHeaderSelector),
        items = tabHeader.querySelectorAll(itemsSelector);
        
    
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
    hideTabs();
    showTab(0);
    
    tabHeader.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains(itemsSelector)) {
            items.forEach((item,i) => {
                item.classList.remove(activeClass);
                if (item == e.target) {
                    e.target.classList.add(activeClass);
                    hideTabs();
                    showTab(i);
                }
            })
        }
    })

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadLine) {
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
    setTimer(deadLine);
    

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

;
        
        
        
        
        
        
        

window.addEventListener('DOMContentLoaded', () => {
    const showModalSoon = setInterval(()=>(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', showModalSoon), 500000000);    
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('.btn', '.modal', showModalSoon);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        prevSelector:'.offer__slider-prev',
        sliderSelector:'.offer__slider',
        nextSelector: '.offer__slider-next',
        currentSelector: '#current',
        totalSelector: '#total',
        slidesSelector: '.offer__slide',
        slidesFieldSelector: '.offer__slider-inner',
        slidesWrapperSelector:'.offer__slider-wrapper' 
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabcontent', '.tabheader', '.tabheader__item', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('2024-06-09');
    
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map