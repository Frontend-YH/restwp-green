const wrapper = document.getElementById("wrapper");
const companyName = document.getElementById("company-name");
const mainContent = document.getElementById("content");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
let menuUrl = "https://teamgreen.site/index.php/wp-json/menus/v1/menus/";


fetch("http://teamgreen.site/index.php/wp-json")
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

            console.log("GÖR EN FUNKTION SOM TÖMMER MAIN CONTENT OCH ERSÄTTER MED KLICKADE VÄRDETS CONTENT!");
            // FUNKTION HÄR
            
        })
        ul.append(li);
    })
    div.append(ul);
}




fetch("http://teamgreen.site/index.php/wp-json/wp/v2/pages") 
.then(res => res.json())
.then(data => {
    //console.log("posts", data);
    printPages(data);
})

function printPages(pages) {

    let ul = document.createElement("ul")
    
        //console.log("page", page.title.rendered);
        let li = document.createElement("li")
        let div = document.createElement("div")

        li.innerText = pages[0].title.rendered;
        div.innerHTML = pages[0].content.rendered;


        ul.appendChild(li)

        
    mainContent.appendChild(ul);
    mainContent.appendChild(div);

    
}



fetchMenu("16", "#header");
fetchMenu("17", "#footer");