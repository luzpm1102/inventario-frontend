import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API/axios';
import { Client, AddClient } from '../Interfaces/Client';

interface URL {
  whatToGet: 'clients' | 'products';
}

const useDatabase = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const loadData = async ({ whatToGet }: URL) => {
    const { data } = await api.get(`/${whatToGet}`);
    if (data) {
      switch (whatToGet) {
        case 'clients':
          setClients(data);
          break;

        default:
          setData(data);
          break;
      }
    } else {
      console.log('No se encontro data');
    }
  };

  useEffect(() => {
    loadData({ whatToGet: 'clients' });
  }, []);

  const deleteClient = (idClient: number) => {
    if (window.confirm('Seguro que desea eliminar?')) {
      api.delete(`clients/remove/${idClient}`);
      alert('Cliente eliminado satisfatoriamente');
      setTimeout(() => {
        loadData({ whatToGet: 'clients' });
      }, 500);
    }
  };

  const addClient = (nombre: string, direccion: string, telefono: string) => {
    api
      .post('/clients/insert', { nombre, direccion, telefono })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        alert('error: ' + err);
      });
    alert('Added succesfully');
    setTimeout(() => {
      navigate('/Clients');
    }, 500);
  };

  const updateClient = ({ nombre, direccion, telefono, idCliente }: Client) => {
    api
      .put(`/clients/update/${idCliente}`, { nombre, direccion, telefono })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert('error: ' + err);
      });
    alert('Updated succesfully');
    setTimeout(() => {
      navigate('/Clients');
    }, 500);
  };

  // let client: AddClient;

  // const getOneClient = (idClient: number) => {
  //   api.get(`/get/clients/${idClient}`).then((res) => {
  //     client = { ...res.data[0] };
  //   });

  //   return client;
  // };

  return { clients, deleteClient, addClient, updateClient };
};

export default useDatabase;
