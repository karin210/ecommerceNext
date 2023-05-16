import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "John",
      email: "admin@mail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Any",
      email: "any@mail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Shirt",
      slug: "nike-shirt",
      category: "Shirts",
      image: "https://m.media-amazon.com/images/I/81oVxB1EC3S._AC_SL1500_.jpg",
      price: 70,
      brand: "Nike",
      rating: 4.5,
      numReviews: 8,
      countInStock: 22,
      description: "A popular shirt",
    },
    {
      name: "Adidas Shirt",
      slug: "adidas-shirt",
      category: "Shirts",
      image:
        "https://img01.ztat.net/article/spp-media-p1/3f16fe2bdaf6332da051b33682350392/516f35971a014d0da5d7c820d474c2b5.jpg?imwidth=1800&filter=packshot",
      price: 60,
      brand: "Adidas",
      rating: 5,
      numReviews: 10,
      countInStock: 31,
      description: "A popular shirt",
    },
    {
      name: "Boss Shirt",
      slug: "boss-shirt",
      category: "Shirts",
      image:
        "https://images.hugoboss.com/is/image/boss/hbeu50448702_100_100?$social_sharing$",
      price: 80,
      brand: "Hugo Boss",
      rating: 4.3,
      numReviews: 3,
      countInStock: 18,
      description: "A popular shirt",
    },
    {
      name: "Levi's 501 Slim Fit",
      slug: "levi's-501-slim-fit",
      category: "Pants",
      image: "https://www.coppel.com/images/catalog/pr/1172082-1.jpg",
      price: 30,
      brand: "Levi's",
      rating: 5,
      numReviews: 20,
      countInStock: 30,
      description: "A popular Jeans",
    },
    {
      name: "Lee Cotton Jeans",
      slug: "lee-cotton-jeans",
      category: "Pants",
      image:
        "https://www.leejeans.com.mx/1111-large_default/jeans-lee-hombre-regular-fit-w44.jpg",
      price: 21,
      brand: "Lee",
      rating: 3,
      numReviews: 12,
      countInStock: 7,
      description: "A popular cotton Jeans",
    },
    {
      name: "Pull Bear Neutral Cargo Trousers",
      slug: "pull-bear-Neutral-Cargo-Trousers",
      category: "Pants",
      image:
        "https://images.asos-media.com/products/pullbear-slim-fit-basic-chinos-in-black/202320169-1-black?$n_640w$&wid=513&fit=constrain",
      price: 20,
      brand: "Pull&Bear",
      rating: 4,
      numReviews: 20,
      countInStock: 17,
      description: "A popular Chino Trousers",
    },
  ],
};

export default data;
