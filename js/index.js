const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')

const url = 'https://v6.exchangerate-api.com/v6/aacbfd8276f71f627217b4ec/latest/USD'

fetch(url)

const option = `<option>oi</option>`

currencyOneEl.innerHTML = option
currencyTwoEl.innerHTML = option