let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks();
    taskInput.value = '';
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const textSpan = document.createElement('span')
        textSpan.textContent = task.text;
        if (task.completed) {
            textSpan.classList.add('completed');
        }

        textSpan.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        })

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.backgroundColor = '#dc3545';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '4px';
        deleteBtn.style.padding = '5px 10px';

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent li click event from firing
            tasks.splice(index, 1); // Remove task from array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage
            renderTasks();
        });

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

    })

}
