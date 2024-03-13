import React from "react"
import "./Header.css"
import Head from "./Head"
import Search from "./Search"
import Navbar from "./Navbar"
import ScrollingHeadlines from "./headline"
const headlines = [
  "Handmade India Spectacular Sale: Enjoy 50% Off on Artisan Treasures! Elevate Your Home with Handcrafted Elegance. Limited Time Offer – Shop Now!",

  // Add more headlines as needed
];

const Header = ({ CartItem }) => {
  return (
    <>
      <Head />
      <Search CartItem={CartItem} />
      <ScrollingHeadlines headlines={headlines} />
      <Navbar />
    </>
  )
}

export default Header
