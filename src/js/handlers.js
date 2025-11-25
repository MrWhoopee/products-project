import { toggleModal } from "./modal";
import {
  getProductById,
  getProductById,
  getProducts,
  getProductsByCategories,
  searchProduct,
} from "./products-api";
import { modalEl, modalProductEl, notFoundDivEl, productsListEl } from "./refs";
import { renderProduct, renderProducts } from "./render-function";

export async function onCategoriesClick(e) {
  if (e.target.nodeName !== "BUTTON") return;

  const listEl = e.currentTarget;
  const {
    data: { products },
  } =
    e.target.id === "all"
      ? await getProducts()
      : await getProductsByCategories(e.target.id);

  let prevActiveBtn = listEl.querySelector(".categories__btn--active");

  if (prevActiveBtn) {
    prevActiveBtn.classList.remove("categories__btn--active");
  }

  e.target.classList.add("categories__btn--active");

  productsListEl.innerHTML = "";
  notFoundDivEl.classList.remove("not-found--visible");

  if (products.length === 0) {
    notFoundDivEl.classList.add("not-found--visible");
    return;
  }

  if (products.length === 0) {
    notFoundDivEl.classList.add("not-found--visible");
    return;
  }

  renderAllProduct(products);
}

export async function onProductClick(e) {
  const itemEl = e.target.closest(".products__item");
  if (itemEl === null) return;

  const { id } = itemEl.dataset;
  const { data } = await getProductById(id);

  renderProduct(data, modalProductEl);

  toggleModalBtnText(checkLocalStorage(CART_LS, id), modalCartBtnEl);

  toggleModal(modalEl);
}

export async function onFormSubmit(e) {
  e.preventDefault();

  searchValue = e.target.elements.searchValue.value.trim();

  // Не робити запити з порожнім рядком та пробілами
  if (searchValue.length === 0) {
    return alert("Fill search input");
  }

  try {
    productsListEl.innerHTML = "";
    notFoundDivEl.classList.remove("not-found--visible");
    loadMoreBtnToggle(true);
    const {
      data: { products, total },
    } = await searchProduct(searchValue);

    if (products.length === 0) {
      notFoundDivEl.classList.add("not-found--visible");
      return;
    }
    if (total / LIMIT_PAGE > 1) {
      loadMoreBtnToggle();
    }

    renderAllProduct(products);
  } catch (error) {
    console.error("Search error:", error);
    productsListEl.innerHTML = "";
    notFoundDivEl.classList.add("not-found--visible");
  }
}

export async function onClearClick() {
  searchInputEl.value = "";
  toggleClearButton();

  try {
    const {
      data: { products },
    } = await getProducts();

    productsListEl.innerHTML = "";
    notFoundDivEl.classList.remove("not-found--visible");

    if (products.length === 0) {
      notFoundDivEl.classList.add("not-found--visible");
      return;
    }

    renderAllProduct(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

export function toggleClearButton() {
  const hasValue = searchInputEl.value.trim().length > 0;
  if (hasValue) {
    searchClearBtnEl.classList.add("search-form__btn-clear--visible");
  } else {
    searchClearBtnEl.classList.remove("search-form__btn-clear--visible");
  }
}

export async function onLoadMoreClick() {
  currentPage += 1;
  let response = null;

  if (searchValue !== null) {
    response = await searchProduct(searchValue, currentPage);
  } else {
    response = await getProducts(currentPage);
  }
  const {
    data: { products, total },
  } = response;

  const totalPages = Math.ceil(total / LIMIT_PAGE);

  if (currentPage === totalPages) {
    loadMoreBtnToggle(true);
  }
  renderAllProduct(products);
}
