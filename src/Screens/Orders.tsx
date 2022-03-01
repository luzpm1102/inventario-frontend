import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDatabase from '../Hooks/useDatabase';

const Orders = () => {
  useEffect(() => {
    loadData({ whatToGet: 'order' });
  }, []);

  const { loadData, orders, deleteOrder } = useDatabase();

  return (
    <div>
      <h1>Orders</h1>
      <Link to={'/addOrder'}>
        <button>Agregar Orden</button>
      </Link>
      <div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={order.idOrden}>
                  <th scope='row'>{index + 1}</th>
                  <td>{order.fecha}</td>
                  <td>{order.cliente}</td>
                  <td>{order.total}</td>
                  <td>
                    <Link to={`/updateOrder/${order.idOrden}`}>
                      <button>Editar</button>
                    </Link>
                    <button onClick={() => deleteOrder(order.idOrden)}>
                      Eliminar
                    </button>
                    <Link to={`/viewOrder/${order.idOrden}`}>
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

export default Orders;
