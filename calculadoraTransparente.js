// Após apertar o sinal de igual.Ativar a função 
//A função além de trazer o resultado. 
// também colocará as informções do input1 para o input2
// Na sequencia ativar o alerta

// 👇👇👇👇👇👇👇👇 Desenvolvimento em HTML - RETORNAR CASO NECESARIO 👇👇👇👇

/* <input data-previous-operand  type="text" readonly class="value new" name="txt2" />
<input data-current-operand  type="text" readonly class="value" name="txt" />

<span data-all-clear class="num clear" onclick="document.calc.txt2.value = ''">AC</span>
<span data-operator class="num" onclick="document.calc.txt2.value +='/'">/</span>
<span data-operator class="num" onclick="document.calc.txt2.value +='*'">*</span>
<span data-number class="num" onclick="document.calc.txt2.value +='7'">7</span>
<span data-number class="num" onclick="document.calc.txt2.value +='8'">8</span>
<span data-number class="num" onclick="document.calc.txt2.value +='9'">9</span>
<span data-operatorclass="num" onclick="document.calc.txt2.value +='-'">-</span>
<span data-number class="num" onclick="document.calc.txt2.value +='4'">4</span>
<span data-number class="num" onclick="document.calc.txt2.value +='5'">5</span>
<span data-number class="num" onclick="document.calc.txt2.value +='6'">6</span>
<span data-operator class="num plus" onclick="document.calc.txt2.value +='+'">+</span>
<span data-number class="num" onclick="document.calc.txt2.value +='1'">1</span>
<span data-number class="num" onclick="document.calc.txt2.value +='2'">2</span>
<span data-number class="num" onclick="document.calc.txt2.value +='3'">3</span>
<span data-number class="num" onclick="document.calc.txt2.value +='0'">0</span>
<span data-number class="num" onclick="document.calc.txt2.value +='00'">00</span>
<span data-number class="num" onclick="document.calc.txt2.value +='.'">.</span>
<span data-equals class="num equal" onclick="document.calc.txt.value =  eval(calc.txt2.value)">=</span> */



const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
);


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calculate() {
        let result;
        let historico

        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);

        if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

        switch (this.operation) {
            case "+":
                result = _previousOperand + _currentOperand;
                historico += _previousOperand + _currentOperand
                window.prompt(`O resultado do Histórico da Calculadora:`, `${_previousOperand} + ${_currentOperand} = ${result} `)
                break;
            case "-":
                result = _previousOperand - _currentOperand;
                //alert (`${_previousOperand} - ${_currentOperand} = ${result} `)

                historico += (`${_previousOperand} - ${_currentOperand}`)
                window.prompt(`O resultado do Histórico da Calculadora:`, `${_previousOperand} - ${_currentOperand} = ${result} `)
                break;
            case "÷":
                result = _previousOperand / _currentOperand;
                //alert(` ${_previousOperand} ÷ ${_currentOperand} = ${result} `)

                historico += (`${_previousOperand} ÷ ${_currentOperand}`)
                window.prompt(`O resultado do Histórico da Calculadora:`, `${_previousOperand} ÷ ${_currentOperand} = ${result} `)

                break;
            case "x":
                result = _previousOperand * _currentOperand;
                //alert(`${_previousOperand} x ${_currentOperand} = ${result} `)

                historico += (`${_previousOperand} x ${_currentOperand}`)
                window.prompt(`O resultado do Histórico da Calculadora:`, `${_previousOperand} x ${_currentOperand} = ${result} `)
                break;
            default:
                return;
        }

        this.previousOperand = ""
        this.currentOperand = result
        this.operation = undefined;
        // this.previousOperand = "" //historico /* result.localStorage() */
        // localStorage.setItem("historico", result)

    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;

        if (this.previousOperand !== "") {
            this.calculate();
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
          this.previousOperand
        )} ${this.operation || ""}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(
            this.currentOperand
        );
    }
}

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
}

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});