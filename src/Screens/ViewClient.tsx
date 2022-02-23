import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../API/axios';
import { Client } from '../Interfaces/Client';

const ViewClient = () => {
  const [client, setClient] = useState<Client>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/clients/${id}`).then((res) => {
        setClient({ ...res.data[0] });
      });
    }
  }, [id]);
  return (
    <div>
      <h2>client</h2>
      <div>
        <strong>ID: </strong>
        <span>{client?.idCliente}</span>
        <br />
        <br />
        <strong>Nombre: </strong>
        <span>{client?.nombre}</span>
        <br />
        <br />
        <strong>Direccion: </strong>
        <span>{client?.direccion}</span>
        <br />
        <br />
        <strong>Telefono: </strong>
        <span>{client?.telefono}</span>
        <br />
        <br />
      </div>
      <Link to='/Clients'>
        <input type='button' value='Go Back' />
      </Link>
    </div>
  );
};

export default ViewClient;
