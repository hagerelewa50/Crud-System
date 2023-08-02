var nameInput = document.getElementById("productName");
var priceInput = document.getElementById("productPrice");
var categoryInput = document.getElementById("productCategory");
var descriptionInput = document.getElementById("productDescription");
var searchInput = document.getElementById("searchvalue");
var indexs = 0;
var productlist = [];
if(localStorage.getItem("productList")!=null){
    productlist = JSON.parse(localStorage.getItem("productList"));
    display();
}else{
    productlist = [];
}


function addproduct(){
    var product ={
        name:nameInput.value,
        price:priceInput.value,
        category:categoryInput.value,
        description:descriptionInput.value
    }
    productlist.push(product);
    localStorage.setItem("productList",JSON.stringify(productlist));
    display();
}
function display(){
    var temp = "";
    for ( var i=0;i<productlist.length;i++){
        temp += `
        <tr>
        <td>`+i+`</td>
        <td>`+productlist[i].name+`</td>
        <td> `+productlist[i].price+`</td>
        <td>`+productlist[i].category+`</td>
        <td>`+productlist[i].description+`</td>
        <td>
            <button type="button" onclick="addEdit(`+i+`)" class="btn btn-warning">update</button>
        </td>
        <td>
            <button type="button" onclick="deleteItem(`+i+`)" class="btn btn-danger">delete</button>
        </td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML = temp ;
}
function addEdit(ind){
    indexs = ind ;
    nameInput.value= productlist[ind].name
    priceInput.value=productlist[ind].price
    descriptionInput.value=productlist[ind].description
    categoryInput.value=productlist[ind].category
    document.getElementById("addProduct").style.display="none"
    document.getElementById("addEdit").style.display="inline-block"
}
function edit(){
    var product = {
        name:nameInput.value,
        price:priceInput.value,
        category:categoryInput.value,
        description:descriptionInput.value
    }
productlist.splice(indexs,1,product)
localStorage.setItem("productList",JSON.stringify(productlist));
display();
clearForm();
    document.getElementById("addProduct").style.display="inline-block"
    document.getElementById("addEdit").style.display = "none"
}

function deleteItem(index){
    productlist.splice(index,1);
    display();
    localStorage.setItem("productList",JSON.stringify(productlist));
}
function clearForm(){
    nameInput.value=""
    priceInput.value=""
    descriptionInput.value=""
    categoryInput.value=""
}
function search(){
    var searchvalue = searchInput.value.toLowerCase()
    var temp=""
    for(var i=0; i < productlist.length;i++){
        if(productlist[i].name.toLowerCase().includes(searchvalue) == true ){
            temp+=
            `<tr>
            <td>`+i+`</td>
            <td>`+productlist[i].name.toLowerCase().replace(searchvalue,"<span class='fw-bold text-danger'>"+searchvalue+"</span>")+`</td>
            <td> `+productlist[i].price+`</td>
            <td>`+productlist[i].category+`</td>
            <td>`+productlist[i].description+`</td>
            <td>
                <button type="button" class="btn btn-warning">update</button>
            </td>
            <td>
                <button type="button" onclick="deleteItem(`+i+`)" class="btn btn-danger">delete</button>
            </td>
            </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=temp

}









