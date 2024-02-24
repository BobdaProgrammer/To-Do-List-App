var settingsCheck = false;
var dragSrcElement = null;
var Icolor = "rgb(255,200,0)";
var copyText = "";
let onelineenabled = false;
let green = false;
let Issmall = false;
var target;
function colorChoice(colorChoice) {
  Icolor = colorChoice;
  CurrentCol();
}

function URL(string) {
  let url = "";
  let InUrl = false;
  for (var i = 0; i <= string.length; i++) {
    if (string.slice(i, i + 5) === "https" || InUrl) {
      url += string[i];
      InUrl = true;
    }
    if (InUrl == true && string[i] == " ") {
      InUrl = false;
    }
  }
  return url;
}
function CurrentCol() {
  if (Icolor == "rgb(0, 0, 0)") {
    document.getElementById("settings").style.backgroundColor =
      "rgb(255, 255, 255)";
  } else {
    document.getElementById("settings").style.backgroundColor = Icolor;
  }
  saveList();
}

function Sort() {
  var tasks = document.getElementsByClassName("list-item");
  var list = document.getElementById("list");
  for (var i = 0; i < tasks.length; i++) {
    var taskCol = tasks[i].querySelector(".list-item-text");
    var task = tasks[i];
    if (taskCol.style.color == "") {
      list.insertBefore(task, list.firstChild);
    }
  }
  for (var i = 0; i < tasks.length; i++) {
    var taskCol = tasks[i].querySelector(".list-item-text");
    var task = tasks[i];
    if (taskCol.style.color == "rgb(220, 172, 0)") {
      list.insertBefore(task, list.firstChild);
    }
  }
  for (var i = 0; i < tasks.length; i++) {
    var taskCol = tasks[i].querySelector(".list-item-text");
    var task = tasks[i];
    if (taskCol.style.color == "rgb(0, 130, 55)") {
      list.insertBefore(task, list.firstChild);
      console.log("jeff is here");
    }
  }
  for (var i = 0; i < tasks.length; i++) {
    var taskCol = tasks[i].querySelector(".list-item-text");
    var task = tasks[i];
    if (taskCol.style.color == "rgb(230, 80, 105)") {
      list.insertBefore(task, list.firstChild);
    }
  }
  for (var i = 0; i < tasks.length; i++) {
    var taskCol = tasks[i].querySelector(".list-item-text");
    var task = tasks[i];
    if (taskCol.style.color == "rgb(80, 173, 230)") {
      list.insertBefore(task, list.firstChild);
    }
  }
  saveList();
}
function copy(event) {
  var itemText = event.target.parentNode.querySelector(".list-item-text");
  if (event.shiftKey) {
    copyText += "\n" + itemText.innerHTML;
    console.log(copyText);
    navigator.clipboard.writeText(copyText);
    showSuccessTick(200);
  } else if (event.ctrlKey) {
    copyText += " " + itemText.innerHTML;
    console.log(copyText);
    navigator.clipboard.writeText(copyText);
    showSuccessTick(200);
  } else {
    navigator.clipboard.writeText(itemText.innerHTML);
    showSuccessTick(200);
    copyText = "";
  }
}

function enterKeyPressed(event) {
  if (event.keyCode == 13) {
    console.log("Enter key is pressed");
    addItem();
    return true;
  }
}

var dataTransfer = {};

function dragStart(event) {
  if (
    event.target.classList.contains("important-button") ||
    event.target.classList.contains("remove-button") ||
    event.target.classList.contains("copy")
  ) {
    event.stopPropagation(); // Prevent dragging if a button is clicked
    return;
  }

  dragSrcElement = this;
  if (event.type === "touchstart") {
    dataTransfer.effectAllowed = "move";
    dataTransfer.data = this.innerHTML;
  } else {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", this.innerHTML);
  }
  this.classList.add("dragging");
}
function addEventListenersToItem(item) {
  item.draggable = true;
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragover", dragOver);
  item.addEventListener("dragleave", dragLeave);
  item.addEventListener("drop", drop);
  item.addEventListener("dragend", dragEnd);
  item.querySelector(".remove-button").onclick = removeItem;
  item.querySelector(".important-button").onclick = markImportant;
  item.addEventListener("dblclick", selectItem);

  // Add touch event listeners
  item.addEventListener("touchstart", dragStart);
  document.addEventListener("touchmove", function (event) {
        var touchLocation = event.targetTouches[0];
        target = document.elementFromPoint(
          touchLocation.clientX,
          touchLocation.clientY
    );
    if (target.tagName !== "DIV") {
      target = target.parentElement;
    }
  });
  item.addEventListener("touchend", drop);
}

