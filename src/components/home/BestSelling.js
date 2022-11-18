import React from "react";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import ProductCarousel from "../ProductCarousel";

const BestSelling = () => {
  const items = [
    {
      _id: "8a5b4a9c-76ea-4fbb-9c70-9548de4eab01",
      category: "Men's Pants",
      name: "TIRO 21 TRACK PANTS",
      seller: "Addidas",
      price: 109,
      stock: 6,
      ratings: 5,
      ratingsCount: 1688,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9c7058d8677742ac8519ac3f009cdcf4_9366/Tiro_21_Track_Pants_Black_GH7305_21_model.jpg",
      shipping: 48,
      quantity: 0,
    },
    {
      _id: "b357e19b-4dd9-4fc7-b5c0-9ed5255464ba",
      category: "Men's Pants",
      name: "PRIMEBLUE SST TRACK PANTS",
      seller: "Addidas",
      price: 63,
      stock: 46,
      ratings: 4,
      ratingsCount: 50,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/52b5fde5829a4a04820dacf50127b969_9366/Adicolor_Classics_Primeblue_SST_Track_Pants_Blue_H06714_21_model.jpg",
      shipping: 20,
      quantity: 0,
    },
    {
      _id: "e4220958-06d2-4d50-96fa-0163a563f43d",
      category: "Men's Pants",
      name: "TIRO 21 TRACK PANTS",
      seller: "Addidas",
      price: 148,
      stock: 41,
      ratings: 3,
      ratingsCount: 4483,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3cb8057730844247a568ac9800fa36fb_9366/Tiro_21_Track_Pants_Blue_GE5425_21_model.jpg",
      shipping: 8,
      quantity: 0,
    },
    {
      _id: "ae69f0e4-559c-4b24-8032-80b63f9b5073",
      category: "Men's Pants",
      name: "TIRO TRACK PANTS RED",
      seller: "Addidas",
      price: 122,
      stock: 43,
      ratings: 4,
      ratingsCount: 1239,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c98bbccc77934722b139acb80111a3d7_9366/Tiro_Track_Pants_Red_GT6841_21_model.jpg",
      shipping: 27,
      quantity: 0,
    },
    {
      _id: "dbf7ab3f-b383-4d95-8ab7-f55fcf6fa5f2",
      category: "Men's Pants",
      name: "TIRO PANTS BLACK GOLD",
      seller: "Addidas",
      price: 115,
      stock: 26,
      ratings: 5,
      ratingsCount: 4557,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c447324cf06544b78105ade500fd9e2f_9366/Tiro_Pants_Black_HI1073_21_model.jpg",
      shipping: 33,
      quantity: 0,
    },
    {
      _id: "ed6a7ac3-7e67-4e3f-8461-bceb5178be42",
      category: "Men's Pants",
      name: "TAPERED-CUFF 3-STRIPES PANTS",
      seller: "Addidas",
      price: 108,
      stock: 5,
      ratings: 3,
      ratingsCount: 3383,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c7f050932336444ca286acbb0121f995_9366/Essentials_French_Terry_Tapered-Cuff_3-Stripes_Pants_Grey_GK8824_21_model.jpg",
      shipping: 26,
      quantity: 0,
    },
  ];
  return (
    <PrimaryContainer>
      <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold mb-4">
        Best Sellers. <GreyText>Best selling of the month</GreyText>
      </h1>
      <ProductCarousel products={items} />
    </PrimaryContainer>
  );
};

export default BestSelling;
