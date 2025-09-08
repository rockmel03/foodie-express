import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Searchbar from "../../../components/Searchbar";
import useDebounceCallback from "../../../hooks/useDebounceCallback";

const SearchCategory = ({ onSearch }) => {
  const onSearchCallback = useDebounceCallback((searchTerm) => {
    onSearch(searchTerm);
  }, 300);

  return (
    <Card>
      <CardContent className="p-6">
        <Searchbar onSearch={onSearchCallback} />
      </CardContent>
    </Card>
  );
};

export default SearchCategory;
