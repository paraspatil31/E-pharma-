// Function to load cart items from local storage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

// Function to populate order summary with cart items
function populateOrderSummary() {
    const cart = loadCartItems();
    const orderSummary = document.querySelector('.order-summary');

    if (cart.length > 0) {
        let summaryHtml = `<h2>Order Summary</h2>`;
        let totalAmount = 0;

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            totalAmount += subtotal;

            summaryHtml += `
                <div class="cart-item">
                    <p>Product: ${item.name}</p>
                    <p>Quantity: <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" /></p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p><strong>Subtotal: $<span id="subtotal-${item.id}">${subtotal.toFixed(2)}</span></strong></p>
                    <hr />
                </div>
            `;
        });

        summaryHtml += `
            <p><strong>Total: $<span id="total-price">${totalAmount.toFixed(2)}</span></strong></p>
        `;

        orderSummary.innerHTML = summaryHtml;

        // Add quantity change listeners for each item
        cart.forEach(item => {
            document.getElementById(`quantity-${item.id}`).addEventListener('input', function() {
                const quantity = parseInt(this.value) || 1;
                const subtotal = (quantity * item.price).toFixed(2);
                document.getElementById(`subtotal-${item.id}`).textContent = subtotal;

                // Update total amount
                updateTotalPrice();
            });
        });
    } else {
        orderSummary.innerHTML = '<p>No products selected.</p>';
    }
}

// Function to update the total price
function updateTotalPrice() {
    let total = 0;
    const cart = loadCartItems();

    cart.forEach(item => {
        const quantity = parseInt(document.getElementById(`quantity-${item.id}`).value) || 1;
        total += item.price * quantity;
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Validate form fields before submitting
function validateForm(event) {
    const requiredFields = document.querySelectorAll('#payment-form [required]');
    let isValid = true;

    requiredFields.forEach(field => {
        const errorMessageElement = field.nextElementSibling;

        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            errorMessageElement.textContent = `${field.previousElementSibling.textContent} is required`;
        } else {
            field.classList.remove('error');
            errorMessageElement.textContent = ''; // Clear any error message
        }
    });

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if invalid
        alert("Please fill in all required fields.");
    } else {
        // Clear cart upon successful submission
        localStorage.removeItem('cart');
        window.location.href = 'end.html'; // Redirect to the success page if valid
    }
}

// Clear error message when user starts typing in the input field
function addInputListeners() {
    const requiredFields = document.querySelectorAll('#payment-form [required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            const errorMessageElement = field.nextElementSibling;
            if (field.value.trim()) {
                field.classList.remove('error');
                errorMessageElement.textContent = ''; // Clear any error message
            }
        });
    });
}

// Attach event listener for form submission
document.getElementById('payment-form').addEventListener('submit', validateForm);

// Call the function to populate order summary and add input listeners when the page loads
window.onload = () => {
    populateOrderSummary();
    addInputListeners();
};
