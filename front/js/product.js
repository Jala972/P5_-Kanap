// Récupération de la chaine de requète dans l'URL
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

// Extraire l'id sans ? avec la méthode (urlSeachParams)
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

// Affichage du produit de l'objet qui a été sélectionné par l'Id avec .find()
const getUrlProduct = "http://localhost:3000/api/products";
let cardsFetch = function () {
  fetch(getUrlProduct)
    .then((response) => response.json())
    .then((produits) => {
      console.log(produits);
      const idProduitSelectionner = produits.find(
        (element) => element._id === id
      );
      console.log(idProduitSelectionner);

      //////// Sélection de la classe ou j'ajoute les éléments du produit sélectionné
      const sectionItem = document.querySelector(".item");

      // Structure HTML pour l'affichage des élements du produit sélectionné donnés de l'API
      const buildProduct = `
      <article>
      <div class="item__img">
         
        <img src="${idProduitSelectionner.imageUrl}" alt="${idProduitSelectionner.altTxt}" />
        
      </div>
      <div class="item__content">
        <div class="item__content__titlePrice">
          <h1 id="title">${idProduitSelectionner.name}</h1>
          <p>
            Prix : <span id="price">${idProduitSelectionner.price}</span>€
          </p>
        </div>

        <div class="item__content__description">
          <p class="item__content__description__title">Description :</p>
          <p id="description">
          ${idProduitSelectionner.description}
          </p>
        </div>

        <div class="item__content__settings">
          <div class="item__content__settings__color">
            <label for="color-select">Choisir une couleur :</label>
            <select name="color-select" id="colors"> 
            </select>
          </div>
          
          <div class="item__content__settings__quantity">
            <label for="itemQuantity"
              >Nombre d'article(s) (1-100) :</label
            >
            <input
              type="number"
              name="itemQuantity"
              min="1"
              max="100"
              value="0"
              id="quantity"
            />
          </div>
        </div>
        <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>
            </div>
          </article>`;

      // Injection du html dans la page produit
      sectionItem.innerHTML = buildProduct;

      //////// Sélection de la classe où j'ajoute les couleurs du produit
      const sectionColors = document.querySelector("#colors");

      // Le formulaire s'adapte au nombre de choix de couleur du produit
      const colorsQuantity = idProduitSelectionner.colors;

      // Répartition des couleurs du produit donnés de l'API
      for (i = 0; i < colorsQuantity.length; i++) {
        const colorsCard = `
        <option value="${colorsQuantity[i]}">${colorsQuantity[i]}</option>`;

        // Injection du html des couleurs dans la page produit
        sectionColors.innerHTML += colorsCard;
      }

      //////// Sélection de la classe ou j'ajoute la quantité du produit
      const sectionQuantity = document.querySelector("#quantity");
      console.log(sectionQuantity);

      ////////////////////////////////// Gestion du panier
      //Récupération des données sélectionnées par l'utilisateur et envoie du panier

      //Sélection du bouton pour ajouter l'article au panier
      const btn_sendCard = document.querySelector("#addToCart");

      // Ecouter le bouton et envoyer le panier
      btn_sendCard.addEventListener("click", (event) => {
        event.preventDefault(); // Pour ne pas réactiver la page à chaque clic

        // Mettre le choix de la couleur du produit choisi par l'utilisateur dans une variable
        const choiceColor = sectionColors.value;

        // Mettre le choix de la quantité du produit choisi par l'utilisateur dans une variable
        const choiceQuantity = sectionQuantity.value;

        //Récupération des valeurs du formulaire
        let optionsProduct = {
          id: idProduitSelectionner._id,
          colorSelect: choiceColor, // ajoute la couleur sélectionné par l'utilisateur
          quantitySelect: choiceQuantity, // ajoute la valeur sélectionné par l'utilisateur
        };
        console.log(optionsProduct);

        /////////////////////////Le localStorage
        ////// Récupérer les valeurs du formulaires dans le localStorage

        // Déclaration de la variable "productSavedLocalStorage"
        let dataSavedLocalStorage = JSON.parse(
          // JSON.parse pour convertir les données en format JSON en JavaScript
          localStorage.getItem("product")
        );

        // Fonction pour ajouter un produit selectionné dans le localStorage
        const addProductLocalStorage = () => {
          // Ajout dans le tableau de l'objet avec les valeurs choisis par l'utilisateur
          dataSavedLocalStorage.push(optionsProduct);

          //Transformation en format JSON et envoie dans la key produit du localStorage
          localStorage.setItem(
            "product",
            JSON.stringify(dataSavedLocalStorage)
          );
        };

        //S'il y a déjà un produit enregistré dans le localStorage
        if (dataSavedLocalStorage != null) {
          for (i = 0; i < dataSavedLocalStorage.length; i++) {
            console.log("test");
            // Si ID et la couleur du produit dans le localStorage sont identiques au produit séléctionné
            if (
              dataSavedLocalStorage[i].id == idProduitSelectionner._id &&
              dataSavedLocalStorage[i].colorSelect == sectionColors.value
            ) {
              let quantityDataSaved = dataSavedLocalStorage[i].quantitySelect;
              console.log(quantityDataSaved);

              // On ajoute la quantité sélectionné par l'utilisateur
              ///////////////////////////////////////
              /// Utilisation de Number() pour définir les valeurs numériques des quantités
              ///////////////////////////////////////
              return (
                (dataSavedLocalStorage[i].quantitySelect =
                  Number(quantityDataSaved) + Number(sectionQuantity.value)),
                localStorage.setItem(
                  "product",
                  JSON.stringify(dataSavedLocalStorage)
                ),
                (dataSavedLocalStorage = JSON.parse(
                  localStorage.getItem("product")
                ))
              );
            }
          }
          for (i = 0; i < dataSavedLocalStorage.length; i++) {
            // Si ID est identique au produit dans le localStorage au produit séléctionné
            // mais que la couleur est différente ajouté le produit
            if (
              (dataSavedLocalStorage[i].id == idProduitSelectionner._id &&
                dataSavedLocalStorage[i].colorSelect != sectionColors.value) ||
              dataSavedLocalStorage[i] != idProduitSelectionner._id
            ) {
              return console.log("nouveau"), addProductLocalStorage();
            }
          }
        }
        //S'il n'y a pas de produit enregistré dans le localStorage
        else {
          localStorage.clear();
          dataSavedLocalStorage = [];
          addProductLocalStorage();
        }
      });
    });
};

cardsFetch();
