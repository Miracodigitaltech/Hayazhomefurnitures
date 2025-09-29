.
document.addEventListener('DOMContentLoaded', () => {

   

    // --- DOM Elements ---
    const productGrid = document.getElementById('product-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    const filterContainer = document.getElementById('filter-container');
    const backToHomeContainer = document.getElementById('back-to-home-container');
    
    // --- Modal Elements ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentProductList = [];
    let currentImageIndex = 0;

    // --- Functions ---

    // Function to create and display product cards
    const displayProducts = (productsToDisplay) => {
        productGrid.innerHTML = ''; // Clear existing products
        productsToDisplay.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                </div>
            `;
            // Add click event to open modal
            card.addEventListener('click', () => openModal(productsToDisplay, index));
            productGrid.appendChild(card);
        });
    };
    
    // Initial display logic
    const showInitialProducts = () => {
        const localProducts = products.filter(p => p.category === 'local').slice(0, 2);
        const foreignProducts = products.filter(p => p.category === 'foreign').slice(0, 2);
        displayProducts([...localProducts, ...foreignProducts]);
    };

    // Filter logic
    const handleFilterClick = (e) => {
        const category = e.target.dataset.category;

        // Update active button state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        if (category === 'all') {
            showInitialProducts();
            filterContainer.classList.remove('hidden');
            backToHomeContainer.classList.add('hidden');
        } else {
            const filteredProducts = products.filter(p => p.category === category);
            displayProducts(filteredProducts);
            filterContainer.classList.add('hidden');
            backToHomeContainer.classList.remove('hidden');
        }
    };
    
    // Back to home button logic
    const handleBackToHome = () => {
        showInitialProducts();
        filterContainer.classList.remove('hidden');
        backToHomeContainer.classList.add('hidden');
        // Reset active button to "All Products"
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if(btn.dataset.category === 'all') {
                btn.classList.add('active');
            }
        });
    };
    
    // --- Modal Functions ---
    const openModal = (productList, index) => {
        currentProductList = productList;
        currentImageIndex = index;
        modal.style.display = 'block';
        updateModalImage();
    };

    const updateModalImage = () => {
        modalImg.src = currentProductList[currentImageIndex].img;
    };
    
    const changeImage = (direction) => {
        currentImageIndex += direction;
        if (currentImageIndex >= currentProductList.length) {
            currentImageIndex = 0;
        }
        if (currentImageIndex < 0) {
            currentImageIndex = currentProductList.length - 1;
        }
        updateModalImage();
    };

    // --- Event Listeners ---
    filterButtons.forEach(button => button.addEventListener('click', handleFilterClick));
    backToHomeBtn.addEventListener('click', handleBackToHome);
    
    // Modal listeners
    closeModal.onclick = () => modal.style.display = 'none';
    prevBtn.onclick = () => changeImage(-1);
    nextBtn.onclick = () => changeImage(1);
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // --- Initial Page Load ---
    showInitialProducts();
});
document.addEventListener('DOMContentLoaded', () => {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const productCards = document.querySelectorAll('.product-card');

            const filterProducts = (category) => {
                productCards.forEach(card => {
                    if (category === 'all' || category === card.dataset.category) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            };

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.dataset.category;
                    filterProducts(category);
                });
            });
            
            // This part for linking from another page still works perfectly.
            // e.g., index.html#local-designs will still work.
            if (window.location.hash) {
                // remove the # from the hash
                const categoryFromURL = window.location.hash.substring(1); 
                const buttonToClick = document.querySelector(`.filter-btn[data-category='${categoryFromURL}']`);
                if(buttonToClick) {
                    buttonToClick.click();
                }
            }
        });
