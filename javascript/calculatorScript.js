// Define "input" boxes.
const currentInput = document.querySelector('#currentInput');
const storedInput = document.querySelector('#storedInput');

// Add event listeners to buttons.
const oneButton = document.querySelector('#oneButton');
oneButton.addEventListener('click', () => numberPressed('1'));

const twoButton = document.querySelector('#twoButton');
twoButton.addEventListener('click', () => numberPressed('2'));

const threeButton = document.querySelector('#threeButton');
threeButton.addEventListener('click', () => numberPressed('3'));

const fourButton = document.querySelector('#fourButton');
fourButton.addEventListener('click', () => numberPressed('4'));

const fiveButton = document.querySelector('#fiveButton');
fiveButton.addEventListener('click', () => numberPressed('5'));

const sixButton = document.querySelector('#sixButton');
sixButton.addEventListener('click', () => numberPressed('6'));

const sevenButton = document.querySelector('#sevenButton');
sevenButton.addEventListener('click', () => numberPressed('7'));

const eightButton = document.querySelector('#eightButton');
eightButton.addEventListener('click', () => numberPressed('8'));

const nineButton = document.querySelector('#nineButton');
nineButton.addEventListener('click', () => numberPressed('9'));

const zeroButton = document.querySelector('#zeroButton');
zeroButton.addEventListener('click', () => numberPressed('0'));

// Add event listeners for math operation buttons.
const addButton = document.querySelector('#addButton');
addButton.addEventListener('click', () => operationPressed('+'));

const subtractButton = document.querySelector('#subtractButton');
subtractButton.addEventListener('click', () => operationPressed('-'));

const multiplyButton = document.querySelector('#multiplyButton');
multiplyButton.addEventListener('click', () => operationPressed('*'));

const divideButton = document.querySelector('#divideButton');
divideButton.addEventListener('click', () => operationPressed('/'));

// Add event listener for decimal button.
const decimalButton = document.querySelector('#decimalButton');
decimalButton.addEventListener('click', () => decimalPressed());

// Add event listner for sign button.
const signButton = document.querySelector('#signButton');
signButton.addEventListener('click', () => signPressed());

// Event listener for backspace button.
const backspaceButton = document.querySelector('#backspaceButton');
backspaceButton.addEventListener('click', () => backspacePressed());

// Event listener for clear buttons.
const clearInputButton = document.querySelector('#clearInputButton');
clearInputButton.addEventListener('click', () => clearInputPressed());

const clearEntryButton = document.querySelector('#clearEntryButton');
clearEntryButton.addEventListener('click', () => clearEntryPressed());

//Event listener for equals button.
const equalsButton = document.querySelector('#equalsButton');
equalsButton.addEventListener('click', () => equalsPressed());

// Declare global variable to store math operations.
var operationArray = [];

// Function for when number button is pressed.
function numberPressed(newNumber) {
	if (storedInput.innerHTML.includes('=')) {
		storedInput.innerHTML = '';
		currentInput.innerHTML = newNumber;
		return;
	}
	if (currentInput.innerHTML == '0') {
		currentInput.innerHTML = newNumber;
		return;
	}
	currentInput.innerHTML = currentInput.innerHTML + String(newNumber);
	if (currentInput.innerHTML.length > 15) {
		alert("Ouch! Can you stop using so many digits?")
		clearEntryPressed();
	}
	return;
}

// Function for when operation button is pressed.
function operationPressed(newOperation) {
	if (storedInput.innerHTML.includes('=')) storedInput.innerHTML = '';
	newInput = getInput();
	storedInput.innerHTML = storedInput.innerHTML + 
		newInput + newOperation;
	currentInput.innerHTML = '0';
	operationArray.push(newInput);
	operationArray.push(newOperation);
	if (storedInput.innerHTML.length > 68) {
		alert("Whoa! Don't you think your input is a bit long? Do something shorter.");
		clearEntryPressed();
	}
	return;
}