function BackColor(color) {
  document.body.style.backgroundColor = color
  localStorage.setItem("backcolor",color)
}

function edit(event) {
  let ItemText = event.target.parentNode.querySelector(".list-item-text");
  ItemText.contentEditable = true;
}

function urgent(event) {
  let element = event.target;
  element.style.backgroundColor = element.style.backgroundColor == "white" ? "red" : "white"
  saveList()
}

function addItem() {
  if (document.getElementById("box").value != "") {
    var newItem = document.createElement("div");
    newItem.id = "task";
    newItem.className = "list-item";
    if (
      document.getElementById("box").value.includes("https://") ||
      document.getElementById("box").value.includes("www.")
    ) {
      var text = document.createElement("a");
      text.className = "list-item-text";
      text.id = "item-text";
      text.innerHTML = document.getElementById("box").value += " ";
      newItem.appendChild(text);
      text.href = URL(text.innerHTML);
    } else {
      var text = document.createElement("span");
      text.className = "list-item-text";
      text.id = "item-text";
      text.innerHTML = document.getElementById("box").value;
      newItem.appendChild(text);
    }
    let urgentButton = document.createElement("span");
    urgentButton.className = "urgent"
    urgentButton.onclick = urgent
    urgentButton.innerHTML = "!";
    urgentButton.style.backgroundColor = "white"
    newItem.appendChild(urgentButton)

    let editButton = document.createElement("span");
    editButton.className = "edit";
    editButton.onclick = edit;
    editButton.innerHTML = "✏️";
    newItem.appendChild(editButton)
        editButton.parentNode
          .querySelector(".list-item-text")
          .addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
              textElement =
                editButton.parentNode.querySelector(".list-item-text");
              textElement.contentEditable = false;
              textElement.textContent = textElement.textContent.replace(
                "\n",
                ""
              );
              saveList();
            }
          });
    var copyButton = document.createElement("span");
    copyButton.className = "copy";
    copyButton.onclick = copy;
    newItem.appendChild(copyButton);

    var importantButton = document.createElement("span");
    importantButton.className = "important-button";
    importantButton.onclick = markImportant;
    newItem.appendChild(importantButton);

    var removeButton = document.createElement("span");
    removeButton.className = "remove-button";
    removeButton.innerHTML = "X";
    removeButton.onclick = removeItem;
    newItem.appendChild(removeButton);

    var list = document.getElementById("list");
    list.insertBefore(newItem, list.firstChild); // Insert the new item at the beginning of the list

    document.getElementById("box").value = "";
    addEventListenersToItem(newItem);
    saveList();
    if (onelineenabled) {
      oneline(true)
    }
    if (green) {
      UIColor("green")
    }
    if (Issmall) {
      small(true)
    }
  }
}
document.addEventListener("click", function (event) {
  var listItem = event.target.closest(".list-item");
  if (!listItem) {
    var listItems = document.querySelectorAll(".list-item");
    listItems.forEach(function (item) {
      item.classList.remove("selected");
    });
  }
});

function dragOver(event) {
    if (
      event.target.classList.contains("important-button") ||
      event.target.classList.contains("remove-button") ||
      event.target.classList.contains("copy")
    ) {
      event.stopPropagation(); // Prevent dragging if a button is clicked
      return;
    }
  if (event.preventDefault) {
    event.preventDefault();
  }
  this.classList.add("drag-over");
  if (event.type === "touchmove") {
    dataTransfer.dropEffect = "move";
  } else {
    event.dataTransfer.dropEffect = "move";
  }
  return false;
}
function dragLeave(event) {
  this.classList.remove("drag-over");
}
function drop(event) {
    if (
      event.target.classList.contains("important-button") ||
      event.target.classList.contains("remove-button") ||
      event.target.classList.contains("copy")
    ) {
      event.stopPropagation(); // Prevent dragging if a button is clicked
      return;
    }
  if (event.stopPropagation) {
    event.stopPropagation();
  }


  console.log(dragSrcElement, target)
  if (dragSrcElement !== this||((target && target.classList.contains("list-item"))&&dragSrcElement!==target)) {
    var list = document.getElementById("list");
    var listChildren = Array.from(list.children);
    var currentInd = listChildren.indexOf(dragSrcElement);
    var dropInd = listChildren.indexOf(this);
    if (event.type != "touchend") {

      // Remove the dragged item from its original position
      listChildren.splice(currentInd, 1);

      // Insert the dragged item at the drop location
      listChildren.splice(dropInd, 0, dragSrcElement);
    }
    else {
      console.log(target, dragSrcElement)
      dropInd = listChildren.indexOf(target);
      // Remove the dragged item from its original position
      listChildren.splice(currentInd, 1);

      // Insert the dragged item at the drop location
      listChildren.splice(dropInd, 0, dragSrcElement);
    }
    // Update the DOM with the new order of items
    list.innerHTML = "";
    for (var i = 0; i < listChildren.length; i++) {
      list.appendChild(listChildren[i]);
    }
  }

  this.classList.remove("drag-over");
  updateTextDecoration(this);
  saveList();
  return false;
}

