import React, { useContext, useReducer, useEffect } from "react";
var uniqid = require("uniqid");
// Current Global Shop Context.
const ShopContext = React.createContext();

// Context to manage state of an active collection search, filter, and sort state.
const CollectionContext = React.createContext();

// Shop provider should wrap the entire app, it takes a config object as a prop.
export const ShopProvider = ({ config = {}, children }) => {
  const [shop, dispatch] = useReducer(
    (state, action) => {
      console.log(action);
      switch (action.type) {
        case "ADD_TO_CART":
          return {
            ...state,
            cart: [...state.cart, { ...action.payload, cartId: uniqid() }]
          };
        case "REMOVE_FROM_CART":
          return {
            ...state,
            cart: [...state.cart.filter(item => item.cartId !== action.payload)]
          };
        case "SET_CURRENT_PRODUCT":
          return {
            ...state,
            currentProduct: { ...action.payload }
          };
        default:
          return state;
      }
    },
    {
      title: config.title,
      api: config.api,
      user: { name: "My User" },
      currentProduct: {},
      cart: [
        { id: 3, title: "I Know Why the Cajun Burger Sings", cartId: "fake" }
      ]
    }
  );
  return (
    <ShopContext.Provider value={{ ...shop, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

// Collection provider should be placed inside a ShopProvider component.
// collection results or filter,search,sort ui. It also will maintain a history.
export const CollectionProvider = ({ config, children }) => {
  const { api } = useContext(ShopContext);
  const [{ filters, results }, dispatch] = useReducer(
    (state, action) => {
      console.log(action);
      switch (action.type) {
        case "FETCH":
          return { ...state, results: [...action.payload] };
        case "FILTER":
          return {
            ...state,
            filters: { ...action.payload }
          };
        default:
          return state;
      }
    },
    {
      filters: { field: "title", value: "" },
      results: []
    }
  );
  useEffect(
    () => {
      fetch(`${api}products.json`)
        .then(response => {
          return response.json();
        })
        .then(results => {
          dispatch({
            type: "FETCH",
            payload: results
          });
        });
    },
    ["filters"]
  );
  const filteredResults = results.filter(item =>
    item[filters.field].includes(filters.value)
  );
  return (
    <CollectionContext.Provider
      value={{ filters, results, filteredResults, dispatch }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

// Hook to get storewide metadata from the Shop Provider.
export const useMeta = () => {
  const context = useContext(ShopContext);
  return context;
};

// Hook to get collection functionality.
// used to group search widgets and search results.
export const useCollection = () => {
  const context = useContext(CollectionContext);
  return context;
};

// Hook to inject user information.
// Returns a user profile object and related actions.
// User State is stored in the global shop context.
export const useUser = () => {
  const { user } = useContext(ShopContext);
  return [user];
};

// Hook to inject product functionality.
// Returns product information for a specific product id.
// Currently storing product in shop state to avoid routing.
export const useProduct = () => {
  const { api, currentProduct, dispatch } = useContext(ShopContext);
  const setProduct = productId =>
    fetch(`${api}products.json`)
      .then(response => response.json())
      .then(results =>
        dispatch({
          type: "SET_CURRENT_PRODUCT",
          payload: results.filter(item => item.id === productId)[0]
        })
      );
  return { currentProduct, setProduct };
};

// Hook to inject cart functionality.
// Returns global cart state, and actions to manipulate the cart.
export const useCart = () => {
  const { cart, dispatch } = useContext(ShopContext);
  const add = payload => {
    dispatch({ type: "ADD_TO_CART", payload });
  };
  const remove = payload => {
    dispatch({ type: "REMOVE_FROM_CART", payload });
  };
  return { cart, add, remove };
};
