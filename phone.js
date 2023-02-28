const loadPhone = async (searchText, showType) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, showType);
};

const displayPhone = (phones, showType) => {
  console.log(phones);
  const phoneContainter = document.getElementById("container");
  phoneContainter.innerText = "";
  // No show Phones
  const noPhones = document.getElementById("alert-message");
  if (phones.length === 0) {
    noPhones.classList.remove("d-none");
  } else {
    noPhones.classList.add("d-none");
  }

  //button show 10
  const showAllButton = document.getElementById("show-all");
  console.log(showType)
  if (phones.length > 10 && showType!='showAll') {
    //  show phones 10
    phones = phones.slice(0, 10);
    showAllButton.classList.remove("d-none");
  } else {
    showAllButton.classList.add("d-none");
  }

  phones.forEach((phone) => {
    console.log(phone);
    const div = document.createElement("div");

    div.innerHTML = `<div class="col">
    <div class="card p-3">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="phoneDetail('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Detail</button>

      </div>
    </div>
  </div>`;
    phoneContainter.appendChild(div);
  });
  //stop spinner/ loader
  spinnerToggle(false);
};

//common function

const proccessSearch = (showType) => {
  spinnerToggle(true);
  //click handlar
  const inputfield = document.getElementById("input");
  const searchText = inputfield.value;
  console.log(searchText);
  // inputfield.value = "";
  loadPhone(searchText, showType);
};

//show all button handler

document.getElementById("search-btn").addEventListener("click", function () {
  //start spinner/ loader
  proccessSearch();
});

document.getElementById("btn-show-all").addEventListener("click", function () {
  console.log("btn-show-all");
  proccessSearch('showAll');
});

// enter key event handlar
document.getElementById('input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    proccessSearch();
  }
});

// spinner function
const spinnerToggle = (isLoading) => {
  const phoneSpinner = document.getElementById("spinner");
  if (isLoading) {
    phoneSpinner.classList.remove("d-none");
  } else {
    phoneSpinner.classList.add("d-none");
  }
};

// Phone Detail
const phoneDetail =async(id)=>{
 const url = `https://openapi.programming-hero.com/api/phone/${id}`;
 const res = await fetch(url);
 const data = await res.json();
 displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone=>{
  console.log(phone)
  const phoneTitle = document.getElementById('exampleModalLabel');
  phoneTitle.innerText = phone.name;
  const modalBody = document.getElementById('modal-body');
  const div = document.createElement('div');
  div.innerHTML =`<h6>${phone.releaseDate}</h6>
  <h6>${phone.mainFeatures.storage}</h6>
  `
  modalBody.appendChild(div);
}


loadPhone('iphone');
