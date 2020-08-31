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
                console.log(response)
            })
    }
}