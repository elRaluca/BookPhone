const nameElement = document.querySelector("#name");
const phoneElement = document.querySelector("#phone");
const addButton = document.querySelector("#add-btn");
const table = document.querySelector("#phone-book-table");
const contactDetails = [];

addButton.addEventListener("click", addNewContact);

function addNewContact() {
  const name = nameElement.value;
  const phone = phoneElement.value;
  if (contactDetails.length === 0) {
    const thead = createTable();
    table.appendChild(thead);
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

  tableRow.appendChild(nameTableData);
  tableRow.appendChild(phoneTableData);
  tableBody.appendChild(tableRow);

  table.appendChild(tableBody);
}

function createTable() {
  const nameColumn = document.createElement("th");
  nameColumn.innerHTML = "Name";
  const phoneColumn = document.createElement("th");
  phoneColumn.innerHTML = "Phone";

  const thead = document.createElement("thead");
  thead.appendChild(nameColumn);
  thead.appendChild(phoneColumn);
  return thead;
}
