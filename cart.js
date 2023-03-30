
import printProducts from "./products.js";

export default function printCart(printProductList) {

    let contentDiv = document.getElementById("content");

    if (!localStorage.getItem("cart")) {
        console.log("cart finnes");
        localStorage.setItem("cart", JSON.stringify([]))
    }

    let cartTotal = document.createElement("p");
    function printCartList() {

        let total = 0;
        let cartDiv = document.createElement("div");
        cartDiv.className = "cart-div";


        if (JSON.parse(localStorage.getItem("cart")).length > 0) {

            console.log("Finns produkter");

            let cart = JSON.parse(localStorage.getItem("cart"));
            console.log(cart);

            // Visa varukorgens olika produkter en efter en
            cart.map((currItem, index) => {

                let cartDivRow = document.createElement("div");
                cartDivRow.className = "cart-div-row";

                console.log("Produkt i Varukorgen:", cart[index]);

                let itemId = document.createElement("div");
                itemId.className = "cart-div-column";
                itemId.innerText = cart[index].id;

                let itemImage = document.createElement("div");
                itemImage.className = "cart-div-img";

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
                itemName.className = "cart-div-column";
                itemName.innerHTML = cart[index].name;

                let itemQuantity = document.createElement("div");
                itemQuantity.className = "cart-div-column";
                let itemQInp = document.createElement("input");
                itemQInp.setAttribute("type", "number");
                itemQInp.value = cart[index].quantity;

                itemQInp.addEventListener("change", function () {
                    if (itemQInp.value != "") {
                        cart[index].quantity = itemQInp.value;
                        // Uppdatera local storage
                        localStorage.setItem("cart", JSON.stringify(cart));
                        // alert("TEMP-ALERT: Local Storage Updated!");

                        updateTotalValue(index);

                        console.log(cart);

                       
                    } else {
                        itemQInp.value = "1";
                    }
                })

                itemQuantity.appendChild(itemQInp);

                let itemPrice = document.createElement("div");
                itemPrice.className = "cart-div-column";
                itemPrice.innerText = cart[index].price / 100 + " kr";

                cartDivRow.appendChild(itemImage);
                cartDivRow.appendChild(itemName);
                cartDivRow.appendChild(itemQuantity);
                cartDivRow.appendChild(itemPrice);

                // Skriv totala summan här

                contentDiv.appendChild(cartDivRow);

                if (Number(cart[index].quantity) > 1) {
                    total += Number(cart[index].quantity * cart[index].price)
                } else {
                    total += Number(cart[index].price);
                }

            })

            function updateTotalValue(index) {
                console.log(cart[index].quantity);
                // let quantity = 0;

                if (cart[index].quantity < 1) {
                    cartTotal.innerText = "";
                    removeCartItem(cart, index);


                } else {
                    let summanAvKardemumman = 0;
                    cart.map((currItem, index) => {
                        summanAvKardemumman += Number(cart[index].quantity * cart[index].price)
                    })
                    cartTotal.innerHTML = "<b>Summa:</b> " + summanAvKardemumman / 100 + " kr";
                }
            }



            let emptyCartBtn = document.createElement("button");
            emptyCartBtn.innerText = "Töm kundvagnen";


            emptyCartBtn.addEventListener("click", () => {
                localStorage.setItem("cart", JSON.stringify([]));
                printCartList();
            })

            contentDiv.appendChild(emptyCartBtn);

        } else {
            console.log("Tom kundvagn");
            contentDiv.innerText = "Inga produkter"
        }

        if (total === 0) {
            cartTotal.innerText = "";
        } else {
            cartTotal.innerHTML = "<b>Summa:</b> " + total / 100 + " kr";
            contentDiv.appendChild(cartTotal);
        }


        function removeCartItem(cart, index) {
            cart = cart.filter((element, key, arr) => {
                if (key != index) {
                    return element;
                }
            })


            localStorage.setItem("cart", JSON.stringify(cart));
            contentDiv.innerHTML = "";
            printCartList();

        };



    }

    console.log("hej VARUKORG nedanför");
    printCartList();
    //printProducts();




}




