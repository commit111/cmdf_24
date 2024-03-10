

var currid = 2;
var currpage = 0;
var currentlyShowingComment = 0;
var printOut = "";
var quizletIntro = "";
var addCardButton = document.getElementById("addCardButton");
var viewButton = document.getElementById("view");
var saveButton = document.getElementById("saveEdits");
var quizletButton = document.getElementById("quizlet");
var table = document.getElementById("commentTable");
var termField = document.getElementById("termText");
var definitionField = document.getElementById("definitionText");
var startingComment = {id: 0, definition: "The creation of new cognitive schemas when objects, experiences, or other information does not fit with existing schemas", pic: "0.png", inTable: true, deleted: false, pagenum: 1, term:""};
var secondComment = {id: 1, definition: "removes a table from an HTML document", pic: "1.png", inTable: true, deleted: false, pagenum: 2, term:""};
var arrayOfComments = [startingComment, secondComment];
var arrayOfTags = [];
var arrayOfTextBoxes = [];
var table;
var tableDiv = document.getElementById("tableSpace");



saveButton.addEventListener("click", changeTextandRefresh);
addCardButton.addEventListener("click", createCardAndShow);
quizletButton.addEventListener("click", convert);

function createCardAndShow() {
  createCard();
  refreshTable();
}

function createCard() {
  var newComment;
  if (termField.value == "") {
    newComment = {id: currid, definition: definitionField.value, pic: "0.png", inTable: true, deleted: false, pagenum: currpage, term:" "};
  }
  else {
    newComment = {id: currid, definition: definitionField.value, pic: currid + ".png", inTable: true, deleted: false, pagenum: currpage, term:termField.value};
  }
  arrayOfComments.push(newComment);
  currid++;
}

function createCardWithPic() {
  var newComment = {id: currid, definition: termField.value, pic: currid + ".png", inTable: true, deleted: false, pagenum: currpage, term:""};
  arrayOfComments.push(newComment);
  currid++;
}

function loadTable() {
  table = document.createElement("table");
  var header0 = document.createElement("th");
  header0.innerHTML = "Edited Text for the Term Column";
  var header1 = document.createElement("th");
  header1.innerHTML = "Term";
  var header2 = document.createElement("th");
  header2.innerHTML = "Definition";
  var header3 = document.createElement("th");
  header3.innerHTML = "Page #";
  var headerRow = table.insertRow();
  headerRow.appendChild(header0);
  headerRow.appendChild(header1);
  headerRow.appendChild(header2);
  headerRow.appendChild(header3);
  for (let j = 0; j < arrayOfComments.length; j++) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var textbox = document.createElement("input");
    textbox.type = "text";
    arrayOfTextBoxes.push(textbox);
    //header0.appendChild(textbox);
    cell1.appendChild(textbox);
    if (arrayOfComments[j].term == "") {
      let img = document.createElement('img');
      var imgname = arrayOfComments[j].pic;
      img.src = imgname;
      cell2.appendChild(img)
    } else {
      cell2.innerHTML = arrayOfComments[j].term;
    }
    cell3.innerHTML = arrayOfComments[j].definition;
    cell4.innerHTML = arrayOfComments[j].pagenum;
  }
  table.id = "commentTable";
  tableDiv.appendChild(table);
}

function changeTextandRefresh() {
  changeText();
  refreshTable();
}

function refreshTable() {
  table.remove();

  /*for (let i = 0; i < table.getElementsByTagName("tr").length + 1; i++) {
    table.deleteRow(0);
  }*/
  arrayOfTextBoxes = [];
  loadTable();
}

function changeText() {
  for (let i = 0; i < arrayOfComments.length; i++) {
    if (arrayOfTextBoxes[i].value != "") {
      arrayOfComments[i].term = arrayOfTextBoxes[i].value;
    }
    arrayOfTextBoxes[i].value = "";
  }
}

function convert() {
  if (printOut != "") {
    printOut.remove();
  }
  if (quizletIntro != "") {
    quizletIntro.remove();
  }
  var quizletString = "";
  for (let i = 0; i < arrayOfComments.length; i++) {
    if (arrayOfComments[i].term == "") {
      quizletString = quizletString + "EMPTY";
    }
    quizletString = quizletString + arrayOfComments[i].term;
    quizletString = quizletString + ", ";
    quizletString = quizletString + arrayOfComments[i].definition;
    quizletString = quizletString + ";";
  }
  quizletIntro = document.createElement("h3");
  quizletIntro.style.color = "white";
  quizletIntro.innerHTML = "Copy and paste this into a new Quizlet set (set the separators to commas and semicolons):";
  document.body.appendChild(quizletIntro);
  printOut = document.createElement("p");
  printOut.innerHTML = quizletString;
  printOut.style.color = "white";
  document.body.appendChild(printOut);
}