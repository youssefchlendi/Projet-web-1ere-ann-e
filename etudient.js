let etudiants;
let moys;
moys = [];
etudiants = [
];
creetab();

//fonction pour refresher la page et logout
function refrech() {
  window.location.reload();
}
//fonction pour creer td1 de form
function createtd1(text) {
  let td = document.createElement("td");
  td.class = "table2Td1";
  td.align = "right";
  td.appendChild(document.createTextNode(text));
  return td;
}
//fonction pour creer td2 de form
function createtd2(type, placeholder) {
  let td1 = document.createElement("td");
  let inp = document.createElement("input");
  td1.class = "table2Td2";
  td1.align = "right";
  td1.setAttribute("max","20");
  inp.type = type;
  inp.placeholder = placeholder;
  inp.required = "true";
  td1.appendChild(inp);
  return td1;

}
//fonction pour afficher le bultin d'un etudient
function bul(obj) {
  let cont = document.getElementsByClassName("main");
  var objParentnode = obj.parentNode.parentNode;
  var nom = objParentnode.childNodes[0].innerHTML;
  var t = document.createElement("div");

  let liste = JSON.parse(localStorage.getItem("etudiants"));
  let trouve = -1;
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].nomprenom == nom) {
      trouve = i;
      break;
    }
  }

  let modules = JSON.parse(localStorage.getItem('modules'));
  let tab = document.createElement("table");
  //ahiye
  //cont[0].innerHTML = null;
  tab.setAttribute("id", "tableb")
  var tr = document.createElement("tr");

  var r;
  r = creetr("nom Et prenom");
  r.appendChild(creetd(" "));

  r.appendChild(creetd(liste[trouve].nomprenom));

  tab.appendChild(r);
  var r1;
  r1 = creetr("Class");
  r1.appendChild(creetd(" "))

  r1.appendChild(creetd(liste[trouve].id));
  tab.appendChild(r1);
  for (let i = 0; i < modules.length; i++) {
    var r;
    r = creetr(modules[i].nom);
    r.appendChild(creetd(modules[i].coff));
    let k = i + 1;
    r.appendChild(creetd(liste[trouve]["n" + k]));
    tab.appendChild(r);
  }
  t.appendChild(tab);
  cont[0].appendChild(t);
  //tab.appendChild(tr);
  let listem = JSON.parse(localStorage.getItem('moyennes'));
  var r12;
  r12 = creetr("moyenne");
  r12.appendChild(creetd(moy()));
  r12.appendChild(creetd(listem[trouve]));
  let butt3 = document.createElement("input");
  butt3.id = "cancelb";
  butt3.type = "button";
  butt3.value = "hide";
  butt3.setAttribute("onClick", "hide(this)");
  butt3.style.height = "35px";
  butt3.style.width = "80px";
  tab.appendChild(r12);
  tab.appendChild(butt3);



}
//function pour suprimer bultin d'un etudient
function hide(obj) {
  let par=obj.parentNode.parentNode;
  par.remove();
}
//fonctio pour creer le formulaire d'ajout d'etudiant
function creeform() {
  let modules = JSON.parse(localStorage.getItem('modules'));
  let noms = new Array;
  let coffs = new Array;
  let table = document.getElementById("table2");
  table.innerHTML = null;

  //ajout de champ nom et it
  {
    let table = document.getElementById("table2");
    let tr1 = document.createElement("tr");
    let tr = document.createElement("tr");
    tr.appendChild(createtd1("Nom Et prenom"));
    tr.appendChild(createtd2("text", "nom"));
    tr.appendChild(createtd1("Classe"));
    tr.appendChild(createtd2("text", "TI-1*"));
    table.appendChild(tr);
    tr1.appendChild(createtd1("Num d'inscription"));
    tr1.appendChild(createtd2("number", "********"));
    table.appendChild(tr1);

  }
  //ajout des inputs de modules enregister
  for (let i = 0; i < modules.length; i++) {
    let table = document.getElementById("table2");
    let tr = document.createElement("tr");
    tr.class = "table2Tr";
    tr.cellSpacing = "18px";
    noms[i] = modules[i].nom;
    coffs[i] = modules[i].coff;
    tr.appendChild(createtd1("note " + noms[i]));
    tr.appendChild(createtd2("number", "note"));
    table.appendChild(tr);
  }

  let butt = document.createElement("input");
  butt.id = "submit1";
  butt.type = "button";
  butt.value = "Ajouter";
  butt.setAttribute("onClick", "submit1()");
  butt.style.height = "35px";
  butt.style.width = "80px";
  let butt1 = document.createElement("input");
  butt1.id = "submit2";
  butt1.type = "button";
  butt1.value = "Modifier";
  butt1.setAttribute("onClick", "submit2()");
  butt1.style.height = "35px";
  butt1.style.width = "80px";
  let butt3 = document.createElement("input");
  butt3.id = "cancel";
  butt3.type = "button";
  butt3.value = "cancel";
  butt3.setAttribute("onClick", "cancel()");
  butt3.style.height = "35px";
  butt3.style.width = "80px";
  let tr = document.createElement("tr");
  tr.style.margin = "auto";

  tr.appendChild(butt);
  tr.appendChild(butt3);
  tr.appendChild(butt1);

  table.appendChild(tr);

}
//fonction pour cacher le paneau n'ajout d'etudiant
function cancel() {
  let tot = document.getElementById("total2");
  tot.style.display = "none";
  showstud();
}
//fonction pour cacher le paneau d'ajout de module
function cancelm() {
  let tot = document.getElementById("total3");
  tot.style.display = "none";
  showmods();
}
//fonction pour creer un td
function creetd(text) {
  let td = document.createElement("td");
  td.setAttribute("class", "col1");
  td.align = "center";
  td.appendChild(document.createTextNode(text));
  return td;
}
//fonction pour creer les tds des note
function creetdd(text) {
  let td = document.createElement("td");
  td.setAttribute("class", "col2");
  td.align = "center";
  td.appendChild(document.createTextNode(text));
  return td;
}
//creer Table row
function creetr(text) {
  let td = document.createElement("tr");
  td.setAttribute("class", "row1");
  td.align = "center";
  td.appendChild(document.createTextNode(text));
  return td;
}
//creer tableau de total1
function creetab() {
  var tab = document.getElementById("table1");
  let modules = JSON.parse(localStorage.getItem('modules'));
  var tr = document.createElement("tr");
  tr.setAttribute("class", "tableTitle");
  tr.align = "center";
  tr.appendChild(creetd("Nom Et prenom"));

  let td = document.createElement("td");
  td.id = "onlyId";
  td.style.display = "none";
  tr.appendChild(td);

  for (let i = 0; i < modules.length; i++) {
    tr.appendChild(creetdd(modules[i].nom));
  }
  tr.appendChild(creetd("Moyen"));
  tr.appendChild(creetd("actions"));
  tab.appendChild(tr);
}
//recharger moyenne en localStorage si elle n'existe pas
function loadmoy() {
  let etudiantsList = JSON.parse(localStorage.getItem('moyennes'));
  if (etudiantsList == undefined) {
    localStorage.setItem('moyennes', JSON.stringify(moys));
  }

}
//recharger liste d'etudients en localStorage si elle n'existe pas
function loadata() {
  let etudiantsList = JSON.parse(localStorage.getItem('etudiants'));
  if (etudiantsList == undefined) {
    localStorage.setItem('etudiants', JSON.stringify(etudiants));
  }
}
//afficher le paneau d'insertion d'etudiant et initializer les valeurs de form a 0
function addTmplFile() {
  // cacher page de donner
  var total1 = document.getElementById("total1").style;
  total1.display = "none";
  // Afficher page d'ajout etudiant
  var total2 = document.getElementById("total2").style;
  total2.display = "block";
  // cacher page de d'ajout module
  var total3 = document.getElementById("total3").style;
  total3.display = "none";
  var total4 = document.getElementById("total4").style;
  total4.display = "none";
  // afficher submit 1 et cacher submit 2
  document.getElementById("submit1").style.display = "inline";
  document.getElementById("submit2").style.display = "none";
  // initializer laes valeur des form a null
  let tab = document.getElementById("table2");
  let elem = tab.getElementsByTagName("input");
  for (let i = 0; i < elem.length-3; i++) {
    elem[i].value = null;
  }
}
//afficher le modules
function showmods() {
  var total1 = document.getElementById("total1").style;
  total1.display = "none";
  // cacher page d'ajout etudiant
  var total4 = document.getElementById("total4").style;
  total4.display = "block";
}
//afficher les etudients
function showstud() {
  var total1 = document.getElementById("total1").style;
  total1.display = "block";
  // cacher page d'ajout etudiant
  var total4 = document.getElementById("total4").style;
  total4.display = "none";
}
// fonction pour creer etudient
function createstuden() {
  // obtenir les valeur des inputs
  let newEtudiant = {};
  let tab = document.getElementById("table2");
  let elem = tab.getElementsByTagName("input");
  newEtudiant.nomprenom = elem[0].value;
  newEtudiant.id = elem[1].value;
  newEtudiant.numins=elem[2].value;
  for (let i = 3; i < elem.length - 3; i++) {
    let j = i - 2;
    newEtudiant["n" + j] = elem[i].value;
    console.log(j);
    console.log(i);
  }
  return newEtudiant;
}
//calculer et affecter les moyenes au localStorage
function moy() {
  let modules = JSON.parse(localStorage.getItem('modules'));
  let etudientss = JSON.parse(localStorage.getItem('etudiants'));


  let moy = [];
  let som = 0;
  for (let i = 0; i < modules.length; i++) {
    som += parseFloat(modules[i].coff);
  }
  for (let i = 0; i < etudientss.length; i++) {
    moy[i] = 0;
    for (let j = 1; j < modules.length + 1; j++) {

      moy[i] += parseFloat(parseFloat(etudientss[i]["n" + j]) * parseFloat(modules[j - 1].coff));

    }
    moy[i] = moy[i] / som;


  }
  localStorage.setItem('moyennes', JSON.stringify(moy));
  return som;

}
// fonction pour ajouter etudient a local storage
function pushlist(obj) {
  //a
  let etudiantsList = JSON.parse(localStorage.getItem('etudiants'));
  etudiantsList.push(obj);
  localStorage.setItem('etudiants', JSON.stringify(etudiantsList));
}
//fonction pour inserer l'etudiant a la page
function ajetud(etudiant) {
  // Changer le format de données d'origine au format textNode
  var tr = document.createElement("tr");
  moy();
  tr.appendChild(creetd(etudiant.nomprenom));
  var idTd = document.createElement("td");
  idTd.style.display = "none";
  idTd.appendChild(document.createTextNode(etudiant.id));
  let etudiantsList = JSON.parse(localStorage.getItem('etudiants'));
  let modules = JSON.parse(localStorage.getItem('modules'));
  var td5 = document.createElement("td");
  td5.className = "col1";
  td5.style.textAlign = "center";
  // crreer et entreer button modifier et suprimer
  var input1 = document.createElement('input');
  var input2 = document.createElement('input');
  var input3 = document.createElement('input');
  input1.setAttribute('type', 'button');
  input1.setAttribute('value', 'mod');
  input1.setAttribute('onclick', 'modify(this)');
  input1.id = 'btn1';
  input2.setAttribute('type', 'button');
  input2.setAttribute('value', 'supp');
  input2.setAttribute('onclick', 'del(this)');
  input2.id = 'btn2';
  input3.setAttribute('type', 'button');
  input3.setAttribute('value', 'bultin');
  input3.setAttribute('onclick', 'bul(this)');
  input3.id = 'btn3';
  td5.appendChild(input1);
  td5.appendChild(input2);
  td5.appendChild(input3);
  // obtenir table1
  var table = document.getElementById("table1");
  // affecter tr a table1
  table.appendChild(tr);
  // affecter les td a tr par tour
  // tr.appendChild(td1);
  tr.appendChild(idTd);
  for (let j = 1; j < modules.length + 1; j++) {
    tr.appendChild(creetdd(etudiant["n" + j]));
  }
  let moyn = JSON.parse(localStorage.getItem('moyennes'));
  let nom = etudiant.nomprenom;
  let liste = JSON.parse(localStorage.getItem("etudiants"));
  let trouve = -1;
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].nomprenom == nom) {
      trouve = i;
      break;
    }
  }
  tr.appendChild(creetd(moyn[trouve]));

  tr.appendChild(td5);
}
// fonction pour ajouter etudient
function submit1() {
  let newEtudiant = createstuden();
  pushlist(newEtudiant);
  ajetud(newEtudiant);
  modnums();
  moy();
  showstud();
}
//fonction pour modifier et calculer le nombre de pages
function modnums() {
  // modifier le nombre total des etudients
  // obtenir le  nombre des ligne de tableau
  var table = document.getElementById("table1");
  var num = table.rows.length - 1;
  // ecriture du nmbre des lignes
  var rowsNumber = document.getElementById("rowsNum");
  rowsNumber.innerHTML = num+1;

  // obtenir combien des etudients afficher par page
  var index = document.getElementById("sel").selectedIndex;
  var opt = document.getElementById("opt" + index).value;
  opt = parseInt(opt);

  // Obtenir la page actuelle
  var page = document.getElementById("pno").innerText;
  page = parseInt(page);

  // cacher les elements ayant rang plus que taille de cette page
  for (var i = (page * opt) + 1; i < num + 1; i++) {
    table.rows[i].style.display = "none";
  }

  // afficher la page principal
  //var total1 = document.getElementById("total1").style;
  //total1.display = "block";
  // cacher la page de formulaire
  var total2 = document.getElementById("total2").style;
  total2.display = "none";
  return num;
}
// suppression d'etudient
function supplocal(nom) {
  let liste = JSON.parse(localStorage.getItem("etudiants"));
  let trouve = -1;
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].nomprenom == nom) {
      trouve = i;
      break;
    }
  }
  liste.splice(trouve, 1);
  localStorage.setItem("etudiants", JSON.stringify(liste));
