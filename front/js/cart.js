/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
///// Récupére les données des produits contenus dans localeStorage
// Déclaration de la variable "productSavedLocalStorage"
let dataSavedLocalStorage = JSON.parse(localStorage.getItem("product"));

const dataSaved = dataSavedLocalStorage;
console.log(dataSaved);

/// Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
let priceTotalCalcul = [];

////Si le panier n'est pas vide : Afficher les produits du localeStorage dans le panier
let strutureBasketProduct = [];

const sectionCartItem = [];

/////////////////////////////////////////////////////////////////////////
///// Récupére les données de la commande contenus dans localeStorage
let commandProductsData = JSON.parse(localStorage.getItem("command"));

/// Récupére le nombre de produit
//   let productQuantityTotal = [];

/// Récupére le nombre d'article
let productLength = [];

let productSavedLocalStorage = [];

/////////////////////////////////////
////////////////////////////////////
/////////////////////////////////////
////////////////////////////////////
/////////////////////////////////////

function getPriceProduct() {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((produits) => {
      // Récupération des attributs des produits contenu dans le localeStorage
      for (s = 0; s < dataSaved.length; s++) {
        const idProductLocalStorage = produits.find(
          (element) => element._id === dataSaved[s].id
        );
        console.log(idProductLocalStorage);
      }

      // Récupération des attributs des produits contenu dans le localeStorage
      for (s = 0; s < dataSaved.length; s++) {
        const idProductLocalStorage = produits.find(
          (element) => element._id === dataSaved[s].id
        );

        ////////// Déclaration de la variable quantityBasket

        let quantityBasket = dataSaved[s].quantitySelect;
        console.log("QTE : " + quantityBasket);

        let priceProduct = idProductLocalStorage.price;
        console.log("PRICEPRODUCT : " + priceProduct);
        let totalLigne = priceProduct * quantityBasket;
        console.log("TOTALLIGNE : " + totalLigne);

        // Créer une variable pour interpréter ses données
        productSavedLocalStorage.push(totalLigne);

        ///////////////////// Récupération du prix des produits dans le panier
        //////////////////////////////

        // Sélection de la classe ou je vais injecté le HTML du prix total de produit dans le panier
        const sectionTotalPrice = document.querySelector("#totalPrice");

        for (let m = 0; m < productSavedLocalStorage.length; m++) {
          let priceProductBasket = productSavedLocalStorage[m];

          // Mettre les prix du panier dans la variable "priceTotalCalcul"
          priceTotalCalcul.push(priceProductBasket);
          console.log(productSavedLocalStorage);
        }

        /// Additionner les prix qu'il y a dans le tableau de la variable "prixTotalCalcul"
        /// avec la methode .reduce
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        const priceTotal = priceTotalCalcul.reduce(reducer, 0);

        /// Affichage du prix total des produits dans le panier
        sectionTotalPrice.textContent = `${priceTotal}`;

        console.log(priceTotal);
      }
    });
}
getPriceProduct();

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
function basketDisplay() {
  // Fonction asynchrone d'affichage du panier
  //const basketDisplay = async () => {
  //await dataSaved;
  ////////// Récupération des données de l'Api
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((produits) => {
      // Sélection de la classe ou je vais injecté le HTML quand le panier est vide
      const sectionCartItem = document.querySelector("#cart__items");

      /////////////////////////////////////////////////////////////////////////////////////
      //////// ////////Fonction Affichage des produits du panier

      if (dataSaved) {
        // Récupération des attributs des produits contenu dans le localeStorage
        for (s = 0; s < dataSaved.length; s++) {
          const idProductLocalStorage = produits.find(
            (element) => element._id === dataSaved[s].id
          );
          console.log(idProductLocalStorage);

          /////////////////////////////////// Affichage du panier ////////////////////////

          strutureBasketProduct =
            strutureBasketProduct +
            `
    <article
                class="cart__item"
                data-id="${dataSaved[s].id}"
                data-color="${dataSaved[s].colorSelect}"
              >
                <div class="cart__item__img">
                  <img
                    src="${idProductLocalStorage.imageUrl}"
                    alt="Photographie d'un canapé"
                  />
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${idProductLocalStorage.name}</h2>
                    <p>${dataSaved[s].colorSelect}</p>
                    <p>Prix =  ${idProductLocalStorage.price} euros</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${dataSaved[s].quantitySelect}</p>
                      <input
                        type="number"
                        class="itemQuantity"
                        name="itemQuantity"
                        min="1"
                        max="100"
                        value="${dataSaved[s].quantitySelect}"
                        data-id="${dataSaved[s].id}"
                        data-color="${dataSaved[s].colorSelect}"
                      />
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `;
          /// Affichage des produits dans le panier
          sectionCartItem.innerHTML = strutureBasketProduct;
        }
        removeFromBasket();
        changeQuantity();
      }
      /// Si locale storage est vide
      else {
        const basketEmpty = `
      <div style="witdh: 100%; text-align: center; font-size: 130%" >
      NE CONTIENT AUCUN PRODUIT
      </div>`;

        sectionCartItem.innerHTML = basketEmpty;
        /// Afficher une phrase au click si le panier est vide
        commandButton.addEventListener("click", () => {
          alert("Ajouter un produit au panier pour continuer");
        });
      }
      ///////////////////////////////////////////////
      ////////////////////////////////////////////////////////////

      return;

      // const lessQuantity = async (basketDisplay) => {
      //   await basketDisplay;
      // };
    });
}
basketDisplay();

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/////////////////// Récupération du nombre de produit dans le panier /////////////////////////////

