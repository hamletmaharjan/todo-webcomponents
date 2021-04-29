
const template = document.createElement('template');
template.innerHTML = `
    <style>
    .completed {
        text-decoration:line-through;
    }
    #delete-btn {
        background-color:red;
        color:white;
        border:none;
        margin-left:10px;
    }
    button:hover {
        cursor:pointer;
    }
    </style>

    <li class="todo-item">
        <input type="checkbox"/>
        <label></label>
        <button id="delete-btn">&times;</button>
    </li>
`;


class TodoItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // this.todo = this.getAttribute('label');
        // console.log(this.todo);
        
    }

    connectedCallback() {
        this.shadowRoot.querySelector('input').addEventListener('change', (e)=> {
            console.log('change');
            this.dispatchEvent(new CustomEvent('onChange', {detail:{id:this.todo.id}}));
        });
        this.shadowRoot.querySelector('button').addEventListener('click', (e)=> {
            console.log('click');
            this.dispatchEvent(new CustomEvent('onDelete', {detail:{id:this.todo.id}}));
        });
    }

    set data(todo) {
        this.todo = todo;
        if(todo.completed) {
            this.shadowRoot.querySelector('input').setAttribute('checked', todo.completed);
            this.shadowRoot.querySelector('label').classList.add('completed');
        }
        this.shadowRoot.querySelector('label').innerHTML = todo.title;
    }
}

window.customElements.define('todo-item', TodoItem);