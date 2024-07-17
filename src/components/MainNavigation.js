import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./MainNavigation.module.css";
import FoodImg from "../assets/food.png";
import SearchIcon from "../assets/glass.png";
import LeftArrow from "../assets/left-arrow.png";

export default function MainNavigation() {
  const [searchBox, setSearchBox] = useState("");
  const [showFullWidthSearchBar, setShowFullWidthSearchBar] = useState(false);

  const navigate = useNavigate();

  function handleLocalSearch() {
    if (searchBox.trim().length !== 0) {
      navigate(`/recipes/search?query=${encodeURIComponent(searchBox)}`);
      // navigate(`/recipes/search?query=${encodeURIComponent(searchBox)}`, { state: searchBox });
    }
  }

  function handleOnlineSearch() {
    if (searchBox.trim().length !== 0) {
      navigate(`/search-online?query=${encodeURIComponent(searchBox)}`);
    }
  }

  return (
    <header className={classes.header}>
      <nav className={classes.menu}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Recipes
            </NavLink>
          </li>
        </ul>
      </nav>
      <section className={classes["search-section"]}>
        {!showFullWidthSearchBar && (
          <div className={classes.logo}>
            <img src={FoodImg} alt="food" />
            <h1>Recipe keeper</h1>
          </div>
        )}
        <div className={showFullWidthSearchBar ? classes["loop-hidden"] : classes.loop}>
          <button onClick={()=>setShowFullWidthSearchBar(true)}>
            <img className={classes["search-icon"]} src={SearchIcon} />
          </button>
        </div>
        <div className={showFullWidthSearchBar ? classes["finder-visible"] : classes.finder}>
          {showFullWidthSearchBar && <button className={classes.arrow} onClick={()=>setShowFullWidthSearchBar(false)}><img className={classes["search-icon"]} src={LeftArrow} /></button>}
          <input
            value={searchBox}
            onChange={(e) => setSearchBox(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleOnlineSearch();
              }
            }}
            placeholder="Search"
          ></input>
          
          <button onClick={handleLocalSearch}>
            <img className={classes["search-icon"]} src={SearchIcon} />
          </button>
        </div>
      </section>
    </header>
  );
}