function updateTextDecoration(item) {
  var listItemText = item.querySelector(".list-item-text");
  var removeButton = item.querySelector(".remove-button");

  if (item.classList.contains("finished")) {
    listItemText.style.textDecoration = "line-through";
    removeButton.style.textDecoration = "none"; // Exclude X button from strikethrough
  } else {
    listItemText.style.textDecoration = "";
    removeButton.style.textDecoration = ""; // Remove strikethrough from X button
  }
}

function dragEnd(event) {
  this.classList.remove("drag-over");
  this.classList.remove("dragging");
}

function updateTextDecoration(item) {
  var listItemText = item.querySelector(".list-item-text");
  var removeButton = item.querySelector(".remove-button");

  if (removeButton.style.textDecoration === "line-through") {
    listItemText.style.textDecoration = "line-through";
    removeButton.style.textDecoration = "none"; // Exclude X button from strikethrough
  } else {
    listItemText.style.textDecoration = "";
    removeButton.style.textDecoration = ""; // Remove strikethrough from X button
  }
}

function removeItem() {
  var listItem = this.parentNode;
  var checkbox = document.getElementById("checkforsettings");

  if (!checkbox.checked) {
    listItem.remove();
  } else {
    listItem.classList.toggle("finished");
    updateTextDecoration(listItem);
  }
  saveList();
}

function markImportant(color) {
  this.classList.toggle("active");
  if (Icolor == "rgb(0, 0, 0)") {
    this.style.backgroundColor = "rgb(255, 255, 255)";
  } else {
    this.style.backgroundColor = Icolor;
  }
  var listItemText = this.parentNode.querySelector(".list-item-text");
  listItemText.style.color = Icolor;
  saveList();
}

function showSuccessTick(time) {
  var tick = document.getElementById("successTick");
  tick.style.display = "block";
  setTimeout(function () {
    tick.style.display = "none";
  }, time);
}

function saveList() {
  localStorage.setItem("green", green)
  localStorage.setItem("small", Issmall)
  localStorage.setItem("oneline", onelineenabled)
  localStorage.setItem("storedList", document.getElementById("list").innerHTML);
  localStorage.setItem("Icolor", Icolor);
  localStorage.setItem(
    "settingsCheck",
    document.getElementById("checkforsettings").checked.toString()
  );
}

function loadList() {
  if (localStorage.getItem("green") != null) {
    green = localStorage.getItem("green")
    if (green == "true") {
      green = true
    } else {
      green = false
    }
  }
  if (localStorage.getItem("small") != null) {
    Issmall = localStorage.getItem("small")
        if (Issmall == "true") {
          Issmall = true;
          document.getElementById("smalltasks").checked = true;
        } else {
          Issmall = false;
    }
  }
  if (localStorage.getItem("oneline") != null) {
    onelineenabled = localStorage.getItem("oneline")
        if (onelineenabled == "true") {
          onelineenabled = true;
          document.getElementById("oneline").checked = true;
        } else {
          onelineenabled = false;
        }
  }
  Icolor = localStorage.getItem("Icolor");
  var listHTML = localStorage.getItem("storedList");
  if (listHTML) {
    document.getElementById("list").innerHTML = listHTML;
    var removeButtons = document.querySelectorAll(".list-item .remove-button");
    var copyButtons = document.querySelectorAll(".copy");
    var editButtons = document.querySelectorAll(".edit");
    var urgentButtons = document.querySelectorAll(".urgent");
    removeButtons.forEach(function (button) {
      button.onclick = removeItem;
    });

    copyButtons.forEach(function (button) {
      button.onclick = copy;
    });
        urgentButtons.forEach(function (button) {
          button.onclick = urgent;
        });

        editButtons.forEach(function (button) {
          button.onclick = edit;
          button.parentNode.querySelector(".list-item-text").addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
              textElement = button.parentNode.querySelector(".list-item-text");
              textElement.contentEditable = false;
              textElement.textContent = textElement.textContent.replace("\n","")
              saveList();
            }
          });
        });

    var importantButtons = document.querySelectorAll(
      ".list-item .important-button"
    );
    importantButtons.forEach(function (button) {
      button.onclick = markImportant;
    });

    var listItemElements = document.querySelectorAll(".list-item");
    listItemElements.forEach(function (item) {
      addEventListenersToItem(item);
      var isFinished = item.classList.contains("finished");
      var isImportant = item
        .querySelector(".important-button")
        .classList.contains("active");
      if (isImportant) {
        item.querySelector(".important-button").classList.add("active");
      }
      if (settingsCheck && isFinished) {
        item.querySelector(".list-item-text").style.textDecoration =
          "line-through";
      }

      if (isImportant) {
        item.querySelector(".important-button").classList.add("active");
      }
    });
  }
  settingsCheck = localStorage.getItem("settingsCheck") === "true";
  document.getElementById("checkforsettings").checked = settingsCheck;
  CurrentCol();
  searchImportant(document.getElementById("searchImportant"))
      if (onelineenabled) {
        oneline(true);
      }
      if (green) {
        UIColor("green");
      }
      if (Issmall) {
        small(true);
      }
}

