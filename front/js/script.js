// Récupération des articles de l'API

let cardsFetch = function () {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((produits) => {
      console.log(produits);

      let sectionItems = document.getElementById("items");

      // Répartition des données de l'API
      for (i = 0; i < produits.length; i++) {
        const articleCard = `
          <a href="./product.html?id=${produits[i]._id}"> 
            <article>
              <img
                src="${produits[i].imageUrl}" alt="${produits[i].altTxt}" />
              <h3 class="productName">${produits[i].name}</h3>
              <p class="productDescription">
                ${produits[i].description}
              </p>
            </article>
          </a>
        `;
        sectionItems.innerHTML += articleCard;
      }
    });
};
cardsFetch();
