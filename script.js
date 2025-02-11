const BASE_URL =  "https://api.exchangerate-api.com/v4/latest/USD";
const dropdowns = document.querySelectorAll('.dropdowns select');
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=> {
      updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amountVal = parseFloat(amount.value);
    console.log(amountVal);

    // Validate amount
    if (isNaN(amountVal) || amountVal <= 0) {
        alert("Please enter a valid amount");
        return;  // Stop the function if invalid input
    }

    const URL = `${BASE_URL}`;
 const response = await fetch(URL);
 const data = await response.json();
 const fromCurrency = fromCurr.value.toUpperCase();
 const toCurrency = toCurr.value.toUpperCase();
const rate = data.rates[toCurrency]/data.rates[fromCurrency];
const result = (amountVal * rate).toFixed(2);


let showCase = document.querySelector(".msg");
showCase.innerText = result;


});
