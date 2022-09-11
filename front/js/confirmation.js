/////////////////////////////////////////////////////////////////////////
// Enregistre l'élément dans le localStorage
function getOrderId() {
  // //// déclaration de la variable pour récupérer le numéro de commande dans l'Url
  const commandProductNumber = window.location.search.split("?");

  /// Sélection de la constante ou je vais injecter le numero de commande
  const orderId = document.querySelector("#orderId");
  console.log(orderId);

  // Boucle de récupération des attributs de la commande contenu dans la const commandProduct
  for (s = 0; s < commandProductNumber.length; s++) {
    const numberCommand = commandProductNumber[s];
    console.log(numberCommand);

    /// Affichage du numéro de commande dans la page confirmation
    orderId.textContent = `${numberCommand}`;
  }
}
getOrderId();
//

//////////////////

///////// RESTE A VOIR AVANT SOUTENANCE ////////////////////////
/////////// La page ne doit pas se recharger quand on supprime ou ajoute un produit
///////////// Scinder les fonctions et bien commenté sont code
//////////// Remplir le plan de test et d'acceptation
