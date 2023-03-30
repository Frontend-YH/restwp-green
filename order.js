

let contentDiv = document.getElementById("content");

export default function printCheckout() {

    let orderCart = JSON.parse(localStorage.getItem("cart"));
    let newCart = [];

    let totalPrice = 0;

    for (let i = 0; i<orderCart.length; i++) {
        let newItem = {
            product_id: orderCart[i].id,
            name: orderCart[i].name,
            quantity: orderCart[i].quantity,
            price: orderCart[i].price,
        }
        totalPrice = totalPrice + (newItem.price*newItem.quantity);
        
        newCart.push(newItem);

        let itemDiv = document.createElement("div")
        itemDiv.className = "item-div";

        const itemName = document.createElement("div")
        itemName.innerText = newItem.name;
        itemName.style.width = "300px;";
        itemDiv.appendChild(itemName);

        const itemQuantity = document.createElement("div")
        itemQuantity.innerText = newItem.quantity + " st";
        itemDiv.appendChild(itemQuantity);

        const itemPrice = document.createElement("div")
        itemPrice.innerText = newItem.price/100 + " kr";
        itemDiv.appendChild(itemPrice);   

        contentDiv.appendChild(itemDiv);

    }

    let itemDivPrice = document.createElement("div")
    itemDivPrice.className = "item-div";

    const totalPriceDiv = document.createElement("div")
    totalPriceDiv.innerHTML = "<b>Att betala:</b> " + totalPrice/100 + " kr";
    itemDivPrice.appendChild(totalPriceDiv);       
    contentDiv.appendChild(itemDivPrice);   

    



    const formBox = document.createElement("form")
    formBox.className = "form-wrapper"

    const firstName = document.createElement("input")
    firstName.placeholder = "First Name:"

    const lastName = document.createElement("input")
    lastName.placeholder = "Last Name:"

    const adress = document.createElement("input")
    adress.placeholder = "Adress:"

    const city = document.createElement("input")
    city.placeholder = "City:"

    const postcode= document.createElement("input")
    postcode.placeholder = "Postcode:"

    const country = document.createElement("input")
    country.placeholder = "Country:"

    const email = document.createElement("input")
    email.placeholder = "Email:"

    const phone = document.createElement("input")
    phone.placeholder = "Phone:"

    const sendBtn = document.createElement("button")
    sendBtn.innerText = "Send Order!"

    formBox.append(firstName, lastName, adress, city, postcode, country, email, phone, sendBtn)
    
    contentDiv.appendChild(formBox)

    sendBtn.addEventListener("click", (e) =>{
        e.preventDefault()

        contentDiv.innerHTML = ""
        contentDiv.innerText = "Tack för din beställning"
        
        postOrder();
    }) 


        


    function postOrder(){
        let myCart = JSON.parse(localStorage.getItem("cart"))
        let order = {
            payment_method: "bacs", 
            payment_method_title: "Direct Bank Transfer",
            set_paid: true,

            billing: {
                first_name: firstName.value,
                last_name: lastName.value,
                adress_1: adress.value,
                city: city.value,
                postcode: postcode.value,
                country: country.value,
                email: email.value,
                phone: phone.value
            },
            shipping: {
                first_name: firstName.value,
                last_name: lastName.value,
                adress_1: adress.value,
                city: city.value,
                postcode: postcode.value,
                country: country.value,
                email: email.value,
                phone: phone.value
            },
            line_items: newCart,

            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Flat rate",
                    total: "1500"
                }
            ]
        }
  


        fetch("https://teamgreen.site/index.php/wp-json/wc/v3/orders", {
            method: "POST",
            headers:{
                "Content-type": "application/json",
            },
            body: JSON.stringify(order), 
        })
        .then(res => res.json())
        .then(data => {
            console.log("Ordern är skickad", data);
            localStorage.setItem("cart", JSON.stringify([]));
        })
        .catch(err => console.log("err", err));
    }
};