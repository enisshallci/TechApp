import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../style/ProductDetailsStyles.css";
import toast from "react-hot-toast";
import ReviewForm from "./ReviewForm.js";
import ProductReviews from "./Admin/ProductReviews";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //inital details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const [reviewCount, setReviewCount] = useState(0);
  console.log(product._id);

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axios.get(
          `/api/v1/products/review/${product._id}/count`
        );
        const { success, count } = response.data;

        if (success) {
          setReviewCount(count);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCount();
  }, [product._id]);
  

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(rating);
    console.log(comment);
    console.log(product._id);
    setId(product._id);
    try {
      const { data } = await axios.post("/api/v1/products/review", {
        rating,
        comment,
        id: product._id,
      });

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/products/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <div className="ratings mt-auto">
          <ProductReviews productId={product._id}></ProductReviews>
            <span> ({reviewCount} reviews)</span>
          </div>
          <button
            style={{ "margin-bottom": "20px", background: "#fdcc0d" }}
            className="btn btn-secondary ms-1"
            onClick={() => {
              setShow(!show);
            }}
          >
            Give a Review
          </button>
          {show && <ReviewForm productId={product._id} />}
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/products/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
