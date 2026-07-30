let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productQuantity = document.getElementById("productQuantity")
let saveBtn = document.getElementById("saveBtn");
let message = document.getElementById("message");
let productsList = document.getElementById("productsList");

let products = [];
let editindex = null;

let savedProducts = localStorage.getItem("products");

if (savedProducts !== null) {
  products = JSON.parse(savedProducts);
}

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function displayProducts() {
  productsList.innerHTML="";

  products.forEach(function(product, index){
    productsList.innerHTML += `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Quantity: ${product.quantity}</p>
      <button onclick= "editProduct(${index})">Edit</button>
      <button onclick= "deletProduct(${index})">delet</button>
    </div>
    `;
  });
}

saveBtn.addEventListener("click", function() {
  let product = {
    name: productName.value,
    price: productPrice.value,
    quantity: productQuantity.value
  };

  if (editindex === null) {
    products.push(product);
    message.textContent = "Product Add Successfully";
  }else {
    products[editindex]= product;
    editindex= null;
    saveBtn.textContent ="Save Products";
    message.textContent= "Product Updated Successfully";
  }
  
  saveProducts();
  displayProducts();

  productName.value = "";
  productPrice.value = "";
  productQuantity.value = "";

});

function editProduct(index) {
  productName.value = products[index].name;
  productPrice.value = products[index].price;
  productQuantity.value = products[index].puantity;
  
  editindex = index;
  saveBtn.textContent = "Update Products";
}

function deletProduct(index) {
  products.splice(index,1);

  saveProducts();
  displayProducts();

  message.textContent = "Product Deleted Successfully";
}
displayProducts();