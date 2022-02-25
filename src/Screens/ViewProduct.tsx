import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../API/axios';
import { Product } from '../Interfaces/Product';

const ViewProduct = () => {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/products/${id}`).then((res) => {
        setProduct({ ...res.data[0] });
      });
    }
  }, [id]);
  return (
    <div>
      <h2>Producto</h2>
      {product ? (
        <div>
          <strong>ID: </strong>
          <span>{product.idProducto}</span>
          <br />
          <br />
          <strong>Nombre: </strong>
          <span>{product.nombre}</span>
          <br />
          <br />
          <strong>Descripcion: </strong>
          <span>{product.descripcion}</span>
          <br />
          <br />
          <strong>SKU: </strong>
          <span>{product.SKU}</span>
          <br />
          <br />
        </div>
      ) : (
        <h1>No product to show</h1>
      )}

      <Link to='/Products'>
        <input type='button' value='Go Back' />
      </Link>
    </div>
  );
};

export default ViewProduct;