function openSettings() {
  var settingsPage = document.getElementById("settingsPage");
  if (settingsPage.style.display === "") {
    settingsPage.style.display = "block";
  } else {
    settingsPage.style.display = "";
  }
}
function searchCheck(value) {
  var tasks = document.getElementsByClassName("list-item");
 {
    if (value != "") {
      for (var i = 0; i < tasks.length; i++) {
        var taskText = tasks[i]
          .querySelector(".list-item-text")
          .innerHTML.toLowerCase();
        if (taskText.includes(value.toLowerCase())) {
          tasks[i].style.display = "flex";
        } else {
          tasks[i].style.display = "none";
        }
      }
    }else {
      for (var i = 0; i < tasks.length; i++) {
        var taskText = tasks[i]
          .querySelector(".list-item-text")
          .innerHTML.toLowerCase();
        if (taskText.includes(value.toLowerCase())) {
          tasks[i].style.display = "flex";
        } else {
          tasks[i].style.display = "";
        }
      }
    }
  }
}
function searchImportant(thing) {
  var listStuff = document.getElementsByClassName("list-item");
  console.log(thing.style.backgroundColor);
  if (thing.style.backgroundColor == "") {
    thing.style.backgroundColor = "rgb(255, 255, 255)";
  } else {
    if (Icolor != "rgb(0, 0, 0)") {
      thing.style.backgroundColor = Icolor;
    } else {
      thing.style.backgroundColor = "rgb(255, 255, 255)";
    }
  }
  for (var f = 0; f < listStuff.length; f++) {
    var taskIColor = listStuff[f].querySelector(".list-item .important-button")
      .style.backgroundColor;
    if (thing.style.backgroundColor == "rgb(255, 255, 255)") {
      listStuff[f].style.display = "flex";
      continue;
    }
    if (taskIColor == thing.style.backgroundColor) {
      listStuff[f].style.display = "flex";
      console.log("jeff");
    } else {
      listStuff[f].style.display = "none";
      console.log("bob");
    }
  }
}
function selectItem(event) {
  var selectedItems = document.querySelectorAll(".list-item.selected");
  selectedItems.forEach(function (item) {
    item.classList.remove("selected");
  });

  var listItem = this;
  listItem.classList.add("selected");

  let number = "";
  function handleKeyPress(event) {
    if (event.key === "Delete") {
      document.querySelector(".list-item.selected").remove();
      saveList();
    } else if (event.key >= "0" && event.key <= "9") {
      number += event.key;
    } else if (event.key === "Enter" && number !== "") {
      console.log("Entered number: " + number);
      var list = document.getElementById("list");
      var listChildren = Array.from(list.children);
      var currentInd = listChildren.indexOf(listItem);
      var dropInd = parseInt(number) - 1;

      if (
        currentInd >= 0 &&
        dropInd >= 0 &&
        currentInd < listChildren.length &&
        dropInd < listChildren.length
      ) {
        // Swap the items at the current index and drop index
        var temp = listChildren[currentInd];
        listChildren[currentInd] = listChildren[dropInd];
        listChildren[dropInd] = temp;

        // Update the DOM with the new order of items
        list.innerHTML = "";
        for (var i = 0; i < listChildren.length; i++) {
          list.appendChild(listChildren[i]);
        }
      }

      number = ""; // Reset the number
      saveList();
    }
  }

  document.addEventListener("keydown", handleKeyPress);
}

