'use strict';

let arrOfDonors = [];
let tableEl = document.getElementById('table');
let total = 0;

function Donors(donorName, donationAmount){
  this.donorName= donorName;
  this.donorAge = randomAgeGenerator();
  this.donationAmount = donationAmount;
  this.tableDonorInfo = [];
  this.tableDonorInfo.push(this.donorName);
  this.tableDonorInfo.push(this.donorAge);
  this.tableDonorInfo.push(this.donationAmount);
  arrOfDonors.push(this);
}


function randomAgeGenerator(){
  return Math.floor(Math.random() * 13 + 18);
}

getFromLS();
renderTable();


let form = document.getElementById('donorForm');
form.addEventListener('submit', handleDonorSubmit);

function handleDonorSubmit(event){
  event.preventDefault();
  // console.log(event.target.donorName.value);
  // console.log(event.target.amount.value);
  let donorName = event.target.donorName.value;
  let amount = parseInt(event.target.amount.value);

  let newDonor = new Donors(donorName, amount);
  newDonor.renderDonor();
  saveToLS();
}

Donors.prototype.renderDonor = function(){
  tableEl.deleteRow(-1);
  let tableRow = document.createElement('tr');
  tableEl.appendChild(tableRow);
  let tdEl;
  for(let i=0; i<this.tableDonorInfo.length; i++){
    tdEl = document.createElement('td');
    tableRow.appendChild(tdEl);
    tdEl.textContent = this.tableDonorInfo[i];
  }
  total += parseInt(this.tableDonorInfo[2]);
  let lastTableRow = document.createElement('tr');
  tableEl.appendChild(lastTableRow);
  let totalTd = document.createElement('td');
  lastTableRow.appendChild(totalTd);
  totalTd.setAttribute('id', 'totalCell');
  totalTd.setAttribute('colspan', '3');
  totalTd.textContent = `Total: ${total}`;

};


function saveToLS(){
  let storageArr = JSON.stringify(arrOfDonors);
  localStorage.setItem('donorInfo', storageArr);
}

function getFromLS(){
  let getArr = JSON.parse(localStorage.getItem('donorInfo'));
  if(getArr){
    arrOfDonors = getArr;
  }
}

function renderTable(){
  for (let j = 0; j < arrOfDonors.length; j++) {
    let tableRow = document.createElement('tr');
    tableEl.appendChild(tableRow);
    let tdEl;
    for(let i=0; i< arrOfDonors[j].tableDonorInfo.length; i++){
      tdEl = document.createElement('td');
      tableRow.appendChild(tdEl);
      tdEl.textContent = arrOfDonors[j].tableDonorInfo[i];
      if( i === arrOfDonors[j].tableDonorInfo.length-1 ){
        total += parseInt(arrOfDonors[j].tableDonorInfo[i]);
      }
    }
  }
  console.log(total);
  let lastTableRow = document.createElement('tr');
  tableEl.appendChild(lastTableRow);
  let totalTd = document.createElement('td');
  lastTableRow.appendChild(totalTd);
  totalTd.setAttribute('id', 'totalCell');
  totalTd.setAttribute('colspan', '3');
  totalTd.textContent = `Total: ${total}`;

}
