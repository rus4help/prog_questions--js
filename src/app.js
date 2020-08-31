import { Question } from './question'
import { getAuthForm } from './auth'
import { isValid, createModal } from './utils' // имортируем функцию для проверки валидации формы
import './styles.css'             // имортируем стили проекта

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const modalBtn = document.getElementById('modal-btn')

window.addEventListener('load', Question.renderList)
modalBtn.addEventListener('click', openModal)
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

function openModal() { // функция для отображения модального окна для входа в приложение
    createModal('Авторизация', getAuthForm())
    document.getElementById('auth-form').addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(event) {
    event.preventDefault()

    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    console.log(email, password)
}