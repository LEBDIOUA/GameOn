function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalClose = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const conteneur = document.querySelector(".content");
const modalBody = document.querySelector(".modal-body");
const myForm = document.querySelector("form");
const mq = window.matchMedia("(max-width: 768px)");

//Initialiser modal pour gérer le changement de responsive
modalbg.style.display = "none";

//Vérifier l'état de media query toutes les 100 ms
setInterval(gererChangementResponsive, 100);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", fermerModal);

function gererChangementResponsive() {
  if (mq.matches) {
    //Si la largeur d'écran est inférieure à 768px
    if(modalbg.style.display !== "none"){
      //Si le modal est affiché
      document.querySelector(".hero-section").style.display = "none";
      document.querySelector("footer").style.display = "none";
      document.querySelector("main").style.padding = "0";
      document.querySelector("main").style.margin = "0";
      modalbg.style.backgroundColor = "#232323";
      modalbg.style.position = 'relative';
      conteneur.style.maxWidth = 'none';
      conteneur.style.margin = "0";
    }
    else{
      remettreAZero();
    }
  }
  else{
    if(document.querySelector(".hero-section").style.display == "none"){
      remettreAZero();
    }
  }
}
function remettreAZero(){
  document.querySelector(".hero-section").style.display = "block";
  document.querySelector("footer").style.display = "block";
  document.querySelector("main").style.padding = "0.5vw 2vw 0 2vw";
  document.querySelector("main").style.margin = "1px 20px 15px";
  modalbg.style.backgroundColor = "rgba(26, 39, 156, 0.4";
  modalbg.style.position = 'fixed';
  conteneur.style.maxWidth = '500px';
  conteneur.style.margin = "5% auto";
}
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  //Désactiver les messages de validation
  if(!myForm.getAttribute("novalidate")){
    myForm.setAttribute("novalidate", "")
  }
  const msg = document.querySelector(".msgFinal")
  if(msg != null){
    msg.textContent = "Vous êtes déjà inscrit"
  }
  gererChangementResponsive();
}
// Fermer modal form
function fermerModal() {
  modalbg.style.display = "none";
  gererChangementResponsive();
}
//Confirmation des données
function confirmDonnees(){
  let submit = true;
  formData.forEach((formInput) => {
    const inputElement = formInput.querySelector("input");
    //Supprimer tous les msgs d'erreurs
    initialiserForm(formInput, 'p');
    // Récupérez et vérifier la valeur de l'élément input
    let detectErreur = validation(inputElement); 
    if (detectErreur[0]){
      //Créer une balise p et l'insérer pour afficher msg d'erreur 
      creerElement(formInput, "p", "msgErreur", detectErreur[1]);
      alerterChamp(inputElement, formInput);
      submit = false;
    }
  });
  if(submit == true){
    initialiserForm(conteneur, modalBody);
    creerElement(conteneur, "p", "msgFinal","Merci pour votre inscription");
    creerElement(conteneur, "input", "btn-submit btn-fermer", "Fermer", "button")
    conteneur.querySelector("input[type=button]").addEventListener("click", fermerModal)
  }
  return false;
}
function creerElement(conteneur, element, classe, contenue, type) {
  const pElement = document.createElement(element);
  if(type === "button"){
    pElement.type = type;
    afficherMsg(pElement, contenue, "value");
  }
  else if(element === "p"){
    afficherMsg(pElement, contenue, "textContent");
  }
  if(classe !== ""){
    pElement.className = classe;
  }
  conteneur.appendChild(pElement);
}
function supprimerElement(conteneur, element){
  conteneur.removeChild(element);
}
function alerterChamp(champ, formInput){
  champ.style.border = "2px solid #FF4E60";
  if (champ.type == "checkbox" && champ.id === "checkbox1"){
    formInput.querySelector(".checkbox-icon").style.border= "2px solid #FF4E60";
  }
}
function afficherMsg(element, msg, attribut){
  if(attribut === "textContent"){
    element.textContent = msg;
  }
  else if(attribut === "value"){
    element.value = msg;
  }  
}
function initialiserForm(container, element){
  if(element == 'p'){
    // Parcourez les éléments p et supprimez-les
    const pElements = container.querySelectorAll(".msgErreur");
    if(pElements.length>0){
      pElements.forEach((p) => {
        supprimerElement(container, p);
      });
      container.querySelector("input").style.border = "0";
      if (container.querySelector("input").type == "checkbox" && container.querySelector("input").id === "checkbox1"){
        container.querySelector(".checkbox-icon").style.border= "0";
      }
    }
  }
  else{
    supprimerElement(container, element);
  }
}
function validation(element){
  let msg = [false, ""];
  let listInput = ["text", "date", "email", "number"];
  if (listInput.includes(element.type)){
    if (element.name == "first" || element.name == "last"){
      msg = verifierText(element);
    }
    else if(element.name == "quantity"){
      msg = verifierEntier(element);
    }
    else if(element.type == "email"){
      msg = verifierEmail(element);
    }
    else if(element.type == "date"){
      msg = verifierDate(element);
    }
  }
  else if(element.type === "radio" || element.type === "checkbox"){
    msg = verifierCheck(element);
  }
  return msg;
}
function verifierText(element){
  let msg = [false, ""];
  if (element.value === ""){
    msg[0] = true;
    msg[1] = "Veuillez fournir une valeur";
  }
  else if(element.value.length<2){
    msg[0] = true;
    msg[1] = "Veuillez allonger ce texte pour qu'il comporte au moins 2 caractères. il en compte acctuellement un seul";
  }
  return msg;
}
function verifierDate(element){
  let msg = [false, ""];
  if (element.value === ""){
    msg[0] = true;
    msg[1] = "Veuillez fournir une valeur";
  }
  else{
    //Ce n'est pas demandé, avoir au moin 15ans
    const date = new Date();
    let dateAnniv = new Date(element.value);
    if((dateAnniv.getFullYear() + 15) > date.getFullYear()){
      msg[0] = true;
      msg[1] = "Vous devez avoir au moins 15ans pour participer";
    }
  }
  return msg;
}
function verifierEmail(element){
  let msg = [false, ""];
  let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (element.value === ""){
    msg[0] = true;
    msg[1] = "Veuillez fournir une valeur";
  }
  else if(!element.value.match(emailFormat)){
    msg[0] = true;
    msg[1] = "La valeur que vous avez fournie est érronée";
  }
  return msg; 
}
function verifierCheck(element){
  let msg = [false, ""];
  if(element.type === "radio"){
    const tournois = element.form.querySelectorAll('input[type="radio"]');
    let i=0;
    let tournoisChecked = false;
    do{
      if(tournois[i].checked){
        tournoisChecked = true;
      }
      i++;
    }while(i<tournois.length && !tournoisChecked);
    if (tournoisChecked == false){
      msg[0] = true;
      msg[1] = "Aucun tournois selectioné, veuillez choisir une option";
    }
  }
  else if(element.type === "checkbox"){
    if(!element.checked && element.id === "checkbox1"){
      msg[0] = true;
      msg[1] = "Vous devez vérifier que vous acceptez les termes et conditions";
    }
  }
  return msg;
}
function verifierEntier(element){
  let msg = [false, ""];
  if (element.value === ""){
    msg[0] = true;
    msg[1] = "Veuillez fournir une valeur";
  }
  else if(element.value < 0){
    msg[0] = true;
    msg[1] = "Veuillez saisir un nombre positif";
  }
  return msg;
}