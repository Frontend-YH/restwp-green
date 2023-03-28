import cart from "./cart.js";
export default function printProducts(printProductList) {
    
    let productDiv = document.getElementById("content");
    fetch("https://teamgreen.site/index.php/wp-json/wc/store/v1/products")
    .then((response) => response.json())
    .then((data) => {    
          printProductList(data);
          console.log(data);
      })
    /* Skriver ut produktinfo */
    function printProductList(data) { 
        data.map(data => {
    
            let imgDiv=document.createElement("div");
            imgDiv.className="product-div";
            /* bilder */
            let img=document.createElement("img");
            img.className="product-img";
            img.src=data.images[0].src
            /* Lista  */
            let ul = document.createElement("ul"); 
            ul.className="product-name";
            let li = document.createElement("li");
            li.innerText = data.name;
    
            /* Produkt pris */
    
            let price= document.createElement("h4");
            price.innerHTML=data.price_html;
    
         
              ul.appendChild(li)
               /* Produkt beskrivning */
    
               let desc=document.createElement("p");    
                desc.innerhtml=data.description;
                /* Add 2 cart knapp */
            let cta=document.createElement("button");
            cta.innerText= data.add_to_cart.text;
            cta.addEventListener("click", () => {
                
                let cart= JSON.parse(localStorage.getItem("cart"))
                cart.push(data.name);
                console.log(cart);
                localStorage.setItem("cart", JSON.stringify(cart));
                
             /* printCart(); */   
             })
    
    
            imgDiv.appendChild(img);
            imgDiv.appendChild(ul);
            imgDiv.appendChild(price);
            imgDiv.appendChild(desc);
            imgDiv.appendChild(cta);
            productDiv.appendChild(imgDiv);
        })
    }
    }