import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../API/axios';
import { useForm } from '../Hooks/useForm';
import { AddClient, Client } from '../Interfaces/Client';
import useDatabase from '../Hooks/useDatabase';

const AddEditClient = () => {
  const { nombre, direccion, telefono, onChange, setFormValue } =
    useForm<AddClient>({
      nombre: '',
      direccion: '',
      telefono: '',
    });

  const { addClient } = useDatabase();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombre || !direccion || !telefono) {
      alert('Es necesario que llene la informacion solicitada');
    } else {
      addClient(nombre, direccion, telefono);
      setFormValue({ nombre: '', direccion: '', telefono: '' });
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
        <input type='submit' value='Save' />
        <Link to='/'>
          <input type='button' value='Go Back' />
        </Link>
      </form>
    </div>
  );
};

export default AddEditClient;
