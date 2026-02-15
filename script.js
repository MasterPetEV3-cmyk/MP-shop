let products =
JSON.parse(localStorage.getItem("products")) || [];

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let sales =
JSON.parse(localStorage.getItem("sales")) || [];

function saveAll(){

localStorage.setItem("products",
JSON.stringify(products));

localStorage.setItem("cart",
JSON.stringify(cart));

localStorage.setItem("sales",
JSON.stringify(sales));

}

function addProduct(){

let name =
document.getElementById("pname").value;

let price =
parseFloat(
document.getElementById("pprice").value
);

let cat =
document.getElementById("pcat").value;

let stock =
parseInt(
document.getElementById("pstock").value
);

if(!name || !price || !stock){

alert("กรอกข้อมูล");

return;

}

products.push({

name,
price,
cat,
stock

});

saveAll();

renderProducts();

}

function renderProducts(){

let search =
document.getElementById("search").value || "";

let html="";

products.forEach((p,i)=>{

if(p.name.includes(search)){

html+=`

<div class="product">

${p.name}<br>

ราคา ${p.price}<br>

คงเหลือ ${p.stock}

<br>

<button onclick="addToCart(${i})">

เพิ่ม

</button>

</div>

`;

}

});

document.getElementById("productList").innerHTML=html;

}

function addToCart(i){

if(products[i].stock<=0){

alert("หมด");

return;

}

products[i].stock--;

cart.push(products[i]);

saveAll();

renderProducts();

renderCart();

}

function renderCart(){

let html="";

let total=0;

cart.forEach((p,i)=>{

total+=p.price;

html+=`

<tr>

<td>${p.name}</td>

<td>${p.price}</td>

<td>

<button onclick="removeCart(${i})">

ลบ

</button>

</td>

</tr>

`;

});

document.getElementById("cart").innerHTML=html;

document.getElementById("total").innerText=total;

}

function removeCart(i){

products.find(p=>p.name===cart[i].name).stock++;

cart.splice(i,1);

saveAll();

renderProducts();

renderCart();

}

function pay(){

let total=0;

cart.forEach(p=>{

total+=p.price;

});

let money =
parseFloat(
document.getElementById("money").value
);

if(money<total){

alert("เงินไม่พอ");

return;

}

let change =
money-total;

document.getElementById("change").innerText=

"เงินทอน "+change;

sales.push({

date:new Date().toLocaleString(),

total

});

cart=[];

saveAll();

renderCart();

}

function cancelBill(){

cart.forEach(item=>{

products.find(p=>p.name===item.name).stock++;

});

cart=[];

saveAll();

renderCart();

renderProducts();

}

function exportCSV(){

let csv="date,total\n";

sales.forEach(s=>{

csv+=s.date+","+s.total+"\n";

});

let blob=new Blob([csv]);

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="sales.csv";

a.click();

}

function clearAll(){

if(confirm("ลบทั้งหมด?")){

localStorage.clear();

location.reload();

}

}

renderProducts();

renderCart();
