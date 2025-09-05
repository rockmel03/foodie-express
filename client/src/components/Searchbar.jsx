import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        className="pl-8"
      />
    </div>
  );
};

export default Searchbar;
