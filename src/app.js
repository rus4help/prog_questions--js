import { Question } from './question'
import { isValid } from './utils' // имортируем функцию для проверки валидации формы
import './styles.css'             // имортируем стили проекта

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value) // отключаем кнопку, если форма не валидна
})

function submitFormHandler(event) {
    event.preventDefault() // отменяем действие кнопки по умолчанию

    if (isValid(input.value)) { // проверяем, если валидация формы прошла,
        const question = {      // создаём объект вопроса
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true // блокируем кнопку для предотвращения спама отправки данных до завершения самой отправки
        // После получение данных нужно асинхронно отправить данные на сервер для сохранения
        Question.create(question).then(() => {
            input.value = ''        // после завершения отправки запроса очищаем форму
            input.className = ''    // очищаем ненужные классы у поля
            submitBtn.disabled = false  // делаем кнопку активной 
        })
    }
}