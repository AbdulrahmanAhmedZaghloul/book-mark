"use strict"
let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let updateBtn = document.getElementById("updateBtn");
let submitBtn = document.getElementById("submitBtn");
let faXmark = document.querySelector(".fa-xmark");
let boxLight = document.querySelector(".box-light");
let searchMarker = document.querySelector(".searchMark");
let websiteArray;
let updateArray;

// if else

localStorage.getItem("website") == null ? websiteArray = []: websiteArray = JSON.parse(localStorage.getItem('website')); displayDate(websiteArray);

function getvalue() {
  if (testRegx(siteName)&& testRegx(siteUrl)) {
    let site = {
      websiteName: siteName.value,
      websiteUrl: siteUrl.value,
    }
    websiteArray.push(site);
    localStorage.setItem("website", JSON.stringify(websiteArray));
    clearDate();
    displayDate(websiteArray);
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
  }

  else {
    faXmark.addEventListener("click", function () {
      boxLight.classList.add("d-none");
    });
    boxLight.classList.remove("d-none");
  }
}

submitBtn.addEventListener('click', getvalue);

function clearDate() {
  siteName.value = null;
  siteUrl.value = null;
}

function displayDate(arr) {
  let cartoona = ``

  for (let i = 0; i < arr.length; i++) {
    cartoona +=
      `
      <tr>
      <td>${i + 1}</td>
      <td>${arr[i].websiteName}</td>              
      <td>
      <a href="${arr[i].websiteUrl}" target="_blank" class="text-white btn bg-success bg-opacity-75 visit-url">
      <i class="fa-solid fa-eye pe-2"></i>Visit
    </a>
      </td>
      <td>
        <button onclick="updateMark(${i})" class="btn bg-success bg-warning bg-opacity-75 text-white btn-delete pe-2" >
        <i class="fa-solid fa-wrench"></i>
                  Update
        </button>
      </td>
       <td>
        <button onclick="deleteDate(${i})" class="btn bg-danger bg-opacity-75 text-white btn-delete pe-2" >
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
      </td>
  </tr>
      
      `
  }
  document.getElementById('containerOfDate').innerHTML = cartoona + `<br>`;
}

function deleteDate(deleteIndex) {
  websiteArray.splice(deleteIndex, 1);
  localStorage.setItem("website", JSON.stringify(websiteArray));
  displayDate(websiteArray);
}

function updateMark(indexUpdate) {
  updateArray = indexUpdate;
  siteName.value = websiteArray[indexUpdate].websiteName;
  siteUrl.value = websiteArray[indexUpdate].websiteUrl;
  updateBtn.classList.remove("d-none");
  submitBtn.classList.add("d-none");
}

function addUpdate() {
  if (testRegx(siteName)&& testRegx(siteUrl)) {
    let site = {
      websiteName: siteName.value,
      websiteUrl: siteUrl.value,
    }
    websiteArray.splice(updateArray, 1, site);
    localStorage.setItem("website", JSON.stringify(websiteArray));
    clearDate();
    displayDate(websiteArray);
    submitBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  }

  else {
    faXmark.addEventListener("click", function () {
      boxLight.classList.add("d-none");
    });
    boxLight.classList.remove("d-none");

  }
}

updateBtn.addEventListener('click', addUpdate); 

function searchMark(searchindex) {
  let searcharray = [];
  for (let i = 0; i < websiteArray.length; i++) {
    if (websiteArray[i].websiteName.toLowerCase().trim().includes(searchindex.toLowerCase().trim())) {
      searcharray.push(websiteArray[i]);
      searchMarker.classList.add("is-valid");
      searchMarker.classList.remove("is-invalid");
    }
  }
  if (searcharray.length == 0) {
    searchMarker.classList.add("is-invalid");
    searchMarker.classList.remove("is-valid");
  }
  displayDate(searcharray);

}

searchMarker.addEventListener('input', () => {
  let searchindex = searchMarker.value.trim().toLowerCase(); searchMark(searchindex);
});

function testRegx(element) {
  let test ={
    siteUrl: /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
    siteName: /^[a-z|A-Z|\d]{3,}$/,
  }

  if(test[element.id].test(element.value))
  {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block","d-none");
  }
  else{
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");  
    element.nextElementSibling.classList.replace("d-none","d-block");
  }
}

siteName.addEventListener("input",  ()=> {
  testRegx(siteName)
})

siteUrl.addEventListener("input", ()=> {
  testRegx(siteUrl)
})
