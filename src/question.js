export class Question {
    static create(question) {
        return fetch('https://prog-questions--js.firebaseio.com/questions.json', {
            method: 'POST', // метод создания объекта
            body: JSON.stringify(question), // оборачиваем вопрос в JSON формат
            headers: { // указываем нужные заголовки
                'Content-Type': 'application/json'
            }
        }) // метод fetch возвращает promise
            .then(response => response.json()) // приводит ответ к json формату
            .then(response => {
                question.id = response.name // создаём у объекта id и присваиваем ему name у объекта response
                return question // возвращаем весь объект вместе с id
            })
            .then(addToLocalStorage) // добавляем данные в локальное хранилище
            .then(Question.renderList)
    }

    static renderList() {
        const questions = getQuestionsFromLocalStorage() // содержит массив всех вопросов

        const html = questions.length // формируем html для отображения вопросов
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">Вы пока ничего не спрашивали...</div>`

        const list = document.getElementById('list')
        list.innerHTML = html
    }
}

function addToLocalStorage(question) { // функция для добавления информации в локальное хранилище
    const all = getQuestionsFromLocalStorage()              // содержит массив всех вопросов
    all.push(question)                                      // добавляем новый вопрос в конец массива
    localStorage.setItem('questions', JSON.stringify(all))  // обновляем локальное хранилище новым массивом вопросов
}

function getQuestionsFromLocalStorage() { // функция получения всех вопросов из локального хранилища
    return JSON.parse(localStorage.getItem('questions') || '[]') // возвращаем все вопросы в массиве или пустой массив
}

function toCard(question) {
    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>
            ${question.text}
        </div>
        <br>
    `
}