///////////////////////////////////////////////////////////////////////
const getNumberProduct = async (basketDisplay) => {
  await basketDisplay;
  //////////////////////////////
  // Sélection de la classe ou je vais injecté le HTML du nombre de produit dans le panier
  const sectionTotalQuantity = document.querySelector("#totalQuantity");

  console.log(dataSaved);

  if (dataSaved) {
    for (t = 0; t < dataSaved.length; t++) {
      productLength = dataSaved.length;
      console.log(productLength);
      sectionTotalQuantity.textContent = `${productLength}`;
    }
    ////////// Pour récupérer le nombre de produit dans le panier ////////////////////

    // dataSavedLocalStorage.forEach((product) => {
    //   productQuantityTotal.push(product.quantitySelect);

    //   sectionTotalQuantity.textContent = `${eval(
    //     productQuantityTotal.join("+")
    //   )}`;
    // });
  } else {
    /// Affichage de la quantité à zéro car il n'y a pas de produit dans le panier
    sectionTotalQuantity.textContent = `0`;

    const sectionTotalPrice = document.querySelector("#totalPrice");

    /// Affichage du prix total à zéro car il n'y a pas de produit dans le panier
    sectionTotalPrice.textContent = `0`;
  }
};
getNumberProduct();

///////////////////// Fin de l'affichage du panier //////////////////////

