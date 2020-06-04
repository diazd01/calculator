//INPUT: 
let entry = document.querySelector('.entry');
let operators = document.querySelectorAll('.operators');
const numbers = document.querySelectorAll('.numbers');
const equals = document.querySelector('.equals');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');
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
    active: false,
};

//Functions:
const operate = function (a, b) {
    
    if (currentOperator.op === 'divide') {
        answer = a / b;
    } else if (currentOperator.op === 'multiply') {
        answer = a * b;
    } else if (currentOperator.op === 'subtract') {
        answer = a - b;
    } else if (currentOperator.op === 'add') {
        answer = parseFloat(a) + parseFloat(b);
    }
    if (answer === Infinity) {
        return entry.innerText = 'ERROR';
    }
    return entry.innerText = Math.round(answer * 100000000) / 100000000;
}


const createNumber = function (num) {

    if (arr.length < 9) {
        arr.push(num);
    }
    if (num === '.') {
        ++decimalCount;
    }
    if (decimalCount > 1 && num === '.') {
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
    document.body.style.backgroundColor = 'white';
}

//Events:
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        createdNum = createNumber(e.target.innerText);
        if(firstNum !== undefined && secondNum !== undefined) {
            firstNum = undefined;
        }
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


buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        document.body.style.backgroundColor = '#90EE90';
    });
});
