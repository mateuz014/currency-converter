const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')
const currenciesEl = document.querySelector('[data-js="currencies-container"]')
const convertedValueEl = document.querySelector('[data-js="converted-value"]')
const valuePrecisionEl = document.querySelector('[data-js="conversion-precision"]')
const timesCurrencyOneEl = document.querySelector('[data-js="currency-one-times"]')

let internalExchangeRate = {}

const getUrl = currency => `https://v6.exchangerate-api.com/v6/aacbfd8276f71f627217b4ec/latest/${currency}`

const getErrormessage = errorType => ({
    'unsupported-code' : 'Currency does not exist in our database.',
    'malformed-request' : 'Your request endpoint needs to follow the following structure',
    'invalid-key' : 'API key is not valid.',
    'quota-reached' : 'Your account has reached the allowed request limit on your current plan.',
    'inactive-account' : 'Your email address was not confirme.'
})[errorType] || 'Could not get information.'

const fetchExchangeRate = async url =>{
    try {
    const response = await fetch(url)

    if (!response.ok) {
       throw new Error('No connection.') 
    }

    const exchangeRateData = await response.json()

    if (exchangeRateData.result === 'error'){
        throw new Error(getErrormessage(exchangeRateData['error-type']))
    }
     return exchangeRateData   
    }catch(err){
        alert(err.message)
        const div = document.createElement('div')
        const button = document.createElement('button')

        div.textContent = err.message
        div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
        div.setAttribute('role', 'alert')
        button.classList.add('btn-close')
        button.setAttribute('type', 'button')  
        button.setAttribute('aria-label', 'Close')

        button.addEventListener('click', () => {
            div.remove()
        })

        div.appendChild(button)
        currenciesEl.insertAdjacentElement('afterend', div)
    }
}

const init = async () => {
       internalExchangeRate = { ...(await fetchExchangeRate(getUrl('USD')))}

    const getOptions = selectedCurrency => Object.keys(internalExchangeRate.conversion_rates).map(currency => `<option ${currency === selectedCurrency ? 'selected' : ''}>${currency}</option>`).join('')

currencyOneEl.innerHTML = getOptions('USD')
currencyTwoEl.innerHTML = getOptions('EUR')

convertedValueEl.textContent = internalExchangeRate.conversion_rates.EUR.toFixed(2)
valuePrecisionEl.textContent = `1 USD = ${internalExchangeRate.conversion_rates.EUR} EUR`
}

timesCurrencyOneEl.addEventListener('input', e => {
    internalExchangeRate
   convertedValueEl.textContent = (e.target.value * internalExchangeRate.conversion_rates[currencyTwoEl.value]).toFixed(2)
})

currencyTwoEl.addEventListener('input', e => {
    const currencyTwoValue = internalExchangeRate.conversion_rates[e.target.value]

    convertedValueEl.textContent = (timesCurrencyOneEl.value * currencyTwoValue).toFixed(2)
    valuePrecisionEl.textContent = `1 USD = ${1 * internalExchangeRate.conversion_rates[currencyTwoEl.value]} ${currencyTwoEl.value}`
})

currencyOneEl.addEventListener('input', async e => {
  internalExchangeRate = {...(await fetchExchangeRate(getUrl(e.target.value)))
  }

convertedValueEl.textContent = (timesCurrencyOneEl.value * internalExchangeRate.conversion_rates[currencyTwoEl.value]).toFixed(2)
})

init()

