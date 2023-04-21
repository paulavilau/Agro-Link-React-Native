import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";

export const CategoriesContext = createContext();

export const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const { baseUrl } = useContext(AuthenticationContext);

  const CategoriesTransform = (categs) => {
    const mappedResults = categs.map((categ) => {
      return {
        ...categ,
        // image: `../../../../assets/${categ.image}`,
      };
    });
    return mappedResults;
  };

  useEffect(() => {
    fetch(`${baseUrl}categories`)
      .then((response) => response.json())
      .then((data) => {
        setIsCategoriesLoading(false);
        setCategories(CategoriesTransform(data._embedded.categories));
      })
      .catch((err) => {
        console.log(err.toString());
        setIsCategoriesLoading(false);
        setCategoriesError(err);
      });
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isCategoriesLoading,
        categoriesError,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
