import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import '../styles/dashboard.css'

import useGetData from "../custom-hooks/useGetData";
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchApi = async() => {
      const res = await axios.get("https://json-products-5pbv94v77-vanhoa2k2.vercel.app/v1/product")
      setProducts(res.data)
    }
    fetchApi()
  },[])
  // const {data: products} = useGetData('products');
  const {data: users} = useGetData('users');

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col className='lg-3'>
              <div className='revenue__box'>
                <h5>Total Sales</h5>
                <span>$7890</span>
              </div>
            </Col>
            <Col className='lg-3'>
                <div className='order__box'>
                  <h5>Orders</h5>
                  <span>789</span>
                </div>
            </Col>
            <Col className='lg-3'>
            <div className='products__box'>
                  <h5>Products</h5>
                  <span>{products.length}</span>
                </div>
            </Col>
            <Col className='lg-3'>
            <div className='users__box'>
                  <h5>Total Users</h5>
                  <span>{users.length}</span>
                </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Dashboard