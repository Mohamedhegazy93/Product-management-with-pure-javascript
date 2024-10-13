let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let tmp;

function getTotal() {
  if (price.value != "") {
    let result =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";

    total.style.backgroundColor = "#a00d02";
  }
}

let productData;
if (localStorage.products != null) {
  productData = JSON.parse(localStorage.products);
} else {
  productData = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mode === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productData.push(newProduct);
        }
      } else {
        productData.push(newProduct);
      }
    } else {
      productData[tmp] = newProduct;
      mode = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    cleardata();
  }

  localStorage.setItem("products", JSON.stringify(productData));

  showdata();
};

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showdata() {
  getTotal();
  let table = "";

  for (let i = 0; i < productData.length; i++) {
    table += `<tr>
        <td>${i}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].taxes}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].count}</td>
        <td>${productData[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        
        
        </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;

  let deleteAll = document.getElementById("deleteAll");
  if (productData.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAll()">delete all(${productData.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
showdata();

function deleteData(i) {
  productData.splice(i, 1);
  localStorage.products = JSON.stringify(productData);
  showdata();
}

function deleteAll() {
  localStorage.removeItem("products");
  productData = [];
  showdata();
}

function updateData(i) {
  title.value = productData[i].title;
  price.value = productData[i].price;
  taxes.value = productData[i].taxes;
  ads.value = productData[i].ads;
  discount.value = productData[i].discount;
  getTotal();
  category.value = productData[i].category;
  count.style.display = "none";
  submit.innerHTML = "update";
  mode = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMode = "title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "serachTitle") {
    searchMode = "title";
    search.placeholder = "Search Title";
  } else {
    searchMode = "category";
    search.placeholder = "Search category";
  }
  search.focus();
  search.value = "";
  showdata();
}
function searchData(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].title.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].taxes}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].count}</td>
        <td>${productData[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        
        
        </tr>`;
      }
    }
  } else {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].category.includes(value.toLowerCase())) {
        table += `<tr>
    <td>${i}</td>
    <td>${productData[i].title}</td>
    <td>${productData[i].price}</td>
    <td>${productData[i].taxes}</td>
    <td>${productData[i].ads}</td>
    <td>${productData[i].discount}</td>
    <td>${productData[i].total}</td>
    <td>${productData[i].count}</td>
    <td>${productData[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    
    
    </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
