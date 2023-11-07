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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", fermerModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Fermer modal form
function fermerModal() {
  modalbg.style.display = "none";
}

//Confirmation des données
function confirmDonnees(){

  let submit = true;
  formData.forEach((formInput) => {
    const inputElement = formInput.querySelector("input");
    initialiserForm(formInput, 'p');

    // Récupérez et vérifier la valeur de l'élément input
    let detectErreur = validation(inputElement); 
    if (detectErreur[0]){

      const pElement = document.createElement("p");
      pElement.textContent = detectErreur[1];
      pElement.style.color= "#FF4E60";
      pElement.style.fontSize = "14px";
      formInput.appendChild(pElement);

      inputElement.style.border = "2px solid #FF4E60";
      if (inputElement.type == "checkbox" && inputElement.id === "checkbox1"){
        formInput.querySelector(".checkbox-icon").style.border= "2px solid #FF4E60";
      }

      submit = false;
    }
  });
  if(submit == true){
    initialiserForm(formData);

    //message à afficher
    const pElement = document.querySelector(".text-label");
    pElement.textContent = "Merci pour votre inscription";
    pElement.style.padding= "50% 0";
    pElement.style.margin= "auto";
    pElement.style.fontSize = "36px";
    pElement.style.width = "271px";
    pElement.style.textAlign= "center";

    //boutton fermer
    const btnElement = document.querySelector(".btn-submit");
    btnElement.value = "Fermer";
    btnElement.addEventListener("click", fermerModal);
  }
  return false;
}

function validation(element){
  let msg = [false, "msg"];
  let listInput = ["text", "date", "email", "number"];

  if (listInput.includes(element.type)){
    if (element.value === ""){
      msg[0] = true;
      msg[1] = "Vous devez fournir une valeur";
    }
    else if (element.name == "last" && element.value.length<2){
      msg[0] = true;
      msg[1] = "la valeur que vous avez fournie est érronée";
    }
  }
  else if(element.type === "radio"){
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
      msg[1] = "Aucun tournois selectioné";
    }
  }
  else if(element.type === "checkbox"){
    if(!element.checked && element.id === "checkbox1"){
      msg[0] = true;
      msg[1] = "Veuillez accepter les conditions";
    }
  }

  return msg;
}

function initialiserForm(formInput, element){
  if(element == 'p'){
    // Parcourez les éléments p et supprimez-les
    const pElements = formInput.querySelectorAll(element);
    if(pElements.length>0){
      pElements.forEach((p) => {
        formInput.removeChild(p);
      });

      formInput.querySelector("input").style.border = "0";
      if (formInput.querySelector("input").type == "checkbox" && formInput.querySelector("input").id === "checkbox1"){
        formInput.querySelector(".checkbox-icon").style.border= "0";
      }
    }
  }
  else{
    formInput.forEach((formElement) => {
      formElement.remove();
    });    
    // document.querySelector(".text-label").remove();
    // document.querySelector(".btn-submit").remove();
  }
}