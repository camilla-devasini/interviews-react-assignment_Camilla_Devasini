export interface FilterContextModel {
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
  filterSearchString: string;
  setFilterSearchString: React.Dispatch<React.SetStateAction<string>>;
}
