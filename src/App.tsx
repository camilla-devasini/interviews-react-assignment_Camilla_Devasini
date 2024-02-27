import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Products } from "./components/layout/Products.tsx";
import SearchAppBar from "./components/SearchAppBar.tsx";
import { Categories } from "./components/Categories.tsx";
import { FilterProvider } from "./utils/hooks/useFilter.tsx";
import { CartProvider } from "./utils/hooks/useShoppingCart.tsx";

function App() {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <CssBaseline />
      <CartProvider>
        <FilterProvider>
          <SearchAppBar />
          <Box flex={1} display="flex" flexDirection="row">
            <Categories />
            <Box flex={1}>
              <Products />
            </Box>
          </Box>
        </FilterProvider>
      </CartProvider>
    </Box>
  );
}

export default App;
