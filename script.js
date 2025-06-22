//functions to add : storeTasks, AddTask, DeleteTask, EditTask, MarkComplete, retrieveTasks 
/*| Action        | Function                                                    |
| ------------- | ----------------------------------------------------------- |
| Page loads    | `retrieveTasks()` via `DOMContentLoaded`                    |
| Add task      | `addTask()` → `storeTasks()` → `displayTasks()`             |
| Mark complete | `toggleComplete(index)` → `storeTasks()` → `displayTasks()` |
| Delete task   | `deleteTask(index)` → `storeTasks()` → `displayTasks()`     |
*/

//ADD TASK Flow: 
    //attach click event listener to submit button 
    //when user hits submit, 
        //add task to array and localstorage
        //clear input field
        //add item to the li for UI display

        let tasks = [];
        const form = document.getElementById('todo-form');
       
        
        //wait for the DOM to load before accessing elements
        
        // Retrieve tasks from localStorage on page load
        //parse the JSON string into a JS array object
        //assign it to the global tasks variable
        //render the restored list
        document.addEventListener('DOMContentLoaded', function() {
            const storedTasks = localStorage.getItem('tasks');
            console.log('Stored tasks:', storedTasks);
            //!storedTasks handles the case where there are no tasks in localStorage 
            // i.e. localStorage.getItem('tasks') === null(happens when the user first visits the app)
           
            //JSON.parse(storedTasks).length === 0 handles the case when an empty array [] is stored (happens when
            //there is something saved, but it is an empty array[]. Example: user added and then deleted all tasks.)
            
            if (!storedTasks || JSON.parse(storedTasks).length === 0) {
                const todoList = document.getElementById('todo-list');
                todoList.innerHTML = '<li>No tasks available. Please add a task.</li>';
                return;
            } 
            // If tasks exist, parse them and display
            tasks = JSON.parse(storedTasks);
            console.log('Parsed tasks:', tasks);
            displayTasks();
            
        });
        // Function to display tasks in the UI
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const taskInput = document.getElementById('taskInput');
            const task = taskInput.value.trim();
            if (task) {
                addTask(task);
                taskInput.value = '';
                displayTasks();
            } else {
                return;
            }
        });


        function addTask(task) {
            tasks.push({
                text: task,
                completed: false
            });
            storeTasks();
        }


        function storeTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
       
        function displayTasks() {
            const todoList = document.getElementById('todo-list'); 
            console.log('Displaying tasks:', tasks);
             // Clear the existing list
             todoList.innerHTML = ''; 
             tasks.forEach((task, index) => {
                /*const li = document.createElement('li');
                li.textContent = task.text;
                console.log(`Task: ${task.text}, Completed: ${task.completed}`);
               
                li.className = task.completed ? 'completed' : '';
                li.addEventListener('click', function() {
                    toggleComplete(index);
                });
                todoList.appendChild(li);*/

                //create checkbox 
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('click', function() {
                    toggleComplete(index);
                });

                //create textnode
                const textNode = document.createTextNode(task.text);

                //build list item
                const li = document.createElement('li');
                li.appendChild(checkbox); //append checkbox to the li
                li.appendChild(textNode); //append text to the li
                li.className = task.completed ? 'completed' : ''; //apply class based on completion statu

               
                // Create and append the delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-button';
                li.appendChild(deleteButton); //append button to the li
                todoList.appendChild(li);

                deleteButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent the click from toggling completion
                    deleteTask(index);
                });
             });
           
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            //update the storage and Ui with the changes
            storeTasks();
            displayTasks();
        }
        function toggleComplete(index) {
            tasks[index].completed = !tasks[index].completed;
            console.log(`Task: ${tasks[index].text}, Completed: ${tasks[index].completed}`);
             //update the storage and Ui with the changes
             storeTasks();
             displayTasks();
        }

        


