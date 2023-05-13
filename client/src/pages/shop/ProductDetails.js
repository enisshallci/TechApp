import { Nav } from "../nav/Nav";
import "./ProductDetails.css";
export const ProductDetails = ({ product }) => {
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
      <div className="container grid-parent">
        <div>
          <img src={product.img} />
        </div>

        <div>
          <h2>{product.item}</h2>
          <p>
            <span>Products left:</span> {product.amount}
          </p>
          <p>
            <span>Color:</span> {product.color}
          </p>
          <p>
            <span>Category:</span> {product.category}
          </p>
          <p>
            <span>Price:</span> €{product.price}
          </p>
        </div>
      </div>
    </div>
  );
};
