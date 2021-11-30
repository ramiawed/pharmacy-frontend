import React from "react";

// components
import Input from "../input/input.component";

// icons
import { FaSearch } from "react-icons/fa";

function Search({ value, onchange, onEnterPress }) {
  return (
    <>
      <Input
        id="search"
        type="text"
        value={value}
        onchange={onchange}
        bordered={true}
        icon={() => <FaSearch />}
        placeholder="search"
        onEnterPress={onEnterPress}
      />
    </>
  );
}

export default Search;
