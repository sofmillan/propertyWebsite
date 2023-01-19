import getDataFetch from "../helpers/getData.js";
import { printFavorites } from "../modules/printFavorites.js";

const urlFavorites = "http://localhost:3000/favorites";
const container = document.querySelector("#container");

document.addEventListener('DOMContentLoaded',async()=>{
    const favorites = await getDataFetch(urlFavorites);
    console.log(favorites);
    printFavorites(container, favorites);
})

document.addEventListener("click", async (event) => {
    const { target } = event;
  
    if (target.classList.contains("property_image")) {
      sessionStorage.setItem("propertyDetails", JSON.stringify(target.id));
      window.location.href = "./details.html";
    }
    });