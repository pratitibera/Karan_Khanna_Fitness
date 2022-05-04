var authtoken;

function showPassword() {
   var x = document.getElementById("password");
   if (x.type === "password") {
     x.type = "text";
   } else {
     x.type = "password";
   }
 }

function signin() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;

	var json = {
		"email": username,
		"password": password
	}
	console.log(json);
	var request = new XMLHttpRequest();
	request.open(urlSet.adminLoginApi.method, urlSet.adminLoginApi.url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(json));
	request.onload = function () {
		var data = JSON.parse(this.response);
		console.log(data);
		if (data['message'] == "User Logged In") {
			localStorage.setItem("authtoken", data['accessToken']);
			document.location.href = "admin.html";
		} else {
			alert("Login failed! Username or Password is wrong.")
		}
	}
}

function checkLoginStatus1() {
	var token = localStorage.getItem("authtoken");
	if (token != null) {
		document.location.href = "admin.html";
	}
}

function checkLoginStatus2() {
	var token = localStorage.getItem("authtoken");
	if (token == null) {
		document.location.href = "login.html";
	} else {
		authtoken = token;
		displayContacts();
		displayTransactions();
	}
}

function displayContacts() {
	var request = new XMLHttpRequest();
    request.open(urlSet.get_contacts.method, urlSet.get_contacts.url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("apiKey", authtoken);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
        document.getElementById('contact_table').innerHTML = "";
        if(data.data.count > 0){
        	for(i = 0; i < data['data']['rows'].length; i++){
        		document.getElementById('contact_table').innerHTML += `<tr>
                     <td>${i+1}</td>
                     <td>${data['data']['rows'][i]['name']}</td>
                     <td>${data['data']['rows'][i]['phone']}</td>
                     <td>${data['data']['rows'][i]['email']}</td>
                     <td>${data['data']['rows'][i]['message']}</td>
                     <td><button class="btn btn-dark" id="contact_${data['data']['rows'][i]['id']}" onclick="deleteContact(this.id);">DELETE</button></td>
                  </tr>`;
        	}
        }
        else{
        	document.getElementById('contact_table').innerHTML = `<tr>
                     <td colspan="6" class="text-center fo-16 fw-600">No contact requests found</td>
                  </tr>`;
        }
    }
}

function deleteContact(id){
	var request = new XMLHttpRequest();
    request.open(urlSet.delete_contacts.method, urlSet.delete_contacts.url + id.split('_')[1], true);
    request.setRequestHeader("apiKey", authtoken);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
        if(data.message == "contact Deleted"){
        	alert("Contact Deleted");
        	displayContacts();
        }
        else{
        	alert("Sorry! Could not delete contact");
        }
    }
}

function displayTransactions(){
	var request = new XMLHttpRequest();
    request.open(urlSet.get_transactions.method, urlSet.get_transactions.url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("apiKey", authtoken);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
        document.getElementById('transactions_table').innerHTML = "";
        if(data.data.count > 0){
        	for(i = 0; i < data['data']['rows'].length; i++){
                if(data['data']['rows'][i]['status'] == 'S'){
                    var status = `<p class="text-success fw-800">Successful</p>`;
                }
                else{
                    var status = `<p class="text-danger fw-800">Pending</p>`;
                }
        		document.getElementById('transactions_table').innerHTML += `<tr>
                     <td>${i+1}</td>
                     <td>${data['data']['rows'][i]['name']}</td>
                     <td>${data['data']['rows'][i]['phone']}</td>
                     <td>${data['data']['rows'][i]['email']}</td>
                     <td>${data['data']['rows'][i]['address']}</td>
                     <td>${data['data']['rows'][i]['age']}</td>
                     <td>${data['data']['rows'][i]['height']} cm</td>
                     <td>${data['data']['rows'][i]['current_weight']} Kg</td>
                     <td>${data['data']['rows'][i]['goal_weight']} Kg</td>
                     <td>${status}</td>
                     <td>Rs. ${data['data']['rows'][i]['price']}</td>
                     <td><button class="btn btn-dark" id="transaction_${data['data']['rows'][i]['id']}" onclick="deleteTransaction(this.id);">DELETE</button></td>
                  </tr>`;
        	}
        }
        else{
        	document.getElementById('transactions_table').innerHTML = `<tr>
                     <td colspan="11" class="text-center fo-16 fw-600">No transactions found</td>
                  </tr>`;
        }
    }
}


function deleteTransaction(id){
	var request = new XMLHttpRequest();
    request.open(urlSet.delete_transactions.method, urlSet.delete_transactions.url + id.split('_')[1], true);
    request.setRequestHeader("apiKey", authtoken);
    request.send();
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
        if(data.message == "Transaction Deleted"){
        	alert("Transaction Deleted");
        	displayTransactions();
        }
        else{
        	alert("Sorry! Could not delete transaction");
        }
    }
}