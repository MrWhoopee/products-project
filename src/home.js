import {
  onCategoriesClick,
  onClearClick,
  onFormSubmit,
  onProductClick,
  toggleClearButton,
} from "./js/handlers";
import { getCategories, getProducts } from "./js/products-api";
import {
  categoriesListEl,
  modalEl,
  productsListEl,
  searchClearBtnEl,
  searchformEl,
  searchInputEl,
} from "./js/refs";
import { renderCategories, renderProducts } from "./js/render-function";
import { onModalClick } from "./js/modal";

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

productsListEl.addEventListener("click", onProductClick);

modalEl.addEventListener("click", onModalClick);

searchformEl.addEventListener("submit", onFormSubmit);
searchInputEl.addEventListener("input", toggleClearButton);
searchClearBtnEl.addEventListener("click", onClearClick);
