
import printProducts from "./products.js";

export default function printCart(printProductList) {

let contentDiv = document.getElementById("content");

if(!localStorage.getItem("cart")){
    console.log("cart finnes");
    localStorage.setItem("cart",JSON.stringify([]))
}

function printCartList() {

    let cartDiv = document.createElement("div");
    cartDiv.className="cart-div";

    if(JSON.parse(localStorage.getItem("cart")).length > 0) {

        console.log("Finns produkter");
        
        let cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);

        // Visa varukorgens olika produkter en efter en
        cart.map((currItem, index) => {

            let cartDivRow = document.createElement("div");
            cartDivRow.className="cart-div-row";
    
            console.log("Produkt i Varukorgen:", cart[index]);

            let itemId = document.createElement("div");
            itemId.className="cart-div-column";
            itemId.innerText = cart[index].id;

            let itemImage = document.createElement("div");
            itemImage.className="cart-div-img";

            // Sätt rätt produktbild i itemImage diven som bakgrundsbild
            itemImage.style.backgroundImage = "url(" + cart[index].imgThumbnail + ")";

            /*
            let itemImg = document.createElement("img");
            itemImg.src = cart[index].imgThumbnail;
            itemImg.alt = cart[index].imgName;
            itemImg.style.height = "40px";
            itemImage.appendChild(itemImg);
            */


            let itemName = document.createElement("div");
            itemName.className="cart-div-column";
            itemName.innerHTML = cart[index].name;

            let itemQuantity = document.createElement("div");
            itemQuantity.className="cart-div-column";
            let itemQInp = document.createElement("input");
            itemQInp.setAttribute("type", "text");
            itemQInp.value = cart[index].quantity;

            itemQInp.addEventListener("change", function () {
                if (itemQInp.value!="") {
                    cart[index].quantity = itemQInp.value;
                    // Uppdatera local storage
                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert("TEMP-ALERT: Local Storage Updated!");
                } else {
                    itemQInp.value = "1";
                }
            })

            itemQuantity.appendChild(itemQInp);

            let itemPrice = document.createElement("div");
            itemPrice.className="cart-div-column";
            itemPrice.innerText = cart[index].price/100 + " kr";

            cartDivRow.appendChild(itemImage);
            cartDivRow.appendChild(itemName);
            cartDivRow.appendChild(itemQuantity);
            cartDivRow.appendChild(itemPrice);

            contentDiv.appendChild(cartDivRow);
            



            /*

            if (value.id == fid) {
                let wrapper = document.createElement("div");
                let title = document.createElement("p");
                title.innerText = value.title.rendered
                let description = document.createElement("p");
                description.innerHTML = value.content.rendered

                wrapper.appendChild(title);
                wrapper.appendChild(description);

                mainContent.appendChild(wrapper);
            }
            */

        })       


        //cart.innerText = "produkter i kundvagnen" + JSON.parse(localStorage.getItem("cart"));
/*
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

        */

    } else {
        console.log("Tom kundvagn");
        cart.innerText = "Inga produkter"
    }

}

console.log("hej VARUKORG nedanför");
printCartList();
//printProducts();


}

/* Todo 

fixa en annan layout för cart sidan , inte displaya alla produkter
 */