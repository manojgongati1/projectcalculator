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