// Start writing JavaScript here!
const calculator = document.querySelector(".calculator");
const calculatorButtonsDiv = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display")

calculatorButtonsDiv.addEventListener("click", event => {
  if (!event.target.closest("button")) return
  const button = event.target;
  const { buttonType, key } = button.dataset;
  const { previousButtonType } = calculator.dataset;
  const result = display.textContent;
  
  // Release operator pressed state
  const operatorKeys = [...calculatorButtonsDiv.children]
    .filter(button => button.dataset.buttonType === "operator");
  
  operatorKeys.forEach(button => button.classList.remove('is-pressed'));

  // Execution for each key on calculator:
  if (buttonType === "number") {
    if(result === '0') {
      display.textContent = key;
    } else {
      display.textContent = result + key;
    }
  }

  if (previousButtonType === "operator") {
    display.textContent = key;
  }

  if (buttonType === "operator") {
    button.classList.add('is-pressed');
    calculator.dataset.firstValue = result;
    calculator.dataset.operator = button.dataset.key;
  }

  if (buttonType === "decimal") {
    if (!result.includes(".")) {
      display.textContent = result + "."
    }
  }

  if (buttonType === "equal") {
    const firstValue = parseFloat(calculator.dataset.firstValue);
    const operator = calculator.dataset.operator;
    const secondValue = parseFloat(result);

    let newResult;
    if (operator === "plus") newResult = firstValue + secondValue;
    if (operator === "minus") newResult = firstValue - secondValue;
    if (operator === "times") newResult = firstValue * secondValue;
    if (operator === "divide") newResult = firstValue / secondValue;

    display.textContent = newResult;
  }

  if (buttonType !== "clear") {
    const clearButton = calculator.querySelector('[data-button-type=clear]');
    clearButton.textContent = "CE";
  }

  if (buttonType === "clear") {
    if (button.textContent === "AC") {
      delete calculator.dataset.firstValue;
      delete calculator.dataset.secondValue;
    }

    display.textContent = '0';
    button.textContent = "AC";
  }
  
  calculator.dataset.previousButtonType = buttonType
})

// Calculator Tests:
