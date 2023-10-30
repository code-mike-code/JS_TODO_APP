//  ZMIENNE GLOBALNE
let todoInput // miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo // info o braku zadań / konieczności wpisamia tekstu
let addBtn // przycisk ADD - dodaje nowe elementy do listy
let ulList // lista zadań / tagi UL
let newTodo // nowo dodany 'li', nowe zadanie

let popup // zmienna dla popup-a
let popupInfo // tekst w popup-ie, jak sie doda pusty tekst
let popupToEdit // edytowany Todo-s
let popupInput // input w popup-ie
let popupAddBtn // przycisk "zatwierdź" w popup-ie
let popupCloseBtn // przycisk "anuluj" w popup-ie

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
	// main bedzie wywoływała wszystkie funkcje
}
const prepareDOMElements = () => {
	// pobieramy wszystkie elementy
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}
const prepareDOMEvents = () => {
	// nadajemy nasłuchiwanie
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClickTool)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', editPopupText)
	todoInput.addEventListener('keyup', enterKey)
	popupInput.addEventListener('keyup', enterKeyPopup)
}

/*

FUNKCJA DODAWANIA NOWEGO ZADANIA:
1. utworzenie nowego elemntu 'li'
2. dodajemy nowy element 'li' do 'ul' listy
3. funkcje odpalamu na 'click' przyciskiem 'ADD'
4. przechwytujemy zawartość 'inputa' i u ieszczamy go w nowo utworzonym elemencie 'li'
5. blokada funkcji, aby nie dodawała do listy pustego 'todo-sa'

*/

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		createToolArea()

		ulList.append(newTodo)

		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Podaj treść zadania!'
	}
}

//  funkcja dodająca narzędzia do nowego zadania

const createToolArea = () => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')
	newTodo.append(toolsPanel)

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

// funkcja sprawdzająca kliknięcie w narzędzie

const checkClickTool = e => {
	if (e.target.matches('.complete')) {
		// console.log('completed');
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		// console.log('edit')
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		// console.log('delete')
		deleteTodo(e)
	}
}

// funkcja otwierająca popup-a do edycji zadań

const editTodo = e => {
	popupToEdit = e.target.closest('li')

	popupInput.value = popupToEdit.firstChild.textContent
	// console.log(popupToEdit.firstChild);
	popup.style.display = 'flex'
}

// funkcja zamykająca popup-a przyciskiem "anuluj"
const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

// funkcja edycji zadania w popup-ie, zapisująca zmiany przyciskiem "zatwierdź"
const editPopupText = () => {
	if (popupInput.value !== '') {
		popupToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Podaj jakąś treść!'
	}
}

// funkcja uwająca elemnty z listy za pomocą przycisku delete 'X'
const deleteTodo = e => {
	e.target.closest('li').remove()

	const allTodos = ulList.querySelectorAll('li')
	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań. '
	}
}

// dodawanie zadań za pomocą klawisza 'Enter' - keyboardEvent.code/key - w tym przypadku, aby wykorzystac drugi klawisz "Enter" na klawiaturze numerycznej
const enterKey = e => {
	if (e.key === 'Enter') {
		addNewTodo()
	}
}
// dodawanie zmian w zadańiach za pomocą klawisza "Enter" tak jak powyżej
const enterKeyPopup = e => {
	if (e.key === 'Enter') {
		editPopupText()
	}
}

// odpala funkcje po załadawaniu całej zawartości strony
document.addEventListener('DOMContentLoaded', main)
