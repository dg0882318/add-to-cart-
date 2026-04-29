var cartIcon = document.querySelector("#cart-icon");
var cart = document.querySelector(".cart");
var cartClose = document.querySelector("#cart-close");

// add remove cart 

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

var addCartButtons = document.querySelectorAll(".add-cart");
var cartContent = document.querySelector(".cart-content");

addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        var productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});
// add to cart function 
function addToCart(productBox) {
    var productImgSrc = productBox.querySelector("img").src;
    var productTitle = productBox.querySelector(".product-title").textContent;
    var productPrice = productBox.querySelector(".price").textContent;

    // Prevent duplicate q 
    var cartItems = document.querySelectorAll(".cart-product-title");
    for (var item of cartItems) {
        if (item.textContent === productTitle) {
            alert("Item already in cart");
            return;
        }
    }

    var cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `
        <img src="${productImgSrc}">
        <div class="cart-detail">
            <div class="cart-product-title">${productTitle}</div>
            <div class="cart-price">${productPrice}</div>

            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="fa-solid fa-trash cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    cart.classList.add("active");

    cartBox.querySelector(".cart-remove").addEventListener("click", removeItem);
    cartBox.querySelector(".increment").addEventListener("click", increaseQty);
    cartBox.querySelector(".decrement").addEventListener("click", decreaseQty);

    updateTotal();
    updateCartCount();
}

function removeItem(event) {
    event.target.closest(".cart-box").remove();
    updateTotal();
    updateCartCount();
}

function increaseQty(event) {
    var number = event.target.parentElement.querySelector(".number");
    number.textContent = parseInt(number.textContent) + 1;
    updateTotal();
}

function decreaseQty(event) {
    var number = event.target.parentElement.querySelector(".number");
    if (number.textContent > 1) {
        number.textContent = parseInt(number.textContent) - 1;
    }
    updateTotal();
}
// update total price and cart 
function updateTotal() {
    var cartBoxes = document.querySelectorAll(".cart-box");
    var total = 0;

    cartBoxes.forEach(box => {
        var price = box.querySelector(".cart-price").textContent;
        var quantity = box.querySelector(".number").textContent;

        price = parseInt(price.replace("Rs", ""));
        total += price * quantity;
    });

    document.querySelector(".total-price").textContent = "Rs " + total;
}
// update cart item cont
function updateCartCount() {
    var cartBoxes = document.querySelectorAll(".cart-box");
    document.querySelector(".cart-item-count").textContent = cartBoxes.length;
}
var buyNowBtn = document.querySelector(".btn-buy");
buyNowBtn.addEventListener("click", buyNow);

function buyNow() {
    var cartBoxes = document.querySelectorAll(".cart-box");

    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please select product first.");
    } else {
        alert("Thank you for purchasing!");

        document.querySelector(".cart-content").innerHTML = "";
        updateTotal();
        updateCartCount();
    }
}





