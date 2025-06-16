import increase_arrow from "./increase_arrow.svg";
import decrease_arrow from "./decrease_arrow.svg";
import my_location_image from "./my_location_image.svg";

export const assets = {
  increase_arrow,
  decrease_arrow,
  my_location_image
};

export const addressDummyData = [
  {
    "_id": "67a1e4233f34a77b6dde9055",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "fullName": "GreatStack",
    "phoneNumber": "0123456789",
    "pincode": 654321,
    "area": "Main Road , 123 Street, G Block",
    "city": "City",
    "state": "State",
    "__v": 0
  }
]

const sampleProducts = [
  {
    id: 1,
    name: "Fresh Yam Tubers",
    description:
      "Premium Nigerian yam, perfect for boiling, frying, or pounding.",
    category: "Root Vegetable",
    rating: 4.7,
    quantity: 50,
    price: 4000,
    image:
      "https://media.istockphoto.com/id/638094208/photo/sweet-potato.jpg?b=1&s=612x612&w=0&k=20&c=s_WNbthr_Jz3Pfu4iS-M1mD023aCrcjjZrJ9f_mzfmk=",
    inStock: false,
    location: "Lagos, Nigeria",
    href: "/details"
  },
  {
    id: 2,
    name: "Organic Cassava",
    description: "Rich in starch, ideal for fufu, garri, and industrial uses.",
    category: "Root Crop",
    rating: 4.5,
    quantity: 100,
    price: 2000,
    image:
      "https://media.istockphoto.com/id/1150496082/photo/fresh-cassava-and-peels-and-slices-on-rustic-wooden-table-top-view.jpg?b=1&s=612x612&w=0&k=20&c=x-BUs7qJl23SRtwq9Nm-6CoW_4rOuV-NflOxwRFPIkw=",
    inStock: true,
    location: "Benue, Nigeria",
    href: "/details"
  },
  {
    id: 3,
    name: "Sweet Potatoes Jumbo",
    description: "Large-size, nutrient-rich sweet potatoes",
    category: "Potatoes",
    rating: 4.5,
    quantity: 100,
    price: 1000,
    image:
      "https://media.istockphoto.com/id/1087192472/photo/sweet-potato-isolated-on-white-background.jpg?b=1&s=612x612&w=0&k=20&c=T7ZXZ8WpJAEvtpzNswz3kUM3lujM-JRXdKpvseaTJQ8=",
    inStock: false,
    location: "Kano, Kano",
    href: "/"
  },
  {
    id: 4,
    name: "Organic Tomatoes",
    description: "Fresh, organic tomatoes perfect for salads and sauces.",
    category: "Vegetables",
    rating: 4.8,
    quantity: 200,
    price: 1500,
    image:
      "https://plus.unsplash.com/premium_photo-1723575768999-91d0a31e471f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fE9yZ2FuaWMlMjBUb21hdG9lc3xlbnwwfHwwfHx8MA%3D%3D=",
    inStock: true,
    location: "Kaduna, Kaduna",
    href: "/"
  },
  {
    id: 5,
    name: "Brown Rice",
    description: "High-quality brown rice, healthy and nutritious.",
    category: "Grains",
    rating: 4.6,
    quantity: 300,
    price: 25000,
    image:
      "https://media.istockphoto.com/id/1318409866/photo/plastic-sack-of-wholegrain-rice-with-blank-label.webp?a=1&b=1&s=612x612&w=0&k=20&c=gOjjFQGsx_zb1wRpP5sTDb9EC4Xns2NdAWhilN8SMy8=",
    inStock: true,
    location: "Ibadan, Oyo",
    href: "/"
  },
  {
    id: 6,
    name: "Fresh Tomatoes",
    description: "Organic farm-grown tomatoes",
    category: "Vegetables",
    rating: 4.6,
    quantity: 120,
    price: 10000,
    image: "https://images.unsplash.com/photo-1695690045524-534a4df1c525?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnJlc2glMjBUb21hdG9lcyUyMGluJTIwYmFnJTIwdHdvfGVufDB8fDB8fHww",
    inStock: true,
    location: "Ilorin, Kwara",
    href: "/"
  },
  {
    id: 7,
    name: "Sweet Bananas",
    description: "Locally harvested sweet bananas",
    category: "Fruits",
    rating: 4.9,
    quantity: 60,
    price: 6000,
    image: "https://media.istockphoto.com/id/1530835621/photo/bunch-of-bananas-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=o_k7VEaZyXZeA_i1Jec8H4q8tLmQAgm6WiSF7FJrgQY=",
    inStock: false,
    location: "Ibadan, Oyo",
    href: "/"
  },
  {
  id: 8,
  name: "Cassava Tubers",
  description: "Fresh cassava tubers ideal for garri or fufu",
  category: "Root Crops",
  rating: 4.6,
  quantity: 70,
  price: 15000,
  image: "https://images.unsplash.com/photo-1698266575347-a4ce9b995768?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENhc3NhdmElMjBUdWJlcnMlMjBpbiUyMGRvemVuJTIwa2d8ZW58MHx8MHx8fDA%3D",
  inStock: true,
  location: "Aba, Abia",
  href: "/"
},
{
  id: 9,
  name: "Sweet Oranges",
  description: "Juicy oranges packed with vitamin C",
  category: "Fruits",
  rating: 4.8,
  quantity: 90,
  price: 3000,
  image: "https://media.istockphoto.com/id/1385973859/photo/mandarin-oranges-in-plastic-mesh-sack.webp?a=1&b=1&s=612x612&w=0&k=20&c=qZMBdLoETdqNK0VJ2fVocPOCVcTN_ckCHW_Bpdsl_DA=",
  inStock: true,
  location: "Ilorin, Kwara",
  href: "/"
},
{
  id: 10,
  name: "Maize (Dry)",
  description: "Dry yellow maize for pap or animal feed",
  category: "Grains",
  rating: 4.5,
  quantity: 200,
  price: 7000,
  image: "https://media.istockphoto.com/id/173193087/photo/maize-in-burlap-sack.webp?a=1&b=1&s=612x612&w=0&k=20&c=kOck5rAxhWHFa9qzLb-_05on-jKFBmc7wLf5HGcsimI=",
  inStock: true,
  location: "Kano, Kano",
  href: "/"
},
{
  id: 11,
  name: "Cocoyam",
  description: "Locally grown cocoyam for porridge or soup",
  category: "Root Crops",
  rating: 4.3,
  quantity: 50,
  price: 6000,
  image: "https://media.istockphoto.com/id/1159066787/photo/yam-on-a-white-surface-with-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=c-EWY17I3x8QcNOraYRIp-oT-r01VDR0dtZMMrvNphA=",
  inStock: false,
  location: "Awka, Anambra",
  href: "/"
},
{
  id: 12,
  name: "Plantain",
  description: "Ripe plantains for frying and boiling",
  category: "Fruits",
  rating: 4.7,
  quantity: 60,
  price: 3500,
  image: "https://media.istockphoto.com/id/870044416/photo/bananas-agricultural-plantation.webp?a=1&b=1&s=612x612&w=0&k=20&c=CEWzZ4mSHGABV8MejcVEteNpoEYwekA1cQGfia8QYaI=",
  inStock: true,
  location: "Enugu, Enugu",
  href: "/"
},
{
  id: 13,
  name: "Ginger Root",
  description: "Organic ginger for spices or tea",
  category: "Root Vegetable",
  rating: 4.9,
  quantity: 40,
  price: 1900,
  image: "https://images.unsplash.com/photo-1573414405995-2012861b74e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2luZ2VyJTIwUm9vdCUyMGluJTIwZG96ZW58ZW58MHx8MHx8fDA%3D",
  inStock: true,
  location: "Kaduna, Kaduna",
  href: "/"
},
{
  id: 14,
  name: "Spinach Leaves",
  description: "Fresh green spinach bunches",
  category: "Vegetables",
  rating: 4.4,
  quantity: 100,
  price: 1000,
  image: "https://media.istockphoto.com/id/171210279/photo/spinach.webp?a=1&b=1&s=612x612&w=0&k=20&c=CPapRl6aSmgtU27CgsJe-8j02xS3I4AAXOqUOXFcNz4=",
  inStock: true,
  location: "Ibadan, Oyo",
  href: "/"
},
{
  id: 15,
  name: "Irish Potatoes",
  description: "Cleaned and bagged Irish potatoes",
  category: "Potatoes",
  rating: 4.8,
  quantity: 120,
  price: 1800,
  image: "https://media.istockphoto.com/id/1363735800/photo/potato-in-burlap-sack.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z17fYmLzRBzR48rvXcTZfXnPgmVVtkg6RDMXuvEODFg=",
  inStock: false,
  location: "Ibadan, Oyo",
  href: "/"
},
{
  id: 16,
  name: "Sorghum",
  description: "Clean, sun-dried sorghum grains",
  category: "Grains",
  rating: 4.4,
  quantity: 180,
  price: 1400,
  image: "https://media.istockphoto.com/id/2184567662/photo/sack-with-millet-groats-isolated-on-white-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=iazsJcOB-Cl8qnwoWvXlswlNVhHvMdGUzpGLOlGgb4s=",
  inStock: false,
  location: "Kano, Kano",
  href: "/"
},
{
  id: 17,
  name: "Sweet Potatoes",
  description: "Naturally sweet and nutritious",
  category: "Potatoes",
  rating: 4.6,
  quantity: 100,
  price: 1600,
  image: "https://media.istockphoto.com/id/952063002/photo/bunch-of-sweet-potatoes-in-a-wooden-crate-on-a-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=WUWFGiCxgRvI8NgK9SlW8TTS9_npNouwMLEQnpEX3II=",
  inStock: true,
  location: "Lagos, Nigeria",
  href: "/"
},

{
  id: 18,
  name: "Green Peppers",
  description: "Sweet and crunchy bell peppers",
  category: "Vegetables",
  rating: 4.7,
  quantity: 80,
  price: 2500,
  image: "https://media.istockphoto.com/id/1436677880/photo/top-view-of-green-peppers-in-a-wooden-box-on-a-green-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z3-2fnmOo6hX3O-APOZ-FCzP6GGqo4NAoQMVhqm14oo=",
  inStock: true,
  location: "Ilorin, Kwara",
  href: "/"
},
{
  id: 19,
  name: "Garlic Bulbs",
  description: "Fresh garlic with strong aroma",
  category: "Root Vegetable",
  rating: 4.6,
  quantity: 60,
  price: 750,
  image: "https://images.unsplash.com/photo-1707730580969-97b3a5bfe47a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2FybGljJTIwQnVsYnMlMjBpbiUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
  inStock: true,
  location: "Sokoto, Sokoto",
  href: "/"
},
{
  id: 20,
  name: "Watermelon",
  description: "Juicy watermelon, perfect for sunny days",
  category: "Fruits",
  rating: 4.8,
  quantity: 100,
  price: 700,
  image: "https://plus.unsplash.com/premium_photo-1724256227267-cfe917bc1d9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8V2F0ZXJtZWxvbiUyMGluJTIwc2Fja3xlbnwwfHwwfHx8MA%3D%3D",
  inStock: true,
  location: "Lagos, Nigeria",
  href: "/"
},
{
  id: 21,
  name: "Millet",
  description: "High-quality millet for porridge",
  category: "Grains",
  rating: 4.6,
  quantity: 160,
  price: 1200,
  image: "https://media.istockphoto.com/id/2214618751/photo/a-bag-of-millet-in-market.webp?a=1&b=1&s=612x612&w=0&k=20&c=pjpUn4IVns4qnKqOq6aIUIZECzU9l9zeZSk6Kz6ZOhI=",
  inStock: false,
  location: "Ilorin, Kwara",
  href: "/"
},
];

export default sampleProducts;