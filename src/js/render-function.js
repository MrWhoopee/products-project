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

export function renderProduct(data, selector) {
  const {
    images,
    title,
    tags,
    description,
    shippingInformation,
    returnPolicy,
    price,
  } = data;
  const tagsMarkup = tags.map((tag) => `<li>${tag}</li>`).join("");

  const markup = `<img class="modal-product__img" src="${images[0]}" alt="${title}" />
                    <div class="modal-product__content">
                    <p class="modal-product__title">${title}</p>
                    <ul class="modal-product__tags">${tagsMarkup}</ul>
                    <p class="modal-product__description">${description}</p>
                    <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
                    <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
                    <p class="modal-product__price">Price: $ ${price}</p>
                    <button class="modal-product__buy-btn" type="button">Buy</button>
                    </div>`;

  selector.innerHTML = markup;
}
