// Product data
const products = [
  { name: "Laptop", price: 800, rating: 4.5 },
  { name: "Phone", price: 500, rating: 4.0 },
  { name: "Headphones", price: 150, rating: 4.2 },
  { name: "Monitor", price: 300, rating: 4.1 },
  { name: "Keyboard", price: 80, rating: 3.9 },
];

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const sortSelect = document.getElementById("sort-select");
  const searchInput = document.getElementById("search-input");

  function renderProducts(list) {
    productList.innerHTML = "";
    list.forEach(product => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${product.name} - ₹${product.price}
        <span title="Rating: ${product.rating}">⭐ ${product.rating}</span>
      `;
      productList.appendChild(li);
    });
  }

  function filterAndSort() {
    const keyword = searchInput.value.toLowerCase();
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(keyword)
    );

    if (sortSelect.value === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
  }

  sortSelect.addEventListener("change", filterAndSort);
  searchInput.addEventListener("input", filterAndSort);

  // Initial render
  renderProducts(products);
});
