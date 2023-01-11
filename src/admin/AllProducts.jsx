import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { db } from "../firebase.config"
import { doc, deleteDoc } from "firebase/firestore"

// import useGetData from "../custom-hooks/useGetData";
import {toast} from "react-toastify"
import axios from "axios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApi = async() => {
      const res = await axios.get("https://json-products-5pbv94v77-vanhoa2k2.vercel.app/v1/product")
      setProducts(res.data)
      setLoading(false)
    }
    fetchApi()
  },[])
  // const { data: productsData, loading } = useGetData("products");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db,'products', id))
    toast.success('Deleted!')
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h4 className="py-5 text-center fw-bold">Loading.......</h4>
                ) : (
                  products.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>
                        <button onClick={() => {deleteProduct(item.id)}} className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
