const wrapper = document.getElementById("wrapper");
const companyName = document.getElementById("company-name");
const mainContent = document.getElementById("content");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
let menuUrl = "https://teamgreen.site/index.php/wp-json/menus/v1/menus/";


async function pageFunction() {
    const response = await fetch("http://teamgreen.site/index.php/wp-json/wp/v2/pages");
    const data = await response.json();
    return data
}

let pageObject = await pageFunction();


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
        let id = item.object_id;

        li.addEventListener("click", () => {
            mainContent.innerHTML = "";
            fetchPageContent(id);

            // Koppla in post JSON till click på nyheter och läs av url:nyheter/2 i menyn JSON

            // fetchPostContent(/* Något */);


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