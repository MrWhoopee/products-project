import { CART_LS } from "./constants";
import { toggleModalBtnText } from "./helpers";
import { toggleModal } from "./modal";
import {
  getProductById,
  getProducts,
  getProductsByCategories,
  searchProduct,
} from "./products-api";
import {
  categoriesListEl,
  modalCartBtnEl,
  modalEl,
  modalProductEl,
  notFoundDivEl,
  productsListEl,
  searchClearBtnEl,
  searchInputEl,
} from "./refs";
import { renderProduct, renderProducts } from "./render-function";
import { checkLocalStorage } from "./storage";

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
    // console.log("Not Found");
    notFoundDivEl.classList.add("not-found--visible");
    return;
  }

  renderProducts(products);
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

  const searchValue = e.target.elements.searchValue.value.trim();

  // Не робити запити з порожнім рядком та пробілами
  if (searchValue.length === 0) {
    return alert("Fill search input");
  }

  try {
    const {
      data: { products },
    } = await searchProduct(searchValue);

    productsListEl.innerHTML = "";
    notFoundDivEl.classList.remove("not-found--visible");

    if (products.length === 0) {
      notFoundDivEl.classList.add("not-found--visible");
      return;
    }

    renderProducts(products);
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

    renderProducts(products);
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
