function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

// Function to populate order summary with cart items
function populateOrderSummary() {
    const cart = loadCartItems();
    const productDetails = document.getElementById('product-details');
    const totalAmountElement = document.getElementById('total-amount');
    const generatedOrderNumber = document.getElementById('generated-order-number');
    const orderDate = document.getElementById('order-date');
    const shippingAddress = document.getElementById('shipping-address');

    // Mock data for order details (You may replace these with actual data)
    generatedOrderNumber.textContent = Math.floor(Math.random() * 1000000); // Random order number
    orderDate.textContent = new Date().toLocaleDateString(); // Current date
     // Example address

    if (cart.length > 0) {
        let totalAmount = 0;

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            totalAmount += subtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" />
                </td>
                <td>$${item.price.toFixed(2)}</td>
            `;
            productDetails.appendChild(row);

            // Add event listener for quantity change
            document.getElementById(`quantity-${item.id}`).addEventListener('input', function() {
                const quantity = parseInt(this.value) || 1;
                const newSubtotal = (quantity * item.price).toFixed(2);
                totalAmount -= subtotal; // Remove old subtotal
                totalAmount += newSubtotal; // Add new subtotal
                totalAmountElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
            });
        });

        totalAmountElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
    } else {
        productDetails.innerHTML = '<tr><td colspan="3">No products selected.</td></tr>';
        totalAmountElement.textContent = 'Total: $0.00';
    }
}

// Call the function to populate the order summary on page load
populateOrderSummary();
