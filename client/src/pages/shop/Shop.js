import { Nav } from "../nav/Nav";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import "./Shop.css";
import { Footer } from "../footer/Footer";
import { ProductDetails } from "./ProductDetails";

const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";

export const Shop = () => {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCT);

  const itemsPrice = cart.reduce((a, c) => a + c.price, 0);
  const shippingPrice = itemsPrice > 100 ? 20 : 0;
  const totalPrice = itemsPrice + shippingPrice;
  const [products] = useState([
    {
      id: 1,
      item: "Apple iPhone 13",
      price: 999.0,
      img: "https://www.dslr-zone.com/wp-content/uploads/2021/10/1-2.jpeg",
      amount: 1,
      color: "white",
      category: "smartphones",
      rating: 5,
    },
    {
      id: 2,
      item: "Samsung Galaxy S21",
      price: 799.0,
      img: "https://i5.walmartimages.com/asr/4014d1d5-2430-46cf-a2b6-526ebf2ff569.7fff876a828d1392c131ee20a014544b.jpeg",
      amount: 1,
      color: "black",
      category: "smartphones",
      rating: 4,
    },
    {
      id: 3,
      item: "Apple MacBook Pro 16-inch",
      price: 2399.0,
      img: "https://www.dateks.lv/images/pic/1200/1200/430/596.jpg",
      amount: 1,
      color: "silver",
      category: "laptops",
      rating: 5,
    },
    {
      id: 4,
      item: "Dell XPS 13 White",
      price: 1299.99,
      img: "https://www.windowscentral.com/sites/wpcentral.com/files/styles/large/public/field/image/2019/10/dell_xps_13_2-in-1-7390-review-hero2.jpg",
      amount: 1,
      color: "white",
      category: "laptops",
      rating: 4,
    },
    {
      id: 5,
      item: "Sony PlayStation 5",
      price: 499.99,
      color: "black",
      img: "https://images-na.ssl-images-amazon.com/images/I/619BkvKW35L._SL1500_.jpg",
      amount: 1,
      category: "gaming consoles",
      rating: 5,
    },
    {
      id: 6,
      item: "Nintendo Switch",
      price: 299.99,
      color: "red",
      img: "https://images-na.ssl-images-amazon.com/images/I/61JnrafZ7zL._AC_SL1457_.jpg",
      amount: 1,
      category: "gaming consoles",
      rating: 4,
    },
    {
      id: 7,
      item: "Apple iPhone 13",
      price: 999.0,
      img: "https://www.dslr-zone.com/wp-content/uploads/2021/10/4-1-768x768.jpeg",
      amount: 1,
      color: "red",
      category: "smartphones",
      rating: 5,
    },
    {
      id: 4,
      item: "Dell XPS 13 Black",
      price: 1299.99,
      img: "https://zshop.vn/images/companies/1/Z-(3).jpg?1581906757101",
      amount: 1,
      color: "black",
      category: "laptops",
      rating: 4,
    },
  ]);
  const addToCart = (products) => {
    setCart([...cart, { ...products }]);
  };

  const colors = ["red", "blue", "white", "silver", "black"];
  const categories = ["gaming consoles", "laptops", "smartphones"];

  const [sortType, setSortType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedColor && product.color !== selectedColor) return false;
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedRating && product.rating !== selectedRating) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let sortValue = 0;
    if (sortType === "lowToHigh") {
      sortValue = a.price - b.price;
    } else if (sortType === "highToLow") {
      sortValue = b.price - a.price;
    } else if (sortType === "aToZ") {
      sortValue = a.item.localeCompare(b.item);
    } else if (sortType === "zToA") {
      sortValue = b.item.localeCompare(a.item);
    }
    return sortValue;
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };
  if (selectedProduct) {
    return <ProductDetails product={selectedProduct} />;
  }
  const renderProducts = () => (
    <div className="Shop">
      <h1 className="title">Products</h1>
      <div className="sorting">
        <div>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Price/Name</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="aToZ">Name: A to Z</option>
            <option value="zToA">Name: Z to A</option>
          </select>
        </div>
        <div>
          <select
            value={selectedColor}
            onChange={(e) => handleColorSelection(e.target.value)}
          >
            <option value="">Color</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategorySelection(e.target.value)}
          >
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          {/* <label>Rating:</label> */}
          <div className="stars">
            <div>
              <input
                type="radio"
                id="rating-1"
                name="rating"
                value="1"
                onChange={(e) => setSelectedRating(Number(e.target.value))}
              />
              <label htmlFor="rating-1">
                <AiFillStar style={{ color: "#eeb441" }} />
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="rating-2"
                name="rating"
                value="2"
                onChange={(e) => setSelectedRating(Number(e.target.value))}
              />
              <label htmlFor="rating-2">
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="rating-3"
                name="rating"
                value="3"
                onChange={(e) => setSelectedRating(Number(e.target.value))}
              />
              <label htmlFor="rating-3">
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="rating-4"
                name="rating"
                value="4"
                onChange={(e) => setSelectedRating(Number(e.target.value))}
              />
              <label htmlFor="rating-4">
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="rating-5"
                name="rating"
                value="5"
                onChange={(e) => setSelectedRating(Number(e.target.value))}
              />
              <label htmlFor="rating-5">
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="rating-6"
                name="rating"
                value="6"
                onChange={(e) => setSelectedRating(Number(e.target.value))}
              />
              <label htmlFor="rating-6">
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
                <AiFillStar style={{ color: "#eeb441" }} />
              </label>
            </div>
          </div>
        </div>
      </div>

      <header>
        <button className="buttons1" onClick={() => navigateTo(PAGE_CART)}>
          Go to Cart({cart.length})
        </button>
        <button className="buttons1" onClick={() => navigateTo(PAGE_PRODUCT)}>
          View Products
        </button>
      </header>

      <div className="products">
        {sortedProducts.map((product) => (
          <div className="product" onClick={() => handleClick(product)}>
            <div>
              <h3 className="texth3">{product.item}</h3>
              <h4 className="texth4">&euro;{product.price.toFixed(2)}</h4>
            </div>
            <img src={product.img} alt={product.item}></img>
            <button className="buttons" onClick={() => addToCart(product)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const renderCart = () => (
    <div className="Shop">
      <h1 className="title">Cart</h1>
      <header>
        <button className="buttons1" onClick={() => navigateTo(PAGE_CART)}>
          Go to Cart({cart.length})
        </button>
        <button className="buttons1" onClick={() => navigateTo(PAGE_PRODUCT)}>
          View Products
        </button>
      </header>

      <div className="products">
        {cart.map((product, idx) => (
          <div className="product" key={idx}>
            <div>
              <h3 className="texth3">{product.item}</h3>
              <h4 className="texth4">&euro;{product.price.toFixed(2)}</h4>
            </div>
            <img src={product.img} alt={product.item}></img>
            <button
              className="buttonsC"
              onClick={() => removeFromCart(product)}
            >
              Remove from cart
            </button>
          </div>
        ))}
      </div>
      <div className="total">
        {cart.length !== 0 && (
          <>
            <div className="totalRows">
              <h1>Items Price</h1>
              <h1>&euro;{itemsPrice.toFixed(2)}</h1>
            </div>
            <div className="totalRows">
              <h1>Shipping Price </h1>
              <h1>&euro;{shippingPrice.toFixed(2)}</h1>
            </div>
            <hr></hr>
            <div className="totalRows" id="tr">
              <h1>Total Price </h1>
              <h1>&euro;{totalPrice.toFixed(2)}</h1>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="buttoniBuy"
            >
              Buy
            </button>
          </>
        )}
        {cart.length == 0 && (
          <div className="zeroCart">There are no items in your cart</div>
        )}
      </div>
    </div>
  );

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };
  return (
    <div>
      <Nav></Nav>
      <div
        style={{
          width: "100%",
          height: "15vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#285c7c",
        }}
      ></div>
      <div className="Cart" id="cart">
        {page === PAGE_PRODUCT && renderProducts()}
        {page === PAGE_CART && renderCart()}
      </div>
      <Footer></Footer>
    </div>
  );
};
