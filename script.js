//🔴⬇️  Fetching Element
const inputSlider = document.querySelector("[data-lengthSlider]"); //custom element
const lengthDisplay = document.querySelector("[data-lengthNumber");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
// string of symbol (hard code)
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

//🔴⬇️ Starting featuring :-
let password = " ";
let passwordLength = 10;
let checkCount = 0;
//🔴⬇️  calling function
handelSlider();
// set strength circle color to grey
setIndicator("#ccc");

/* ⬇️ Operation:-
1. handelSlider() :- passwordlength
2. getRandomIntegers(min, max)
3. getRandomUpperCase()
4. getRandomLowerCase()
5. getRandomNumber()
6. getRandomSymbol()
7. generatePassword()
8. calculateStrength()
9. setIndicator() -> circle :- color, shadow
10. copyContent()

11. shufflePassword()
12. handleCheckBoxChange()
*/



//🔴⬇️ Build function:-

// set passwordLength - ui pr reflect krwata hai
function handelSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  // or kuch bhi krna chahiye kya?
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = ( (passwordLength - min)*100 /(max - min) + '% 100%')
}

// setIndicator -> color set krta hai
function setIndicator(color) {
 indicator.style.backgroundColor = color;
  // shadow home work
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// GetRandowInteger ->
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// generateRandomNumber
function generateRandomNumber() {
  return getRndInteger(0,9);
}

// generateLowerCase
function generateLowerCase() {
  // this is how we convert number to character
  return String.fromCharCode(getRndInteger(97, 123));
}

// generateUpperCase
function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

// generateSymbol
function generateSymbols() {
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

// calculateStrength
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("0ff0");
  } else {
    setIndicator("#f00");
  }
}

// copyContent
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }
  // to make copy wala span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword(array){
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}

// 2 toth fr se count karo
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  // special condition
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handelSlider();
  }
}

// 1 change hua
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

//🔴⬇️ Event Listener:- inputSlider, generatepassword, copybtn

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handelSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value)
    //that means if the value is present in passwordDisplay.
    copyContent();
});

generateBtn.addEventListener("click", () => {
  // none of these checkbox are selected
  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handelSlider();
  }

  console.log("Starting the Journey");
  //   let's start the journey to find new password
  password = "";

  // let's put the stuff mentioned by checkboxes.
  //   if(uppercaseCheck.checked){
  //     password += generateUpperCase();
  //   }
  //   if(lowercaseCheck.checked){
  //     password += generateLowerCase();
  //   }
  //   if(numbersCheck.checked){
  //     password += generateRandomNumber();
  //   }
  //   if(symbolsCheck.checked){
  //     password += generateSymbols();
  //   }

  let funcArr = [];
  if (uppercaseCheck.checked) funcArr.push(generateUpperCase);
  if (lowercaseCheck.checked) funcArr.push(generateLowerCase);
  if (numbersCheck.checked) funcArr.push(generateRandomNumber);
  if (symbolsCheck.checked) funcArr.push(generateSymbols);

// compulsory addition
for(let i=0; i<funcArr.length; i++){
    password += funcArr[i]();
}
console.log("Compulsory adddition done");

// remaning addition
for(let i=0; i<passwordLength - funcArr.length; i++){
    let randIndex = getRndInteger(0, funcArr.length);
    password += funcArr[randIndex]();
}
console.log("Remaining adddition done");

// shuffle the password
password = shufflePassword(Array.from(password));
console.log("Shuffling done");

// Show in UI
passwordDisplay.value = password;
console.log("UI adddition done");

// call claculation strength
calcStrength();
});