moy();
}
//Apres la supression d'un element rearrangement des etudients
function modifaff() {
  var page = document.getElementById("pno").innerText
  var index = document.getElementById("sel").selectedIndex;
  var opt = document.getElementById("opt" + index).value;
  var table = document.getElementById("table1");
  let num = modnums();
  if (num > (page * opt) + 1) {
    for (var i = ((page - 1) * opt) + 1; i < (page * opt) + 1; i++) {
      table.rows[i].style.display = "table-row";
    }
  } else {
    for (var i = ((page - 1) * opt) + 1; i < num + 1; i++) {
      table.rows[i].style.display = "table-row";
    }
  }
}
//Foction suprimer
function del(obj) {
  // obtenir la ligne a suprimer
  var objParentnode = obj.parentNode.parentNode;
  var nom = objParentnode.childNodes[0].innerHTML;

  // supression de ligne
  objParentnode.remove();
  supplocal(nom);
  // Après avoir supprimé les données, les données seront automatiquement complétées
  modifaff();
  moy();

}
// fonction modifier
function modify(obj) {
  // cacher la page principeal
  var total1 = document.getElementById("total1").style;
  total1.display = "none";
  // afficher le formulaire
  var total2 = document.getElementById("total2").style;
  total2.display = "block";
  // cacher submit1 ( button d'ajout ) et afficher submit 2 button de modification
  document.getElementById("submit1").style.display = "none";
  document.getElementById("submit2").style.display = "block";
  let tab = document.getElementById("table2");
  let elem = tab.getElementsByTagName("input");
  // obtenir les données a editer
  objTr = obj.parentNode.parentNode;
  objTd = objTr.getElementsByTagName('td');
  var name = elem[0].value = objTd[0].innerText;
  var onlyId = elem[1].value = objTd[1].innerText;
  console.log(numins);
  moy();
  let liste = JSON.parse(localStorage.getItem("etudiants"));
  let trouve = -1;
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].nomprenom == name) {
      trouve = i;
      break;
    }
  }
  // Remplacez la valeur saisie par les données de cette ligne

  for (let i = 3; i < elem.length - 2; i++) {

    let j = i - 2;
    elem[i].value = liste[trouve]["n" + j];

  }
  var numins = elem[2].value = liste[trouve].numins;



}
// fonction pour modufier element en local storage
function mod(obj) {
  let nom = obj.nomprenom;
  let liste = JSON.parse(localStorage.getItem("etudiants"));
  let trouve = -1;
  for (let i = 0; i < liste.length; i++) {
    if (liste[i].nomprenom == nom) {
      trouve = i;
      break;
    }
  }
  insertAt(liste, trouve, obj);
  //liste.splice(index,3,newEtudiant);
  localStorage.setItem("etudiants", JSON.stringify(liste));
  moy();
}
//fonction pour remplacer une cellule
function insertAt(array, index, element) {
  array.splice(index, 0);
  array.splice(index, 1, element);
  moy();

}
// Fonction pour modifer etudient
function submit2() {
  // afficher la page principale
  var total1 = document.getElementById("total1").style;
  total1.display = "block";
  // cacher la page de form
  var total2 = document.getElementById("total2").style;
  total2.display = "none";
  let tab = document.getElementById("table2");
  let elem = tab.getElementsByTagName("input");

  let newEtudiant = {};
  newEtudiant.nomprenom = elem[0].value;
  newEtudiant.id = elem[1].value;
  newEtudiant.numins=elem[2].value;
  console.log(newEtudiant.numins);
  for (let i = 3; i < elem.length - 2; i++) {
    let j = i - 2;
    newEtudiant["n" + j] = elem[i].value;
    console.log("n"+j);
    console.log(newEtudiant["n"+j]);
  }
  mod(newEtudiant);
  moy();
  refreshEtudiantsList();


}
//recharger tableau d'apres localstorage
function refreshEtudiantsList() {
  let etudiantsList = JSON.parse(localStorage.getItem('etudiants'));
  let tab=document.getElementById("table1");
  tab.innerHTML=null;
  creetab();
  for (let i = 0; i < etudiantsList.length; i++) {
    //création de l'article
    ajetud(etudiantsList[i]);
  }
  modnums();
}
// les focntions d'affichage et numerotaion de tableau
// page suivante
function next() {
  // obtenir table1
  var table = document.getElementById("table1");
  var num = table.rows.length - 1;

  // obtenir la page  actuelle
  var page = document.getElementById("pno").innerText;
  page = parseInt(page);

  // Obtenez combien de données sont affichées sur chaque page
  var index = document.getElementById("sel").selectedIndex;
  var opt = document.getElementById("opt" + index).value;
  opt = parseInt(opt);

  // page total
  var pageSum = Math.ceil((num) / opt);

  //Si la page suivante est inférieure au nombre total de pages, passez à la page suivante
  if (page < pageSum) {
    page = page + 1;
    document.getElementById("pno").innerText = page;
    for (var i = ((page - 2) * opt) + 1; i < ((page - 1) * opt) + 1; i++) {
      table.rows[i].style.display = "none";
    }
    for (var i = ((page - 1) * opt) + 1; i < (page * opt) + 1; i++) {
      table.rows[i].style.display = "table-row";
    }
  } else {
    window.alert("Cette page est la dernière page, impossible d'aller à la page suivante！")
  }
}
//  page precedente
function last() {
  // obtenir table 1
  var table = document.getElementById("table1");
  var num = table.rows.length - 1;

  // obtenir la page actuelle
  var page = document.getElementById("pno").innerText;
  page = parseInt(page);

  // Obtenez combien de données sont affichées sur chaque page
  var index = document.getElementById("sel").selectedIndex;
  var opt = document.getElementById("opt" + index).value;
  opt = parseInt(opt);

  // S'il s'agit de la page d'accueil, signalez l'invite, sinon passez à la page précédente
  if (page > 1) {
    document.getElementById("pno").innerText = page - 1;
    for (var i = ((page - 2) * opt) + 1; i < ((page - 1) * opt) + 1; i++) {
      table.rows[i].style.display = "table-row";
    }
    for (var i = ((page - 1) * opt) + 1; i < (page * opt) + 1; i++) {
      table.rows[i].style.display = "none";
    }
  } else {
    window.alert("Cette page est la page d'accueil, impossible d'aller à la page précédente！")
  }
}
// pagination ( numerotation des pages)
function pagination() {
  // obtenir table 1
  var table = document.getElementById("table1");
  var num = table.rows.length - 1;

  // Obtenez combien de données sont affichées sur chaque page
  var index = document.getElementById("sel").selectedIndex;
  var opt = document.getElementById("opt" + index).value;
  opt = parseInt(opt);

  // Aller à la page d'accueil
  document.getElementById("pno").innerText = 1;
  for (var i = 1; i < opt + 1; i++) {
    table.rows[i].style.display = "table-row";
  }
  for (var i = opt + 1; i < num + 1; i++) {
    table.rows[i].style.display = "none";
  }
}
//recherche d'etudient
function seach() {
  // obtenir table 1
  var table = document.getElementById("table1");
  // Obtenir des mots-clés de recherche
  var seach = document.getElementById("seach").value;
  // Ce qu'il faut chercher
  var index = document.getElementById("s").selectedIndex;

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

function gopage() {
  // obtenir table 1
  var table = document.getElementById("table1");
  var num = table.rows.length - 1;

  // Obtenez la page de renvoi
  var page = document.getElementById("gopg").value;
  page = parseInt(page);

  // Obtenez combien de données sont affichées sur chaque page
  var index = document.getElementById("sel").selectedIndex;
  var opt = document.getElementById("opt" + index).value;
  opt = parseInt(opt);

  // pages totales
  var pageSum = Math.ceil((num) / opt);

  if (page < pageSum) {
    for (var i = ((page - 1) * opt) + 1; i < (page * opt) + 1; i++) {
      table.rows[i].style.display = "table-row";
    }
    for (var i = 1; i < ((page - 1) * opt) + 1; i++) {
      table.rows[i].style.display = "none";
    }
    for (var i = (page * opt) + 1; i < num + 1; i++) {
      table.rows[i].style.display = "none";
    }
    document.getElementById("pno").innerText = page;
  }
  if (page == pageSum) {
    for (var i = ((page - 1) * opt) + 1; i < num + 1; i++) {
      table.rows[i].style.display = "table-row";
    }
    for (var i = 1; i < ((page - 1) * opt) + 1; i++) {
      table.rows[i].style.display = "none";
    }
    document.getElementById("pno").innerText = page;
  }
  if (page > pageSum) {
    window.alert("Le numéro de page que vous avez saisi dépasse le nombre total de pages, veuillez le saisir à nouveau！")
  }
}

creeform();
loadmoy();
loadata();
refreshEtudiantsList();
