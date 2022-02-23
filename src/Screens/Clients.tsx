import React from 'react';
import { Link } from 'react-router-dom';
import useDatabase from '../Hooks/useDatabase';

const Clients = () => {
  const { clients, deleteClient } = useDatabase();

  return (
    <div>
      <h1>Clientes</h1>
      {/* <h2>{JSON.stringify(clients, null, 10)}</h2> */}
      <Link to={'/addClient'}>
        <button>Agregar cliente</button>
      </Link>

      <div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>IdCliente</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => {
              return (
                <tr key={client.idCliente}>
                  <th scope='row'>{index + 1}</th>
                  <td>{client.idCliente}</td>
                  <td>{client.nombre}</td>
                  <td>{client.direccion}</td>
                  <td>{client.telefono}</td>
                  <td>
                    <Link to={`/updateClient/${client.idCliente}`}>
                      <button>Editar</button>
                    </Link>
                    <button onClick={() => deleteClient(client.idCliente)}>
                      Eliminar
                    </button>
                    <Link to={`/viewClient/${client.idCliente}`}>
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

export default Clients;
