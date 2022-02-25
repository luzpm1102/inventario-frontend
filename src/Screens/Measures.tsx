import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDatabase from '../Hooks/useDatabase';

const Measures = () => {
  useEffect(() => {
    loadData({ whatToGet: 'medida' });
  }, []);

  const { measures, deleteMeasure, loadData } = useDatabase();
  return (
    <div>
      <h1>Medidas</h1>
      <Link to={'/addMeasure'}>
        <button>Agregar Medida</button>
      </Link>

      <div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>idMedida</th>
              <th>Nombre</th>
              <th>Nombre corto</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {measures.map((measure, index) => {
              return (
                <tr key={measure.idMedida}>
                  <th scope='row'>{index + 1}</th>
                  <td>{measure.idMedida}</td>
                  <td>{measure.nombre}</td>
                  <td>{measure.nombreCorto}</td>
                  <td>
                    <Link to={`/updateMeasure/${measure.idMedida}`}>
                      <button>Editar</button>
                    </Link>
                    <button onClick={() => deleteMeasure(measure.idMedida)}>
                      Eliminar
                    </button>
                    <Link to={`/viewMeasure/${measure.idMedida}`}>
                      <button>Ver</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link to='/'>Return Home</Link>
    </div>
  );
};

export default Measures;
