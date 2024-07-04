const nameElement = document.querySelector("#name");
const phoneElement = document.querySelector("#phone");
const changeEditContactButton = document.querySelector(".add-btn");

const contactDetails = [];
const table = document.querySelector("#phone-book-table");
const rows = table.querySelectorAll("tr");
for (let i = 1; i <= rows.length - 1; i++) {
  contactDetails.push({
    name: rows[i].querySelector("td:nth-child(1)").innerHTML,
    phone: rows[i].querySelector("td:nth-child(2)").innerHTML,
  });
}
// ca sa nu apara cand adaugam prima ora name, phone, edit,delete
const errorOutput = document.querySelector("#error-output");

let tableRowToBeEdited = null;

changeEditContactButton.addEventListener("click", handleChanges);
phoneElement.addEventListener("keydown", addNewContactEnter);

function addNewContactEnter(e) {
  if (e.key === "Enter") {
    addNewContact();
  }
}

function handleChanges(e) {
  if (e.target.classList.contains("add-btn")) {
    addNewContact();
  } else if (e.target.classList.contains("edit-contact-btn")) {
    editContact();
  }
}
function addNewContact() {
  const name = nameElement.value;
  const phone = phoneElement.value;
  if (contactDetails.length === 0) {
    const thead = createTable();
    table.appendChild(thead);
  }
  if (name.length <= 3 || phone.length <= 3) {
    errorOutput.innerHTML =
      "Numele si numarul de telefonul trebuie sa contina minim 3 caractere";
    errorOutput.style.color = "red";

    return;
  }
  contactDetails.push({
    name: name,
    phone: phone,
  });

  const tableBody = document.createElement("tbody");
  const tableRow = document.createElement("tr");
  const nameTableData = document.createElement("td");
  nameTableData.innerHTML = contactDetails[contactDetails.length - 1].name;

  const phoneTableData = document.createElement("td");
  phoneTableData.innerHTML = contactDetails[contactDetails.length - 1].phone;

  const ediButton = document.createElement("td");
  ediButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  const deleteButton = document.createElement("td");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  tableRow.appendChild(nameTableData);
  tableRow.appendChild(phoneTableData);
  tableRow.appendChild(ediButton);
  tableRow.appendChild(deleteButton);
  tableBody.appendChild(tableRow);
  table.appendChild(tableBody);

  clearInputElements();
}

function createTable() {
  const nameColumn = document.createElement("th");
  nameColumn.innerHTML = "Name";
  const phoneColumn = document.createElement("th");
  phoneColumn.innerHTML = "Phone";
  const editHeader = document.createElement("th");
  editHeader.innerHTML = "Edite";
  const deleteHeader = document.createElement("th");
  deleteHeader.innerHTML = "Delete";
  const thead = document.createElement("thead");
  thead.appendChild(nameColumn);
  thead.appendChild(phoneColumn);
  thead.appendChild(editHeader);
  thead.appendChild(deleteHeader);
  return thead;
}

table.addEventListener("click", handelTableActions);
function handelTableActions(e) {
  if (e.target.classList.contains("fa-trash") === true) {
    e.target.parentElement.parentElement.remove();
  } else if (e.target.classList.contains("fa-pen-to-square")) {
    console.log(e.target.parentElement.parentElement);
    tableRowToBeEdited = e.target.parentElement.parentElement;
    const name = tableRowToBeEdited.querySelector("td:nth-child(1)").innerHTML;
    console.log(name);
    //se ia numele
    const phone = tableRowToBeEdited.querySelector("td:nth-child(2)").innerHTML;
    console.log(phone);
    //se ia telefonul

    nameElement.value = name;
    phoneElement.value = phone;
    //inputurile iau valorile lui name si phone si le poti modifica
    changeEditContactButton.innerHTML = "Edit Contact";

    changeEditContactButton.classList.remove("add-btn");
    changeEditContactButton.classList.add("edit-contact-btn");
  }
}

function editContact() {
  const name = nameElement.value;
  const phone = phoneElement.value;
  console.log(name, phone);
  tableRowToBeEdited.querySelector("td:nth-child(1)").innerHTML = name;
  tableRowToBeEdited.querySelector("td:nth-child(2)").innerHTML = phone;

  changeEditContactButton.innerHTML = "Add Contact";
  changeEditContactButton.classList.remove("edit-contact-btn");
  changeEditContactButton.classList.add("add-btn");
  clearInputElements();
}

function clearInputElements() {
  nameElement.value = "";
  phoneElement.value = "";
  // dupa ce aduag un contact curata valorile din inputuri
  errorOutput.innerHTML = "";
  //daca e bine dispare eroarea
}
