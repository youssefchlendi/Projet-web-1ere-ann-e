let admins;
admins = [{
  user: "admin",
  pass: "admin",
}]
loadataa();
//affectaion des admins au localStorage s'il n'existe pas
function loadataa() {
  let adminet = JSON.parse(localStorage.getItem('admins'));
  if (adminet == undefined) {
    localStorage.setItem('admins', JSON.stringify(admins));
  }
}
//verifer le user et pass entrer
function verify(obj) {
  let form = document.getElementsByClassName("login");
  let name = document.getElementById("idlogin").value;
  let pass = document.getElementById("pass").value;
  let adminet = JSON.parse(localStorage.getItem('admins'));
  let trouve = -1;
  //Recherce de ID entrer dans le localStorage(admins)
  for (let i = 0; i < adminet.length; i++) {
    if (adminet[i].user == name) {
      trouve = i;
      break;
    }
  }
  //si name exist et passentrer = Mot de passe liée a name en localStorage
  // Afficher la page total1 , table d'etudients
  if (trouve != -1 && adminet[trouve].pass == pass) {
    let tot = document.getElementById("total1").style;
    tot.display = "block";
    form[0].style.display = "none";
  }
  //sinon  on cherche le nom entrer dans liste d'etudiantsList
  else {
    let cont = document.getElementById("total5");
    var objParentnode = obj.parentNode.parentNode;
    var nom = name;
    var t = document.createElement("div");

    let liste = JSON.parse(localStorage.getItem("etudiants"));
    let trouve = -1;
    for (let i = 0; i < liste.length; i++) {
      if (liste[i].nomprenom == nom) {
        trouve = i;
        break;
      }
    }
    //si le numins liée au post de nom == pass

    if (trouve != -1&&liste[trouve].numins==pass) {
      //afficher bultin
      let modules = JSON.parse(localStorage.getItem('modules'));
      let tab = document.createElement("table");
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
      cont.appendChild(t);
      //tab.appendChild(tr);
      let listem = JSON.parse(localStorage.getItem('moyennes'));
      var r12;
      r12 = creetr("moyenne");
      r12.appendChild(creetd(moy()));
      r12.appendChild(creetd(listem[trouve]));
      tab.appendChild(r12);
      cont.style.display = "block";
      form[0].style.display = "none";

    }
    //sinon si name exist mais le pass est difirent de Numins liée
    // afficher message error
    else if (trouve!=-1&&liste[trouve]!=pass) {
      let error=document.getElementById("error");
      error.style.display="block";
      error.innerText="Verifier votre Numero d'inscritpion";
    }
    //sinon si trouve=-1 afficher etudiant n'existe pas
    else {
      let error=document.getElementById("error");
      error.style.display="block";
      error.innerText="Etudiant n'existe pas";

    }
  }
}
//fonction pour enregister
function register(obj) {
  let parent = obj.parentNode;
  let ins = parent.getElementsByTagName("input");
  let adminet = JSON.parse(localStorage.getItem('admins'));
  let newAdmin = {}
  newAdmin.user = ins[0].value;
  newAdmin.pass = ins[1].value;
  adminet.push(newAdmin);
  localStorage.setItem("admins", JSON.stringify(adminet));
  showreg();
}
//afficher Login
function showreg() {
  let log = document.getElementsByClassName("login");
  log[0].style.display = "block";
  let sign = document.getElementsByClassName("SignUp");
  sign[0].style.display = "none";
}
//fficher Register
function showsign() {
  let log = document.getElementsByClassName("login");
  log[0].style.display = "none";
  let sign = document.getElementsByClassName("SignUp");
  sign[0].style.display = "block";
}
