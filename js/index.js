const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')
const currenciesEl = document.querySelector('[data-js="currencies-container"]')

const url = 'https://v6.exchangerate-api.com/v6/aacbfd8276f71f627217b4ec/latest/USD'

const getErrormessage = errorType => ({
    'unsupported-code' : 'Currency does not exist in our database.',
    'malformed-request' : 'Your request endpoint needs to follow the following structure',
    'invalid-key' : 'API key is not valid.',
    'quota-reached' : 'Your account has reached the allowed request limit on your current plan.',
    'inactive-account' : 'Your email address was not confirme.'
})[errorType] || 'Could not get information.'

const fetchExchangeRate = async () =>{
    try {
    const response = await fetch(url)

    if (!response.ok) {
       throw new Error('No connection.') 
    }

    const exchangeRateData = await response.json()

    if (exchangeRateData.result === 'error'){
        throw new Error(getErrormessage(exchangeRateData['error-type']))
    }
        
    }catch(err){
        alert(err.message)
        const div = document.createElement('div')
        const button = document.createElement('button')

        div.textContent = err.message
        div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
        button.classList.add('btn-close')

        div.appendChild(button)
        currenciesEl.insertAdjacentElement('afterend', div)
        /*
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
           Mensagem do erro 
            <button type="button" class="btn-close"  aria-label="Close"></button>
        </div>
        */
    }
}

fetchExchangeRate()

const option = `<option>oi</option>`

currencyOneEl.innerHTML = option
currencyTwoEl.innerHTML = option