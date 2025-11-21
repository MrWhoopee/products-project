import { onCategoriesClick } from "./js/handlers";
import { getCategories, getProducts } from "./js/products-api";
import { categoriesListEl } from "./js/refs";
import { renderCategories, renderProducts } from "./js/render-function";

async function init() {
  const {
    data: { products },
  } = await getProducts();

  const { data: categories } = await getCategories();

  renderProducts(products);
  renderCategories(categories);
}

init();

categoriesListEl.addEventListener("click", onCategoriesClick);
