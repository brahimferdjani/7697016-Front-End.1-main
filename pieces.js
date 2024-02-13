// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {
    // Création des balises 
    const article = pieces[i];
    const piecesElement = document.createElement("article");
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "(Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    //Rattachement de nos balises au DOM
    const sectionFiches = document.querySelector(".fiches");
    sectionFiches.appendChild(piecesElement);
    piecesElement.appendChild(imageElement);
    piecesElement.appendChild(nomElement);
    piecesElement.appendChild(prixElement);
    piecesElement.appendChild(categorieElement);
    piecesElement.appendChild(descriptionElement);
    piecesElement.appendChild(stockElement);
}

const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");

boutonTrierDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
});

const boutonFiltrerDescription = document.querySelector(".btn-trier-description");

boutonFiltrerDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description;
    });
    console.log(piecesFiltrees);
});

const piecesNoms = pieces.map(piece => piece.nom);
console.log(piecesNoms);

const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) { // parcourir la liste de la fin vers le debut 
    if (pieces[i].prix > 35) {
        noms.splice(i, 1) // splice = supprimer les elements indesirables
    }
}
console.log(noms);

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
const zoneAbordables = document.querySelector('.abordables');
zoneAbordables.appendChild(abordablesElements);

const piecesDisponibles = pieces.map(piece => piece.nom);
const piecesDisponiblesPrix = pieces.map(piece => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) { // parcourir la liste de la fin vers le debut 
    if (!pieces[i].disponibilite) {
        piecesDisponibles.splice(i, 1); // splice = supprimer les elements indesirables
        piecesDisponiblesPrix.splice(i, 1);
    }
}

console.log(piecesDisponibles + piecesDisponiblesPrix);

//Création de la liste
const elementsDisponibles = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < piecesDisponibles.length; i++) {
    const listeDisponible = document.createElement('li');
    listeDisponible.innerText = piecesDisponibles[i] + " - " + piecesDisponiblesPrix[i]+"€";
    elementsDisponibles.appendChild(listeDisponible);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
const zoneDisponible = document.querySelector('.disponible');
zoneDisponible.appendChild(elementsDisponibles);