let modules;
modules = [{
    nom: "ASD",
    coff: "2",
  }
];
loadatam();
refreshModulesList();
//recharger liste des modules en localStorage si elle n'existe pas
function loadatam() {
  let modulesliste = JSON.parse(localStorage.getItem('modules'));
  if (modulesliste == undefined) {
    localStorage.setItem('modules', JSON.stringify(modules));
  }
}
//afficher le paneau d'insertion de module et initializer les valeurs de form a 0
function addTmplFilem() {
  // cacher page de donner
  var total1 = document.getElementById("total1").style;
  total1.display = "none";
  // cacher page d'ajout etudiant
  var total2 = document.getElementById("total2").style;
  total2.display = "none";
  // Afficher page de d'ajout module
  var total3 = document.getElementById("total3").style;
  total3.display = "block";
  var total4 = document.getElementById("total4").style;
  total4.display = "none";

  // afficher submit 1 et cacher submit 2
  document.getElementById("submitm1").style.display = "block";
  document.getElementById("submitm2").style.display = "none";

  // initializer laes valeur des form a null
  document.getElementById("namem").value = null;
  document.getElementById("coff").value = null;
}
// fonction pour creer module
function createsmod() {
  // obtenir les valeur des inputs
  let newModule = {};
  newModule.nom = document.getElementById("namem").value;
  newModule.coff = document.getElementById("coff").value;
  return newModule;
}
// fonction pour ajouter module a local storage
function pushlistm(obj) {
  //a
  let modslist = JSON.parse(localStorage.getItem('modules'));
  modslist.push(obj);
  localStorage.setItem('modules', JSON.stringify(modslist));
}
//fonction pour inserer lemodule a la page
function ajemod(module) {
  // Changer le format de données d'origine au format textNode
  let name = document.createTextNode(module.nom);
  let onlyId = document.createTextNode(module.coff);
  // creation de tr
  var tr = document.createElement("tr");
  // creer td et lui affecter la classe et la valeur
  var td1 = document.createElement("td");
  td1.className = "col1";
  td1.appendChild(name);
  td1.align = "center";

  var idTd = document.createElement("td");
  idTd.className = "col1";
  idTd.appendChild(onlyId);
  idTd.align = "center";
  var td3 = document.createElement("td");
  td3.className = "col3";
  td3.style.textAlign = "center";
  // crreer et entreer button modifier et suprimer
  var input1 = document.createElement('input');
  var input2 = document.createElement('input');
  input1.setAttribute('type', 'button');
  input1.setAttribute('value', 'mod');
  input1.setAttribute('onclick', 'modifym(this)');
  input1.id = 'btn1';
  input2.setAttribute('type', 'button');
  input2.setAttribute('value', 'supp');
  input2.setAttribute('onclick', 'delm(this)');
  input2.id = 'btn2';
  td3.appendChild(input1);
  td3.appendChild(input2);

  // obtenir table1
  var table = document.getElementById("table1m");
  // affecter tr a table1
  table.appendChild(tr);
  // affecter les td a tr par tour
  tr.appendChild(td1);
  tr.appendChild(idTd);
  tr.appendChild(td3);
}
// fonction pour ajouter module
function submitm1() {
  var total3 = document.getElementById("total3").style;
  total3.display = "none";
  // cacher la page de form
  var total4 = document.getElementById("total4").style;
  total4.display = "block";
  let newModule = createsmod();
  pushlistm(newModule);
  ajemod(newModule);
  creeform();
}
// suppression de module de local storage
function supplocalm(nom) {
  let liste = JSON.parse(localStorage.getItem("modules"));
  let trouve = -1;
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].nom == nom) {
      trouve = i;
      break;
    }
  }
  liste.splice(trouve, 1);
  localStorage.setItem("modules", JSON.stringify(liste));
  creeform();
}
// fonction modifier
function modifym(obj) {
  // cacher la page principeal
  var total4 = document.getElementById("total4").style;
  total4.display = "none";
  // afficher le formulaire
  var total3 = document.getElementById("total3").style;
  total3.display = "block";
  // cacher submit1 ( button d'ajout ) et afficher submit 2 button de modification
  document.getElementById("submitm1").style.display = "none";
  document.getElementById("submitm2").style.display = "block";

  // obtenir les données a editer
  objTr = obj.parentNode.parentNode;
  objTd = objTr.getElementsByTagName('td');

  // Remplacez la valeur saisie par les données de cette ligne
  var name = document.getElementById("namem").value = objTd[0].innerText;
  var onlyId = document.getElementById("coff").value = objTd[1].innerText;

}
// Fonction pour modifer module
function submitm2() {
  // afficher la page principale
  var total4 = document.getElementById("total4").style;
  total4.display = "block";
  // cacher la page de form
  var total3 = document.getElementById("total3").style;
  total3.display = "none";

  // Modifier les données de la ligne d'édition
  objTd[0].innerText = document.getElementById("namem").value;
  objTd[1].innerText = document.getElementById("coff").value;

  newModule = {};
  newModule.nom = objTd[0].innerText;
  newModule.coff = objTd[1].innerText;

  modm(newModule);
}
// fonction pour modufier element en local storage
function modm(obj) {
  let nom = obj.nom;
  let liste = JSON.parse(localStorage.getItem("modules"));
  let trouve = -1;
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].nom == nom) {
      trouve = i;
      break;
    }
  }
  insertAt(liste, trouve, obj);
  localStorage.setItem("modules", JSON.stringify(liste));
}
//recharger tableau d'apres localstorage
function refreshModulesList() {
  let moduleslis = JSON.parse(localStorage.getItem('modules'));
  for (let i = 0; i < moduleslis.length; i++) {
    //création de l'article
    ajemod(moduleslis[i]);
  }
}
//Foction suprimer
function delm(obj) {
  // obtenir la ligne a suprimer
  var objParentnode = obj.parentNode.parentNode;
  var nom = objParentnode.childNodes[0].innerHTML;
  creeform();
  // supression de ligne
  objParentnode.remove();
  supplocalm(nom);
  // Après avoir supprimé les données, les données seront automatiquement complétées
}
//fonction de recherche
function seachm() {
  // obtenir table 1
  var table = document.getElementById("table1m");
  // Obtenir des mots-clés de recherche
  var seach = document.getElementById("seachm").value;
  // Ce qu'il faut chercher
  var index = document.getElementById("sm").selectedIndex;

  // Obtenir le nombre de lignes du tableau
  var num = table.rows.length - 1;

  document.getElementById("pno").innerText = 1;

  if (num > 1) {
    for (var i = 1; i < num + 1; i++) {
      var content = table.rows[i].cells[index].innerText;
      if (content.indexOf(seach) != -1) {
        table.rows[i].style.display = 'table-row';
      } else {
        table.rows[i].style.display = 'none';
      }
    }
  }
}
