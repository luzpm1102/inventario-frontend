import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API/axios';
import { Client, AddClient } from '../Interfaces/Client';
import { AddProduct, Product } from '../Interfaces/Product';
import { AddMeasure, Measure } from '../Interfaces/Measure';
import { Order } from '../Interfaces/Order';

interface URL {
  whatToGet: 'clients' | 'products' | 'medida' | 'order';
}

const useDatabase = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [measures, setMeasures] = useState<Measure[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const navigate = useNavigate();

  const loadData = async ({ whatToGet }: URL) => {
    const { data } = await api.get(`/${whatToGet}`);
    console.log(whatToGet);

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
        case 'order':
          setOrders(data);
          break;
        default:
          console.log('default');

          break;
      }
    } else {
      console.log('No se encontro data');
    }
  };

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
  //ORDERS

  const addOrder = (idCliente: number) => {
    let insertedId: number;
    api
      .post('/order/insert', { idCliente })
      .then((res) => {
        insertedId = res.data[0];
        console.log(insertedId);
      })
      .catch((err) => {
        console.log(err);
        alert('error: ' + err);
      });
    alert('Add Products to the order');
    setTimeout(() => {
      // navigate(`/Orders/${insertedId}`);
      //this has to navigate to create new producto_orden where idOrden = newCreatedOrderID (this has to be insertedID)
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
    loadData,
    orders,
    addOrder,
  };
};

export default useDatabase;
