const prices = {
    'landing-page': {
        pm: 700,
        design: 600,
        developer: 1200,
        qa: 500
    },
    'online-store': {
        pm: 1200,
        design: 900,
        developer: 2500,
        qa: 800,
    },
    'web-application': {
        pm: 2000,
        design:1100,
        developer:3000,
        qa: 1000,
    },
    'mobile-application': {
        pm: 3000,
        design: 1500,
        developer: 4000,
        qa: 1300,
    }
}

function getFormValues () {

    const websiteTypeElement = document.querySelector('#project_type');

    const pmEl= document.querySelector('#project_management');

    const designEl= document.querySelector('#design'); 
    const developmentEl= document.querySelector('#development'); 
    const qaEl= document.querySelector('#qa'); 

    return {
        websiteType: websiteTypeElement.value,
        pm: pmEl.checked,
        design:designEl.checked,
        developer:developmentEl.checked,
        qa: qaEl.checked,

    }
     
}

function calculateWork() {
    const Values = getFormValues();

    let totalPrice = 0;
    const workTypes = prices [Values.websiteType];

    if (Values.pm) {
        totalPrice= workTypes.pm;
    }

    if (Values.design) {
        totalPrice= totalPrice + workTypes.design;
    }

    if (Values.developer) {
        totalPrice= totalPrice + workTypes.developer;
    }

    if (Values.qa) {
        totalPrice= totalPrice + workTypes.qa;
    }

    const totalPriceEL = document.querySelector('#total_price');
    totalPriceEL.textContent = totalPrice;

}

getFormValues();

const formEl = document.querySelector('#project_price_form');
const emailModal = document.querySelector('#modal_email');
const success_modal = document.querySelector('#success_modal');

calculateWork();


formEl.addEventListener('change', calculateWork);
formEl.addEventListener('submit' , function (event) {

    event.preventDefault();

    emailModal.classList.add('modal_active');

});

const closeButtons = document.querySelectorAll('.modal_close_btn');

closeButtons.forEach (function(closeBtn) {
    closeBtn.addEventListener('click', function() {

        const inputContainer = document.querySelector('#email_input_container');
        inputContainer.classList.remove('email_input_container_error');

        emailModal.classList.remove('modal_active');
        success_modal.classList.remove('modal_active');

    })
})

const modalEmailContainer = document.querySelector('#modal_email_container')

    modalEmailContainer.addEventListener('submit' , function (event){
    event.preventDefault();
    
    const userEmailInput = document.querySelector('#user_email');

    if (userEmailInput.value){

            
            const formData = new FormData(formEl)
            formData.append('Email', userEmailInput.value);

             fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
             body: new URLSearchParams(formData).toString()
             })
             .then(function(){
                emailModal.classList.remove('modal_active');
                success_modal.classList.add('modal_active');
           
            })
            .catch((error) => alert('Не удалось отправить форму'));
            return;
       
    }
    const inputContainer = document.querySelector('#email_input_container');
    inputContainer.classList.add('email_input_container_error');
});