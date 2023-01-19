export const printFavorites = (container, array) => {
    container.innerHTML = "";
    array.forEach((property) => {
      const article = document.createElement("article");
      article.classList.add("propertyFav");
      article.innerHTML = `
      <figure class="property_figure">
      <img
      class="property_image"
      id=${property.id}
        src="${property.image}"
        alt=""
      />
    </figure>
    <div class="property_info">
      <h2 class="name">${property.name}</h2>
      <p class="location">
        <img
          src="https://png.monster/wp-content/uploads/2021/06/png.monster-10-252x370.png"
          alt=""
        />  ${property.location}
      </p>
      <p>${property.area} Sq Ft</p>
      <p class="type">${property.type}</p>
      <p class="status">${property.status}</p>
      <p class="price">$${property.price}</p>
    </div>
          `;
  
          container.appendChild(article);
    });
  };