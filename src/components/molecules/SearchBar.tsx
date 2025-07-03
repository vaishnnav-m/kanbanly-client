import { Search } from "lucide-react";
import React from "react";

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="w-full h-[40px] pl-3 flex items-center border rounded-xl overflow-hidden transition focus-within:ring-2 focus-within:ring-primary">
      <Search className="w-5 h-5 border-[#8f929c]" />
      <input
        className="px-3 w-full bg-inherit border-none h-full focus:outline-none focus:ring-0 text-lg"
        placeholder={placeholder}
        id="search"
      />
    </div>
  );
};

export default SearchBar;
