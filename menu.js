
let menuUrl = "https://teamgreen.site/index.php/wp-json/menus/v1/menus/";

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










/*

fetch("https://teamgreen.site/index.php/wp-json/menus/v1/menus/16")
.then(res => res.json())
.then(data => {
    console.log("Meny-rubriker", data.items);
    printMenu(data.items, "footer");
})

function printMenu(menu, target) {
    let div = document.querySelector("#menu");
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

*/