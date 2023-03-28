import printMenu from "./menu.js";

if (localStorage.getItem("cart")) {
    console.log("Finns en kundvagn");
    //printCart();
} else {
    console.log("Skapar tom kundvagn");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    //printCart();
}
printMenu();
