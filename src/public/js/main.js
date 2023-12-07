const renderData = document.getElementById("renderData");
const btnLoadMore = document.getElementById("loadMoreBtn");

let page = 1;
const postsPerPage = 2;
const loadLinks = async () => {
  const paginateURL = `http://localhost:8080/api/products?limit=${postsPerPage}&page=${page}`;

  const { products } = await fetch(paginateURL).then((res) => res.json());
  const htmlString = products.payload
    .map(
      (product) =>
        `
        <a href="/api/products/${product._id}">
    
        <div class="container-Logo">
          <img class="logo" alt="logoShop" src="/image/catProducts.png" />
        </div>
        <div class="info">
        <p>${product.title}</p>
        <p>$ ${product.price}</p>
        </div>
      
        </a>
        `
    )
    .join("");
  if (renderData) {
    renderData.innerHTML += htmlString;
  }
};

btnLoadMore.addEventListener("click", () => {
  page++;
  loadLinks();
});

loadLinks();
