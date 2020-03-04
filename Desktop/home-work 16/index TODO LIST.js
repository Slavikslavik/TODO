const form = document.querySelector('form');
//console.log(form);
const LS_KEY_NAME = 'formData';
const LS_Value = localStorage.getItem(LS_KEY_NAME);

let parcedValue;
if(LS_Value) {
    parcedValue = JSON.parse(LS_Value);
    //console.log('it work');
    console.log(parcedValue);
    form.querySelectorAll('input').forEach(function (input) {
        input.value = parcedValue[input.name];
    });
} else {
    console.log('empty');
}


//const formDataObj = {};
//console.log(formDataObj);// почему пустой ?
form.addEventListener('submit',e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = {};
    formData.forEach(function(value,key) {
        formDataObj[key] = value;
    });
   const prepairedData = JSON.stringify(formDataObj);
   //console.log(prepairedData);
    //console.log(formDataObj);
    localStorage.setItem(LS_KEY_NAME,prepairedData);
});
