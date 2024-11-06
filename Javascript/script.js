var ProductName=document.getElementById('productname');
var ProductPrice=document.getElementById('productprice');
var ProductDesc=document.getElementById('productdesc');
var ProductCat=document.getElementById('productcat');
var TableBody=document.getElementById('tableBody');
var BtnAddandUpdate=document.getElementById('addandupdatebtn')
var currentIndex=0;
var ProductContainer=[];

var regname=/^[A-Za-z0-9][A-Za-z0-9 .-_]{0,30}[A-Za-z0-9]$/;
var regprice=/^\d{1,7}(\.\d{1,2})?$/;
var regdesc=/^[a-z A-Z]{3,1000}$/;
var regcat=/^[a-z A-Z0-9]{3,10}$/;



if(localStorage.getItem("Myproducts")!==null){
    ProductContainer=JSON.parse(localStorage.getItem("Myproducts"));
    displayProduct(ProductContainer);
}
else{
    ProductContainer=[];
}

function ActionButton(){
    // Call regexall for each input and store results
    var isNameValid = regexall(regname, ProductName);
    var isPriceValid = regexall(regprice, ProductPrice);
    var isDescValid = regexall(regdesc, ProductDesc);
    var isCatValid = regexall(regcat, ProductCat);
  if(isNameValid&&isPriceValid&&isDescValid&&isCatValid){     
    if(BtnAddandUpdate.innerHTML=="Add Product"){
        addProduct()
    }
    else{
        UpdateProduct();
    }
  }
  else{
    alert("Please correct the errors in the form before proceeding");
  }
}

function addProduct(){
    var product={
        name:ProductName.value,
        price:ProductPrice.value,
        desc:ProductDesc.value,
        cat:ProductCat.value
    }
    ProductContainer.push(product);
    localStorage.setItem("Myproducts",JSON.stringify(ProductContainer));
    displayProduct(ProductContainer);
    clearInput();

}
function  displayProduct(arrayconatiner){
    var box=``;
    for(var i=0;i<arrayconatiner.length;++i){
        box+= `<tr>
        <td>${i+1}</td>
        <td>${arrayconatiner[i].name}</td>
        <td>${arrayconatiner[i].price}</td>
        <td>${arrayconatiner[i].desc}</td>
        <td>${arrayconatiner[i].cat}</td>
        <td>
          <button class="btn btn-success "onclick={DeleteProduct(${i});}>Delete</button>
        
          <button class="btn btn-secondary" onclick={fillInputs(${i});}>Update</button>
        </td>
      </tr>`;
    }
    TableBody.innerHTML=box;

}
function clearInput(){
    ProductName.value="";
    ProductPrice.value="";
    ProductDesc.value="";
    ProductCat.value="";  
    
}
function DeleteProduct(index){
    ProductContainer.splice(index,1);
    localStorage.setItem("Myproducts",JSON.stringify(ProductContainer));
    displayProduct(ProductContainer);
    
}

function fillInputs(index){
    currentIndex=index;
    ProductName.value=ProductContainer[index].name;
    ProductPrice.value=ProductContainer[index].price;
    ProductDesc.value=ProductContainer[index].desc;
    ProductCat.value=ProductContainer[index].cat; 
    BtnAddandUpdate.innerHTML="Update Product";

}

function UpdateProduct(){

 var product={
        name:ProductName.value,
        price:ProductPrice.value,
        desc:ProductDesc.value,
        cat:ProductCat.value
    }
    ProductContainer[currentIndex]=product;
    localStorage.setItem("Myproducts",JSON.stringify(ProductContainer));
    displayProduct(ProductContainer);
    BtnAddandUpdate.innerHTML="Add Product";
    clearInput();


}



function SearchByName(term){
    var FilterContainer=[];
    for(var i=0;i<ProductContainer.length;++i){
        if(ProductContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            FilterContainer.push(ProductContainer[i]);
        }
    }
    displayProduct(FilterContainer);
}
/* REgular Expression*/ 

//general function to make regex on all inputs (first paarmeter will be regex itself and other will be (the input to which this regex should be applied))
function regexall(regex,inputElement){
    
    if(regex.test(inputElement.value)){
        inputElement.classList.add("is-valid");
        inputElement.classList.remove("is-invalid");
     return true;//3alash 2a3mel check biha fo2 fi el action button
    }
    else{
        inputElement.classList.add("is-invalid");
        inputElement.classList.remove("is-valid");
      return false;
    }
  
  }

  