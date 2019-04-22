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

// Event listener for C button - clears input.
const clearInputButton = document.querySelector('#clearInputButton');
clearInputButton.addEventListener('click', () => clearInputPressed());

const clearEntryButton = document.querySelector('#clearEntryButton');
clearEntryButton.addEventListener('click', () => clearEntryPressed());

// Function for when number button is pressed.
function numberPressed(newNumber) {
	if (currentInput.innerHTML == '0') {
		currentInput.innerHTML = newNumber;
		return;
	}
	currentInput.innerHTML = currentInput.innerHTML + String(newNumber);
	return;
}

// Function for when operation button is pressed.
function operationPressed(newOperation) {
	var fixInput = currentInput.innerHTML;
	if (fixInput.charAt(fixInput.length - 1) == '.') {
		fixInput = fixInput.replace('.','');
	}
	if (storedInput.innerHTML == '') {
		storedInput.innerHTML = fixInput + newOperation;
		currentInput.innerHTML = '0';
		return;
	}
	storedInput.innerHTML = storedInput.innerHTML + 
		fixInput + newOperation;
		currentInput.innerHTML = '0';
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
	var newInput = currentInput.innerHTML.substring(0, 
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
	clearInputPressed();
	return;
}

// Function for equals button.
function equalsPressed() {
	// https://stackoverflow.com/questions/3559883/javascript-split-regex-question
}