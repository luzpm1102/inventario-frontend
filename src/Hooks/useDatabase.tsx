import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API/axios';
import { Client } from '../Interfaces/Client';

interface URL {
  whatToGet: 'clients' | 'products';
}

const useDatabase = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const loadData = async ({ whatToGet }: URL) => {
    const { data } = await api.get(`/get/${whatToGet}`);
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
      api.delete(`/remove/${idClient}`);
      alert('Cliente eliminado satisfatoriamente');
      setTimeout(() => {
        loadData({ whatToGet: 'clients' });
      }, 500);
    }
  };

  const addClient = (nombre: string, direccion: string, telefono: string) => {
    api
      .post('/post/client', { nombre, direccion, telefono })
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

  return { clients, deleteClient, addClient };
};

export default useDatabase;
