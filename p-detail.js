// Array of products (same as in the main product page)
const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 10.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmjE4c58zhDm6fGhMw3EYlWDZxxzJDkNPHzg&s'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 14.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwc4xssfbclN6frSPuF2KCyUasZ0YLxehfQ&s'
    },
    {
        id: 3,
        name: 'Product 3',
        price: 8.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYMJrH4RGJfrmtDDz2KIrtFnKmqtpQY5VZA&s'
    },
    {
        id: 4,
        name: 'Product 4',
        price: 12.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDb_yaKQsIvxOzvxcoNAUVN5VWv_7l4ot1sw&s'
    },
    {
        id: 5,
        name: 'Paracetamol',
        price: 15.99,
        description: 'Paracetamol Tablets belongs to Analgesics and Antipyretic Drugs, it is most common drug used in fever and cold.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7yG1lwrSpM3U467ur9N5X6qWxRUgTzev5NQ&s'
    },
    {
        id: 6,
        name: 'Atorvastatin',
        price: 17.99,
        description: 'Atorvastatin is in a class of medications called HMG-CoA reductase inhibitors (statins).',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTInITR-u1ExgUu0LbVcamKWMm46d3hL5CqrQ&s'
    },
    {
        id: 7,
        name: 'Metformin',
        price: 21.99,
        description: 'Metformin is an FDA-approved antidiabetic agent that manages high blood sugar levels in type 2 diabetes patients.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgWn6bzWoKNnvgYwH_SBNKahosJ46J80mIhA&s'
    },
    {
        id: 8,
        name: 'Amoxicillin',
        price: 20.99,
        description: 'Amoxicillin is an aminopenicillin created by adding an extra amino group to penicillin to battle antibiotic resistance.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROZAnDcsaS0_0gx-96E_7YOXYE7-ybE0FzQ&s'
    },
    {
        id: 9,
        name: 'Ciprofloxacin',
        price: 9.99,
        description: 'Ciprofloxacin is used to treat bacterial infections in many different parts of the body.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFc9lhZcLGmMb4qdSnajYFz_sJQ988wFChBQ&s'
    },
    {
        id: 10,
        name: 'Salbutamol',
        price: 1.99,
        description: 'Salbutamol is used to relieve symptoms of asthma and chronic obstructive pulmonary disease.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfk2RKYmBF-_7blRD259pvFmfHTSf8r9qOPg&s'
    }
];

// Get product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'), 10); // Ensure ID is an integer

// Function to display product details
function displayProductDetails() {
    const product = products.find(p => p.id === productId);

    if (product) {
        const productDetails = `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" />
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <a href="payment.html?id=${product.id}">
                <button>Buy Now</button>
            </a>
            <button id="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        document.getElementById('product-details').innerHTML = productDetails;
    } else {
        document.getElementById('product-details').innerHTML = '<p>Product not found!</p>';
    }
}

// Function to add product to cart and redirect to productlist.html
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        // Get the existing cart from local storage or create a new one
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            // If product exists, update the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If product doesn't exist, add it to the cart
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        }

        // Save the updated cart back to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Provide feedback to the user
        alert(`${product.name} has been added to your cart!`);

        // Redirect to the product list page
        window.location.href = 'productlist.html';
    } else {
        alert('Error: Product not found!');
    }
}

// Call the function when the page loads
window.onload = displayProductDetails;
