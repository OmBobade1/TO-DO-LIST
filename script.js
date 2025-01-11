document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    
    if (task) {
      fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task })
      })
      .then(response => response.json())
      .then(tasks => {
        taskInput.value = '';
        renderTasks(tasks);
      });
    }
  });
  
  function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
  
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `${task.task} <button onclick="deleteTask(${task.id})">Delete</button>`;
      taskList.appendChild(li);
    });
  }
  
  function deleteTask(id) {
    fetch(`/tasks/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(tasks => {
      renderTasks(tasks);
    });
  }
  
  // Load existing tasks from the server
  fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
      renderTasks(tasks);
    });
  