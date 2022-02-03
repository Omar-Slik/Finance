// function showlistIncomes(){
//     document.getElementById("listIncomesForm")
//     .style.opacity="1";
// }
// function hidelistIncomes(){
//     document.getElementById("listIncomesForm")
//     .style.opacity="0";
// }

document.getElementById('createIncomeForm').onsubmit = ValidateIncome
function  ValidateIncome(e){
    e.preventDefault()
    let Amount = document.getElementById("IncomeAmountInput").value;
    let Sender = document.getElementById("IncomeReceiverInput").value;
    let Comment = document.getElementById("IncomeCommentInput").value;
    const TimeStamp = new Date(e.target[3].value);
    console.log(Amount, Sender, Comment, TimeStamp)
    createIncome(Amount, Sender, Comment)
}
    

function createIncome(Amount, Sender, Comment) {
    let income = {
        Amount, 
        Sender, 
        Comment
    }
    fetch('https://localhost:44332/Income', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(income)
    });
}

const listOfAllIncomes = [];
document.getElementById('listIncomes').onclick = listIncome
  function listIncome() {
    fetch('https://localhost:44332/Income')
    .then(response => response.json())
    .then(data => { 
        listOfAllIncomes.push(...data)
             clearIncomeList();
             ListAllIncomes();
    })
}



//  Table Form på fetch data
let listincome = document.getElementById('incomeList')
ListAllIncomes = () => {
    listOfAllIncomes.forEach((item) => { 
        var tableBody = document.createElement('TBODY');
        listincome.appendChild(tableBody);
        var trh = document.createElement('TR');
        var th = document.createElement('TH');
        th.style.columnSpan="2"
        th.appendChild(document.createTextNode("Income"));
        trh.appendChild(th);
        tableBody.appendChild(trh);
        var tr1 = document.createElement('TR');
        tableBody.appendChild(tr1);
        var td11 = document.createElement('TD');
        var td12 = document.createElement('TD');
        td11.appendChild(document.createTextNode("Sender"));
        td12.appendChild(document.createTextNode(`${item.sender}`));
        tr1.appendChild(td11);
        tr1.appendChild(td12);
        var tr2 = document.createElement('TR');
        tableBody.appendChild(tr2);
        var td21 = document.createElement('TD');
        var td22 = document.createElement('TD');
        td21.appendChild(document.createTextNode("Amount"));
        td22.appendChild(document.createTextNode(`${item.amount}`));
        tr2.appendChild(td21);
        tr2.appendChild(td22);
        var tr3 = document.createElement('TR');
        tableBody.appendChild(tr3);
        var td31 = document.createElement('TD');
        var td32 = document.createElement('TD');
        td31.appendChild(document.createTextNode("Comment"));
        td32.appendChild(document.createTextNode(`${item.comment}`));
        tr3.appendChild(td31);
        tr3.appendChild(td32);
        
        function join(t, a, s) {
            function format(m) {
               let f = new Intl.DateTimeFormat('en', m);
               return f.format(t);
            }
            return a.map(format).join(s);
         }
         
         let a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
         let s = join(item.TimeStamp, a, '-');
        
        var tr4 = document.createElement('TR');
        tableBody.appendChild(tr4);
        var td41 = document.createElement('TD');
        var td42 = document.createElement('TD');
        td41.appendChild(document.createTextNode("TimeStamp"));
        td42.appendChild(document.createTextNode(s));
        tr4.appendChild(td41);
        tr4.appendChild(td42);
    })
}


function clearIncomeList() {
    listincome.innerHTML = '';
 }

