import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../API/axios';
import useDatabase from '../Hooks/useDatabase';
import { useForm } from '../Hooks/useForm';
import { AddProduct, AddProductoMedida } from '../Interfaces/Product';

const AddEditProduct = () => {
  useEffect(() => {
    loadData({ whatToGet: 'medida' });
  }, []);
  const { id } = useParams();
  const { nombre, descripcion, SKU, onChange, setFormValue } =
    useForm<AddProduct>({
      nombre: '',
      descripcion: '',
      SKU: '',
    });

  const [medida, setMedida] = useState<string>('');

  const {
    addProduct,
    updateProduct,
    addProductMeasure,
    editProductMeasure,
    loadData,
    measures,
  } = useDatabase();

  useEffect(() => {
    if (id) {
      api.get(`/products/${id}`).then((res) => {
        setFormValue({ ...res.data[0] });
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombre || !descripcion || !SKU) {
      alert('Es necesario que llene la informacion solicitada');
    } else {
      if (id) {
        const idProducto = parseInt(id);
        updateProduct({ nombre, descripcion, SKU, idProducto });
        setFormValue({ nombre: '', descripcion: '', SKU: '' });
      } else {
        addProduct({ nombre, descripcion, SKU });
        setFormValue({ nombre: '', descripcion: '', SKU: '' });
      }
    }
  };

  const onChangeSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    setMedida(e.currentTarget.value);
  };
  return (
    <div>
      <h2>Here will be the add product page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='nombre'>Nombre: </label>
        <input
          type='text'
          placeholder='Nombre del producto'
          value={nombre}
          onChange={({ target }) => onChange(target.value, 'nombre')}
        />
        <br />
        <label htmlFor='descripcion'>Descricion: </label>
        <input
          type='text'
          placeholder='Descrpcion del producto'
          value={descripcion}
          onChange={({ target }) => onChange(target.value, 'descripcion')}
        />
        <br />
        <label htmlFor='SKU'>Telefono: </label>
        <input
          type='text'
          placeholder='SKU del producto'
          value={SKU}
          onChange={({ target }) => onChange(target.value, 'SKU')}
        />
        <br />
        <select value={medida} onChange={onChangeSelect} defaultValue=''>
          <option>Seleccione una medida</option>
          {measures.map((measure) => {
            return (
              <option key={measure.idMedida} value={measure.idMedida}>
                {measure.nombre}
              </option>
            );
          })}
        </select>
        <br />
        <input type='submit' value={id ? 'Update' : 'Save'} />
        <Link to='/Products'>
          <input type='button' value='Go Back' />
        </Link>
      </form>
    </div>
  );
};

export default AddEditProduct;
