const form = document.querySelector("#form")
const submitButton = document.querySelector("#submit")
const requiredFields = document.querySelectorAll(".reqField")
const checkBoxes = document.querySelectorAll('.discipline-input')
const termBox = document.getElementById('defaultCheckTerms')
const enrollModal = new bootstrap.Modal(document.getElementById('enroll'));
const scriptURL = ''

// Проверка при любом инпуте
window.onload = function() {
    form.addEventListener('input', function() {
        // Количество выбранных предметов
        var checkAmount = 0;
        for(var i = 0; i<checkBoxes.length; i++){
            if(checkBoxes[i].checked){ 
                checkAmount++;
            }
        }
        // Проверка заполнения полей
        const allFilled = Array.from(requiredFields).every(field => field.value.trim() !== '');
        if (allFilled && checkAmount>0 && termBox.checked) {
            submitButton.classList.remove('disabled');
            submitButton.setAttribute("aria-disabled", "false");
            submitButton.setAttribute("tabindex", "0");
        } else {
            submitButton.classList.add('disabled');
            submitButton.setAttribute("aria-disabled", "true");
            submitButton.setAttribute("tabindex", "-1");
        }
    });
}
// Обработка подтверждения регистрации
submitButton.onclick = function(e) {
    const formData = new FormData(form);
    // submit to google sheets
    submitForm(formData);
    function submitForm(formData) {
        submitButton.disabled = true
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors'})
        .then(response => {
            // alert('Success!', response)
            // submitButton.disabled = false
            location.reload();
        })
        .catch(error => {
            alert('Ошибка! Обратитесь к +7 (866) 272-20-24.', error.message)
            submitButton.disabled = false
        })
    }
}
// End of Обработка подтверждения регистрации

// Disciplines 
document.onclick = function(e) {
    if(e.target.classList.contains("discipline-text")){
        // open enroll modal and check the involved checkbox
        for(var i = 0; i<checkBoxes.length; ++i){
            if(e.target.id==checkBoxes[i].value){
                checkBoxes[i].setAttribute("checked","");
                // call "input" event for form to update price
                form.dispatchEvent(new Event("input"));
            }
        }
        enrollModal.show();
    }
};
// End of Disciplines