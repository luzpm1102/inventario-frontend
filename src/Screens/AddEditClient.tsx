import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../API/axios';
import { useForm } from '../Hooks/useForm';
import { AddClient, Client } from '../Interfaces/Client';
import useDatabase from '../Hooks/useDatabase';
import { useEffect } from 'react';

const AddEditClient = () => {
  const { id } = useParams();
  const { nombre, direccion, telefono, onChange, setFormValue } =
    useForm<AddClient>({
      nombre: '',
      direccion: '',
      telefono: '',
    });

  const { addClient, updateClient } = useDatabase();

  useEffect(() => {
    if (id) {
      api.get(`/clients/${id}`).then((res) => {
        setFormValue({ ...res.data[0] });
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombre || !direccion || !telefono) {
      alert('Es necesario que llene la informacion solicitada');
    } else {
      if (id) {
        const idCliente = parseInt(id);
        updateClient({ nombre, direccion, telefono, idCliente });
        setFormValue({ nombre: '', direccion: '', telefono: '' });
      } else {
        addClient(nombre, direccion, telefono);
        setFormValue({ nombre: '', direccion: '', telefono: '' });
      }
    }
  };
  return (
    <div>
      <h2>Here will be the add client page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='nombre'>Nombre</label>
        <input
          type='text'
          placeholder='Nombre del cliente'
          value={nombre}
          onChange={({ target }) => onChange(target.value, 'nombre')}
        />
        <label htmlFor='direccion'>Direccion</label>
        <input
          type='text'
          placeholder='Direccion del cliente'
          value={direccion}
          onChange={({ target }) => onChange(target.value, 'direccion')}
        />
        <label htmlFor='telefono'>Telefono</label>
        <input
          type='tel'
          placeholder='Telefono del cliente'
          value={telefono}
          onChange={({ target }) => onChange(target.value, 'telefono')}
        />
        <input type='submit' value={id ? 'Update' : 'Save'} />
        <Link to='/Clients'>
          <input type='button' value='Go Back' />
        </Link>
      </form>
    </div>
  );
};

export default AddEditClient;
