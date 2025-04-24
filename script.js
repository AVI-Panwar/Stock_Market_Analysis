const Stocks =  ['AAPL', 'MSFT', 'GOOGL','AMZN', 'PYPL', 'TSLA', 'JPM', 'NVDA', 'NFLX', 'DIS'];
let rightContainer = document.getElementById("right");
let stockbutton = document.getElementById("btn");
let leftdiv = document.getElementById("leftchart");
let fourButtonsDiv = document.getElementById("fourButtons");
let descriptionDiv = document.getElementById("desc");
const timeRanges = [ "1mo",   "3mo", "1y",  "5y" ];
//let bookValue = document.getElementById("bookvalue");
//let profit = document.getElementById("profit");



let stocksChartData;
let stocksStatsData;
let companywiseChartData;
let firstTimeChartDataShow;
let stocksProfileData;

console.log("stock ");

//here i am getting the chart data 
fetch("https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata") 
  .then(response => response.json())
  .then(data => {
   // stocksData = data;
    console.log("Fetched Stock Data:", data); // an object with 2 value 
    stocksChartData = data.stocksData[0];   //an object with various companies as a key 
    console.log("stockschartdata", stocksChartData);
    companywiseChartData = getCompanyWiseStocks("AAPL");
    console.log("companywiseChartData", companywiseChartData);
    firstTimeChartDataShow = getTimelyData("5y");
    renderChart(firstTimeChartDataShow, "AAPL");   
    buttonCreation();
    
  
    console.log("firstTimeChartDataShow" , firstTimeChartDataShow);
    
    
  })
  .catch(error => console.error("Error fetching data:", error));
  
  function buttonCreation(){
    fourButtonsDiv.innerHTML = "";
    

    timeRanges.forEach( (time) =>{
        const buttonTime = document.createElement("button");
        buttonTime.textContent = time;
        buttonTime.classList.add("time-btn");


        buttonTime.addEventListener('click', ()=>{
              const dataAccToTime = getTimelyData(time);
              renderChart(dataAccToTime);
        })
        
        fourButtonsDiv.appendChild(buttonTime);

    })
  }

  function getCompanyWiseStocks(company){
         return stocksChartData[company];
  }
  
  function getTimelyData(time){
      return companywiseChartData[time];
  }
  
  
  function renderChart( valueTime , companyName){
       

        
       let x_value = valueTime.timeStamp;
       
       let x_array = x_value.map(( timeValue )=>{

           let newTimeStamp = new Date(timeValue*1000).toLocaleDateString();
           return newTimeStamp;

       })       
       console.log("x",x_value);

       let y_value=valueTime.value;
       console.log("y", y_value);

       var trace = {
             x: x_array,
             y:y_value,
             mode:'lines',
             hovertemplate: `${companyName}:%{y}<extra></extra>`
       };

       let  chartData = [trace];

       var layout = {
        paper_bgcolor: 'lightblue' ,
        plot_bgcolor: 'lightblue', 
        xaxis: {
          showticklabels: false, // hides only the tick labels
           visible: false       
        }, yaxis: {
          showticklabels: false, // hides only the tick labels
           visible: false       
        }
       
      };

       Plotly.newPlot('leftchart', chartData, layout);
            
  }

fetch("https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata")
     .then(response => response.json())
     .then(data => {

       stocksProfileData = data.stocksProfileData[0];
        console.log("Stocks Profile data:", data.stocksProfileData[0]);
        renderCompanyInformation("AAPL");
        //another api call 
     })
     .catch(error => console.error("Error Fetching data:", error));


 function getSummaryByCompanyName(companyName){
     return stocksProfileData[companyName];
 }

