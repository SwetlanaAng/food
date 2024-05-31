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
export default slider;