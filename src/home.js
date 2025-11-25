import {
  onCategoriesClick,
  onClearClick,
  onFormSubmit,
  onLoadMoreClick,
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
  loadMoreBtn,
} from "./js/refs";
import { renderCategories, renderAllProduct } from "./js/render-function";
import { onModalClick } from "./js/modal";
import { loadMoreBtnToggle } from "./js/helpers";
import { LIMIT_PAGE } from "./js/constants";

async function init() {
  const {
    data: { products, total },
  } = await getProducts();

  const { data: categories } = await getCategories();
  if (total / LIMIT_PAGE > 1) {
    loadMoreBtnToggle();
  }

  renderAllProduct(products);
  renderCategories(categories);
}

init();

categoriesListEl.addEventListener("click", onCategoriesClick);

productsListEl.addEventListener("click", onProductClick);

modalEl.addEventListener("click", onModalClick);

searchformEl.addEventListener("submit", onFormSubmit);
searchInputEl.addEventListener("input", toggleClearButton);
searchClearBtnEl.addEventListener("click", onClearClick);
loadMoreBtn.addEventListener("click", onLoadMoreClick);
