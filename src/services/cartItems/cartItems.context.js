import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";

export const CartItemsContext = createContext();

export const CartItemsContextProvider = ({ children }) => {
  const { user, baseUrl } = useContext(AuthenticationContext);
  const [cartItems, setCartItems] = useState([]);
  const [newCartItems, setNewCartItems] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const getCartIdUrl = `${baseUrl}carts/search/findByIdClient?idClient=${user.uid}`;
        const firstResponse = await fetch(getCartIdUrl);
        const firstData = await firstResponse.json();
        const idCos = firstData.id;
        // console.log(idCos);

        const getCartItemsUrl = `${baseUrl}cartItems/search/findByIdCos?idCos=${idCos}`;
        const secondResponse = await fetch(getCartItemsUrl);
        const secondData = await secondResponse.json();
        // console.log(secondData._embedded);
        setCartItems(secondData._embedded.cartItems);
      } catch (error) {
        console.log(error);
      }
    };

    getCartItems();
  }, [baseUrl, user.uid]);

  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      console.log("AAAAAAAA");
      if (cartItems.length > 0) {
        const additionalInfoPromises = cartItems.map(async (item) => {
          const itemIdProdus = item.idProdus;
          const additionalInfoProductResponse = await fetch(
            `${baseUrl}products/${itemIdProdus}`
          );
          const additionalInfoProductData = await additionalInfoProductResponse.json();

          const itemIdProducator = additionalInfoProductData.idProducator;
          const additionalInfoProducatorResponse = await fetch(
            `${baseUrl}suppliers/${itemIdProducator}`
          );
          const additionalInfoProducatorData = await additionalInfoProducatorResponse.json();

          return {
            ...item,
            denumire: additionalInfoProductData.denumire,
            pret: additionalInfoProductData.pret,
            um: additionalInfoProductData.um,
            poza: additionalInfoProductData.poza,
            producator: additionalInfoProducatorData.nume,
            judet: additionalInfoProducatorData.judet,
          };
        });

        const additionalInfoArray = await Promise.all(additionalInfoPromises);
        // console.log(additionalInfoArray);
        setNewCartItems(additionalInfoArray);
      }
    };

    fetchAdditionalInfo();
  }, [cartItems, baseUrl]);

  const DeleteCartItem = async (id) => {
    fetch(`${baseUrl}cartItems/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update the state variable to remove the deleted item
        setNewCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const addToCart = async (idProdus, quantity) => {
    try {
      const addToCartUrl = `${baseUrl}carts/secure/cart?idClient=${user.uid}`;
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const firstResponse = await fetch(addToCartUrl, requestOptions);
      const firstData = await firstResponse.json();
      const idCos = firstData.id;

      const addItemToCartUrl = `${baseUrl}products/secure/cartItems?idCos=${idCos}&idProdus=${idProdus}&cantitate=${quantity}`;
      const secondResponse = await fetch(addItemToCartUrl, requestOptions);
      const secondData = await secondResponse.json();
      if (secondData.id != null) {
        setCartItems([...cartItems, secondData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartItemsContext.Provider
      value={{
        DeleteCartItem,
        cartItems,
        setCartItems,
        newCartItems,
        setNewCartItems,
        addToCart,
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};
