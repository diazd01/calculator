//INPUT: 
let entry = document.querySelector('.entry');
let operators = document.querySelectorAll('.operators');
const numbers = document.querySelectorAll('.numbers');
const equals = document.querySelector('.equals');
const buttons = document.querySelectorAll('.btn');
//Variables:
entry.innerText = 0;
let arr = [];
let firstNum;
let secondNum;
let createdNum;
let operator;
let answer;

let currentOperator = {
    op: '', 
    active: false
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

    return entry.innerText = Math.round(answer * 100000000) / 100000000;
}


const createNumber = function (num) {

    if (arr.length < 9) {
        arr.push(num);
    }
    num = arr.join('');
    entry.innerText = num;
    return num;
};


//Events:
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        createdNum = createNumber(e.target.innerText);
    });
});

operators.forEach((op) => {
    op.addEventListener('click', (e) => {

        arr = [];
        // console.log(e);
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

        if (firstNum === undefined) {
            firstNum = createdNum;
            createdNum = undefined;
            currentOperator.op = operator;  
        } else if (secondNum === undefined) {
            secondNum = createdNum;
            createdNum = undefined;
        }

        if (firstNum !== undefined && secondNum !== undefined) {
            operate(firstNum, secondNum);
            secondNum = undefined;
            firstNum = answer;
            currentOperator.op = operator; 
            console.log(answer);
        }

        console.log(`${firstNum} ${secondNum}`);
    });

});

/* EQUALS SIGN EVENT */
equals.addEventListener('click', (e) => {
    if (firstNum === undefined) {
        firstNum = createdNum;
        createdNum = undefined;
    } else if (secondNum === undefined) {
        secondNum = createdNum;
        createdNum = undefined;
    } else {
        firstNum = answer;
    }

    if (firstNum !== undefined && secondNum !== undefined) {
        operate(firstNum, secondNum);
        console.log(answer);
    }
});