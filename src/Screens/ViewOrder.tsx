import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useDatabase from '../Hooks/useDatabase';
import { OrderDetails, ClientOrder } from '../Interfaces/Order';
import api from '../API/axios';
import ProductModal from '../Components/ProductModal';

const ViewOrder = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
  const [clientOrder, setClientOrder] = useState<ClientOrder[]>([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      const { data } = await api.get(`/productoOrden/orderDetails/${id}`);
      setOrderDetails(data);
    };
    const loadData2 = async () => {
      const { data } = await api.get(`/order/orderClientInfo/${id}`);
      if (data) {
        setClientOrder(data);
      }
    };
    loadData();
    loadData2();
  }, [orderDetails]);

  const { id } = useParams();
  const idOrden = Number(id);

  const { deleteProductOrder } = useDatabase();

  return (
    <div>
      <h1>Orden # {id}</h1>
      <div>
        <h3>Informacion del Cliente</h3>
        {clientOrder ? (
          <div>
            <span>
              <strong>Nombre: </strong>
              {clientOrder[0]?.nombre}
            </span>
            <br />
            <span>
              <strong>Direccion: </strong>
              {clientOrder[0]?.direccion}
            </span>
            <br />
            <span>
              <strong>Telefono: </strong>
              {clientOrder[0]?.telefono}
            </span>
            <br />
            <Link to={`/updateClient/${clientOrder[0]?.idCliente}`}>
              <button>Editar</button>
            </Link>
            <br />
            <h3>Total de orden: {<span>{clientOrder[0]?.total}</span>}</h3>
          </div>
        ) : (
          <h4>no hay informacion</h4>
        )}
      </div>
      <div>
        <h1>Productos</h1>

        <button onClick={() => setVisible(true)}>Agregar Producto</button>

        <div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>cantidad</th>
                <th>Precio Unitario</th>
                <th>total</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((order, index) => {
                return (
                  <tr key={order.idProductoOrden}>
                    <th scope='row'>{index + 1}</th>

                    <td>{order.Producto}</td>
                    <td>{order.descripcion}</td>
                    <td>{order.cantidad}</td>
                    <td>{order.precioUnitario}</td>
                    <td>{order.precioTotal}</td>
                    <td>
                      <Link
                        to={`/updateProductoOrden/${order.idProductoOrden}`}
                      >
                        <button>Editar</button>
                      </Link>
                      <button
                        onClick={() =>
                          deleteProductOrder(order.idProductoOrden)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {visible && <ProductModal idOrden={idOrden} setVisible={setVisible} />}

        <Link to='/Orders'>Return Home</Link>
      </div>
    </div>
  );
};

export default ViewOrder;
