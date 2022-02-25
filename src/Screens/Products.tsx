import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDatabase from '../Hooks/useDatabase';

const Products = () => {
  useEffect(() => {
    loadData({ whatToGet: 'products' });
  }, []);

  const { products, deleteProduct, loadData } = useDatabase();
  return (
    <div>
      <h1>Productos</h1>
      <Link to={'/addProduct'}>
        <button>Agregar Producto</button>
      </Link>

      <div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>IdProducto</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>SKU</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={product.idProducto}>
                  <th scope='row'>{index + 1}</th>
                  <td>{product.idProducto}</td>
                  <td>{product.nombre}</td>
                  <td>{product.descripcion}</td>
                  <td>{product.SKU}</td>
                  <td>
                    <Link to={`/updateProduct/${product.idProducto}`}>
                      <button>Editar</button>
                    </Link>
                    <button onClick={() => deleteProduct(product.idProducto)}>
                      Eliminar
                    </button>
                    <Link to={`/viewProduct/${product.idProducto}`}>
                      <button>Ver</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link to='/'>Return Home</Link>
    </div>
  );
};

export default Products;
