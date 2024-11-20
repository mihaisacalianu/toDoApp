// event listener to load all page contents first then run code
window.addEventListener('DOMContentLoaded',init)
//init() initialize the hole app
function init(){
    //variables declaration
    var textInput = document.getElementById('input-text');
    var btn = document.getElementById('new-task');
    var taskText = document.querySelector('.task-text');
    var clicked = false;

    //event listener which listens for enter being pressed
    document.addEventListener('keypress',function(e){
        if(clicked) {
            var keynum = e.keyCode || e.which;
            if(keynum == 13) {
              clicked = false; 
              createTask();}
    }});

    btn.addEventListener('click',createTask);

    // creates a task
    function createTask (){
        clicked = true;
        let p = textInput.value.trim();
        if(p === ''){
            alert('You must enter a taks!')
        }else
        var newElement = document.createElement('p');
        var deleteButton = document.createElement('div');
        var checkbox = document.createElement('div');

        newElement.classList.add('newTask-text');
        checkbox.classList.add('checkbox');
        deleteButton.classList.add("delete-button");

        newElement.innerHTML = p;
        checkbox.innerHTML = '<input type="checkbox">';
        deleteButton.innerHTML = '<button>delete</button>';
        
        taskText.appendChild(newElement);
        taskText.appendChild(checkbox);
        taskText.appendChild(deleteButton);
        textInput.value = '';
        saveToLocalStorage();
        deleteButton.addEventListener('click',
            function(){
                taskText.removeChild(newElement);
                taskText.removeChild(checkbox);
                taskText.removeChild(deleteButton);
                saveToLocalStorage();
            });
        let inputCheckBox = checkbox.firstChild;
        inputCheckBox.addEventListener('change',function(){
            if(this.checked){
                newElement.style.textDecoration = 'line-through';
            }else{
                newElement.style.textDecoration = 'none';
            }
        })
    };
    
 function saveToLocalStorage(){
    let tasks = [];
    taskText.querySelectorAll('p').forEach(function(item){
        tasks.push(item.textContent.replace('Delete','').trim());
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
 }
//  function loadTasks(){
//     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     tasks.forEach(createTask());
//  }
// loadTasks();
}
