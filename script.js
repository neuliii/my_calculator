

/* [element] 선택 - getElementsByClassName은 HTMLCollection을 반환합니다.
                   HTMLCollection은 NodeList와 달리 forEach 메서드를 지원하지 않습니다.
                   따라서, 아래 코드에서 button.forEach를 사용할 수 없어 오류가 발생합니다.*/
const calculatorContainer = document.querySelector('.calculator-container');
const calculatorDisplay = document.querySelector('.calculator-display');
const calculatorButtons = document.querySelector('.calculator-buttons'); // 버튼 화면 블럭 전체
const button = document.querySelectorAll('.button'); // 버튼 전체 공통 class
const fn = document.querySelectorAll('.function'); // M+ , M-, MRC, GT, AC, +/-, %
//const operator = document.querySelectorAll('.operator'); // (+, -, *, /)
const number = document.querySelector('.number'); // number 숫자 전체
const zero = document.querySelector('.zero'); // 0 버튼 단독
const dot = document.querySelector('.dot'); // . 버튼 단독



// 초기 변수 설정 - 문자열로 지정(옆으로 쭉 문자열처럼 쓰여져야 하기 때문에)
let defaultNum = ''; // 초기 화면 숫자 저장
let firstOperand = null; // 첫번째 숫자 저장
let operator = null; // 연산자 저장
let shouldResetDisplay = false; // 연산자 선택 후 숫자 저장

// 초기 변수 화면에 띄우기
calculatorDisplay.textContent = defaultNum;

// 숫자 버튼 눌렀을 때 나타내기

// 함수 [calNum] - 숫자 연산 결과 값 나타내주기


// 함수 [clear] - AC 버튼 눌렀을 떄 기존 입력값은 지워지고 0 나타내주기.
function clear(){
    defaultNum = '';

    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;

    calculatorDisplay.textContent = '0';
}

// 함수 [dotSet] - 소수점 나타내주기. 1개 이상 나오지 않게.
function dotSet (){
    if(defaultNum.includes('.')){
        return
    }else{
        defaultNum += '.';
        calculatorDisplay.textContent = defaultNum;
    }

}

// 연산 수행 함수
function calculate(first, second, operator) {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);

    if (isNaN(num1) || isNaN(num2)) return null; // 숫자가 아닐 경우 연산하지 않음

    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case 'x': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : 'error'; // 0나누기 방지
        default: return null;
    }
}

// [storage] -  저장




// 버튼이 클릭되었을 때, 해당 버튼의 값을 콘솔에 출력.
button.forEach((cBtn) => {
    cBtn.addEventListener('click',(event) => {
        event.preventDefault();

        const target = event.target;
        const value = target.value; // 클릭한 버튼에 대한 value 값 가져오기

        console.log(target) // 확인용 -  9버튼 누르면     =>    <button class="button number" value="9">9</button>
        console.log(`클릭한 버튼: ${value}`);

        // 10글자 이상 작성 불가
        if (defaultNum.length >= 10) {
            return; // 더 이상 입력하지 않음
        }

        // 함수 [clear]
        if(value === 'AC'){
            clear(); // clear 함수 호출
            return // 이후 코드 실행하지 않음 !!!!!!!!!!!!
        }

        // 함수 [dotSet]
        if(value === '.'){
            dotSet(); // dotSet 함수 호출
            return // 이후 코드 실행하지 않음 !!!!!!!!!!!!
        }

        // display에 숫자 표시해주기 (number, zero  class 만 ! )
        if (target.classList.contains('number') || target.classList.contains('zero')) {
            // 해당 타겟에 클래스네임이 'number' 또는 'zero'가 contains(포함)되어 있는 지 유무(true, false)

            if(shouldResetDisplay){
                defaultNum = '';
                shouldResetDisplay = false;
            }

            defaultNum += value; // 입력된 값을 누적
            calculatorDisplay.textContent = defaultNum; // 화면에 표시
            return;
        }

            // 연산자 버튼 처리 (+, -, *, /)
            if (target.classList.contains('operator')) {
                if (firstOperand === null) {
                    firstOperand = defaultNum; // 첫 번째 숫자 저장
                }else if (operator) {
                    // 이미 연산자가 설정된 경우, 현재 숫자로 계산 먼저 실행
                    const result = calculate(firstOperand, defaultNum, operator);
                    calculatorDisplay.textContent = result;
                    firstOperand = result; // 결과를 첫 번째 숫자로 저장
                }

                operator = value; // 연산자 저장
                shouldResetDisplay = true; // 다음 숫자 입력 시 화면 초기화
                return;
    
            }

            if (value === '=') {
                if (firstOperand !== null && operator !== null) {
                    const result = calculate(firstOperand, defaultNum, operator);
                    calculatorDisplay.textContent = result;
                    firstOperand = result; // 결과를 첫 번째 숫자로 저장
                    operator = null; // 연산자 초기화
                    shouldResetDisplay = true; // 다음 입력 시 초기화
                }
                return
            }
            
    

})
});

