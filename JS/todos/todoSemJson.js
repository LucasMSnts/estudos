var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todos = [
    'Fazer café',
    'Estudar Javascript',
    'Acessar comunidade da Rockeseat'
];

function renderTodos() {
    listElement.innerHTML = '';

    for (todo of todos) { // percorre o array 'todos' e salva no array 'todo'  
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');

        linkElement.setAttribute('href', '#');

        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

        var linkText = document.createTextNode('Excluir');

        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);

        listElement.appendChild(todoElement);
    }
}

renderTodos();

// Adicionar itens na lista
function addTodo() {
    var todoText = inputElement.value;

    todos.push(todoText);
    inputElement.value = ''; // Zerar a lista
    renderTodos(); // Chamar a lista novamente
    saveToStorage();
}

buttonElement.onclick = addTodo;

// Deletar itens da lista
function deleteTodo(pos) {
    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

// Salvar no storage para não perder os dados quando recarregar
function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}