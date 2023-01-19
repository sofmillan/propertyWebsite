import getDataFetch from "../helpers/getData.js";
import deleteDataFetch from "../helpers/deleteData.js";
import { printCards } from "../modules/printCards.js";
import postDataFetch from "../helpers/postData.js";
import { btnFilters } from "../modules/filters.js";
const urlProperties = "http://localhost:3000/properties";
const urlFavorites = "http://localhost:3000/favorites";
let properties = [];

const propertiesContainer = document.querySelector(".properties_container");
const searchInput = document.getElementById("searchInput");
const btnAll = document.getElementById("all");
const btnApartment = document.getElementById("apartment");
const btnHouse = document.getElementById("house");
const btnStudio = document.getElementById("studio");
const btnFarm = document.getElementById("farm");
const btnCommercial = document.getElementById("commercial");

const filterButtons = [
  btnAll,
  btnApartment,
  btnHouse,
  btnStudio,
  btnFarm,
  btnCommercial,
];

document.addEventListener("DOMContentLoaded", async () => {
  sessionStorage.removeItem("propertyDetails");
  sessionStorage.removeItem("editProperty");

  try {
    properties = await getDataFetch(urlProperties);
    console.log(properties);

    printCards(propertiesContainer, properties);
    btnFilters(filterButtons, properties, propertiesContainer);
  } catch (error) {
    console.log(error);
  }
});

document.addEventListener("click", async (event) => {
  const { target } = event;

  if (target.classList.contains("property_image")) {
    sessionStorage.setItem("propertyDetails", JSON.stringify(target.id));
    window.location.href = "./pages/details.html";
  }

  if (target.classList.contains("delete")) {
    {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2a41e8",
        cancelButtonColor: "#ff5e14",
        confirmButtonText: "Yes!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const idProperyDelete = parseInt(target.name);
          const urlDelete = `${urlProperties}/${idProperyDelete}`;
          try {
            await deleteDataFetch(urlDelete);
            properties = await getDataFetch(urlProperties);
            printCards(propertiesContainer, properties);
            Swal.fire(
              'Deleted!',
              'Your property has been deleted.',
              'success'
            )
            
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  }

  if (target.classList.contains("favorite")) {
    const idFavorite = target.name;
    const urlFavoriteProperty = `${urlFavorites}?id=${idFavorite}`;

    const favorite = await getDataFetch(urlFavoriteProperty);
    //Obtenemos el objeto
    const favoriteProperty = await getDataFetch(
      `${urlProperties}/${idFavorite}`
    );
    if (favorite.length === 0 && Object.entries(favoriteProperty).length) {
      await postDataFetch(urlFavorites, favoriteProperty);
      const data = await getDataFetch(urlFavorites);
      Swal.fire(
        'Nice!',
        'This property has been added to favorites!',
        'success'
      )

      console.log(data);
      
    }
  }

  if (target.classList.contains("edit")) {
    sessionStorage.setItem("editProperty", JSON.stringify(target.name));
    window.location.href = "./pages/form.html";
  }
});

searchInput.addEventListener("search", async () => {
  const location = searchInput.value;

  try {
    if (location) {
      const propertyData = await getDataFetch(urlProperties);
      const searchResult = propertyData.filter((property) =>
        property.location.toLowerCase().includes(location.toLowerCase())
      );
      console.log(searchResult);
      printCards(propertiesContainer, searchResult);
      btnFilters(filterButtons, searchResult, propertiesContainer);
    } else {
      const propertyData = await getDataFetch(urlProperties);
      printCards(propertiesContainer, propertyData);
      btnFilters(filterButtons, propertyData, propertiesContainer);
    }
  } catch (error) {
    console.log(error);
  }
});
