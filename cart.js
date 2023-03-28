console.log("hej");
import printProducts from "./products.js";
if(!localStorage.getItem("cart")){
    console.log("cart finnes");
    localStorage.setItem("cart",JSON.stringify([]))
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
printCart();
printProducts();

/* Todo 

fixa en annan layout för cart sidan , inte displaya alla produkter
 */