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
export default cards;