function Todo (name, $form, $list, template){
    this.form = $form;
    this.list = $list;
    this.template = template;
    this.notes = [];
    this.name = name;
}

Todo.prototype.save = function() {
    localStorage.setItem(this.name, JSON.stringify(this.notes));
};

Todo.prototype.append = function(value){
    //eslint-disable-next-line
    const date = moment().format('x');
    const note = {
        value: value.value,
        text : value.text,
        createdAt: date,
        id: date,
        completed: false
    };
    //console.log(note);
    //console.log(date);
    this.notes.unshift(note);
    this.render();
    this.save();
    this.form.reset();
};


Todo.prototype.render = function() {
    this.list.innerHTML = '';

    this.notes.forEach(note => {
        this.list.insertAdjacentHTML(
            'afterbegin',
            this.template(note)
        );
        //console.log(this.list);
    });
};

Todo.prototype.complete = function(id) {
    this.notes.find(note => note.id === id).completed = true;
};

// /////////////////////////////////////////////////////////////
Todo.prototype.edit = function(id) {
    this.note = this.notes.find(note => note.id ===id );
    //console.log(this.note.value);
    this.form.innerHTML =`
        <input type="text" class="edit_value"  value="${this.note.value}">
        <input type="text" class="edit_text"  value="${this.note.text}">
        <div class="button1s">
        <button class="button1" data-action="save" >save</button>
        <button class="button1" data-action="cancel" >cancel</button>
        </div>`;
    document.querySelector('.button1s').addEventListener('click',e => {
        e.preventDefault();

        if(e.target.dataset.action === 'save'){
            this.note.value = document.querySelector('.edit_value').value;
            this.note.text = document.querySelector('.edit_text').value;
        }
        if (!event.target.dataset.action === 'cancel')return;
    });
};
Todo.prototype.remove = function(id){
    this.notes = this.notes.filter(note => note.id !== id);
};

Todo.prototype.init = function(){
    this.form.addEventListener('submit', e => {
        e.preventDefault();
        const dataRow = new FormData(e.target);
        const valueE = {};
        dataRow.forEach((value,key) => {
            valueE[key] = value;
        });
        //console.log(valueE);
        this.append(valueE);
    });

    this.list.addEventListener('click',({target}) => {
        const isCompleteBtn = target.tagName === 'BUTTON' && target.classList.contains('note__button-done');
        const editButton = target.tagName === 'BUTTON' && target.classList.contains('note__button--edit');
        const currentNoteId = target.closest('li').dataset.id;


        console.log(editButton);
        console.log(currentNoteId);


        if(isCompleteBtn) {

            this.complete(currentNoteId);

        } else if(editButton){

            this.edit(currentNoteId);

        } else {
            this.remove(currentNoteId);
        }

        this.render();
        this.save();
    });

    const saveData = JSON.parse(localStorage.getItem(this.name));

    if(saveData) {
        this.notes = saveData;
        this.render();
    }
};

const TodoExample = new Todo (
    'todo',
    document.querySelector('.form'),
    document.querySelector('.note'),
    note => `
    <li data-id="${note.id}" class="note__item${note.completed ? ' note__item--completed' : ''}">
    <span class="note__text"> ${note.value} ${note.text}</span>   
    <button class="note__button note__button-done"${note.completed && 'disabled'}>DONE</button>
    <button class="note__button note__button--remove">Remove</button>
    <button class="note__button note__button--edit">EDIT</button>
</li>
`
);

TodoExample.init();
