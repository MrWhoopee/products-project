import axios from "axios";
axios.defaults.baseURL = "https://dummyjson.com/";
const LIMIT_PAGE = 12;

export function getProducts(page = 1) {
  return axios.get("products", {
    params: {
      limit: LIMIT_PAGE,
      skip: (page - 1) * LIMIT_PAGE,
    },
  });
}

export function getProductsByCategories(cat, page = 1) {
  return axios.get(`products/category/${cat}`, {
    params: {
      limit: LIMIT_PAGE,
      skip: (page - 1) * LIMIT_PAGE,
    },
  });
}

export function getCategories() {
  return axios("products/category-list");
}
