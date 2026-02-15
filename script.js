```html
<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>MP SHOP POS PRO MAX</title>

<style>

body{
font-family: Arial;
margin:0;
background:#f4f6f9;
}

/* LOGIN */

#loginPage{
display:flex;
justify-content:center;
align-items:center;
height:100vh;
background:linear-gradient(135deg,#6a0dad,#ffffff);
}

.loginBox{
background:white;
padding:30px;
border-radius:10px;
width:300px;
box-shadow:0 0 15px rgba(0,0,0,0.2);
}

input,select{
width:100%;
padding:10px;
margin:5px 0;
}

button{
width:100%;
padding:10px;
background:#6a0dad;
color:white;
border:none;
cursor:pointer;
}

button:hover{
background:#4b0082;
}

/* POS */

#posPage{
display:none;
}

header{
background:#2c3e50;
color:white;
padding:15px;
display:flex;
justify-content:space-between;
}

.container{
display:flex;
gap:20px;
padding:20px;
}

.card{
background:white;
padding:15px;
border-radius:10px;
flex:1;
box-shadow:0 0 10px rgba(0,0,0,0.1);
}

.product{
padding:10px;
border:1px solid #ddd;
margin:5px;
cursor:pointer;
}

.product:hover{
background:#eee;
}

.adminOnly{
display:none;
}

table{
width:100%;
border-collapse:collapse;
}

td,th{
padding:8px;
border-bottom:1px solid #ddd;
}

.logout{
background:red;
width:auto;
padding:5px 10px;
}

</style>

</head>
<body>

<!-- LOGIN -->

<div id="loginPage">

<div class="loginBox">

<h2>MP SHOP LOGIN</h2>

<select id="role">
<option value="cashier">Cashier</option>
<option value="admin">Admin</option>
</select>

<input id="username" placeholder="Username">

<input id="password" type="password" placeholder="Password">

<button onclick="login()">Login</button>

<p id="loginError" style="color:red;"></p>

</div>

</div>

<!-- POS -->

<div id="posPage">

<header>

<div>
MP SHOP POS PRO MAX
</div>

<div>

<span id="userDisplay"></span>

<button class="logout" onclick="logout()">Logout</button>

</div>

</header>

<div class="container">

<div class="card">

<h3>สินค้า</h3>

<input id="search" placeholder="ค้นหา..." onkeyup="renderProducts()">

<div id="productList"></div>

</div>

<div class="card">

<h3>ตะกร้า</h3>

<table>
<thead>
<tr>
<th>สินค้า</th>
<th>ราคา</th>
<th>ลบ</th>
</tr>
</thead>
<tbody id="cart"></tbody>
</table>

<h3 id="total">รวม: 0</h3>

<button onclick="checkout()">ชำระเงิน</button>

</div>

</div>

<div class="container adminOnly">

<div class="card">

<h3>เพิ่มสินค้า (Admin)</h3>

<input id="newName" placeholder="ชื่อสินค้า">

<input id="newPrice" type="number" placeholder="ราคา">

<button onclick="addProduct()">เพิ่ม</button>

</div>

<div class="card">

<h3>รายงาน</h3>

<p id="salesReport"></p>

<button onclick="exportExcel()">Export Excel</button>

</div>

</div>

</div>

<script>

/* LOGIN DATABASE */

const users={

admin:{username:"admin",password:"1234"},

cashier:{username:"cashier",password:"1234"}

};

let currentRole="";

/* DATABASE */

let db=JSON.parse(localStorage.getItem("MP_DB"))||{

products:[
{name:"โค้ก",price:15},
{name:"น้ำ",price:10}
],

sales:[]

};

let cart=[];

/* LOGIN */

function login(){

let role=document.getElementById("role").value;

let user=document.getElementById("username").value;

let pass=document.getElementById("password").value;

if(user===users[role].username && pass===users[role].password){

currentRole=role;

document.getElementById("loginPage").style.display="none";

document.getElementById("posPage").style.display="block";

document.getElementById("userDisplay").innerText=role;

if(role==="admin"){

document.querySelectorAll(".adminOnly").forEach(e=>e.style.display="flex");

}

renderProducts();

renderReport();

}else{

document.getElementById("loginError").innerText="Login failed";

}

}

function logout(){

location.reload();

}

/* SAVE */

function save(){

localStorage.setItem("MP_DB",JSON.stringify(db));

}

/* PRODUCTS */

function renderProducts(){

let html="";

let search=document.getElementById("search").value;

db.products.forEach((p,i)=>{

if(p.name.includes(search)){

html+=`
<div class="product" onclick="addCart(${i})">
${p.name} - ${p.price}
</div>
`;

}

});

document.getElementById("productList").innerHTML=html;

}

/* ADD PRODUCT */

function addProduct(){

if(currentRole!=="admin") return;

let name=document.getElementById("newName").value;

let price=parseFloat(document.getElementById("newPrice").value);

db.products.push({name,price});

save();

renderProducts();

}

/* CART */

function addCart(i){

cart.push(db.products[i]);

renderCart();

}

function renderCart(){

let html="";

let total=0;

cart.forEach((c,i)=>{

total+=c.price;

html+=`
<tr>
<td>${c.name}</td>
<td>${c.price}</td>
<td><button onclick="removeCart(${i})">X</button></td>
</tr>
`;

});

document.getElementById("cart").innerHTML=html;

document.getElementById("total").innerText="รวม: "+total;

}

function removeCart(i){

cart.splice(i,1);

renderCart();

}

/* CHECKOUT */

function checkout(){

let total=cart.reduce((a,b)=>a+b.price,0);

db.sales.push({

date:new Date().toLocaleString(),

total

});

cart=[];

save();

renderCart();

renderReport();

}

/* REPORT */

function renderReport(){

let total=0;

db.sales.forEach(s=>total+=s.total);

document.getElementById("salesReport").innerText="ยอดขายทั้งหมด: "+total;

}

/* EXPORT */

function exportExcel(){

let csv="date,total\n";

db.sales.forEach(s=>{

csv+=s.date+","+s.total+"\n";

});

let blob=new Blob([csv]);

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="report.csv";

a.click();

}

</script>

</body>
</html>
```
