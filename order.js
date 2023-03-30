
let contentDiv = document.getElementById("content");
export default function printCheckout() {

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
            line_items: [{
                name: "lol",
                quantity: 10,
            }],
            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Flat rate",
                    total: "100"
                }
            ]
        }
        myCart.map(item =>{
            delete item.price
            order.line_items.push(item)
        })        

//JSON.parse(localStorage.getItem("cart"))

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