// popular
import p1_img from './product_1.png'
import p2_img from './product_2.png'
import p3_img from './product_3.png'
import p4_img from './product_4.png'

// latest 
import p5_img from "./product_12.png";
import p6_img from "./product_35.png";
import p7_img from "./product_14.png";
import p8_img from "./product_8.png";
import p9_img from "./product_15.png";
import p10_img from "./product_2.png";
import p11_img from "./product_17.png";
import p12_img from "./product_28.png";

// Footer
import facebook from './facebook.svg'
import instagram from './instagram.svg'
import twitter from './twitter.svg'
import youtube from './youtube.svg'
import linkedin from './linkedin.svg'


export const POPULAR = [
  {
    id:1,
    name:"Green Puffer Jacket and Sweats",
    image:p1_img,
    new_price:5000,
    old_price:8500,
  },
  {id:2,
    name:"Black T-Shirt",
    image:p2_img,
    new_price:8500,
    old_price:12500,
  },
  {id:3,
    name:"Pink Sweater and Camouflage Jacket",
    image:p3_img,
    new_price:6000,
    old_price:9500,
  },
  {id:4,
    name:"White T-Shirt and Black Jacket",
    image:p4_img,
    new_price:10000,
    old_price:15000,
  },
];


export const LATEST = [
  {
    id: 5,
    name: "Black plush faux fur jacket",
    image: p5_img,
    new_price: 5000,
    old_price: 8500,
  },
  {
    id: 6,
    name: "Boys Light blue Colourblocked Lemon Hooded Sweatshirt",
    image: p6_img,
    new_price: 8500,
    old_price: 12500,
  },
  {
    id: 7,
    name: "Men Red Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    image: p7_img,
    new_price: 6000,
    old_price: 10500,
  },
  {
    id: 8,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: p8_img,
    new_price: 10000,
    old_price: 15000,
  },
  {
    id: 9,
    name: "Men Green Solid Medium Fit suit",
    image: p9_img,
    new_price: 5000,
    old_price: 8500,
  },
  {
    id: 10,
    name: "Black T-Shirt",
    image: p10_img,
    new_price: 8500,
    old_price: 12500,
  },
  {
    id: 11,
    name: "Men Blue Solid Slim Fit suit",
    image: p11_img,
    new_price: 6000,
    old_price: 10500,
  },
  {
    id: 12,
    name: "Boys Green Sweatshirt",
    image: p12_img,
    new_price: 10000,
    old_price: 15000,
  },
];

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: "Learn More",
    links: [
      "About Us",
      "Categories",
      "Exchange Policy",
      "Order Now",
      "FAQ",
      "Privacy Policy",
    ],
  },
  {
    title: "Our Community",
    links: [
      "Terms and Conditions",
      "Special Offers",
      "Customer Reviews",
    ],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: "Contact Us",
  links: [
    { label: "Contact Number", value: "+234-807-749-7411" },
    { label: "Email Address", value: "mervez2006@gmail.com" },
  ],
};

export const SOCIALS = {
  title: "Social",
  links: [
    facebook,
    instagram,
    twitter,
    youtube,
    linkedin,
  ],
};

