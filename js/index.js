const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')

const url = 'https://v6.exchangerate-api.com/v6/aacbfd8276f71f627217b4ec/latest/USD'

const fetchExchangeRate = async () =>{
    try {
    const response = await fetch(url)
    const exchangeRateData = await response.json()

    if (exchangeRateData.result === 'error'){
        throw new Error('Could not get the information')
    }
        
    }catch(err){
        alert(err.message)
    }
}

fetchExchangeRate()

const option = `<option>oi</option>`

currencyOneEl.innerHTML = option
currencyTwoEl.innerHTML = option