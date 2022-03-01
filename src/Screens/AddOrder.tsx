import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDatabase from '../Hooks/useDatabase';
const AddOrder = () => {
  useEffect(() => {
    loadData({ whatToGet: 'clients' });
  }, []);
  const [client, setClient] = useState<string>();
  const [fechaEntrega, setFechaEntrega] = useState<string>();
  const { clients, loadData, addOrder } = useDatabase();

  let today = new Date().toISOString().slice(0, 10);

  const onChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setClient(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    console.log(client, fechaEntrega);
    if (!client || !fechaEntrega) {
      alert('Es necesario que llene la informacion solicitada');
    } else {
      const idClient = parseInt(client);
      addOrder(idClient, fechaEntrega);
    }
  };

  return (
    <div>
      <h1>Nueva Orden</h1>
      <span> Fecha: {today}</span>
      <form onSubmit={onSubmit}>
        <label htmlFor='Cliente'>Nombre del Cliente: </label>
        <select value={client} onChange={onChange} defaultValue=''>
          <option>Seleccione un cliente</option>
          {clients.map((client) => {
            return (
              <option key={client.idCliente} value={client.idCliente}>
                {client.nombre}
              </option>
            );
          })}
        </select>
        <Link to={'/addClient'}>
          <button>Agregar cliente</button>
        </Link>
        <br />
        <br />
        <br />

        <label htmlFor='fechaEntrega'>Fecha de Entrega</label>
        <input
          type='datetime-local'
          onChange={(e) => setFechaEntrega(e.currentTarget.value)}
        />
        <br />
        <br />
        <input type='submit' value={'Save'} />
        <Link to='/Orders'>
          <input type='button' value='Go Back' />
        </Link>
      </form>
    </div>
  );
};

export default AddOrder;
