const wrapper = document.getElementById("wrapper");
const companyName = document.getElementById("company-name");
const mainContent = document.getElementById("content");
let meny = document.getElementById("products");
let cart = document.getElementById("cart");
let prodInnfo = document.getElementById("prodInfo");

if (localStorage.getItem("cart")) {
    console.log("Finns en kundvagn");
    printCart();
} else {
    console.log("Skapar tom kundvagn");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    printCart();
}

fetch("https://teamgreen.site/index.php/wp-json/")
    .then((response) => response.json())
    .then((data) => {

        console.log(data)
        let titelName = document.createElement("h1");
        titelName.innerText = data.name;
        companyName.appendChild(titelName);

        let contentInfo = document.createElement("p");

    });



function getContent(data) {
    console.log(data.name);
}



    fetch("https://teamgreen.site/index.php/wp-json/wc/store/v1/products")
    .then((response) => response.json())
    .then((data) => {
        
        console.log("produkter", data);

          printProductList(data);
      })

      function printProductList(products) {
        let ul = document.createElement("ul")
        
        products.map(product => {
            let li = document.createElement("li")
            li.innerText = product.name;
    
            li.addEventListener("click", () => {
                console.log("Click på produkt", product.id);
    
                let cart = JSON.parse(localStorage.getItem("cart"))
                console.log("cart från LS", cart);
    
                cart.push(product.id);
    
                localStorage.setItem("cart", JSON.stringify(cart))
                printCart();
            })
    
            ul.appendChild(li)
        })
        meny.appendChild(ul);
    }


    function printCart() {
        if(JSON.parse(localStorage.getItem("cart")).length > 0) {
            console.log("Finns produkter");
            cart.innerText = "produkter i kundvagnen" + (JSON.parse(localStorage.getItem("cart")));
    
            let emptyCartBtn = document.createElement("button");
            emptyCartBtn.innerText = "tömma kundvagnen";
    
            emptyCartBtn.addEventListener("click", () => {
                localStorage.setItem("cart", JSON.stringify([]));
                printCart();
            })
    
            let sendOrderBtn = document.createElement("button");
    
            sendOrderBtn.addEventListener("click", () => {
    
            })
    
            cart.append(emptyCartBtn)
    
        } else {
            console.log("Tom kundvagn");
            cart.innerText = "Inga produkter"
        }
    }