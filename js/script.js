'use strict'
import calc from './modules/calc';
        import cards from './modules/cards';
        import forms from './modules/forms';
        import modal from './modules/modal';
        import slider from './modules/slider';
        import tabs from './modules/tabs';
        import timer from './modules/timer';
        import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const showModalSoon = setInterval(()=>openModal('.modal', showModalSoon), 500000000);    
    calc();
    cards();
    forms('form');
    modal('.btn', '.modal', showModalSoon);
    slider({
        prevSelector:'.offer__slider-prev',
        sliderSelector:'.offer__slider',
        nextSelector: '.offer__slider-next',
        currentSelector: '#current',
        totalSelector: '#total',
        slidesSelector: '.offer__slide',
        slidesFieldSelector: '.offer__slider-inner',
        slidesWrapperSelector:'.offer__slider-wrapper' 
    });
    tabs('.tabcontent', '.tabheader', '.tabheader__item', 'tabheader__item_active');
    timer('2024-06-09');   
})