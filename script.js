const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultDisplay = document.getElementById('result');

const apiKey = '0cf95299d4ef3415524aa2d221c47f4a'; // Your API key
const apiUrl = `http://data.fixer.io/api/latest?access_key=${apiKey}`; // Fixer.io endpoint

async function fetchCurrencyData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.rates; // Use data.rates for currency rates
}

async function populateCurrencyOptions() {
    const rates = await fetchCurrencyData();
    const currencyCodes = Object.keys(rates);

    // Set of example currencies to display
    const exampleCurrencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'NZD'];

    exampleCurrencies.forEach(code => {
        if (currencyCodes.includes(code)) {
            const option1 = document.createElement('option');
            option1.value = code;
            option1.textContent = code;
            fromCurrency.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = code;
            option2.textContent = code;
            toCurrency.appendChild(option2);
        }
    });
}

async function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = amountInput.value;

    if (amount && from !== to) {
        const rates = await fetchCurrencyData();
        const convertedAmount = (amount * rates[to] / rates[from]).toFixed(2);
        resultDisplay.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } else {
        resultDisplay.textContent = 'Please enter a valid amount and select different currencies.';
    }
}

convertBtn.addEventListener('click', convertCurrency);
populateCurrencyOptions();
