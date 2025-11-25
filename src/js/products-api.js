import axios from "axios";
import { LIMIT_PAGE } from "./constants";
axios.defaults.baseURL = "https://dummyjson.com/";

export function getProducts(page = 1) {
  return axios.get("products", {
    params: {
      limit: LIMIT_PAGE,
      skip: (page - 1) * LIMIT_PAGE,
    },
  });
}

export function getProductById(id) {
  return axios.get(`products/${id}`);
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

export function searchProduct(q, page = 1) {
  return axios.get("products/search", {
    params: {
      limit: LIMIT_PAGE,
      skip: (page - 1) * LIMIT_PAGE,
      q,
    },
  });
}
