import React, { useState } from "react";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import Product from "../cards/Product";

const Trending = () => {
  const [tabState, setTabState] = useState("All Items");
  const [showFilter, setShowFilter] = useState(false);
  const tabs = ["All Items", "Mens", "Women", "Kids", "Jewels"];

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
      class="w-4 h-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      ></path>
    </svg>
  );

  const buttons = [
    {
      icon: (
        <svg
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M12 6V18"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
      title: "1$ - 500$",
    },
    {
      icon: (
        <svg
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2V5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M16 2V5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M7 13H15"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M7 17H12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
      title: "Categories",
    },
    {
      icon: (
        <svg
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M8.35 1.94995L9.69 3.28992"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M2.07 11.92L17.19 11.26"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 22H16"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
      title: "Colors",
    },
    {
      icon: (
        <svg
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 9V3H15"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 15V21H9"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M21 3L13.5 10.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M10.5 13.5L3 21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
      title: "Sizes",
    },
    {
      icon: (
        <svg
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.9889 14.6604L2.46891 13.1404C1.84891 12.5204 1.84891 11.5004 2.46891 10.8804L3.9889 9.36039C4.2489 9.10039 4.4589 8.59038 4.4589 8.23038V6.08036C4.4589 5.20036 5.1789 4.48038 6.0589 4.48038H8.2089C8.5689 4.48038 9.0789 4.27041 9.3389 4.01041L10.8589 2.49039C11.4789 1.87039 12.4989 1.87039 13.1189 2.49039L14.6389 4.01041C14.8989 4.27041 15.4089 4.48038 15.7689 4.48038H17.9189C18.7989 4.48038 19.5189 5.20036 19.5189 6.08036V8.23038C19.5189 8.59038 19.7289 9.10039 19.9889 9.36039L21.5089 10.8804C22.1289 11.5004 22.1289 12.5204 21.5089 13.1404L19.9889 14.6604C19.7289 14.9204 19.5189 15.4304 19.5189 15.7904V17.9403C19.5189 18.8203 18.7989 19.5404 17.9189 19.5404H15.7689C15.4089 19.5404 14.8989 19.7504 14.6389 20.0104L13.1189 21.5304C12.4989 22.1504 11.4789 22.1504 10.8589 21.5304L9.3389 20.0104C9.0789 19.7504 8.5689 19.5404 8.2089 19.5404H6.0589C5.1789 19.5404 4.4589 18.8203 4.4589 17.9403V15.7904C4.4589 15.4204 4.2489 14.9104 3.9889 14.6604Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M9 15L15 9"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M14.4945 14.5H14.5035"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M9.49451 9.5H9.50349"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
      title: "On sale",
    },
  ];

  const products = [
    {
      _id: "b1872b25-ba91-48ed-9468-1822df0637b9",
      category: "Cap",
      name: "Relaxed Strap-Back Hat",
      seller: "Addidas",
      price: 30,
      stock: 6,
      ratings: 4,
      ratingsCount: 4,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/4feb20f4d990407cb4f1a88a0040b212_9366/Relaxed_Strap-Back_Hat_Black_BH7137_01_standard.jpg",
      shipping: 1,
      quantity: 0,
    },
    {
      _id: "ea028038-4e9d-42bf-b033-88aa5e6cc477",
      category: "Cap",
      name: "Icon Snapback Hat",
      seller: "Addidas",
      price: 21,
      stock: 13,
      ratings: 4,
      ratingsCount: 1,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/1e27ae8bbfb647489261ac8e015d181f_9366/Icon_Snapback_Hat_Grey_EX6798_01_standard.jpg",
      shipping: 26,
      quantity: 0,
    },
    {
      _id: "d48e0fcb-904c-499e-93a0-312d77e6dbf9",
      category: "Cap",
      name: "Superlite Hat",
      seller: "Addidas",
      price: 11,
      stock: 18,
      ratings: 3,
      ratingsCount: 39,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/0ae141db6fce44999337ac8e015954ea_9366/Superlite_Hat_Grey_EX7054_01_standard.jpg",
      shipping: 32,
      quantity: 0,
    },
    {
      _id: "71dfc7f9-844b-4be7-816f-891a5cbaa0f1",
      category: "Cap",
      name: "Superlite Hat",
      seller: "Addidas",
      price: 10,
      stock: 10,
      ratings: 5,
      ratingsCount: 47,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/272d5d9cb7b74415a6c9ac8e015a4ccc_9366/Superlite_Hat_Black_EX7048_01_standard.jpg",
      shipping: 24,
      quantity: 0,
    },
    {
      _id: "a9d89eac-7418-4bca-a484-c8238c356270",
      category: "Cap",
      name: "Tee Time 5-Panel Hat",
      seller: "Addidas",
      price: 24,
      stock: 1,
      ratings: 4,
      ratingsCount: 14,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/df67ab60b5574c368b76adf9010f2d2d_9366/Tee_Time_5-Panel_Hat_Black_HA9254_01_standard.jpg",
      shipping: 48,
      quantity: 0,
    },
    {
      _id: "f6a5e6c0-5aec-4f10-84d7-bde9b6199045",
      category: "Cap",
      name: "Baseball Cap",
      seller: "Addidas",
      price: 17,
      stock: 7,
      ratings: 5,
      ratingsCount: 37,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/0ce5f49aa0914deabf16adc600d09e60_9366/Baseball_Cap_Black_HD7039_01_standard.jpg",
      shipping: 48,
      quantity: 0,
    },
    {
      _id: "625b4b60-611c-490c-ac0a-f3c2d2afd05c",
      category: "Cap",
      name: "Relaxed Strap-Back Hat",
      seller: "Addidas",
      price: 24,
      stock: 9,
      ratings: 5,
      ratingsCount: 15,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/aaa5ae549c624178bc25a740012dd61f_9366/Relaxed_Strap-Back_Hat_White_BH7135_01_standard.jpg",
      shipping: 6,
      quantity: 0,
    },
    {
      _id: "5960bf40-9603-4a39-9ff6-6cf9f1ce4815",
      category: "Cap",
      name: "UNISEX ORIGINALS WASHED BUCKET",
      seller: "Addidas",
      price: 27,
      stock: 14,
      ratings: 4,
      ratingsCount: 3,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/e1e758585df14bbbb7d8aaf000c95bd7_9366/UNISEX_ORIGINALS_WASHED_BUCKET_White_CM3933_01_standard.jpg",
      shipping: 14,
      quantity: 0,
    },
    {
      _id: "5991add1-f4ba-4fb9-9b6b-ec59aa2dda60",
      category: "Cap",
      name: "SST Plus Strap-Back Hat",
      seller: "Addidas",
      price: 23,
      stock: 14,
      ratings: 4,
      ratingsCount: 32,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/92e77a8d84d845d19171ad50003f2ea1_9366/SST_Plus_Strap-Back_Hat_White_FZ8569_01_standard.jpg",
      shipping: 47,
      quantity: 0,
    },
    {
      _id: "5690e579-a943-4b42-9ffe-dfc65b71c560",
      category: "Cap",
      name: "Dispatch Trucker Hat",
      seller: "Addidas",
      price: 28,
      stock: 16,
      ratings: 4,
      ratingsCount: 30,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/c3981523051c4a978674ad3c01015664_9366/Dispatch_Trucker_Hat_Black_EY5534_01_standard.jpg",
      shipping: 14,
      quantity: 0,
    },
    {
      _id: "be7a4d0a-c681-416c-ab8d-f9be28223f4e",
      category: "Earphones",
      name: "adidas Z.N.E. 01 True Wireless Earbuds",
      seller: "Addidas",
      price: 142,
      stock: 11,
      ratings: 5,
      ratingsCount: 22,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/00276c6c380b41bcb29fadcc00f98312_9366/adidas_Z.N.E._01_True_Wireless_Earbuds_Grey_EY5116_42_detail.jpg",
      shipping: 23,
      quantity: 0,
    },
    {
      _id: "b278e667-ca17-465c-b603-af1af4319b7b",
      category: "Earphones",
      name: "adidas Z.N.E. 01 ANC True Wireless Earbuds",
      seller: "Addidas",
      price: 135,
      stock: 16,
      ratings: 5,
      ratingsCount: 51,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/b322cdef8e654551ace9adcc00f963ed_9366/adidas_Z.N.E._01_ANC_True_Wireless_Earbuds_Grey_EY5114_41_detail.jpg",
      shipping: 30,
      quantity: 0,
    },
    {
      _id: "1f56c0e5-4407-44bf-9225-90f592d2924a",
      category: "Earphones",
      name: "FWD-01 Sport In-Ear Headphones",
      seller: "Addidas",
      price: 185,
      stock: 8,
      ratings: 4,
      ratingsCount: 66,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/2cdb8652aa2340369ba2aa79010062d1_9366/FWD-01_Sport_In-Ear_Headphones_Black_CM5016_01_standard.jpg",
      shipping: 15,
      quantity: 0,
    },
    {
      _id: "4ead4708-68e8-4a93-b28e-5e99ccc4d75c",
      category: "Earphones",
      name: "adidas FWD-02 Sport True Wireless Earbuds",
      seller: "Addidas",
      price: 162,
      stock: 14,
      ratings: 4,
      ratingsCount: 6,
      thumbnail:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/523731a02e914d318cb4adcc00f985ba_9366/adidas_FWD-02_Sport_True_Wireless_Earbuds_Grey_EY5113_03_standard_hover.jpg",
      shipping: 29,
      quantity: 0,
    },
  ];

  return (
    <PrimaryContainer>
      <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold mb-4">
        What is trending now?
      </h1>
      <p className="text-left">
        <GreyText>Discover the most trending products in Ciseco.</GreyText>
      </p>
      <div className="mt-10">
        <div className="flex md:flex-row md:gap-y-0 gap-y-6 flex-col justify-between">
          <div className="tabs tabs-boxed bg-transparent">
            {tabs?.map((tab, index) => (
              <span
                key={index}
                className={`tab tab-lg ${
                  tab === tabState && "bg-black text-white rounded-3xl"
                }`}
                onClick={() => setTabState(tab)}
              >
                {tab}
              </span>
            ))}
          </div>
          <button
            className="btn btn-black text-white rounded-3xl capitalize flex gap-x-2"
            onClick={() => setShowFilter(!showFilter)}
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M16.07 16.52C17.8373 16.52 19.27 15.0873 19.27 13.32C19.27 11.5527 17.8373 10.12 16.07 10.12C14.3027 10.12 12.87 11.5527 12.87 13.32C12.87 15.0873 14.3027 16.52 16.07 16.52Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M19.87 17.12L18.87 16.12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Filter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="w-5 h-5 rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              ></path>
            </svg>
          </button>
        </div>
        <hr className="my-10" />
        <div className="flex flex-col gap-y-8">
          {showFilter && (
            <div className="flex justify-between items-center">
              <>
                <div className="flex gap-x-4 w-full overflow-auto">
                  {buttons?.map((button, index) => (
                    <button
                      key={index}
                      className="flex gap-x-2 items-center border px-4 py-2 rounded-3xl whitespace-nowrap"
                    >
                      {button.icon}
                      {button.title}
                      {arrow}
                    </button>
                  ))}
                </div>
                <button className="flex gap-x-2 items-center border px-4 py-2 rounded-3xl whitespace-nowrap">
                  <svg class="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M11.5166 5.70834L14.0499 8.24168"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M11.5166 14.2917V5.70834"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M8.48327 14.2917L5.94995 11.7583"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M8.48315 5.70834V14.2917"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  Sort order
                  {arrow}
                </button>
              </>
            </div>
          )}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </PrimaryContainer>
  );
};

export default Trending;
