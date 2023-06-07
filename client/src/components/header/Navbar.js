import { React, useContext } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { Logincontext } from "../context/ContextProvider";

export default function Navbar() {
  const { account, setAccount } = useContext(Logincontext);
  console.log(account);

  return (
    <header>
      <nav>
        <div className="left">
          <din className="navlogo">
            <NavLink to="/">
              {" "}
              <img src="./R.png" alt="" />
            </NavLink>
          </din>
          <div className="nav_searchbaar">
            <input type="text" name="" id="" />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">signin</NavLink>
          </div>
          <div className="cart_btn">
            <NavLink to="/buynow">
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon id="icon" />
              </Badge>
            </NavLink>

            <p>Cart</p>
          </div>
          <Avatar className="avtar" />
        </div>
      </nav>
    </header>
  );
}
