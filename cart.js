import printProductList from "./products.js";
let content = document.getElementById("content");
export default function printCart(printCart) {

    fetch("https://teamgreen.site/index.php/wp-json//wc/store/cart")
    .then(res => res.json())
    .then(data => {
        printCart(data);
        console.log(data);
    })
if(!localStorage.getItem("cart")){
    console.log("cart finnes");
    localStorage.setItem("cart",JSON.stringify([]))
}


function printCart() {
    let cart = document.createElement("div");
    
    if(JSON.parse(localStorage.getItem("cart")).length > 0) {
        console.log(cart);
        

        cart.innerText = "produkter i kundvagnen" + "" + (JSON.parse(localStorage.getItem("cart")));
        
        content.appendChild(cart);


        let emptyCartBtn = document.createElement("button");
        emptyCartBtn.innerText = "tömma kundvagnen";
        cart.appendChild(emptyCartBtn)

        emptyCartBtn.addEventListener("click", () => {
            localStorage.setItem("cart", JSON.stringify([]));
            printCart();
        })

        let sendOrderBtn = document.createElement("button");
        sendOrderBtn.innerText = "Skicka order"

        // sendOrderBtn.addEventListener("click", postOrder);

        cart.appendChild(sendOrderBtn);


    } else {
        console.log("Tom kundvagn");
        cart.innerText = "Inga produkter";
        content.appendChild(cart);
    }

}

// printProducts();
}