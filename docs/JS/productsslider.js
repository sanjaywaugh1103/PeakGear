// Available product list and IDs mapping
const availableItems = [
    { name: "Fleeces", id: "fleeces" , page:"winter.html" },
    { name: "Winter Hoodies", id: "Winter-Hoodies" , page:"winter.html"},
    { name: "Snow Jacket", id: "snow-jacket-container" },
    { name: "Thermals", id: "thermals-container" },
    { name: "Winter Socks", id: "winter-socks-container" },
    { name: "Winter Gloves", id: "winter-gloves-container" },
    { name: "Winter Beaniee", id: "winter-beaniee-container" },
    { name: "Scarves", id: "scarves-container" },
    { name: "Boots", id: "boots-container" },
    { name: "Jackets", id: "jackets-container" },
    { name: "Sweaters", id: "sweaters-container" },
    { name: "Mittens", id: "mittens-container" },
];

// Show dropdown suggestions
function showSuggestions() {
    const searchBar = document.getElementById('searchBar');
    const suggestionsContainer = document.getElementById('suggestions');
    const searchTerm = searchBar.value.toLowerCase();

    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    // Show dropdown only if search term is entered
    if (searchTerm.trim() !== '') {
        const filteredItems = availableItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );

        if (filteredItems.length > 0) {
            filteredItems.forEach(item => {
                const suggestion = document.createElement('li');
                suggestion.textContent = item.name;

                // Set search term on click, hide dropdown, and redirect
                suggestion.onclick = () => {
                    searchBar.value = item.name;
                    suggestionsContainer.innerHTML = '';
                    suggestionsContainer.style.display = 'none';

                    // Redirect to the correct page and container
                    window.location.href = `${item.page}#${item.id}`;
                };

                suggestionsContainer.appendChild(suggestion);
            });

            // Display the dropdown
            suggestionsContainer.style.display = 'block';
        } else {
            // Show "No results found" if no matches
            const noResult = document.createElement('li');
            noResult.textContent = 'No results found';
            noResult.style.color = 'gray';
            noResult.style.cursor = 'default';
            suggestionsContainer.appendChild(noResult);

            suggestionsContainer.style.display = 'block';
        }
    } else {
        // Hide dropdown if input is empty
        suggestionsContainer.style.display = 'none';
    }
}




document.addEventListener('DOMContentLoaded', () => {
    // First Slider
    let list = document.querySelector('.slider .list');
    let items = document.querySelectorAll('.slider .list .item');
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');

    let active = 0;
    let lengthItems = items.length;

    // Next button functionality
    next.onclick = function () {
        active = (active + 1) % lengthItems;
        reloadSlider();
    };

    // Previous button functionality
    prev.onclick = function () {
        active = (active - 1 + lengthItems) % lengthItems;
        reloadSlider();
    };

    // Auto-slide functionality
    let refreshSlider = setInterval(() => {
        next.click();
    }, 3000);

    // Reload slider to update position
    function reloadSlider() {
        let offsetLeft = items[active].offsetLeft;
        list.style.left = -offsetLeft + 'px';
    }
});

// Product Slider
document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll('.product-slider-container');
    
    sliders.forEach((sliderContainer) => {
        const slider = sliderContainer.querySelector(".product-list");
        const nextBtn = sliderContainer.querySelector(".next-btn");
        const prevBtn = sliderContainer.querySelector(".prev-btn");
        const cardWidth = slider.querySelector(".product-card").offsetWidth;

        let scrollAmount = 0;

        nextBtn.addEventListener("click", () => {
            // Check if scrolling exceeds the max width
            const maxScroll = slider.scrollWidth - sliderContainer.offsetWidth;
            if (scrollAmount + cardWidth < maxScroll) {
                scrollAmount += cardWidth;
            } else {
                scrollAmount = maxScroll; // Stop at the end
            }
            slider.style.transform = `translateX(-${scrollAmount}px)`;
        });

        prevBtn.addEventListener("click", () => {
            if (scrollAmount - cardWidth > 0) {
                scrollAmount -= cardWidth;
            } else {
                scrollAmount = 0; // Stop at the start
            }
            slider.style.transform = `translateX(-${scrollAmount}px)`;
        });
    });
});


//product desc slider
document.addEventListener("DOMContentLoaded", function () {
    const imageSlider = document.querySelector('.product-images-slider');
    const imageContainer = imageSlider.querySelector('.image-container');
    const nextBtn = imageSlider.querySelector('.next-btn');
    const prevBtn = imageSlider.querySelector('.prev-btn');
    const images = imageContainer.querySelectorAll('img');

    let currentIndex = 0;

    function updateImageSlider() {
        const imageWidth = images[0].clientWidth;
        imageContainer.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        }
        updateImageSlider();
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateImageSlider();
    });

    // Ensure the slider adjusts correctly on window resize
    window.addEventListener('resize', updateImageSlider);
});

//Add to cart

