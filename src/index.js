let submit = document.getElementById('submit');

let checkbox;
let deleteButton;
let editButton;
let isChecked;
let currentTasks = JSON.parse(localStorage.getItem('tasksArray')) || [];

function mapArray() {
    submit.addEventListener('click', function() {
        let d = new Date();
        let id =  d.getTime();

        let lists = document.getElementById('lists');
        let newTask = document.createElement('div');
        checkbox = document.createElement('div');
        checkbox.className = 'checkbox';
        deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        editButton = document.createElement('button');
        editButton.className = 'editButton';

        let trashIcon = document.createElement('i');
        trashIcon.className = "fa fa-trash-o fa-lg";

        let pencilIcon = document.createElement('i');
        pencilIcon.className = "fa fa-pencil";

        deleteButton.append(trashIcon);

        editButton.append(pencilIcon);

        newTask.id = id;
        newTask.className = 'tasks';

        isChecked = false;

        let input = document.getElementById('input').value;

        if (input.length >= 1) {

            currentTasks.push({
                input,
                id,
                isChecked
            });
            localStorage.setItem('tasksArray', JSON.stringify(currentTasks));

            for (let i = 0; i < currentTasks.length; i++) {
                let currentTaskInput = currentTasks[i].input
                newTask.innerText = JSON.stringify(currentTaskInput).replace(/\"/g, "");

                newTask.appendChild(checkbox);
                newTask.appendChild(deleteButton);
                newTask.appendChild(editButton);
                lists.appendChild(newTask);
            }

            checkbox.addEventListener("click", function() {
                checkCheckbox(newTask);
            });

            deleteButton.addEventListener("click", function() {
                deleteTask(newTask);
            });

            editButton.addEventListener("click", function() {
                editButtonHandler(newTask)
            });


        }
    })

    function checkCheckbox(removedTask) {
        for (let i = 0; i < currentTasks.length; i++) {
            let checkbox = document.getElementsByClassName('checkbox')[i];

            if (currentTasks[i].id == removedTask.id) {

                if (checkbox.classList.contains('checked')) {
                    removedTask.classList.remove('textChecked');
                    checkbox.classList.remove('checked');
                    currentTasks[i].isChecked = false;
                } else {
                    removedTask.classList.add('textChecked');
                    checkbox.classList.add('checked');
                    currentTasks[i].isChecked = true;
                }
                
            }
            localStorage.setItem('tasksArray', JSON.stringify(currentTasks));
        }
    }

    function deleteTask(removedTask) {
        for (let i = 0; i < currentTasks.length; i++) {
            let currentTasksId = currentTasks[i];

            if (currentTasksId.id == removedTask.id) {
                currentTasks.splice(i, 1);
                removedTask.remove();
            }
            localStorage.setItem('tasksArray', JSON.stringify(currentTasks));
        }
    }

    function editButtonHandler(removedTask) {
        for (let i = 0; i < currentTasks.length; i++) {

            removedTask.setAttribute('contenteditable', 'true')

            if (currentTasks[i].id == removedTask.id) {
                document.getElementsByClassName('checkbox')[i].setAttribute("style", "display : none;");
                document.getElementsByClassName('deleteButton')[i].setAttribute("style", "display : none;");
                document.getElementsByClassName('editButton')[i].setAttribute("style", "display : none;");
            }

            let endEdit = document.getElementById('finishEditButton');
            endEdit.setAttribute('style', 'display : block')

            endEdit.addEventListener('click', function() {
                removedTask.setAttribute('contenteditable', 'false');
                document.getElementsByClassName('checkbox')[i].setAttribute("style", "display : block;");
                document.getElementsByClassName('deleteButton')[i].setAttribute("style", "display : block;");
                document.getElementsByClassName('editButton')[i].setAttribute("style", "display : block;");
                endEdit.setAttribute('style', 'display : none');
                if (currentTasks[i].id == removedTask.id) {
                    currentTasks[i].input = removedTask.innerText;
                }
                localStorage.setItem('tasksArray', JSON.stringify(currentTasks));
            })
        }
    }

    function renderCheckbox(finishedTask) {
        for (let i = 0; i < currentTasks.length; i++) {

            if (currentTasks[i].id == finishedTask.id) {

                if (currentTasks[i].isChecked == true) {
                    finishedTask.classList.add('textChecked');
                    checkbox.classList.add('checked');
                } else if(currentTasks[i].isChecked == false) {
                    finishedTask.classList.remove('textChecked');
                    checkbox.classList.remove('checked');
                }

            }

        }
    }


    document.addEventListener('DOMContentLoaded', function() {
        for (let i = 0; i < currentTasks.length; i++) {
            let lists = document.getElementById('lists');
            let newTask = document.createElement('div');
            checkbox = document.createElement('div');
            checkbox.className = 'checkbox';
            deleteButton = document.createElement('button');
            deleteButton.className = 'deleteButton';
            editButton = document.createElement('button');
            editButton.className = 'editButton';

            let trashIcon = document.createElement('i');
            trashIcon.className = "fa fa-trash-o fa-lg";

            let pencilIcon = document.createElement('i');
            pencilIcon.className = "fa fa-pencil";

            deleteButton.append(trashIcon);

            editButton.append(pencilIcon);

            let currentTaskInput = currentTasks[i].input;
            newTask.innerText = JSON.stringify(currentTaskInput).replace(/\"/g, "");

            let currentTasksId = currentTasks[i];
            let newTaskId = newTask;
            newTask.className = 'tasks';

            newTaskId.id = currentTasksId.id;

            newTask.appendChild(checkbox);
            newTask.appendChild(deleteButton);
            newTask.appendChild(editButton);
            lists.appendChild(newTask);

            checkbox.addEventListener("click", function() {
                checkCheckbox(newTask);
            });

            deleteButton.addEventListener("click", function() {
                deleteTask(newTask);
            });

            editButton.addEventListener("click", function() {
                editButtonHandler(newTask)
            });
            
            renderCheckbox(newTask)
        }
    }, false);

}

mapArray();