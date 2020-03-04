


const formDataToObject = data => {
    const obj = {};
    data.forEach((value,key) => {
        if(key === 'completed'){
            obj[key] = 'false' ? false : true;
        } else {
            obj[key] = value;
        }

    });
    return obj;
};
const ul = document.querySelector('.list');

const renderNotes = data => {
    ul.innerHTML = '';
    data.forEach(note => {
        ul.innerHTML += ` 
         <li data-id=${note.id} class="list__item${note.completed ? 'completed': ''}">
             <h4>${note.title}</h4>
             <p>${note.text}</p>
             <button ${note.completed ? 'disabled' : ''} class ="button">DONE</button>
         </li>`;
    });
    console.log(data);//наш массив с обьектами
};

const save = (data, key = 'todo') => {
    const notesJson = JSON.stringify(data);
    localStorage.setItem(key,notesJson);
}

ul.addEventListener('click', e =>{
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentNode.dataset.id;
       // console.log(id);
        // console.log(e.target.parentNode);
        const currentNote = notes.find(note => note.id === id)
        //console.log(currentNote)
        currentNote.completed = true;

        save(notes);
        renderNotes(notes);
    }
});

let notes;
if(localStorage.getItem('todo')) {
    notes = JSON.parse(localStorage.getItem('todo'));
    renderNotes(notes);
} else {
    notes = [];
}

const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const date = new Date;
    const formTarget = e.target;
    const formData = new FormData(formTarget);
   
    

    
    formData.append('completed',false);
    formData.append('created',moment(date).format('DD MMMM YYYY'));
    formData.append('id',moment(date).format('x'));
    const formDataObj = formDataToObject(formData);
    notes.push(formDataObj);
    //console.log(formDataObj);
    //console.log(notes);

    
    save(notes);
    renderNotes(notes);
    formTarget.reset();
});
//     //console.log(object);
//     const ul = document.querySelector('ul');
//     const li = document.createElement('li');
//     li.innerHTML = `
//     <h4>${object.title}</h4>
//     <p>${object.text}</p>
//     `;
// ul.append(li);
