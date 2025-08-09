let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';


const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');
const filterButtons = document.querySelectorAll('.filterBtn');

function addTask() {
    const taskText = taskInput.value.trim(); 
    
    if (taskText === '') { 
        alert('Please enter a task!'); 
        return;
    }
    
    tasks.push({ text: taskText, completed: false }); 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    renderTasks();
    taskInput.value = '';
}


function renderTasks() {
    taskList.innerHTML = '';
    let filteredTasks = tasks; 
  
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed); 
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed); 
    }
    

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li'); 
        
   
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text; 
        if (task.completed) { 
            taskSpan.classList.add('completed'); 
        }
        
      
        taskSpan.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed; 
            localStorage.setItem('tasks', JSON.stringify(tasks)); 
            renderTasks(); 
        });
        
      
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete'; 
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.backgroundColor = '#dc3545'; 
        deleteBtn.style.color = 'white'; 
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '4px'; 
        deleteBtn.style.padding = '5px 10px'; 
       
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            tasks.splice(index, 1); 
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });
        
       
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li); 
    });
}

 
addTaskBtn.addEventListener('click', addTask);

 
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
    }
});


clearAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all tasks?')) {  
        tasks = []; // Empty the tasks array
        localStorage.setItem('tasks', JSON.stringify(tasks));  
        renderTasks(); 
    }
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));  
        button.classList.add('active');  
        currentFilter = button.dataset.filter;  
        renderTasks(); 
    });
});


renderTasks();

