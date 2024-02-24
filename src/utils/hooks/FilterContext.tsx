import React, { useContext, useState } from "react";
import { FilterContextModel } from "../../services/context/types";

const FilterContext = React.createContext<FilterContextModel>({
  filterCategory: "",
  setFilterCategory: () => {},
  filterSearchString: "",
  setFilterSearchString: () => {},
});
// eslint-disable-next-line
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterSearchString, setFilterSearchString] = useState<string>("");
  return (
    <FilterContext.Provider
      value={{
        filterCategory,
        setFilterCategory,
        filterSearchString,
        setFilterSearchString,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};