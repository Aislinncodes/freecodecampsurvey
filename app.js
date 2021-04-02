const toggleBtn = document.querySelector('#toggleBtn');
const smileyFace = document.querySelector('#smileyFace');

toggleBtn.addEventListener('click', () => {
  if(smileyFace.style.display === 'none') {
      smileyFace.style.display = 'block';
  } else {
    smileyFace.style.display = 'none';
  }
});

//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions


function addTodo(event){
      //Prevent form from submitting b/c this button is type submit
    event.preventDefault();
    //Todo DIV - create the element div to do list in when todoButton is clicked
    const todoDiv = document.createElement('div');
    //Adding the class of todo to this created div
    todoDiv.classList.add('todo');
    //create li - the list items in the todoDiv
    const newTodo = document.createElement('li')
    //adding li items by attaching to todoput's value(node method)
    newTodo.innerText = todoInput.value;
    //adding class todo item to li items
    newTodo.classList.add('todo-item');
    //making new Todo items stick to todoDiv ( child elements stick to parent - div is the parent of the li todos)
    todoDiv.appendChild(newTodo);
    //Add TODO TO LOCAL STORAGE - before string turns to nothing
    saveLocalTodos(todoInput.value);


    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    //adding this i tag for the button inside the html
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    //adding this button's class
    completedButton.classList.add('completed-btn');
    //making button stick next to list items
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    //adding this i tag for the button inside the html
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    //adding this button's class
    trashButton.classList.add('trash-btn');
    //making button stick next to list items
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //clear todo input value after submit
    todoInput.value = "";
}

function deleteCheck(e){
  const item = e.target;
  //delete todo - if clicked on the trash btn item ( look up the index 0 in the classList) is removed. Todo is parent to item so whole todo element is removed
  if(item.classList[0] === 'trash-btn'){
      const todo = item.parentElement;
      //animation for delete - transition-end set to remove todos after fall
      todo.classList.add('fall');
      todo.addEventListener('transitionend', function(){
        todo.remove();
      });
  }

  //Check mark
  if(item.classList[0] === 'completed-btn'){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e){
  const todos = todoList.childNodes;
 todos.forEach(function(todo){
   switch(e.target.value){
     case "all":
       todo.style.display = 'flex';
       break;
     case "completed":
         if(todo.classList.contains('completed')){
           todo.style.display = 'flex';
         } else {
           todo.style.display = 'none';
         }
       break;  
     case "uncompleted":
       if(!todo.classList.contains('completed')){
        todo.style.display = 'flex';
      } else {
        todo.style.display = 'none';
      }
      break;
   }
 })
}

function saveLocalTodos(todo){
  //check--hey do I already have things in there? - if null no info then create empty array - else parse info to localstorage todos
  let todos;
  if(localStorage.getItem('todos') === null){
    todos =[];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  // push the todo items into localstorage and convert to a string
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
  let todos;
  //Is there something in local storage?
  if(localStorage.getItem('todos') === null){
    todos =[];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function(todo){
    //Todo DIV - create the element div to do list in when todoButton is clicked
    const todoDiv = document.createElement('div');
    //Adding the class of todo to this created div
    todoDiv.classList.add('todo');
    //create li - the list items in the todoDiv
    const newTodo = document.createElement('li')
    //getting value from localstorage
    newTodo.innerText = todo;
    //adding class todo item to li items
    newTodo.classList.add('todo-item');
    //making new Todo items stick to todoDiv ( child elements stick to parent - div is the parent of the li todos)
    todoDiv.appendChild(newTodo);
    
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    //adding this i tag for the button inside the html
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    //adding this button's class
    completedButton.classList.add('completed-btn');
    //making button stick next to list items
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    //adding this i tag for the button inside the html
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    //adding this button's class
    trashButton.classList.add('trash-btn');
    //making button stick next to list items
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo){
  let todos;
  //Is there something in local storage?
  if(localStorage.getItem('todos') === null){
    todos =[];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = todo
}