/////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// Rétirer un produit du panier
function removeFromBasket() {
  //const removeFromBasket = async (basketDisplay) => {
  //await basketDisplay;
  // Gestion du boutton supprimer l'article
  // Sélection des références de tous les boutons supprimer

  let btn_delete = document.querySelectorAll(".deleteItem");
  console.log(btn_delete);

  for (let l = 0; l < btn_delete.length; l++) {
    btn_delete[l].addEventListener("click", (event) => {
      // Enléve le chargement auto de la page du bouton
      event.preventDefault();
      console.log(event);

      const totalDataSavedLocalStorageRemove = dataSavedLocalStorage.length;

      console.log(totalDataSavedLocalStorageRemove);

      // Si il reste un produit dans le panier vider le localeStorage
      if (totalDataSavedLocalStorageRemove == 1) {
        return (
          localStorage.removeItem("product"),
          alert("le panier a été vidé"),
          console.log("supprime tous le panier"),
          // // Rechargement de la page
          (window.location.href = "cart.html")
        );
      } else {
        // Sinon selectionné du produit qui va être suprrimer en cliquant sur le bouton
        let selectionner_suppression =
          dataSavedLocalStorage[l].id && dataSavedLocalStorage[l].colorSelect;
        console.log(selectionner_suppression);

        /// avec la méthode filter je sélectionne les éléments à garder
        ////et je supprime l'élément ou le btn Supprimé a été cliqué
        dataSavedLocalStorage = dataSavedLocalStorage.filter(
          (element) =>
            element.id && element.colorSelect !== selectionner_suppression
        );
        console.log(dataSavedLocalStorage);

        // On envoie la variable dans le local Storage
        //La transformation en format Json et l'envoyer dans la key "produit" du localStorage

        localStorage.setItem("product", JSON.stringify(dataSavedLocalStorage));
        /// Alert pour avertir que le produit a été supprimer et rechargement de la page
        alert("Ce produit a été supprimer du panier");

        // // Rechargement de la page
        window.location.href = "cart.html";
      }
    });
  }
}

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//////////////////////// Changer la quantité via le panier //////////////////////////////////
////////// Déclaration de la fonction async pour changer la Quantité
const changeQuantity = async (basketDisplay) => {
  await basketDisplay;
  console.log("fonction Change Quantity");
  /////// Selection du imput ou se trouve la nouvelle Quantité
  let changeQuantityProduct = document.querySelectorAll(".itemQuantity");
  console.log(changeQuantityProduct);

  // const changeValue = imputValue.value;
  // console.log(changeValue);

  //// Créer un tableau vide ou l'on stoke les données de l'imput
  changeQuantityProduct.forEach((article) => {
    //// Ecoute du imput au click de la nouvelle quantité
    article.addEventListener("change", () => {
      console.log(article);
      ////// Récupération de la nouvelle quantité dans une variable newValue
      const newValue = article.value;
      console.log(newValue);
      ////// Boucle pour vérifier que l'id et la couleur du localstorage et du produit correspond
      for (o = 0; o < dataSaved.length; o++) {
        if (
          dataSaved[o].id == article.dataset.id &&
          dataSaved[o].colorSelect == article.dataset.color
        ) {
          ///// Si oui on remplace la nouvelle quantité dans le localeStorage
          return (
            (dataSaved[o].quantitySelect = Number(newValue)),
            localStorage.setItem(
              "product",
              JSON.stringify(dataSaved),
              console.log(dataSaved)
            )(
              /// Rechargement de la page
              (window.location.href = "cart.html")
            )
            /// Affichage des produits dans le panier

            //       //   ////   selection de la classe ou implenter la nouvelle quantité
            //     const sectionNewNumber = document.querySelector(
            //       ".cart__item__content__settings__quantity"
            //     );
            //     console.log(sectionNewNumber);

            //     // Structure HTML pour l'affichage de la nouvelle quantité du produit sélectionné donnés de l'API
            //     let newBasketQuantity = `
            //     <div class="cart__item__content__settings__quantity">
            //    <p>Qté : ${dataSaved[o].quantitySelect}</p>
            //    <input
            //      type="number"
            //      class="itemQuantity"
            //      name="itemQuantity"
            //      min="1"
            //      max="100"
            //      value="${dataSaved[o].quantitySelect}"
            //      data-id="${dataSaved[o].id}"
            //      data-color="${dataSaved[o].colorSelect}"
            //    />
            //  </div>`;

            //     //    // Injection du html dans la page produit
            //     sectionNewNumber.innerHTML = newBasketQuantity;
            /////////////////////////////////////////////////////
            ////////////////////////////////////////////////////
            //////////////////////////////////////////////////
            ////// A modifier pour que cela soit dynammique///////////
            ///////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////

            //[o].textContent = dataSavedLocalStorage[o].quantity)
            // )
            // (document.querySelectorAll("#totalPrice")[o].textContent = `${
            //   dataSavedLocalStorage[o].quantitySelect *
            //   dataSavedLocalStorage[o].price.toString().replace("")
            // }`)
          );
        }
      }
    });
  });
};

///////////////////// Fin de l'affichage du panier //////////////////////
/////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////
////////////// Formulaire de contact ///////////////////////////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
/// Sélection des variable du champ du formulaire
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

/// Déclaration des fonctions des champs du formulaire
let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/// Fonction de sélection de la variable "errormessage" du Prénom avec une fonction
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

