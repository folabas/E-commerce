// data/products.js
const products = [
    {
      id: 1,
      name: 'Flannel Shirt',
      brand: 'Adidas',
      price: 34.96,
      rating: 4.8,
      stock: 5,
      image: require('../images/flannel.jpg'),
      colors: ['red', 'blue', 'green'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'This flannel shirt is made from high-quality materials to provide comfort and style.',
      reviews: [
        {
          author: 'John Doe',
          text: 'Great shirt! Very comfortable and stylish.',
          rating: 5,
        },
        {
          author: 'Jane Smith',
          text: 'Good quality but a bit too large.',
          rating: 4,
        },
      ],
    },
    {
      id: 2,
      name: 'Henley Shirt',
      brand: 'Reebok',
      price: 34.96,
      rating: 3.7,
      stock: 5,
      image: require('../images/henley.jpg'),
      colors: ['red', 'blue', 'green'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'This henley shirt is perfect for casual outings and provides a relaxed fit.',
      reviews: [
        {
          author: 'Alice Johnson',
          text: 'Nice shirt, but the color faded after washing.',
          rating: 3,
        },
        {
          author: 'Bob Brown',
          text: 'Perfect fit and very comfortable.',
          rating: 4,
        },
      ],
    },
    // Add more products as needed
  ];
  
  export default products;
  