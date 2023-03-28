import printProducts from "./products.js";
import printCart from "./cart.js";

export default async function printMenu(printMenu) {
    const companyName = document.getElementById("company-name");
    const mainContent = document.getElementById("content");
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    let menuUrl = "https://teamgreen.site/index.php/wp-json/menus/v1/menus/";
    const pageJsonURL = "http://teamgreen.site/index.php/wp-json/wp/v2/pages";
    const postJsonURL = "http://teamgreen.site/index.php/wp-json/wp/v2/posts";
    
    async function pageFunction(fetchURL) {
        const response = await fetch(fetchURL);
        const data = await response.json();
        return data
    }
    
    let pageObject = await pageFunction(pageJsonURL);
    let postObject = await pageFunction(postJsonURL);
    
    
    fetch("http://teamgreen.site/index.php/wp-json")
        .then((response) => response.json())
        .then((data) => {
    
            let titelName = document.createElement("h1");
            titelName.innerText = data.name;
            titelName.addEventListener("click", function () {
                mainContent.innerHTML = "";
                fetch("http://teamgreen.site/index.php/wp-json/wp/v2/pages")
                    .then(res => res.json())
                    .then(data => {
                        printPages(data);
                    })
            })
            header.appendChild(titelName);
        });
    
    function fetchMenu(menu, target) {
    
        fetch(menuUrl + menu)
            .then(res => res.json())
            .then(data => {
                printMenu(data.items, target);
            })
    
    }
    
    function printMenu(menu, target) {
        let div = document.querySelector(target);
        let ul = document.createElement("ul");
    
        menu.map(item => {

            let li = document.createElement("li");
            li.innerText = item.title;
            let id = item.object_id;
    
            li.addEventListener("click", () => {
                mainContent.innerHTML = "";

            if (item.title=="Butik") {
               printProducts();
            }
            else if (item.title=="Varukorg") {
                printCart();
             }
           else if (item.title == "Hem") {
                fetchPageContent(82);
            } else if (item.title != "Nyheter") {
                fetchPageContent(id);
            } else {
                fetchPostContent();
            }
    
            })
            ul.append(li);
        })
        div.append(ul);
    }
    
    
    function fetchPageContent(fid) {
        setTimeout(() => {
    
            pageObject.map(value => {
    
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
            })
    
        }, 1000);
    }
    
    function fetchPostContent() {
        setTimeout(() => {
    
            postObject.map(value => {
    
                let wrapper = document.createElement("div");
                let titleAndDate = document.createElement("p");
                titleAndDate.innerText = value.title.rendered + " " + value.date
                let description = document.createElement("p");
                description.innerHTML = value.content.rendered
    
                wrapper.appendChild(titleAndDate);
                wrapper.appendChild(description);
    
                mainContent.appendChild(wrapper);
            })
        }, 1000);
    }
    
    fetch("http://teamgreen.site/index.php/wp-json/wp/v2/pages")
        .then(res => res.json())
        .then(data => {
            printPages(data);
        })
    
    function printPages(pages) {
    
        let ul = document.createElement("ul")
        let li = document.createElement("li")
        let div = document.createElement("div")
        li.innerText = pages[1].title.rendered;
        div.innerHTML = pages[1].content.rendered;
        ul.appendChild(li)
        mainContent.appendChild(ul);
        mainContent.appendChild(div);
    }
    fetchMenu("16", "#header");
    fetchMenu("17", "#footer");
}
