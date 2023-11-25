var settingsCheck = false;
var dragSrcElement = null;
var Icolor = "rgb(255,200,0)";
var copyText = "";
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

function dragStart(event) {
  if (event.target.classList.contains("important-button")) {
    event.preventDefault(); // Prevent dragging if the important button is clicked
    return;
  }

  dragSrcElement = this;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", this.innerHTML);
  this.classList.add("dragging");
}
function dragOver(event) {
  if (event.preventDefault) {
    event.preventDefault();
  }
  this.classList.add("drag-over");
  event.dataTransfer.dropEffect = "move";
  return false;
}

function dragLeave(event) {
  this.classList.remove("drag-over");
}

function dragEnd(event) {
  this.classList.remove("drag-over");
  this.classList.remove("dragging");
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
}
function drop(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  if (dragSrcElement !== this) {
    var list = document.getElementById("list");
    var listChildren = Array.from(list.children);
    var currentInd = listChildren.indexOf(dragSrcElement);
    var dropInd = listChildren.indexOf(this);

    // Remove the dragged item from its original position
    listChildren.splice(currentInd, 1);

    // Insert the dragged item at the drop location
    listChildren.splice(dropInd, 0, dragSrcElement);

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

  localStorage.setItem("storedList", document.getElementById("list").innerHTML);
  localStorage.setItem("Icolor", Icolor);
  localStorage.setItem(
    "settingsCheck",
    document.getElementById("checkforsettings").checked.toString()
  );

}

function loadList() {
  Icolor = localStorage.getItem("Icolor");
  var listHTML = localStorage.getItem("storedList");
  if (listHTML) {
    document.getElementById("list").innerHTML = listHTML;
    var removeButtons = document.querySelectorAll(".list-item .remove-button");
    var copyButtons = document.querySelectorAll(".copy");
    removeButtons.forEach(function (button) {
      button.onclick = removeItem;
    });

    copyButtons.forEach(function (button) {
      button.onclick = copy;
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
      if (!navigator.userAgent.indexOf('IEMobile') !== -1) {
        item.draggable = true; // Enable dragging for loaded items
        item.addEventListener("dragstart", dragStart);
        item.addEventListener("dragover", dragOver);
        item.addEventListener("dragleave", dragLeave);
        item.addEventListener("drop", drop);
        item.addEventListener("dragend", dragEnd);
      }
      else {
        item.addEventListener("touchstart", dragStart);
        item.addEventListener("touchmove", dragOver);
        item.addEventListener("touchend", function (event) { drop(); dragEnd(); });
      }
    });
  }
  settingsCheck = localStorage.getItem("settingsCheck") === "true";
  document.getElementById("checkforsettings").checked = settingsCheck;
  CurrentCol();
}


function openSettings() {
  var settingsPage = document.getElementById("settingsPage");
  if (settingsPage.style.display === "none") {
    settingsPage.style.display = "block";
  } else {
    settingsPage.style.display = "none";
  }
}
function searchCheck(value, event) {
  var tasks = document.getElementsByClassName("list-item");
  if (
    event.key != "Backspace" &&
    event.key != "Shift" &&
    event.key != "ArrowUp" &&
    event.key != "ArrowDown" &&
    event.key != "ArrowLeft" &&
    event.key != "ArrowRight" &&
    event.key != "Control" &&
    event.key != "Alt" &&
    event.key != "CapsLock" &&
    event.key != "Tab" &&
    event.key != "Escape" &&
    event.key != "AudioVolumeMute" &&
    event.key != "AudioVolumeUp" &&
    event.key != "AudioVolumeDown" &&
    event.key != "Meta" &&
    event.key != "Enter"
  ) {
    value += event.key;
    console.log(value);
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
    } else if (event.key != "Backspace") {
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
      }
    } else {
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
  } else {
    val = value.slice(0, -1);
    console.log(val);
    if (val != "") {
      for (var i = 0; i < tasks.length; i++) {
        var taskText = tasks[i]
          .querySelector(".list-item-text")
          .innerHTML.toLowerCase();
        if (taskText.includes(val.toLowerCase())) {
          tasks[i].style.display = "flex";
        } else {
          tasks[i].style.display = "none";
        }
      }
    } else {
      for (var i = 0; i < tasks.length; i++) {
        var taskText = tasks[i]
          .querySelector(".list-item-text")
          .innerHTML.toLowerCase();
        if (taskText.includes(val.toLowerCase())) {
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
  if (thing.style.backgroundColor == "") {
    thing.style.backgroundColor = Icolor;
  } else {
    thing.style.backgroundColor = "";
  }
  for (var f = 0; f < listStuff.length; f++) {
    var taskIColor = listStuff[f].querySelector(".list-item .important-button")
      .style.backgroundColor;
    if (thing.style.backgroundColor == "") {
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
      listItem.remove();
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

document.addEventListener("DOMContentLoaded", function () {
  loadList();
});
