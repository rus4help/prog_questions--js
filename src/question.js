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