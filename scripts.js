var table = document.getElementById("datasheet");
function createNewRow() {
  let row = document.createElement("tr");
  let cells = [
    "input",
    "input",
    "select",
    "input",
    "input",
    "span",
    "span",
    "span",
    "span",
    "span",
    "span",
    "button",
  ];
  for (let i = 0; i < cells.length; i++) {
    let td = document.createElement("td");
    let elm = document.createElement(cells[i]);

    if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4) {
      elm.setAttribute("type", "number");
      elm.addEventListener("input", () => {
        refresh(row.rowIndex);
      });
    }

    if (i == 2) {
      let opt1 = document.createElement("option");
      opt1.innerText = "RFD";
      let opt2 = document.createElement("option");
      opt2.innerText = "PRD";
      elm.appendChild(opt1);
      elm.appendChild(opt2);
    }

    if (i == cells.length - 1) {
      elm.classList.add("delete_btn");
      elm.innerHTML = "&Cross;";
      elm.addEventListener("click", () => {
        refresh(-1);
        console.log("Removed");
        row.remove();
      });
    }
    td.append(elm);
    row.append(td);
  }
  table.tBodies[0].append(row);
}

function refresh(rowIndex) {
  // console.log(rowIndex);
  if(rowIndex != -1){
  let order = (table.rows[rowIndex].children[2].children[0].value=="RFD" ? 0 : 1);
  price = parseFloat(table.rows[rowIndex].children[3].children[0].value);
  dp = parseFloat(table.rows[rowIndex].children[4].children[0].value);
  console.log(price, dp);
  discount_price = round((price * dp) / 100);
  amount = price - discount_price;
  taxable_amount = round((amount * 100) / 118);
  gst = round(taxable_amount * 0.18);
  net = round(taxable_amount + gst);

  if(order == 0){
    reqd = net;
  }else{
    reqd = round(0.3*net)
  }

  table.rows[rowIndex].children[5].children[0].innerText = `${discount_price}`;
  table.rows[rowIndex].children[6].children[0].innerText = `${amount}`;
  table.rows[rowIndex].children[7].children[0].innerText = `${taxable_amount}`;
  table.rows[rowIndex].children[8].children[0].innerText = `${gst}`;
  table.rows[rowIndex].children[9].children[0].innerText = `${net}`;
  table.rows[rowIndex].children[10].children[0].innerText = `${reqd}`;
}

  calculateTotal();
}

function round(x) {
  x = Math.round(x);
  return x;
}


function calculateTotal(){
    let data = table.tBodies.data;
    let summary = table.tBodies.summary;
    let total_discount = 0;
    let total_amount = 0;
    let total_tax = 0;
    let total_gst = 0;
    let total_net = 0;
    let total_reqdamt = 0;
    for(let i = 1; i<data.rows.length; i++){
        total_discount += parseFloat(data.rows[i].children[5].children[0].innerText);
        total_amount += parseFloat(data.rows[i].children[6].children[0].innerText);
        total_tax += parseFloat(data.rows[i].children[7].children[0].innerText);
        total_gst += parseFloat(data.rows[i].children[8].children[0].innerText);
        total_net += parseFloat(data.rows[i].children[9].children[0].innerText);
        total_reqdamt += parseFloat(data.rows[i].children[10].children[0].innerText);
    }

    summary.rows[0].children[1].children[0].innerText = `${total_discount}`;
    summary.rows[0].children[2].children[0].innerText = `${total_amount}`;
    summary.rows[0].children[3].children[0].innerText = `${total_tax}`;
    summary.rows[0].children[4].children[0].innerText = `${total_gst}`;
    summary.rows[0].children[5].children[0].innerText = `${total_net}`;
    summary.rows[0].children[6].children[0].innerText = `${total_reqdamt}`;

    let advance = summary.rows[1].children[1].children[0].value;
    let net_reqd_amt = total_reqdamt-advance;
    summary.rows[2].children[1].children[0].innerText = `${net_reqd_amt}`;
    }
