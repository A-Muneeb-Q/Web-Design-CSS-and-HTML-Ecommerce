var products;
let limit=8

async function fetchData() {
    try {
        // Using fetch API to make the GET request
        const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);

        // Check if the response is successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        products = await response.json();

        // Call function to display products
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}



async function showCategory(category) {
    try {
        // Using fetch API to make the GET request
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);

        // Check if the response is successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        products = await response.json();

        // Call function to display products
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

// Function to display products on the webpage
function displayProducts(products) {
    var gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

     // Intersection Observer options
     var options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    // Intersection Observer callback
    var callback = function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Load the image source when it comes into the viewport
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    };

    // Create an Intersection Observer instance
    var observer = new IntersectionObserver(callback, options);

    // Loop through the products and create a card for each
    products.forEach(function (product) {
        console.log(product)
        var content = document.createElement("content");
        content.className = "content";
        var truncatedDescription = truncateString(product.description, 10);

        // Display product information in the card
        content.innerHTML = `
        <img src="https://via.placeholder.com/150" data-src="${product.image}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
            <p>${truncatedDescription} </p>
            <h6>${product.price}</h6>
            <ul>
             ${generateStarRating(product.rating.rate)}
            </ul>
            <button class="buy-1">Buy Now</button>
    `;
        // Append the card to the container
    gallery.appendChild(content);
    var img = content.querySelector("img");
    observer.observe(img);
    });
}

// Fetch data when the page loads
window.onload = fetchData;

window.addEventListener("scroll", function () {
    // Check if the user has scrolled to the bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Increment the current page and fetch the next set of products
        limit=limit+8;
        fetchData();
    }
});


function generateStarRating(rating) {
    const maxRating = 5;
    let starsHTML = "";
    for (let i = 1; i <= maxRating; i++) {
      const starClass = i <= rating ? "checked" : "";
      starsHTML += `<span class="fa fa-star ${starClass}"></span>`;
    }
    return starsHTML;
  }


  function truncateString(str, numWords) {
    var words = str.split(' ');
    if (words.length > numWords) {
      return words.slice(0, numWords).join(' ') + '...';
    } else {
      return str;
    }
  }
  