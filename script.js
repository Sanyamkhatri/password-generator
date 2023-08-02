// DOM Elements
const slider = document.querySelector(".character_range");
const chLen = document.querySelector(".len");
const upperCase = document.querySelector(".chk-box1");
const lowerCase = document.querySelector(".chk-box2");
const numbers = document.querySelector(".chk-box3");
const specialCharacters = document.querySelector(".chk-box4");
const generateBtn = document.querySelector(".generate-btn");
const passOutput = document.querySelector(".passInput");
const copy = document.querySelector(".overlap");
const rec1 = document.getElementById('r1')
const rec2 = document.getElementById('r2')
const rec3 = document.getElementById('r3')
const rec4 = document.getElementById('r4')

const randomFunc = {
  upper: uppercaseChar,
  lower: lowercaseChar,
  number: randomNumbers,
  symbol: randomSpecialCharacters,
};

//slider functionality
slider.oninput = function () {
  chLen.innerText = this.value;
};

slider.addEventListener("mousemove", function () {
  var x = slider.value;
  var color =
    "linear-gradient(90deg , rgb(164,255,175)" +
    10 * x +
    "%, rgb(214,214,214)" +
    10 * x +
    "%)";
  slider.style.background = color;
});

//Generator functions
function uppercaseChar() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function lowercaseChar() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomNumbers() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function randomSpecialCharacters() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// strength of a password

function getPasswordStrength(upper,lower,number,symbol,length){
    const typesCount = upper + lower + number + symbol

    
    if(typesCount === 1 && length >= 1){
        rec1.src = "images/filledRectangle.png"
    }
    if(typesCount === 2 && length >= 2){
        rec1.src = "images/filledRectangle.png"
        rec2.src = "images/filledRectangle.png"
    }
    if(typesCount === 3 && length >= 3){
        rec1.src = "images/filledRectangle.png"
        rec2.src = "images/filledRectangle.png"
        rec3.src = "images/filledRectangle.png"
    }
    
    if(typesCount === 4 && length >= 4){
        rec1.src = "images/filledRectangle.png"
        rec2.src = "images/filledRectangle.png"
        rec3.src = "images/filledRectangle.png"
        rec4.src = "images/filledRectangle.png"
    }
   
}

// Generating the password
generateBtn.addEventListener("click", function () {
  const lengthh = +slider.value;
  const hasUpper = upperCase.checked;
  const hasLower = lowerCase.checked;
  const hasNumbers = numbers.checked;
  const hasSpecial = specialCharacters.checked;

  passOutput.innerHTML = generatePassword(
    hasUpper,
    hasLower,
    hasNumbers,
    hasSpecial,
    lengthh
  );

getPasswordStrength(hasUpper,
    hasLower,
    hasNumbers,
    hasSpecial,
    lengthh
    );
   
});

//Generate Password Function
function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = "";

  const typesCount = upper + lower + number + symbol;
  const typeArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  
    if (typeArr.length === 0) {
    for (let i = 0; i < length; i++) {
      generatedPassword += lowercaseChar();
    }
    rec1.src = "images/Rectangle.png"
    rec2.src = "images/Rectangle.png"
    rec3.src = "images/Rectangle.png"
    rec4.src = "images/Rectangle.png"
    return generatedPassword
  }


  if (typesCount === 0) return "";
  if (typesCount >= 1) {
    for (let i = 0; i < length; i += typesCount) {
      typeArr.forEach((type) => {
        const funName = Object.keys(type)[0];
        generatedPassword += randomFunc[funName]();
      });
    }
    rec1.src = "images/Rectangle.png"
    rec2.src = "images/Rectangle.png"
    rec3.src = "images/Rectangle.png"
    rec4.src = "images/Rectangle.png"
    const finalPass = generatedPassword.slice(0, length);
    return finalPass;
  }
}

// copy function

copy.addEventListener("click", function () {
  navigator.clipboard.writeText(passOutput.innerHTML);
});

//strength