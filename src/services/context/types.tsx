export interface FilterContextModel {
  filterCategory: string | null;
  setFilterCategory: React.Dispatch<React.SetStateAction<string | null>>;
  filterSearchString: string | null;
  setFilterSearchString: React.Dispatch<React.SetStateAction<string | null>>;
}
