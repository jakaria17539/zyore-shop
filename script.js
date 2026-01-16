// Variables to hold our data
let cart = []; 
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total');
const sidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');

// 1. Add Event Listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Get product info from the data attributes we added
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        // Add to our cart array
        cart.push({ name, price });

        // Update the screen
        updateCartDisplay();
        showToast(); // Reuse our toast function from before
    });
});

// 2. Function to Update the Cart UI
function updateCartDisplay() {
    // Update the counter number
    cartCountElement.innerText = cart.length;

    // Calculate Total Price
    let total = 0;
    cartItemsContainer.innerHTML = ''; // Clear current list

    cart.forEach((item, index) => {
        total += item.price;

        // Create HTML for this item
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <div style="text-align:right">
                <div style="color:#ff6584">$${item.price}</div>
                <button onclick="removeItem(${index})" style="font-size:12px; margin-top:5px;">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    // Update Total Text
    cartTotalElement.innerText = total.toFixed(2);
}

// 3. Function to Remove an Item
function removeItem(index) {
    cart.splice(index, 1); // Remove item at specific index
    updateCartDisplay();   // Refresh the list
}

// 4. Toggle Sidebar (Open/Close)
function toggleCart() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// 5. Toast Notification Logic (Same as before)
function showToast() {
    const toast = document.getElementById('toast');
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}
// Function to go to checkout page
function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some products first.");
    } else {
        // Save the cart data to the browser's local memory so we don't lose it
        // when the page changes (Optional advanced step, but good practice)
        localStorage.setItem('myCart', JSON.stringify(cart));
        
        // Go to the page
        window.location.href = "checkout.html";
    }
}
