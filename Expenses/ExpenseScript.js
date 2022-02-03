    function showlistExpenses(){
        document.getElementById("hidelistExpenses")
        .style.opacity="1";
    }
    function hidelistExpenses(){
        document.getElementById("listExpensesForm")
        .style.opacity="0";
    }
        

    document.getElementById('createExpenseForm').onsubmit = ValidateExpense
    function  ValidateExpense(e){
        e.preventDefault()
        let Amount = document.getElementById("ExpenseAmountInput").value;
        let Receiver = document.getElementById("ExpenseReceiverInput").value;
        let Comment = document.getElementById("ExpenseCommentInput").value;
        const TimeStamp = new Date(e.target[3].value);
        console.log(Amount, Receiver, Comment, TimeStamp)
        createExpence(Amount, Receiver,  Comment)
    }
    function createExpence(Amount, Receiver,  Comment) {
        let expense = { 
            Amount, 
            Receiver, 
            Comment, 
        }
        fetch('https://localhost:44332/Expense', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(expense)
        });
    }
    

    const listOfAllExpenses = [];
    document.getElementById('listExpenses').onclick = listExpenses
    function listExpenses() {        
        fetch('https://localhost:44332/Expense')
        .then(response => response.json())
        .then(data => { 
            listOfAllExpenses.push(...data)
                clearExpenseList();
                ListAllExpenses();
                
        })
    }
    let listExpense = document.getElementById('ExpenseList')
    ListAllExpenses = () => {
        listOfAllExpenses.forEach((item) => { 
            var tableBody = document.createElement('TBODY');
            ExpenseList.appendChild(tableBody);
            var trh = document.createElement('TR');
            var th = document.createElement('TH');
            th.style.columnSpan="2"
            th.appendChild(document.createTextNode("Expense"));
            trh.appendChild(th);
            tableBody.appendChild(trh);
            var tr1 = document.createElement('TR');
            tableBody.appendChild(tr1);
            var td11 = document.createElement('TD');
            var td12 = document.createElement('TD');
            td11.appendChild(document.createTextNode("Receiver"));
            td12.appendChild(document.createTextNode(`${item.receiver}`));
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
            
            let d = item.TimeStamp;
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

            
            var tr4 = document.createElement('TR');
            tableBody.appendChild(tr4);
            var td41 = document.createElement('TD');
            var td42 = document.createElement('TD');
            td41.appendChild(document.createTextNode("TimeStamp"));
            td42.appendChild(document.createTextNode(`${da}-${mo}-${ye}`));
            tr4.appendChild(td41);
            tr4.appendChild(td42);
        })
    }



    function clearExpenseList() {
        listExpense.innerHTML = '';
    }





