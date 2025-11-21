import { categoriesListEl, productsListEl } from "./refs";

export function renderProducts(products) {
  const productsMarkup = products
    .map(({ id, images, title, brand, category, price }) => {
      return `
      <li class="products__item" data-id="${id}">
        <img class="products__image" src="${
          images[0] ?? "https://placehold.co/600x400"
        }" alt="${title}" />
        <p class="products__title">${title}</p>
        <p class="products__brand">
            <span class="products__brand--bold">Brand: ${brand}</span>
        </p>
        <p class="products__category">Category: ${category}</p>
        <p class="products__price">Price: ${price}</p>
      </li>`;
    })
    .join("");

  productsListEl.insertAdjacentHTML("beforeend", productsMarkup);
}

export function renderCategories(categories) {
  const categoriesMarkup = ["all", ...categories]
    .map((cat) => {
      return `<li class="categories__item">
                <button class="categories__btn" id="${cat}" type="button" >${cat}</button>
            </li>`;
    })
    .join("");

  categoriesListEl.insertAdjacentHTML("beforeend", categoriesMarkup);
}
