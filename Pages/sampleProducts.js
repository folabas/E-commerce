const sampleProducts = [
  {
    id: 1,
    name: "Flannel Shirt",
    brand: "NFD",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/nfd3.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This flannel shirt is made from high-quality materials to provide comfort and style.",
    reviews: [
      {
        author: "John Doe",
        text: "Great shirt! Very comfortable and stylish.",
        rating: 5,
      },
      {
        author: "Jane Smith",
        text: "Good quality but a bit too large.",
        rating: 4,
      },
    ],
    category: "T-SHIRTS"
  },
  {
    id: 2,
    name: "Henley Shirt",
    brand: "RAPTOR",
    price: 34.96,
    rating: 3.7,
    stock: 5,
    image: require("../images/henley.jpg"),
    colors: ["red", "blue", "green"], // Example colors
    sizes: ["S", "M", "L", "XL"],
    description:
      "This henley shirt is perfect for casual outings and provides a relaxed fit.",
    reviews: [
      {
        author: "Alice Johnson",
        text: "Nice shirt, but the color faded after washing.",
        rating: 3,
      },
      {
        author: "Bob Brown",
        text: "Perfect fit and very comfortable.",
        rating: 4,
      },
    ],
    category: "T-SHIRTS"
  },
  {
    id: 3,
    name: "Flannel Shirt",
    brand: "FBA",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/flannel.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This flannel shirt is made from high-quality materials to provide comfort and style.",
    reviews: [
      {
        author: "John Doe",
        text: "Great shirt! Very comfortable and stylish.",
        rating: 5,
      },
      {
        author: "Jane Smith",
        text: "Good quality but a bit too large.",
        rating: 4,
      },
    ],
    category: "T-SHIRTS"
  },
  {
    id: 4,
    name: "Henley Shirt",
    brand: "COMPLEX",
    price: 34.96,
    rating: 3.7,
    stock: 5,
    image: require("../images/henley.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This henley shirt is perfect for casual outings and provides a relaxed fit.",
    reviews: [
      {
        author: "Alice Johnson",
        text: "Nice shirt, but the color faded after washing.",
        rating: 3,
      },
      {
        author: "Bob Brown",
        text: "Perfect fit and very comfortable.",
        rating: 4,
      },
    ],
    category: "T-SHIRTS"
  },
  {
    id: 5,
    name: "Flannel Shirt",
    brand: "NFD",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/nfd3.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This flannel shirt is made from high-quality materials to provide comfort and style.",
    reviews: [
      {
        author: "John Doe",
        text: "Great shirt! Very comfortable and stylish.",
        rating: 5,
      },
      {
        author: "Jane Smith",
        text: "Good quality but a bit too large.",
        rating: 4,
      },
    ],
    category: "HOODIES"
  },
  {
    id: 6,
    name: "Henley Shirt",
    brand: "FBA",
    price: 34.96,
    rating: 3.7,
    stock: 5,
    image: require("../images/henley.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This henley shirt is perfect for casual outings and provides a relaxed fit.",
    reviews: [
      {
        author: "Alice Johnson",
        text: "Nice shirt, but the color faded after washing.",
        rating: 3,
      },
      {
        author: "Bob Brown",
        text: "Perfect fit and very comfortable.",
        rating: 4,
      },
    ],
    category: "HOODIES"
  },
  {
    id: 7,
    name: "Flannel Shirt",
    brand: "RAPTOR",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/flannel.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This flannel shirt is made from high-quality materials to provide comfort and style.",
    reviews: [
      {
        author: "John Doe",
        text: "Great shirt! Very comfortable and stylish.",
        rating: 5,
      },
      {
        author: "Jane Smith",
        text: "Good quality but a bit too large.",
        rating: 4,
      },
    ],
    category: "HOODIES"
  },
  {
    id: 8,
    name: "Henley Shirt",
    brand: "COMPLEX",
    price: 34.96,
    rating: 3.7,
    stock: 5,
    image: require("../images/henley.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This henley shirt is perfect for casual outings and provides a relaxed fit.",
    reviews: [
      {
        author: "Alice Johnson",
        text: "Nice shirt, but the color faded after washing.",
        rating: 3,
      },
      {
        author: "Bob Brown",
        text: "Perfect fit and very comfortable.",
        rating: 4,
      },
    ],
    category: "HOODIES"
  },
  {
    id: 9,
    name: "Flannel Shirt",
    brand: "NFD",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/nfd3.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This flannel shirt is made from high-quality materials to provide comfort and style.",
    reviews: [
      {
        author: "John Doe",
        text: "Great shirt! Very comfortable and stylish.",
        rating: 5,
      },
      {
        author: "Jane Smith",
        text: "Good quality but a bit too large.",
        rating: 4,
      },
    ],
    category: "SHORTS"
  },
  {
    id: 10,
    name: "Henley Shirt",
    brand: "FBA",
    price: 34.96,
    rating: 3.7,
    stock: 5,
    image: require("../images/henley.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This henley shirt is perfect for casual outings and provides a relaxed fit.",
    reviews: [
      {
        author: "Alice Johnson",
        text: "Nice shirt, but the color faded after washing.",
        rating: 3,
      },
      {
        author: "Bob Brown",
        text: "Perfect fit and very comfortable.",
        rating: 4,
      },
    ],
    category: "SHORTS"
  },
  {
    id: 11,
    name: "Flannel Shirt",
    brand: "RAPTOR",
    price: 34.96,
    rating: 4.8,
    stock: 5,
    image: require("../images/flannel.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This flannel shirt is made from high-quality materials to provide comfort and style.",
    reviews: [
      {
        author: "John Doe",
        text: "Great shirt! Very comfortable and stylish.",
        rating: 5,
      },
      {
        author: "Jane Smith",
        text: "Good quality but a bit too large.",
        rating: 4,
      },
    ],
    category: "SHORTS"
  },
  {
    id: 12,
    name: "Henley Shirt",
    brand: "COMPLEX",
    price: 34.96,
    rating: 3.7,
    stock: 5,
    image: require("../images/henley.jpg"),
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This henley shirt is perfect for casual outings and provides a relaxed fit.",
    reviews: [
      {
        author: "Alice Johnson",
        text: "Nice shirt, but the color faded after washing.",
        rating: 3,
      },
      {
        author: "Bob Brown",
        text: "Perfect fit and very comfortable.",
        rating: 4,
      },
    ],
    category: "SHORTS"
  },
];

export default sampleProducts;
