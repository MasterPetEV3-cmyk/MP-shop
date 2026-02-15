let products =
JSON.parse(localStorage.getItem("products")) || [];

let cart = [];

function save(){
localStorage.setItem("products",JSON.stringify(products));
}

function addProduct(){

let name =
document.getElementById("pname").value;

let price =
parseFloat(document.getElementById("pprice").value);

let cat =
document.getElementById("pcat").value;

if(!name || !price){
alert("กรอกข้อมูล");
return;
}

products.push({
name,
price,
cat
});

save();

renderProducts();

}

function renderProducts(){

let html="";

products.forEach((p,i)=>{

html+=`

<div class="product"
onclick="addToCart(${i})">

${p.name}<br>
${p.price} บาท<br>
(${p.cat})

</div>

`;

});

document.getElementById("productList").innerHTML=html;

}

function addToCart(i){

cart.push(products[i]);

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

cart.splice(i,1);

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

let change=money-total;

document.getElementById("change").innerText=
"เงินทอน: "+change;

cart=[];

renderCart();

}

renderProducts();
