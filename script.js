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
            e.stopPropagation(); // Prevent click from triggering task completion
            tasks.splice(index, 1); // Remove task at this index from array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks
            renderTasks();
        });
        
       
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li); 
    });
}

// Step 12: Add task on button click
// Runs addTask when the "Add Task" button is clicked
addTaskBtn.addEventListener('click', addTask);

// Step 13: Add task on Enter key press
// Runs addTask when the Enter key is pressed in the input field
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
    }
});


clearAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all tasks?')) { // Ask for confirmation
        tasks = []; // Empty the tasks array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save empty array
        renderTasks(); 
    }
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active')); // Remove active style from all buttons
        button.classList.add('active'); // Add active style to clicked button
        currentFilter = button.dataset.filter; // Set the current filter (all, active, completed)
        renderTasks(); 
    });
});


renderTasks();
