var calendar = document.getElementById("calendar-table");
var gridTable = document.getElementById("table-body");// clase del calendario
var currentDate = new Date(); // objeto de la fecha actual 
var selectedDate = currentDate;
var selectedDayBlock = null;
var globalEventObj = {};
globalEventObj={"Thu May 18 2023":{"hjladsf":"asf","asdf":"asdf","ads f":"asd f"},"Sat May 20 2023":{"asdf":"mundo"}}
;

var sidebar = document.getElementById("sidebar");

function createCalendar(date, side) {
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });

  var currentDate = date;
  var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  var monthTitle = document.getElementById("month-name"); // captura mes 
  var monthName = currentDate.toLocaleString("es-419", { // toma el mes 
    month: "long"
  });
  var yearNum = currentDate.toLocaleString("es-419", { // tomar el year
    year: "numeric"
  });
  monthTitle.innerHTML = `${monthName} ${yearNum}`; // aplicar mes y year 

  if (side == "left") { // activar/deactivar animacion de sidenav 
    gridTable.className = "animated fadeOutRight";
  } else {
    gridTable.className = "animated fadeOutLeft";
  }

  gridTable.innerHTML = "";

  var newTr = document.createElement("div");
  newTr.className = "row";
  var currentTr = gridTable.appendChild(newTr);

  for (let i = 1; i < startDate.getDay(); i++) {
    let emptyDivCol = document.createElement("div");
    emptyDivCol.className = "col empty-day";
    currentTr.appendChild(emptyDivCol);
  } 

  var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  lastDay = lastDay.getDate();

  
  for (let i = 1; i <= lastDay; i++) {
    if (currentTr.getElementsByTagName("div").length >= 7) { // condicion colocar los dias por 7 dias a la semana
      currentTr = gridTable.appendChild(addNewRow());
    } 
     let currentDay = document.createElement("div");
    currentDay.className = "col"; 
    if (selectedDayBlock == null && i == currentDate.getDate() || selectedDate.toDateString() == new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()) {
      selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      console.log(selectedDate);
      document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("ES-419", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });

      selectedDayBlock = currentDay;
      setTimeout(() => {
        currentDay.classList.add("red");
        currentDay.classList.add("lighten-3"); 
      }, 900);
    }
    currentDay.innerHTML = i;
    currentTr.appendChild(currentDay);
  } 

  for (let i = currentTr.getElementsByTagName("div").length; i < 7; i++) {
    let emptyDivCol = document.createElement("div");
    emptyDivCol.className = "col empty-day";
    currentTr.appendChild(emptyDivCol);
  }

  setTimeout(() => {
    if (side == "left") {
      gridTable.className = "animated fadeInLeft";
    } else {
      gridTable.className = "animated fadeInRight";
    }
  }, 270);

  function addNewRow() {
    let node = document.createElement("div");
    node.className = "row";
    return node;
  }
}



window.onload = function what(){
  createCalendar(currentDate);
};


var todayDayName = document.getElementById("todayDayName"); // Dia de  hoy 
todayDayName.innerHTML = "Hoy es " + currentDate.toLocaleString("ES-419", { // fecha actual 
  weekday: "long",
  day: "numeric",
  month: "long"
});

var prevButton = document.getElementById("prev"); // boton mes anterior
var nextButton = document.getElementById("next"); // boton mes despues

prevButton.onclick = changeMonthPrev; // funcion cambiar mes anterior
nextButton.onclick = changeMonthNext; // funcion cambiar mes despues

function changeMonthPrev() { // funcion cambiar mes anterior
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
  createCalendar(currentDate, "left");
}
function changeMonthNext() { // funcion cambiar mes despues
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
  createCalendar(currentDate, "right");
}

function addEvent(title, desc) { // funcion de agregar un 
  if (!globalEventObj[selectedDate.toDateString()]) { // globalEventObj array de fechas
    globalEventObj[selectedDate.toDateString()] = {};
  }
  globalEventObj[selectedDate.toDateString()][title] = desc;
}