/// Ecoute et interprétation du champs du formulaire "Prénom"
firstName.addEventListener("input", function (e) {
  valueFirstName;
  if (e.target.value.length == 0) {
    console.log("rien");
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = null;
    console.log(valueFirstName);
    /// Mise en place du regex pour le champ Prénom
    ///avec des minuscules a-z et des majuscules A-Z entre 3 à 25 caratéres
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    firstNameErrorMsg.innerHTML =
      "Prénom doit contenir entre 3 et 25 caractéres";
    valueFirstName = null;
    console.log("Trop court ou trop long");
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = e.target.value;
    console.log("success");
    console.log(valueFirstName);
  }
  if (
    /// si différent avec "!" du regex pour le champ Prénom
    ///avec des minuscules a-z et des majuscules A-Z entre 3 à 25 caratéres
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    firstNameErrorMsg.innerHTML =
      "Prenom ne contient pas de caractères spéciaux, chiffre ou accent";
    valueFirstName = null;
    console.log("Caractères spéciaux non acceptés");
  }
});

////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/// Fonction de sélection de la variable "errormessage" du "Nom"
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

/// Ecoute et interprétation du champs du formulaire "Nom" avec une fonction
lastName.addEventListener("input", function (e) {
  valueLastName;
  if (e.target.value.length == 0) {
    console.log("rien");
    lastNameErrorMsg.innerHTML = "";
    valueLastName = null;
    console.log(valueLastName);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    lastNameErrorMsg.innerHTML = "Nom doit contenir entre 3 et 25 caractéres";
    valueLastName = null;
    console.log("Trop court ou trop long");
  }
  /// Mise en place du regex pour le champ Nom
  ///avec des minuscules a-z et des majuscules A-Z entre 3 à 25 caratéres
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    lastNameErrorMsg.innerHTML = "";
    valueLastName = e.target.value;
    console.log("success");
    console.log(valueLastName);
  }
  if (
    /// si différent avec "!" du regex pour le champ Nom
    ///avec des minuscules a-z et des majuscules A-Z entre 3 à 25 caratéres
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    lastNameErrorMsg.innerHTML =
      "Nom ne contient pas de caractères spéciaux, chiffre ou accent";
    valueLastName = null;
    console.log("Caractères spéciaux non acceptés");
  }
});

////////////////////////////////////////////////
///////////////////////////////////////////////////
////////////////////////////////////////////////////
/// Fonction de sélection de la variable "errormessage" du "Adresse"
const addressErrorMsg = document.getElementById("addressErrorMsg");

/// Ecoute et interprétation du champs du formulaire Adresse" avec une fonction
address.addEventListener("input", function (e) {
  valueAddress;
  if (e.target.value.length == 0) {
    console.log("rien");
    addressErrorMsg.innerHTML = "";
    valueAddress = null;
    console.log(valueAddress);
  } else if (e.target.value.length < 3 || e.target.value.length > 35) {
    addressErrorMsg.innerHTML =
      "Adresse doit contenir entre 3 et 35 caractéres";
    valueAddress = null;
    console.log("Trop court ou trop long");
  }
  /// Mise en place du regex pour le champ Adresse
  /// des chiffres de 1 à 4 caractères suivi de minuscules a-z ou de majuscules A-Z de 5 à 35 caratéres
  if (e.target.value.match(/^[0-9]{1,4} [a-z A-Z]{5,35}$/)) {
    addressErrorMsg.innerHTML = "";
    valueAddress = e.target.value;
    console.log("success");
    console.log(valueAddress);
  }
  if (
    /// si différent avec "!" du regex pour le champ Adresse
    /// des chiffres de 1 à 4 caractères suivi de minuscules a-z ou de majuscules A-Z de 5 à 35 caratéres
    !e.target.value.match(/^[0-9]{1,4} [a-z A-Z]{5,35}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 35
  ) {
    addressErrorMsg.innerHTML =
      "Adresse commence par des chiffres et des lettres et ne contient pas de caractères spéciaux ni d'accent";
    valueAddress = null;
    console.log("Caractères spéciaux et accent non acceptés");
  }
});

////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/// Fonction de sélection de la variable "errormessage" du "Ville"
const cityErrorMsg = document.getElementById("cityErrorMsg");

/// Ecoute et interprétation du champs du formulaire "Ville" avec une fonction
city.addEventListener("input", function (e) {
  valueCity;
  if (e.target.value.length == 0) {
    console.log("rien");
    cityErrorMsg.innerHTML = "";
    valueCity = null;
    console.log(valueCity);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    cityErrorMsg.innerHTML = "Ville doit contenir entre 3 et 25 caractéres";
    valueCity = null;
    console.log("Trop court ou trop long");
  }
  /// Mise en place du regex pour le champ Ville
  ///avec des minuscules a-z et des majuscules A-Z entre 3 à 25 caratéres
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    cityErrorMsg.innerHTML = "";
    valueCity = e.target.value;
    console.log("success");
    console.log(valueCity);
  }
  if (
    /// si différent avec "!" du regex pour le champ Ville
    ///avec des minuscules a-z et des majuscules A-Z entre 3 à 25 caratéres
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    cityErrorMsg.innerHTML =
      "Ville ne contient pas de caractères spéciaux, chiffre ou accent";
    valueCity = null;
    console.log("Caractères spéciaux non acceptés");
  }
});

