import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../API/axios';
import { Measure } from '../Interfaces/Measure';
import { Product } from '../Interfaces/Product';

const ViewMeasure = () => {
  const [measure, setMeasure] = useState<Measure>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/medida/${id}`).then((res) => {
        setMeasure({ ...res.data[0] });
      });
    }
  }, [id]);
  return (
    <div>
      <h2>Medida</h2>
      {measure ? (
        <div>
          <strong>ID: </strong>
          <span>{measure.idMedida}</span>
          <br />
          <br />
          <strong>Nombre: </strong>
          <span>{measure.nombre}</span>
          <br />
          <br />
          <strong>Nombre corto: </strong>
          <span>{measure.nombreCorto}</span>
          <br />
          <br />
        </div>
      ) : (
        <h1>No measure to show</h1>
      )}

      <Link to='/Measures'>
        <input type='button' value='Go Back' />
      </Link>
    </div>
  );
};

export default ViewMeasure;
