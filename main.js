//Variables' Selectors: 
let entry = document.querySelector('.entry');
let operators = document.querySelectorAll('.operators');
const numbers = document.querySelectorAll('.numbers');
const equals = document.querySelector('.equals');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.querySelector('.clear');
const plus_minus = document.querySelector('.plus-minus');
//Variables:
entry.innerText = 0;
let decimalCount = 0;
let arr = [];
let firstNum;
let secondNum;
let createdNum;
let operator;
let answer;
let equalsClicked = false;

const currentOperator = {
    op: '',
    active: false
};
//Functions:
const operate = function (a, b) {
    
    if (currentOperator.op === 'divide') {
        answer = a / b;
        if(b === '0') {
            document.body.style.background = '#CD5C5C'; 
            return entry.innerText = 'ERROR';
        }
    } else if (currentOperator.op === 'multiply') {
        answer = a * b;
    } else if (currentOperator.op === 'subtract') {
        answer = a - b;
    } else if (currentOperator.op === 'add') {
        answer = parseFloat(a) + parseFloat(b);
    }
    if (answer.toString().length > 10) {
        answer = answer.toPrecision(7);
    }
    return entry.innerText = answer;
}


const createNumber = function (num) {

    if (arr.length < 9 || arr.length < 10 && arr.includes('.')) {
        arr.push(num);
    }
    if (arr[0] === '0' && arr[1] === '0') {
       arr.pop();
    }
    if(arr[0] === '0' && arr.length > 1) {
        arr.shift();
    }
    if (num === '.') {
        ++decimalCount;
    }
    if (decimalCount > 1 && num === '.' && arr.length < 9) {
        arr.pop();
    }
    if (arr[0] === '.') {
        arr.unshift(0);
    }  
    num = arr.join('');
    entry.innerText = num;
    return num;
};

const defineNumbers = function () {
    if (firstNum === undefined) {
        firstNum = createdNum;
        createdNum = undefined;
    } else if (secondNum === undefined) {
        secondNum = createdNum;
        createdNum = undefined;
    } 
}

const clearCalculator = function () {
    entry.innerText = 0;
    decimalCount = 0;
    arr = [];
    firstNum = undefined;
    secondNum = undefined;
    createdNum = undefined;
    operator = undefined;
    answer = undefined;
    equalsClicked = false;
    currentOperator.active = false;
    document.body.style.background = 'white';
}
//Events:
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        createdNum = createNumber(e.target.innerText);
        if(firstNum !== undefined && secondNum !== undefined) {
            firstNum = undefined;
        }
        /* Style: */
        document.body.style.background = 'linear-gradient(to right, #2E8B57, #90EE90)';
    });
});

operators.forEach((op) => {
    op.addEventListener('click', (e) => {
        arr = [];
        decimalCount = 0;
        currentOperator.active = true;
        switch (e.target.innerText) {

            case '÷':
                operator = 'divide';
                break;
            case '×':
                operator = 'multiply';
                break;
            case '−':
                operator = 'subtract';
                break;
            case '+':
                operator = 'add';
                break;
            default:
                return;
        }
        if (equalsClicked) {
            secondNum = undefined;
        }
        
        defineNumbers();

        if (firstNum !== undefined && secondNum !== undefined) {
            operate(firstNum, secondNum);
            secondNum = undefined;
            firstNum = answer;
        }
        currentOperator.op = operator;
        console.log(`${firstNum} ${secondNum}`);
    });

});
/* EQUALS SIGN EVENT */
equals.addEventListener('click', (e) => {
    arr = [];
    equalsClicked = true;
    defineNumbers();
    if (!currentOperator.active) {
        return;
    }
    if (firstNum !== undefined && secondNum !== undefined) {
        operate(firstNum, secondNum);
        firstNum = answer;
    } else if (firstNum !== undefined && secondNum === undefined) {
        secondNum = firstNum;
        operate(firstNum, secondNum);
        firstNum = answer;
    } 
    console.log(`${firstNum} ${secondNum}`);
    console.log(answer);
});
/* CLEAR BUTTON EVENT: */
clearButton.addEventListener('click', (e) => {
    clearCalculator();
});
/* Keyboard support: 
(Still need to work on operator keys - number support only) */
document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key) || e.key === '.') {
        createdNum = createNumber(e.key);
    }
});
