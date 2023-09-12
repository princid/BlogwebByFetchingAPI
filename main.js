// console.log("PRINCE");

const gallBody = document.getElementById("gall_body");
const pagination = document.getElementById("pagination");

const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");

const pages = pagination.querySelectorAll("a");

// Initialized the current page no. to 1
let currentPage = 1;

const imagesPerPage = 6;
const totalImages = 30;
const totalPages = Math.ceil(totalImages / imagesPerPage);



// Creating div and Image tag from JS.
let imgList = [];
for (let i = 0; i < imagesPerPage; i++) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("gallery_card");

  let newImage = document.createElement("img");
  newImage.classList.add("image");
  newImage.src = "";
  newImage.alt = "Natural Scene";

  newDiv.append(newImage);

  imgList.push(newDiv.innerHTML);
}

let imgContainers = document.getElementById("gall_body");

imgContainers.innerHTML = imgList.join("");



// Show the preloader while fetching data
function showPreloader() {
	const preloader = document.getElementById("preloader");
	preloader.style.display = "block";
}

// Hide the preloader when data is loaded
function hidePreloader() {
	const preloader = document.getElementById("preloader");
	preloader.style.display = "none";
}

// Fetching API
let authKey = "e16Ky3JcvHXZwx5QDsS8_skhLAa7GFxh5XSvKwHg1zE";
// let authKey = "2jgOUrqstEPq8DYZJyauAa8do7bUaX2qAgjdfLtpZGmpbtjD4F7CknAq";

async function Api_data() {
  showPreloader(); // Show preloader before fetching the data

  try {
	let response = await fetch(
		`https://api.unsplash.com/photos/?client_id=${authKey}&page=${currentPage}&per_page=${imagesPerPage}&Total=${totalImages}`,
		{ method: "GET" }
	);
  
  // let response = await fetch(
	// 	`https://api.pexels.com/v1/curated?client_id=${authKey}&page=${currentPage}&per_page=${imagesPerPage}&Total=${totalImages}`,
	// 	{ method: "GET" }
	// );

	if (!response.ok) {
		throw new Error(`API request failed with status: ${response.status}`);
	}
	let data = await response.json();
	console.log(data);
	
	const eachImage = document.querySelectorAll(".image");
	console.log(eachImage);
	
	for (let i = 0; i < data.length; i++) {
		eachImage[i].src = data[i]["urls"]["raw"];
	}
	
	hidePreloader(); // Hide preloader after the data is loaded
  } catch (error) {
	console.error("API error:", error);
	// alert("API error:", error);

	 // Display the error message to the user
	 const errorMessageElement = document.getElementById("error-message");
	 errorMessageElement.textContent = `An error occurred: ${error.message}`;
	 errorMessageElement.style.display = "block";

    // We can display an error message to the user.
    // hidePreloader(); // Ensuring preloader is hidden even in case of an error.
  }
  
  
}

// Updating the pagination
function updatePagination(activePage) {
  pages.forEach((page, index) => {
    if (index === activePage) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });
}

// Removing the prev and next button on start and end pages respectively.
function updateCarouselButtons() {
  if (currentPage === 1) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "block";
  }
  if (currentPage === totalPages) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "block";
  }
  console.log(currentPage);
}

function onPage(pageNum) {
  currentPage = pageNum;
  updatePagination(currentPage - 1);
  Api_data(currentPage);
  updateCarouselButtons();
}

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    onPage(currentPage - 1);
    Api_data(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    onPage(currentPage + 1);
    Api_data(currentPage);
  }
});

pages.forEach((page, index) => {
  page.addEventListener("click", () => {
    // Moving/going to the page that is clicked.
    onPage(index + 1);
  });
});

// By default wali cheezein.
showPreloader(); // Show preloader initially
updatePagination(currentPage - 1);
updateCarouselButtons();
Api_data();

// hidePreloader();
