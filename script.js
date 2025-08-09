let list=JSON.parse(localStorage.getItem('list'))||[];

const taskInput=document.getElementById('taskInput');
const addTaskBtn=document.getElementById('AddTaskBtn');
const taskList=document.getElementById('tasks');
addTaskBtn.addEventListener('click',()=>{
    const tasktext=taskInput.value.trim();
    if(tasktext===''){
        alert('Please Enter Task');
        return;
    }
   list.push({text : tasktext , completed:false});
   localStorage.setItem('list',JSON.stringify(list));
   
})
