// script.js
let currentInput = "";
let storedInput = "";
let currentOperation = null;

const display = document.getElementById('calcDisplay');

document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', (e) => {
        appendDigit(e.target.dataset.value);
        updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', (e) => {
        chooseOperation(e.target.dataset.value);
        updateDisplay();
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    compute();
    updateDisplay();
});

document.querySelector('.clear').addEventListener('click', () => {
    clear();
    updateDisplay();
});

function appendDigit(digit) {
    if (digit === '.' && currentInput.includes('.')) return;
    currentInput = currentInput + digit;
}

function chooseOperation(operation) {
    if (currentInput === '') return;
    if (storedInput !== '') compute();
    currentOperation = operation;
    storedInput = currentInput;
    currentInput = '';
}

function compute() {
    let computation;
    const prev = parseFloat(storedInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (currentOperation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if(current === 0) {
                alert('Cannot divide by zero!');
                clear();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    currentInput = computation.toString();
    currentOperation = null;
    storedInput = '';
}

function updateDisplay() {
    display.value = currentInput;
}

function clear() {
    currentInput = "";
    storedInput = "";
    currentOperation = null;
}
