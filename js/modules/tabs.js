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
export default tabs;