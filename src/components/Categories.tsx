import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useFilter } from "../utils/hooks/FilterContext";

const drawerWidth = 180;

const categories = [
  "Fruit",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Meat",
  "Seafood",
  "Snacks",
  "Beverages",
];

export const Categories = () => {
  const { setFilterCategory } = useFilter();
  const handleCategorySelection = (event: React.MouseEvent<HTMLElement>) => {
    const { target } = event;
    if (target)
      setFilterCategory((target as HTMLButtonElement)?.textContent ?? "");
  };
  return (
    <Box minWidth={drawerWidth} sx={{ borderRight: "1px solid grey" }}>
      <List>
        {categories.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={(event: React.MouseEvent<HTMLElement>) =>
                handleCategorySelection(event)
              }
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
