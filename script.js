const base_URL = "https://api.exchangerate-api.com/v4/latest";

const button = document.querySelector("button");
const dropdowns = document.querySelectorAll(".dropdown select");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
for(let select of dropdowns){
    for(currencyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        
        if(select.name === "from" && currencyCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }
        
        select.append(newOption);
    }

    // if we change the country
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1"
    } 
    const URL = `${base_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
 
    let rate = data.rates[toCurr.value];
    // console.log(rate);
    let finalAmount = amtVal * rate;

    
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

});