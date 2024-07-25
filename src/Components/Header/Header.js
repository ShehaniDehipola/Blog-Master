import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="header-container">
      <Link to="/" className="header-logo">
        BlogMaster
      </Link>
      <form onSubmit={handleSearch} className="header-search-form">
        <input
          type="text"
          className="header-search-form-input"
          placeholder="Enter key word..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="header-search-form-button">
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
