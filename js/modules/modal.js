    
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
export default modal;
export { openModal };
export { closeModal };
