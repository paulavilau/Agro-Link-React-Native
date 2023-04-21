import React, { useState, createContext, useEffect, useContext } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";

export const ClassesContext = createContext();

export const ClassesContextProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);
  const [isClassesLoading, setIsClassesLoading] = useState(true);
  const [classesError, setClassesError] = useState(null);
  const { baseUrl } = useContext(AuthenticationContext);

  const ClassesTransform = (categs) => {
    const mappedResults = categs.map((categ) => {
      return {
        ...categ,
      };
    });
    return mappedResults;
  };

  useEffect(() => {
    fetch(`${baseUrl}clases`, {})
      .then((response) => response.json())
      .then((data) => {
        setIsClassesLoading(false);
        setClasses(ClassesTransform(data._embedded.clases));
      })
      .catch((err) => {
        console.log(err);
        setIsClassesLoading(false);
        setClassesError(err);
      });
  }, []);

  return (
    <ClassesContext.Provider
      value={{
        classes,
        isClassesLoading,
        classesError,
      }}
    >
      {children}
    </ClassesContext.Provider>
  );
};
