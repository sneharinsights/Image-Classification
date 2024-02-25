let imgcard = document.querySelectorAll(".class-image");
let searchbtn = document.querySelector(".search-btn");

let animals = document.querySelector(".animals");
let birds = document.querySelector(".birds");
let beaches = document.querySelector(".beaches");
let forests = document.querySelector(".forests");
//fetching values in array
let array = [animals, birds, beaches, forests];

//code to search image
function searchImage() {
  let serachbox = document.getElementById("input-type").value.toLowerCase();
  let i;
  for (i = 0; i < imgcard.length; i++) {
    let imgname = imgcard[i].getAttribute("data-title").toLowerCase();

    if (serachbox === imgname) {
      //To show the headings
      var parent_data_title = document.querySelector(`[data-title=${imgname}]`)
        .parentElement.parentElement;
      imgcard[i].style.display = "block";
      for (let x = 0; x < array.length; x++) {
        if (parent_data_title.className === array[x].className) {
          array[x].querySelector(".image-class-heading").style.display =
            "block";
        } else {
          array[x].querySelector(".image-class-heading").style.display = "none";
        }
      }
    } else {
      imgcard[i].style.display = "none";
    }
  }
  document.getElementById("input-type").value = "";
}

//code for dropdown
function selectImagetype() {
  let selectType = document.getElementById("images").value;
  let showBlocks = document.querySelectorAll(".class-image");
  let categoryHeadings = document.querySelectorAll(".image-class-heading");
  //To display headings of all categories (post search of any name)
  for (let i = 0; i < categoryHeadings.length; i++) {
    categoryHeadings[i].style.display = "block";
  }
  if (selectType !== "all") {
    for (let j = 0; j < array.length; j++) {
      let val = array[j];
      if (val.classList.contains(selectType)) {
        val.style.display = "block";
      } else {
        val.style.display = "none";
      }
    }
    //to display all cards of category (post search of any name)
    for (let k = 0; k < showBlocks.length; k++) {
      showBlocks[k].style.display = "flex";
    }
  } else {
    for (let j = 0; j < array.length; j++) {
      array[j].style.display = "block";
    }
  }
}

//code for upload file/image
function uploadImage() {
  let categoryType = document.getElementById("images-to-add").value;
  let fileInput = document.getElementById("fileInput").files[0];
  let imagename = document.getElementById("take-name-holder").value;

  for (let x = 0; x < array.length; x++) {
    let imageType = array[x];
    if (imageType.classList.contains(categoryType)) {
      let classimage = imageType.querySelector(".class-images");
      const classImageDiv = document.createElement("div");
      classImageDiv.className = "class-image";
      classImageDiv.setAttribute("data-title", imagename);

      if (imagename && fileInput) {
        // Create a FileReader to read the image file
        var reader = new FileReader();
        // Define what happens once the FileReader has loaded the image
        reader.onload = function (e) {
          // Create an image element dynamically
          var imageElement = document.createElement("img");
          imageElement.src = e.target.result; // Set the source of the image to the data URL
          imageElement.alt = imagename; // Set the alt attribute to the entered image name

          const imgHeadingParagraph = document.createElement("p");
          imgHeadingParagraph.className = "img-heading";
          imgHeadingParagraph.textContent = imagename;

          //appending img element to div
          classImageDiv.append(imageElement);
          classImageDiv.append(imgHeadingParagraph);
          classimage.append(classImageDiv);
        };

        // Read the image file as a data URL
        reader.readAsDataURL(fileInput);
      } else {
        // If image name or file is not provided, show an alert
        alert("Please enter image name and choose an image file.");
      }
    }
  }
  document.querySelector(".take-name-holder").value = "";
  document.querySelector("#fileInput").value = "";
}
