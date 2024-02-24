import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Products } from "./components/layout/Products.tsx";
import { Cart } from "./services/products/types.tsx";
import SearchAppBar from "./components/SearchAppBar.tsx";
import { Categories } from "./components/Categories.tsx";
import { useState } from "react";
import { FilterProvider } from "./utils/hooks/FilterContext.tsx";

function App() {
  const [cart, setCart] = useState<Cart>();

  function onCartChange(cart: Cart) {
    setCart(cart);
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <CssBaseline />
      <FilterProvider>
        <SearchAppBar
          quantity={cart?.totalItems || 0}
          price={cart?.totalPrice || 0}
        />
        <Box flex={1} display="flex" flexDirection="row">
          <Categories />
          <Box flex={1}>
            <Products onCartChange={onCartChange} />
          </Box>
        </Box>
      </FilterProvider>
    </Box>
  );
}

export default App;
