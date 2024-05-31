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
export default calc;