document.addEventListener("DOMContentLoaded", () => {
    // Handle adding items to the cart
    const cartButtons = document.querySelectorAll(".add-to-cart");

    cartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-product-id");
            const productName = button.getAttribute("data-product-name");
            const productPrice = button.getAttribute("data-product-price");
            const productImg = button.getAttribute("data-product-img") || "images/default.png";

            // Create product object
            const product = {
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                img: productImg,
                quantity: 1,
            };

            // Get existing cart from localStorage or initialize
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if the product already exists in the cart
            const existingProduct = cart.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1; // Increment quantity if product exists
            } else {
                cart.push(product); // Add new product
            }

            // Update cart in localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`item added to cart added to cart!`);
        });
    });

    // Handle displaying items in the cart
    const cartContainer = document.getElementById("cart-container");

    const renderCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty!</p>";
            return;
        }

        // Render cart items
        cartContainer.innerHTML = ""; // Clear existing items before re-rendering
        cart.forEach((product) => {
            const productHTML = `
                <div class="cart-item" data-product-id="${product.id}">
                    <img src="${product.img}" alt="${product.name}" style="width: 100px; height: auto;">
                    <h3>${product.name}</h3>
                    <p>Price: ₹${product.price}</p>
                    <label for="quantity-${product.id}">Quantity:</label>
                    <input type="number" id="quantity-${product.id}" min="1" value="${product.quantity}" class="quantity-input" data-product-id="${product.id}">
                    <button class="delete-item" data-product-id="${product.id}">Delete</button>
                </div>
            `;
            cartContainer.innerHTML += productHTML;
        });

        // Add delete functionality
        document.querySelectorAll(".delete-item").forEach((button) => {
            button.addEventListener("click", () => {
                const productId = button.getAttribute("data-product-id");

                // Remove the product from the cart
                cart = cart.filter((item) => item.id !== productId);

                // Update localStorage and re-render
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                displayCartSummary(); // Update total after re-rendering
            });
        });

        // Add functionality to update quantity
        document.querySelectorAll(".quantity-input").forEach((input) => {
            input.addEventListener("change", (event) => {
                const productId = input.getAttribute("data-product-id");
                const newQuantity = parseInt(event.target.value, 10);

                if (newQuantity < 1) {
                    alert("Quantity cannot be less than 1.");
                    input.value = 1; // Reset to minimum value
                    return;
                }

                // Update the product quantity in the cart
                const product = cart.find((item) => item.id === productId);
                if (product) {
                    product.quantity = newQuantity;
                }

                // Update localStorage and re-render
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                displayCartSummary(); // Update total
            });
        });
    };

    // Calculate total amount
    const calculateTotal = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Display total and add checkout button
    const displayCartSummary = () => {
        // Remove old summary if it exists
        const existingSummary = document.getElementById("cart-summary");
        if (existingSummary) {
            existingSummary.remove();
        }

        const totalAmount = calculateTotal();

        const cartSummary = document.createElement("div");
        cartSummary.id = "cart-summary";
        cartSummary.innerHTML = `
            <h2>Total: ₹${totalAmount.toFixed(2)}</h2>
            <button id="checkout-button">Checkout</button>
        `;

        // Append summary after the cart container
        cartContainer.insertAdjacentElement("afterend", cartSummary);

        // Add functionality to checkout button
        document.getElementById("checkout-button").addEventListener("click", () => {
            if (totalAmount === 0) {
                alert("Your cart is empty. Add items before checking out!");
            } else {
                alert("Proceeding to checkout...");
                window.location.href = "checkout.html"
            }
        });
    };

    // Initial render
    if (cartContainer) {
        renderCart();
        displayCartSummary();
    }
});

//checkout html
document.addEventListener("DOMContentLoaded", () => {
    // Ensure this logic only runs on checkout.html
    if (window.location.pathname.includes("checkout.html")) {
        // Fetch the cart from localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // If the cart is empty, redirect to the cart page
        if (cart.length === 0) {
            alert("Your cart is empty! Redirecting to the cart page...");
            window.location.href = "cart.html"; // Redirect to cart page
            return;
        }

        // Calculate the total amount
        const calculateTotal = () => {
            return cart.reduce((total, item) => total + item.price * item.quantity, 0);
        };

        const totalAmountElement = document.getElementById("total-amount");
        const discountMessageElement = document.getElementById("discount-message");
        const couponInputElement = document.getElementById("coupon-code");

        let totalAmount = calculateTotal();
        let discount = 0;

        // Update total display
        const updateTotalDisplay = () => {
            totalAmountElement.textContent = `Total: ₹${(totalAmount - discount).toFixed(2)}`;
        };

        // Apply coupon logic
        document.getElementById("apply-coupon").addEventListener("click", () => {
            const couponCode = couponInputElement.value.trim();
            discount = 0; // Reset discount

            if (couponCode === "NC200" && totalAmount >= 2499) {
                discount = 200;
                discountMessageElement.textContent = "Coupon applied: ₹200 off!";
            } else if (couponCode === "NC300" && totalAmount >= 3499) {
                discount = 300;
                discountMessageElement.textContent = "Coupon applied: ₹300 off!";
            } else if (couponCode === "NC200" || couponCode === "NC300") {
                discountMessageElement.textContent = `Coupon not applicable: Minimum purchase ₹${couponCode === "NC200" ? "2499" : "3499"} required.`;
            } else {
                discountMessageElement.textContent = "Invalid coupon code.";
            }

            updateTotalDisplay();
        });

        // Place order logic
        document.getElementById("place-order").addEventListener("click", () => {
            if (totalAmount - discount <= 0) {
                alert("Your order total cannot be zero or less. Please review your cart.");
            } else {
                alert(`Order placed successfully! Total: ₹${(totalAmount - discount).toFixed(2)}`);
                // Clear cart and redirect to confirmation or home page
                localStorage.removeItem("cart");
                window.location.href = "index.html"; // Redirect to home page
            }
        });

        // Initial total display
        updateTotalDisplay();
    }
});



  
  
  