////////////////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////////
/// Fonction de sélection de la variable "errormessage" du "email"
const emailErrorMsg = document.getElementById("emailErrorMsg");

// Ecoute et interprétation du champs du formulaire "Adresse" avec une fonction fléchée
email.addEventListener("input", (e) => {
  valueEmail;
  if (e.target.value.length == 0) {
    emailErrorMsg.innerHTML = "";
    valueEmail = null;
    console.log(valueEmail);
    /// Mise en place du regex pour le champ email
    ///avec un mot avec la possibilité d'avoir un point + un mot suivi d'un point
    // + un mot qui contient 2 ou 4 caratéres
  } else e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  {
    emailErrorMsg.innerHTML = "";
    valueEmail = e.target.value;
    console.log(valueEmail);
  }

  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !e.target.value.length == 0
  ) {
    emailErrorMsg.innerHTML = "Email incorrect ex: nom@mail.com";
    valueEmail = null;
  }
});

///////// Selection du bouton envoyer le formulaire
const btnOrder = document.querySelector("#order");

////////////////////////////////////////////////////
///////////////////////////////////////////////////
//////////////////////////////////////////////////
//// Fonction d'écoute et interprétation du bouton commander avec une fonction fléchée
btnOrder.addEventListener("click", (e) => {
  //// Enlévement du comportement par défaut
  e.preventDefault();
  console.log("post stopper");
  //// Si tous les champs sont rempli correctement envoie dans le localstorage
  if (
    valueFirstName &&
    valueLastName &&
    valueCity &&
    valueAddress &&
    valueEmail
  ) {
    console.log("c'est bon envoie");
    const product = JSON.parse(localStorage.getItem("product"));
    let commandProduct = [];
    console.log(commandProduct);

    //// Crée un tableau vide ou l'on stoke les id, la couleur et la quantité des produits
    product.forEach((command) => {
      commandProduct.push([command.id]);
    });

    const data = {
      contact: {
        firstName: valueFirstName,
        lastName: valueLastName,
        address: valueAddress,
        city: valueCity,
        email: valueEmail,
      },
      products: commandProduct,
    };
    console.log(data);

    ////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    /////////////////// fetch post ///////////////////////////////////////

    let responseServer = [];

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((promise) => {
        responseServer = promise;
        console.log(responseServer);

        const priceTotalCommand =
          document.querySelector("#totalPrice").innerText;
        console.log(priceTotalCommand);

        const commandData = {
          contact: responseServer.contact,
          order: responseServer.orderId,
          Total: priceTotalCommand,
        };
        // Si oui et que commandProductsData est null alors envoyer les données de commande
        // dans le locale storage
        if (commandProductsData == null) {
          commandProductsData = [];
          commandProductsData.push(commandData);

          ///////// Sinon si
        } else if (commandProductsData != null) {
          commandProductsData.push(commandData);
        }
        /// Efface le panier
        localStorage.removeItem("product");
        ///// Envoie le numéro de commande dans l'URL de la page confirmation
        window.location = `confirmation.html?${responseServer.orderId}`;
      });
    firstName.value = "";
    lastName.value = "";
    address.value = "";
    city.value = "";
    email.value = "";
    valueFirstName = null;
    valueLastName = null;
    valueAddress = null;
    valueCity = null;
    valueEmail = null;

    //// Si ce n'est pas le cas envoie une alerte
  } else {
    alert("Remplir le formulaire correctement");
  }
});

console.log(dataSaved);
console.log(responseServer.orderId);
