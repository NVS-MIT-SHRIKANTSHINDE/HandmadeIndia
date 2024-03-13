import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Authenticity",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Craftsmanship",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Cultural Heritage",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Unique Designs",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Sustainability",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Music",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Handmade Quality",
    },
    {
      cateImg: "./images/category/cat8.png",
      cateName: "Artisanal Excellence",
    },
    {
      cateImg: "./images/category/cat9.png",
      cateName: "Local Empowerment",
    },
    {
      cateImg: "./images/category/cat10.png",
      cateName: "Uniqueness",
    },
    {
      cateImg: "./images/category/cat11.png",
      cateName: "Meaningful Souvenirs",
    },
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              {/* <img src={value.cateImg} alt='' /> */}
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
