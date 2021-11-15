console.log('App Js loaded successfully')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const form = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

const makeLocationRequest = (address) => fetch('/weather?address=' + address).then((response) => {
    response.json().then((data) => {
        if (data.errors) {
            message1.textContent = 'Error fetching weather for location ' + address
            message2.textContent = data.errors
        } else {
            message1.textContent = data.location
            message2.textContent = data.forecast
        }
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    message1.textContent = 'Loading....'
    message1.textContent = ''
    console.log(makeLocationRequest(location))
})