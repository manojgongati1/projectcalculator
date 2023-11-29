let currentOperand = '';
let previousOperand = '';
let operation = null;

function updateDisplay() {
    document.getElementById('display').innerText = currentOperand || '0';
}

function appendNumber(number) {
    if (currentOperand.length >= 8) {
        displayError();
        return;
    }
    if (number === '.' && currentOperand.includes('.')) return; // Prevents multiple decimals
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(selectedOperation) {
    if (currentOperand === '' && previousOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand += ' ' + operation;
    updateDisplay();
    currentOperand = ''; // Ready to accept the next number
}


function calculate() {
    let calculation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            calculation = prev + current;
            break;
        case '-':
            calculation = prev - current;
            break;
        case '*':
            calculation = prev * current;
            break;
        case '/':
            calculation = prev / current;
            break;
        default:
            return;
    }

    if (calculation.toString().length > 8) {
        displayError();
        return;
    }

    currentOperand = `${previousOperand} ${operation} ${currentOperand} = ${calculation.toString().substring(0, 8)}`;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}
function calculateSquareRoot() {
    if (currentOperand === '') return;
    let value = parseFloat(currentOperand);
    if (isNaN(value) || value < 0) {
        displayError();
        return;
    }
    currentOperand = `√${currentOperand} = ${Math.sqrt(value).toString().substring(0, 8)}`;
    updateDisplay();
    currentOperand = '';
    previousOperand = '';
    operation = null;
}

function calculateLog() {
    if (currentOperand === '') return;
    let value = parseFloat(currentOperand);
    if (isNaN(value) || value <= 0) {
        displayError();
        return;
    }
    // Use Math.log10 for common logarithm (base 10)
    const result = Math.log10(value).toFixed(8);
    currentOperand = `log(${currentOperand}) = ${result}`;
    updateDisplay();
}

function calculateFactorial() {
    if (currentOperand === '') return;
    let value = parseInt(currentOperand);
    if (isNaN(value) || value < 0 || value > 170) { // Limiting to avoid large numbers
        displayError();
        return;
    }
    let result = factorial(value);

    // Convert the result to scientific notation
    result = result.toExponential(6); // Adjust the precision as needed
    currentOperand = `${currentOperand}! = ${result}`;
    updateDisplay();
    currentOperand = '';
    previousOperand = '';
    operation = null;
}

function factorial(num) {
    if (num === 0 || num === 1) return 1;
    for (let i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}

function updateDisplay() {
    if (currentOperand !== '') {
        document.getElementById('display').innerText = currentOperand;
    } else if (previousOperand !== '' && operation !== null) {
        document.getElementById('display').innerText = `${previousOperand} ${operation}`;
    } else {
        document.getElementById('display').innerText = '0';
    }
}



function clearDisplay() {
    if (currentOperand !== '') {
        currentOperand = currentOperand.toString().slice(0, -1);
    }
    updateDisplay();
}
function changeSign() {
    if (currentOperand.startsWith('-')) {
        currentOperand = currentOperand.substring(1);
    } else if (currentOperand !== '') {
        currentOperand = '-' + currentOperand;
    }
    updateDisplay();
}
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return; // Prevents multiple decimals

    // Check and limit decimal places to 3
    if (number === '.' || currentOperand.includes('.')) {
        const parts = currentOperand.split('.');
        if (parts.length === 2 && parts[1].length >= 3) return;
    }

    if (currentOperand.length >= 8) {
        displayError();
        return;
    }

    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}


function clearAll() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function displayError() {
    document.getElementById('display').innerText = 'ERR';
    setTimeout(() => {
        updateDisplay();
    }, 2000);
}
