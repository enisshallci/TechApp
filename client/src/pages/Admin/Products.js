import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import "../../style/products.css";
import { Link } from "react-router-dom";
import ProductReviews from "./ProductReviews";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="products-list">All products</h1>
          <div className="products">
            {products?.map((product) => (
              <Link key={product._id} to={`/dashboard/admin/products/${product.slug}`} className="text-dark single-product" >
                <div className="product" key={product._id}>
                  <img
                    src={`/api/v1/products/product-photo/${product._id}`}
                    alt={product.name}
                  ></img>
                   <div className="product__info">
                    <h3 className="texth3">{product.name}</h3>
                    <p className="texth4">{product.description}</p>
                    Ratings: <ProductReviews productId={product._id}></ProductReviews>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;