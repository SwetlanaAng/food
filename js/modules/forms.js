import { closeModal} from "./modal";
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
            closeModal('.modal');
        }, 3000);
    }
}
export default forms;