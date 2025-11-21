import { getProducts, getProductsByCategories } from "./products-api";
import { categoriesListEl, productsListEl } from "./refs";
import { renderProducts } from "./render-function";

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

  renderProducts(products);
}