//here i am getting rightmost buttons data
     fetch("https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata")
     .then(response => response.json())
     .then(data => {

      //Here i am getting data as a object which two keys and one of the them is stocksStatsData
        console.log("Stocks data:", data);
        // stocksStatsData is an array having one element as an object having different companies bookvalue and profit
        stocksStatsData = data.stocksStatsData[0]; //at 0th element only one element is present , an object 
        //when the data will fetch , i will call the function so that button comes dynamically
        console.log("stockstats",stocksStatsData);
        renderStocks();
     


        console.log("the value of findstocksstatsdata",findStockStatsData("AAPL"));
     })
     .catch(error => console.error("Error Fetching data:", error));


    function findStockStatsData ( x ){
            return stocksStatsData[x];
    }
 
  async  function renderCompanyInformation( companyName){
       descriptionDiv.innerHTML = "";

       while (!stocksStatsData || !stocksProfileData) {
        await new Promise(resolve => setTimeout(resolve, 100)); 
      }

       let companyInfoDiv = document.createElement('div');
            companyInfoDiv.classList.add('company-info')

            let companyNameDiv = document.createElement('div');
            companyNameDiv.textContent = companyName;
            companyNameDiv.classList.add('company-desc');
            
            let stockDataByCompanyName = findStockStatsData(companyName);

            if (!stockDataByCompanyName) {
              console.error(`Stock stats not found for: ${companyName}`);
              return;
            }

            let companyprofitvalueDiv = document.createElement('div');
            companyprofitvalueDiv.classList.add('company-desc');
            
            // Multiply by 100 and round to 5 digits after decimal
            let profitValue = (stockDataByCompanyName.profit * 100).toFixed(5);
            companyprofitvalueDiv.textContent = `${profitValue}%`;
            
            // Apply color based on numeric value
            if (parseFloat(profitValue) <= 0.1) {
                companyprofitvalueDiv.style.color = 'red';
            } else {
                companyprofitvalueDiv.style.color = 'lightgreen';
            }
            
            
            
            
            let companybookValueDiv = document.createElement('div');
            companybookValueDiv.textContent =  `$${stockDataByCompanyName.bookValue}`
            companybookValueDiv.classList.add('company-desc');

            let companySummaryDiv = document.createElement('div');
            let companySummary = getSummaryByCompanyName(companyName);
            companySummaryDiv.textContent  = companySummary.summary;
            companySummaryDiv.classList.add('companySummary')

            if (!companySummary) {
              console.error(`Company summary not found for: ${companyName}`);
              return;
            }


            companyInfoDiv.appendChild(companyNameDiv);
            companyInfoDiv.appendChild(companyprofitvalueDiv);
            companyInfoDiv.appendChild(companybookValueDiv);

            descriptionDiv.appendChild(companyInfoDiv);
            descriptionDiv.appendChild(companySummaryDiv);

    }

    function renderStocks(){
        rightContainer.innerHTML = "";   


        Stocks.forEach(stock =>{
             
            let btndiv = document.createElement('div');
            btndiv.classList.add('btn-div');
            console.log("daataa", stock);

             let buttonStock = document.createElement("button");
             buttonStock.textContent=stock;
             buttonStock.value=stock;
           
            buttonStock.classList.add('btnStock');
            

            let bookValueDiv = document.createElement('div');
              bookValueDiv.classList.add('bookvalue');


             let profitdiv = document.createElement('div');
             profitdiv.classList.add('profit');


             let stockDataByCompanyName = findStockStatsData(stock);

             bookValueDiv.textContent = `$${stockDataByCompanyName.bookValue}`

             // here taking out the profit 
             const profit = (stockDataByCompanyName.profit * 100).toFixed(2);
             profitdiv.textContent = `${profit}%`;
              
             if (parseFloat(profit) <= 0.1) {
              profitdiv.style.color = "red";
             } 
             else 
             {
              profitdiv.style.color = "lightgreen";
             }
  




             //adding click listener when all the buttons are, loaded dynamically 
             buttonStock.addEventListener('click', ()=>{
                companywiseChartData = getCompanyWiseStocks(stock);
                const  selectedTimeDate =  getTimelyData("5y");
                
                renderCompanyInformation(stock)
                renderChart(selectedTimeDate, stock);
             })
             
            


            // buttonStock.addEventListener('click', ()=>{
               ////
           // })
             

            btndiv.appendChild(buttonStock);
            btndiv.appendChild(bookValueDiv);
            btndiv.appendChild(profitdiv);

            rightContainer.appendChild(btndiv);






        })

    }





    //when a button is clicked at rightmost corner
    
//stockbutton.addEventListener('click', (e)=>{
//     let val = e.target.value;
 //   console.log(e.target.value);
 //   let datavalue = findStockStatsData(val);
 //   console.log(datavalue);
 //   bookValue.textContent = datavalue.bookValue;
 //   profit.textContent = datavalue.profit;

//}) 

