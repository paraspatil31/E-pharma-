function updateTotal() {
    const pricePerItem = 49.00; // Price per item
    const quantity = document.getElementById('quantity').value; // Get the quantity from input
    const totalPrice = (pricePerItem * quantity).toFixed(2); // Calculate total price
    document.getElementById('total-price').textContent = `$${totalPrice}`; // Update total price in the HTML
}