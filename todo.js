// массив задач
const task = [
    {
        id: '1',
        title: 'Title of test',
        description: 'Description of test task',
    },
    {
        id: '2',
        title: 'Title of 2 test',
        description: 'Description of 2 test task',
    }
];

// перевели массив с объектами в объект объектов
const ObjTask = task.reduce(function(res, current){
    res[current.id] = current;
    return res;
}, {});

// получаем элементы страницы
const totalCards = document.querySelector("#allCards");
const form = document.forms["newTask"];
const inputTitle = form.elements["titleNewTask"];
const inputDesc = form.elements["descriptionNewTask"];
const btn = form.elements["btnAddNewTask"];

// клик по кнопке Add
btn.addEventListener("click", clickBtnAddTask);

showAllTask(ObjTask);

function showAllTask (taskList){
    if(!taskList){
        console.error('Передайте задачу');
        return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach(el =>{
        const divNewTask = createTempForTask(el);
        fragment.appendChild(divNewTask);
        totalCards.appendChild(fragment);
    })
}

function createTempForTask({description, id, title} = {}){
    const div = document.createElement("div")
    div.classList.add("card");

    const div2 = document.createElement("div")
    div2.classList.add("card-body");

    const h5 = document.createElement("h5")
    h5.classList.add("card-title");
    h5.textContent = title;

    const p = document.createElement("p")
    div.classList.add("card-text");
    p.textContent = description;

    const button = document.createElement("button")
    button.classList.add("btn", "btn-danger");
    button.textContent = "Delete";

    div.appendChild(div2);
    div2.appendChild(h5);
    div2.appendChild(p);
    div2.appendChild(button);

    return div;
};

function clickBtnAddTask (e){
    e.preventDefault();
    const titleVal = inputTitle.value;
    const descVal = inputDesc.value;
    
    if (!titleVal || !descVal){
        alert("Введите данные в форму");
        return;
    }

    const newTask = addNewTask(titleVal, descVal);
    const divNewTask = createTempForTask(newTask);
    totalCards.insertAdjacentElement("afterbegin", divNewTask);
    form.reset();
}

// Добавляет новую задачу в общий список в виде объекта
function addNewTask (title, description){
    const newTask = {
        title,
        description,
        completed: false,
        id: `task-${Math.random()}`,
    }

    //Добавляем задачу в общий список задач
    ObjTask[newTask.id] = newTask;

    return {...newTask};
};