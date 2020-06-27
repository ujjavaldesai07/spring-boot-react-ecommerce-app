export const MAX_PRODUCTS_PER_PAGE = 12;

export const INITIAL_FILTER_ATTRIBUTES_STATE = {
    gender: [],
    apparel: [],
    brand: [],
    price: [],
    page: [0, MAX_PRODUCTS_PER_PAGE],
    sortBy: [1, undefined, "newest"],
    clearAll: false
}

export const PRODUCT_ROUTE = '/products'