// Function for adding decimal to input.
function decimalPressed() {
	if (!currentInput.innerHTML.includes('.')) {
		currentInput.innerHTML = currentInput.innerHTML + '.';
	}
	return;
}

// Function for changing sign of input.
function signPressed() {
	if (currentInput.innerHTML == '0') return;
	if (currentInput.innerHTML.includes('-')) {
		currentInput.innerHTML = currentInput.innerHTML.replace('-','');
		return;
	}
	currentInput.innerHTML = '-' + currentInput.innerHTML
	return;
}

// Function for backspace
function backspacePressed() {
	if (currentInput.innerHTML == '0') return;
	let newInput = currentInput.innerHTML.substring(0, 
		currentInput.innerHTML.length - 1);
	if (newInput == '' || newInput == '-') {
		currentInput.innerHTML = '0';
		return;
	}
	currentInput.innerHTML = newInput;
}

// Function for 'C' button.
function clearInputPressed() {
	currentInput.innerHTML = '0';
	return;
}

// Function for 'CE' button.
function clearEntryPressed() {
	storedInput.innerHTML = '';
	operationArray = [];
	clearInputPressed();
	return;
}

// Function for equals button.
function equalsPressed() {
	let lastInput = getInput();
	operationArray.push(lastInput);
	if (operationArray.length == 0 || storedInput.innerHTML.includes('=')) {
		storedInput.innerHTML = lastInput + '=';
		return;
	}
	storedInput.innerHTML = storedInput.innerHTML + lastInput + '=';
	// Do multiplication and division.
	while (operationArray.includes('*') || operationArray.includes('/')) {
		let nextOperationIndex = operationArray.findIndex((a) => {
			return (a == '*') || (a == '/'); 
		})
		let newOutput = 0;
		if (operationArray[nextOperationIndex] == '*') {
			newOutput = multiply(Number(operationArray[nextOperationIndex - 1]),
				Number(operationArray[nextOperationIndex + 1]));
		}
		else {
			if (Number(operationArray[nextOperationIndex + 1]) == 0) {
				alert("Hey you! Don't divide by zero, guy!");
				clearEntryPressed();
				return;
			}
			newOutput = divide(Number(operationArray[nextOperationIndex - 1]),
				Number(operationArray[nextOperationIndex + 1]));
		}
		operationArray.splice(nextOperationIndex - 1, 3, String(newOutput));
	}
	// Do addition and subtraction.
	while (operationArray.includes('+') || operationArray.includes('-')) {
		let nextOperationIndex = operationArray.findIndex((a) => {
			return (a == '+') || (a == '-'); 
		})
		let newOutput = 0;
		if (operationArray[nextOperationIndex] == '+') {
			newOutput = add(Number(operationArray[nextOperationIndex - 1]),
				Number(operationArray[nextOperationIndex + 1]));
		}
		else {
			newOutput = subtract(Number(operationArray[nextOperationIndex - 1]),
				Number(operationArray[nextOperationIndex + 1]));
		}
		operationArray.splice(nextOperationIndex - 1, 3, String(newOutput));
	}
	// Display output (or error if program messes up - shouldn't happen).
	if (operationArray.length > 1) {
		alert("ERROR - Math didn't parse correctly!");
		clearEntryPressed();
		return;
	}
	if (operationArray[0].length > 15) {
		operationArray[0] = operationArray[0].substring(0,15);
	}
	currentInput.innerHTML = operationArray[0];
	operationArray = [];
}

// Function to get input and remove unneeded decimals. (eg 12.->12)
function getInput() {
	let fixInput = currentInput.innerHTML;
	if (fixInput.charAt(fixInput.length - 1) == '.') {
		fixInput = fixInput.replace('.','');
	}
	return fixInput
}

// Basic math functions.
function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	if (b == 0) return 'ERROR';
	return a / b;
}