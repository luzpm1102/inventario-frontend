import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API/axios';
import { Client, AddClient } from '../Interfaces/Client';
import { AddProduct, Product } from '../Interfaces/Product';
import { AddMeasure, Measure } from '../Interfaces/Measure';

interface URL {
  whatToGet: 'clients' | 'products' | 'medida';
}

const useDatabase = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [measures, setMeasures] = useState<Measure[]>([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const loadData = async ({ whatToGet }: URL) => {
    const { data } = await api.get(`/${whatToGet}`);
    if (data) {
      switch (whatToGet) {
        case 'clients':
          setClients(data);
          break;
        case 'products':
          setProducts(data);
          break;
        case 'medida':
          setMeasures(data);
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
    loadData({ whatToGet: 'products' });
    loadData({ whatToGet: 'medida' });
  }, []);

  //CLIENTS

  const deleteClient = (idClient: number) => {
    if (window.confirm('Seguro que desea eliminar?')) {
      api.delete(`clients/remove/${idClient}`);
      alert('Cliente eliminado satisfatoriamente');
      setTimeout(() => {
        loadData({ whatToGet: 'clients' });
      }, 500);
    }
  };

  const addClient = ({ nombre, direccion, telefono }: AddClient) => {
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

  //PRODUCTO

  const deleteProduct = (idProduct: number) => {
    if (window.confirm('Seguro que desea eliminar?')) {
      api.delete(`products/remove/${idProduct}`);
      alert('Producto eliminado satisfatoriamente');
      setTimeout(() => {
        loadData({ whatToGet: 'products' });
      }, 500);
    }
  };

  const addProduct = ({ nombre, descripcion, SKU }: AddProduct) => {
    api
      .post('/product/insert', { nombre, descripcion, SKU })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        alert('error: ' + err);
      });
    alert('Added succesfully');
    setTimeout(() => {
      navigate('/Products');
    }, 500);
  };

  const updateProduct = ({ nombre, descripcion, SKU, idProducto }: Product) => {
    api
      .put(`/products/update/${idProducto}`, { nombre, descripcion, SKU })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert('error: ' + err);
      });
    alert('Updated succesfully');
    setTimeout(() => {
      navigate('/Products');
    }, 500);
  };

  //MEASURES

  const deleteMeasure = (idMeasure: number) => {
    if (window.confirm('Seguro que desea eliminar?')) {
      api.delete(`medida/remove/${idMeasure}`);
      alert('Medida eliminado satisfatoriamente');
      setTimeout(() => {
        loadData({ whatToGet: 'medida' });
      }, 500);
    }
  };

  const addMeasure = ({ nombre, nombreCorto }: AddMeasure) => {
    api
      .post('/medida/insert', { nombre, nombreCorto })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        alert('error: ' + err);
      });
    alert('Added succesfully');
    setTimeout(() => {
      navigate('/Measures');
    }, 500);
  };

  const updateMeasure = ({ nombre, nombreCorto, idMedida }: Measure) => {
    api
      .put(`/medida/update/${idMedida}`, { nombre, nombreCorto })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert('error: ' + err);
      });
    alert('Updated succesfully');
    setTimeout(() => {
      navigate('/Measures');
    }, 500);
  };

  return {
    clients,
    deleteClient,
    addClient,
    updateClient,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    addMeasure,
    measures,
    updateMeasure,
    deleteMeasure,
  };
};

export default useDatabase;
