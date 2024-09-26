
  const display = document.querySelector('.display');
  let currentInput = '';
  let previousInput = '';
  let operator = '';

  // Function to update the display
  function updateDisplay() {
    display.textContent = currentInput || '0';
  }

  // Function to handle number button clicks
  function handleNumber(number) {
    if (currentInput.length < 15) { // Limit input length
      currentInput += number;
      updateDisplay();
    }
  }

  // Function to handle operator button clicks
  function handleOperator(op) {
    if (currentInput === '') return;

    if (previousInput !== '' && operator) {
      currentInput = String(calculate(previousInput, currentInput, operator));
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
  }

  // Function to calculate the result
  function calculate(prev, curr, op) {
    const prevNum = parseFloat(prev);
    const currNum = parseFloat(curr);
    
    switch (op) {
      case '+':
        return prevNum + currNum;
      case '−': // Make sure to use the correct minus symbol
        return prevNum - currNum;
      case '×':
        return prevNum * currNum;
      case '÷':
        return prevNum / currNum;
      case '%':
        return prevNum % currNum;
      case '^':
        return Math.pow(prevNum, currNum);
      default:
        return currNum;
    }
  }

  // Function to handle equal button click
  function handleEqual() {
    if (previousInput === '' || currentInput === '') return;

    currentInput = String(calculate(previousInput, currentInput, operator));
    operator = '';
    previousInput = '';
    updateDisplay();
  }

  // Function to handle clear button click
  function handleClear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
  }

  // Attach event listeners to buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent.trim();

      if (!isNaN(value) || value === '.') {
        handleNumber(value);
      } else if (['+', '−', '×', '÷', '%', '^'].includes(value)) {
        handleOperator(value);
      } else if (value === '=') {
        handleEqual();
      } else if (value === 'AC') {
        handleClear();
      }
    });
  });

  // Initial display
  updateDisplay();

