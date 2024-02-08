// Fetch exchange rate from US Treasury
const baseURL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service";
const endPoint = "/v1/accounting/od/rates_of_exchange";
let currencySet="";

let input = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/rates_of_exchange?fields=country_currency_desc&filter=record_date:eq:2020-12-31";

// Fetch list of currency for selection
fetch(input).then(res => {
    if(!res.ok) {
        throw new Error("Network response was not OK");
    };
    return res.json();
}).then(datafile => {
    // console.log(datafile); // print out json file
    
    datafile.data.forEach(element => {
        
        // insert name for drop down list
        const listRow = `<option value=${element.country_currency_desc}>${element.country_currency_desc}</option>`;
        document.getElementById("currency").insertAdjacentHTML('beforeend',listRow);

    });

    // Get input of currency and date

    let currencyList = document.getElementById("currency");
    let submitButton = document.getElementById("submit");

    submitButton.addEventListener('click',()=>{
        currencySet = currencyList.value;
       
        let dateSet = document.getElementById("dateSelected");

        let param = "?fields=country_currency_desc,exchange_rate,record_date&filter=country_currency_desc:in:(" + currencySet + "),record_date:eq:"+ dateSet.value;
        
        let updateInput = baseURL + endPoint + param;

        fetch(updateInput).then(res=> {
            if(!res.ok) {
                throw new Error("Network response was not OK");
            };
            return res.json();
        }).then(dataFile => {
            let output = "The exchange rate of " + dataFile.data[0].country_currency_desc + " on " + dateSet.value + " is " + dataFile.data[0].exchange_rate;
            document.querySelector('p2').insertAdjacentHTML('beforeend',output);
        }).catch(error => {
            console.error("Error:", error);
        })
    });
     
}).catch(error => {
    console.error("Error:", error);
})