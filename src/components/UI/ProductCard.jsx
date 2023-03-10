import React from "react";

import { motion } from "framer-motion";
import "../../styles/productCard.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { favoriteActions } from "../../redux/slices/favoriteSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
   
  function addToCart() {
    dispatch(
      cartActions.addItem({
        id: item._id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
        quantity: 1,
      })
    );
    toast.success("Product added to the cart");
  }

  const addToFavorite = () => {
    dispatch(
      favoriteActions.addFavoriteItem({
        id: item._id,
        productName: item.productName,
        category: item.category,
        imgUrl: item.imgUrl,
        price: item.price,
      })
    );

    toast.success("Product added to the favorite");
  };

  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <Link to={`/shop/${item._id}`}>
            <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt=""/>
          </Link>
        </div>
        <div className="p-1 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item._id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">$ {item.price}</span>

          <div className="product__iconWrap">
            <motion.span
              whileTap={{ scale: 1.2 }}
              className="product__favorite"
              onClick={addToFavorite}
            >
              <i className="ri-heart-line"></i>
            </motion.span>
            <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
              <i className="ri-add-line"></i>
            </motion.span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