function UIColor(color){
  document.querySelector(".Sort").style.backgroundColor = color
  document.querySelector(".search").style.border = "2px solid " + color
  document.querySelector(".box").style.border = "2px solid " + color
  document.querySelectorAll(".button").forEach(function (button) {
    button.style.backgroundColor = color
  });
  document.querySelectorAll(".list-item").forEach(function (button) {
    button.style.border = "1px solid "+color;
  });
    document.querySelectorAll(".settings-page button").forEach(function (button) {
      button.style.backgroundColor = color;
    });
  if (color == "green") {
    green = true
  } else {
    green = false
  }
  saveList();
}
function small(stat) {
  if (stat) {
    document.querySelectorAll(".list-item").forEach(function (item) {
      item.style.padding = "0px"
    });
    Issmall = true
  } else {
        document.querySelectorAll(".list-item").forEach(function (item) {
          item.style.padding = "10px";
        });
    Issmall = false
  }
  saveList()
}
function oneline(stat) {
  if (stat) {
    onelineenabled = true
    const toprowel = document.querySelector(".top-row");
    const toprow = document.querySelector(".top-row").style
    toprow.display = "flex";
    toprow.justifyContent = "center"
    toprow.alignItems = "center"
    const main = document.querySelector(".main").style;
    main.textAlign = "center"
    main.maxWidth = "800px"
    main.maxHeight = "200px"
    const colorMenu = document.querySelector(".colorMenu").style;
    colorMenu.flex = "1"
    colorMenu.padding = "10px"
    colorMenu.height = "35px"
    const searchBar = document.querySelector(".searchbar").style
    searchBar.flex = "1"
    searchBar.height = "35px"
    searchBar.padding = "10px"
    searchBar.textAlign = "center"
    searchBar.maxWidth = ""
    searchBar.margin = "0px"
    searchBar.display = "flexbox"
    document.querySelector(".Isearch").style.display = "none"
    const newSearchWithCol = document.createElement("button")
    newSearchWithCol.id = "searchImportant";
    newSearchWithCol.ariaLabel = "search by color"
    newSearchWithCol.classList = "Isearch"
    newSearchWithCol.style.marginLeft = "5px"
    newSearchWithCol.onclick = searchImportant(newSearchWithCol)
    toprowel.appendChild(newSearchWithCol)
    const search = document.querySelector(".search").style;
    search.marginBottom = "5px"
    search.height = "35px"
    document.querySelectorAll(".colorThing").forEach(function (colorThing) {
      colorThing.style.width = "30px"
      colorThing.style.height = "30px"
    });
  } else {
    onelineenabled = false
        const toprowel = document.querySelector(".top-row");
        const toprow = document.querySelector(".top-row").style;
        toprow.display = "";
        toprow.justifyContent = "";
        toprow.alignItems = "";
        const main = document.querySelector(".main").style;
        main.textAlign = "center";
        main.maxWidth = "none";
        main.maxHeight = "none";
        const colorMenu = document.querySelector(".colorMenu").style;
        colorMenu.flex = "";
        colorMenu.padding = "20px";
        colorMenu.height = "";
        const searchBar = document.querySelector(".searchbar").style;
        searchBar.flex = "";
        searchBar.height = "";
        searchBar.padding = "20px";
        searchBar.textAlign = "";
        searchBar.maxWidth = "";
        searchBar.margin = "7px auto";
        searchBar.display = "";
        document.querySelector(".Isearch").style.display = "inherit";
        toprowel.removeChild(toprowel.children[toprowel.children.length-1]);
        const search = document.querySelector(".search").style;
        search.marginBottom = "2px";
        search.height = "40px";
        document.querySelectorAll(".colorThing").forEach(function (colorThing) {
          colorThing.style.width = "15px";
          colorThing.style.height = "15px";
        });
        document.querySelector(".container").style.margin = "7px auto";
  }
  saveList();
}

document.addEventListener("DOMContentLoaded", function () {
  let backcolor=localStorage.getItem("backcolor")
  if (backcolor == null) {
    backcolor = ""
    localStorage.setItem("backcolor",backcolor)
  }
  document.body.style.backgroundColor = backcolor
  loadList();
});
