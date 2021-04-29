var todos = [
    {id:1, title: "Do Some Work", completed: false},
    {id:2, title: "Make a cup of coffee", completed:false},
    {id:3, title: "Do the kick", completed: true}
]





const todoTemplate = document.createElement('template');
todoTemplate.innerHTML = `
    <style>
    * {
        font-family: 'Arial', sans-serif;
    }
    ul {
        list-style-type: none;
        padding:5px;
    }
    
    #add-btn {
        margin-left:10px;
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
    <div>
        <h1>Todo app</h1>
        <input id="todo-input" type="text"/><button type="button" name="add_button" id="add-btn">Add</button>
        <h3></h3>
        <ul id="#list">
        </ul>
    </div>
`
class Todo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(todoTemplate.content.cloneNode(true));
        this.input = this.shadowRoot.querySelector('input');
        this.counter = todos.length;
        // this.shadowRoot.querySelector()
    }

    connectedCallback() {
        
        this.render();
        
        this.shadowRoot.querySelector('#add-btn').addEventListener('click', (e) =>{ this.addTodo(e)});
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#add-btn').removeEventListener();
    }

    render() {
        let myUl = this.shadowRoot.querySelector("ul");
        myUl.innerHTML = '';
        todos.forEach(item => {
            let child = document.createElement('li');
            let todoItem = document.createElement('todo-item');
            todoItem.setAttribute('label', item.title);
            todoItem.data = item;
            todoItem.addEventListener('onChange', (e) => {
                this.toggleTodo(e.detail.id)
            });
            todoItem.addEventListener('onDelete', (e) => {
                console.log('delete');
                this.deleteTodo(e.detail.id)
            });
            myUl.appendChild(todoItem);
            // console.log(todoItem);
            // child.appendChild(todoItem)
            // child.innerHTML = item.title;

            // let article = document.createElement('app-article');
            // article.setAttribute('title', item.title);
            // myUl.appendChild(article);

            // let checkbox = document.createElement('input');
            // checkbox.setAttribute('type', 'checkbox');
            // checkbox.addEventListener('change', (e) => {
            //     this.toggleTodo(item.id);
            // });
            // if(item.completed){
            //     checkbox.setAttribute('checked', item.completed);
            // }
            // let label = document.createElement('label');
            // if(item.completed){
            //     label.style.textDecoration = 'line-through';
            // }
            // label.innerHTML = item.title;
            // let button = document.createElement('button');
            // button.setAttribute('id', 'delete-btn');
            // button.innerHTML = '&times;';
            // button.addEventListener('click', (e)=>this.deleteTodo(item.id));
            
            // child.appendChild(checkbox);
            // child.appendChild(label);
            // child.appendChild(button);
            // myUl.appendChild(child);
        });

    }

    deleteTodo = (id) => {
        for (let i=0; i<todos.length; i++){
            if(todos[i]["id"] == id){
                todos.splice(i,1);
            }
        }
        console.log(id);
        this.render();
    }

    addTodo = (e) => {
        console.log(this.input.value);
        this.counter+=1;
        todos.push({id:this.counter, title:this.input.value, completed:false});
        this.render();
    }
    
    toggleTodo = (id) => {
        for (let i=0; i<todos.length; i++){
            if(todos[i]["id"] == id){
                todos[i].completed = !todos[i].completed;
                console.log(todos[i].completed);
            }
        }
        this.render();
    }
}

window.customElements.define('app-todo', Todo);