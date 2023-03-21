const wrapper = document.getElementById("wrapper");
const companyName = document.getElementById("company-name");
const mainContent = document.getElementById("content");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
let menuUrl = "https://teamgreen.site/index.php/wp-json/menus/v1/menus/";



fetch("http://greenws.se/index.php/wp-json")
    .then((response) => response.json())
    .then((data) => {

        console.log(data)
        let titelName = document.createElement("h1");
        titelName.innerText = data.name;
        header.appendChild(titelName);
    });


function fetchMenu(menu, target) {

    fetch(menuUrl + menu)
        .then(res => res.json())
        .then(data => {
            console.log("Meny-rubriker", data.items);
            printMenu(data.items, target);
        })

}

function printMenu(menu, target) {
    let div = document.querySelector(target);
    let ul = document.createElement("ul");

    menu.map(item => {
        let li = document.createElement("li");
        li.innerText = item.title;
        li.addEventListener("click", () => {
        })
        ul.append(li);
    })
    div.append(ul);
}




fetchMenu("16", "#header");
fetchMenu("17", "#footer");