function showEvents() { // funcion mostrar eventos
  let sidebarEvents = document.getElementById("sidebarEvents");
  let objWithDate = globalEventObj[selectedDate.toDateString()];
  var allDays = gridTable.getElementsByClassName("col");
  console.log(allDays);
  sidebarEvents.innerHTML = "";

  if (objWithDate) {
    let eventsCount = 0;
    for (key in globalEventObj[selectedDate.toDateString()]) {
      let eventContainer = document.createElement("div");
      let eventHeader = document.createElement("div");
      eventHeader.className = "eventCard-header";

      let eventDescription = document.createElement("div");
      eventDescription.className = "eventCard-description";

      eventHeader.appendChild(document.createTextNode(key));
      eventContainer.appendChild(eventHeader);

      eventDescription.appendChild(document.createTextNode(objWithDate[key]));
      eventContainer.appendChild(eventDescription);

      /*
      let markWrapper = document.createElement("div");
      markWrapper.className = "eventCard-mark-wrapper";
      let mark = document.createElement("div");
      mark.classList = "eventCard-mark";
      markWrapper.appendChild(mark);
      eventContainer.appendChild(markWrapper);
*/
      eventContainer.className = "eventCard";

      sidebarEvents.appendChild(eventContainer);

      eventsCount++;
    }
    let emptyFormMessage = document.getElementById("emptyFormTitle");
    emptyFormMessage.innerHTML = `${eventsCount} eventos`;
  } else {
    let emptyMessage = document.createElement("div");
    emptyMessage.className = "empty-message";
    emptyMessage.innerHTML = "No hay eventos para esta fecha";
    sidebarEvents.appendChild(emptyMessage);
    let emptyFormMessage = document.getElementById("emptyFormTitle");
    emptyFormMessage.innerHTML = "No events now";
  }
}

gridTable.onclick = function (e) {

  if (!e.target.classList.contains("col") || e.target.classList.contains("empty-day")) {
   return;
  }

  if (selectedDayBlock) { // al selecionar un dia se sombrea 
    if (selectedDayBlock.classList.contains("blue") && selectedDayBlock.classList.contains("lighten-3")) {
      selectedDayBlock.classList.remove("blue"); // borrar sombreado anterior 
      selectedDayBlock.classList.remove("lighten-3"); // borrar sombreado anterior 
    }
  }
  selectedDayBlock = e.target;
  selectedDayBlock.classList.add("blue");
  selectedDayBlock.classList.add("lighten-3");

  selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.innerHTML));

  showEvents(); // si hace click dentro del calendario se actualiza el calendario

  document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("es-419", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

}

var changeFormButton = document.getElementById("changeFormButton");
var addForm = document.getElementById("addForm");
changeFormButton.onclick = function (e) {
  addForm.style.top = 0;
}

var cancelAdd = document.getElementById("cancelAdd");
cancelAdd.onclick = function (e) {
  addForm.style.top = "100%";
  let inputs = addForm.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  let labels = addForm.getElementsByTagName("label");
  for (let i = 0; i < labels.length; i++) {
    console.log(labels[i]);
    labels[i].className = "";
  }
}

var addEventButton = document.getElementById("addEventButton");
addEventButton.onclick = function (e) {
  let title = document.getElementById("eventTitleInput").value.trim();
  let desc = document.getElementById("eventDescInput").value.trim();

  if (!title || !desc) {
    document.getElementById("eventTitleInput").value = "";
    document.getElementById("eventDescInput").value = "";
    let labels = addForm.getElementsByTagName("label");
    for (let i = 0; i < labels.length; i++) {
      console.log(labels[i]);
      labels[i].className = "";
    }
    return;
  }

  addEvent(title, desc);
  showEvents();// si agrega un evento se actualiza los eventos en pantalla 

  if (!selectedDayBlock.querySelector(".day-mark")) {
    selectedDayBlock.appendChild(document.createElement("div")).className = "day-mark";
  }

  let inputs = addForm.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  let labels = addForm.getElementsByTagName("label");
  for (let i = 0; i < labels.length; i++) {
    labels[i].className = "";
  }

}