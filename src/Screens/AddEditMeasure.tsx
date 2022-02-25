import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../API/axios';
import useDatabase from '../Hooks/useDatabase';
import { useForm } from '../Hooks/useForm';
import { AddMeasure } from '../Interfaces/Measure';

const AddEditMeasure = () => {
  const { id } = useParams();
  const { nombre, nombreCorto, onChange, setFormValue } = useForm<AddMeasure>({
    nombre: '',
    nombreCorto: '',
  });

  const { addMeasure, updateMeasure } = useDatabase();

  useEffect(() => {
    if (id) {
      api.get(`/medida/${id}`).then((res) => {
        setFormValue({ ...res.data[0] });
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombre || !nombreCorto) {
      alert('Es necesario que llene la informacion solicitada');
    } else {
      if (id) {
        const idMedida = parseInt(id);
        updateMeasure({ nombre, nombreCorto, idMedida });
        setFormValue({ nombre: '', nombreCorto: '' });
      } else {
        addMeasure({ nombre, nombreCorto });
        setFormValue({ nombre: '', nombreCorto: '' });
      }
    }
  };
  return (
    <div>
      <h2>Here will be the add Measure page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='nombre'>Nombre: </label>
        <input
          type='text'
          placeholder='Nombre de la medida'
          value={nombre}
          onChange={({ target }) => onChange(target.value, 'nombre')}
        />
        <br />
        <label htmlFor='corto'>Nombre corto: </label>
        <input
          type='text'
          placeholder='Descrpcion del producto'
          value={nombreCorto}
          onChange={({ target }) => onChange(target.value, 'nombreCorto')}
        />
        <br />

        <input type='submit' value={id ? 'Update' : 'Save'} />
        <Link to='/Measures'>
          <input type='button' value='Go Back' />
        </Link>
      </form>
    </div>
  );
};

export default AddEditMeasure;
