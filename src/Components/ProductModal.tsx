import React, { SetStateAction, useEffect, useState } from 'react';
import useDatabase from '../Hooks/useDatabase';
import { ProductoMedida } from '../Interfaces/Product';

interface Props {
  idOrden: number;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

type ProductModalItem = ProductoMedida & {
  cantidadSeleccionada: number | 0;
};

const ProductModal = ({ idOrden, setVisible }: Props) => {
  useEffect(() => {
    loadData({ whatToGet: 'productoMedida/inventario' });
  }, []);
  const { loadData, productoMedida, addMultiplesProducts } = useDatabase();
  useEffect(() => {
    if (productoMedida.length > 0) {
      setCopia(
        productoMedida.map((producto) => ({
          ...producto,
          cantidadSeleccionada: 0,
        }))
      );
    }
  }, [productoMedida]);

  const [checked, setChecked] = useState<number[]>([]);
  const [copia, setCopia] = useState<ProductModalItem[]>([]);

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    var updatedList = [...checked];

    if (event.target.checked) {
      updatedList = [...checked, id];
    } else {
      updatedList.splice(checked.indexOf(id), 1);
    }

    setChecked(updatedList);
  };

  const handleSubmit = () => {
    const newProducts = checked.map((e) => {
      const product = copia.find((producto) => producto.idProductoMedida == e);
      if (product)
        return {
          idOrden: idOrden,
          idProductoMedida: product.idProductoMedida,
          precioUnitario: product.precio,
          cantidad: product.cantidadSeleccionada,
        };
    });
    addMultiplesProducts(newProducts, idOrden);
    setVisible(false);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Agregar</th>

            <th>Nombre</th>
            <th>Medida</th>
            <th>Existencia</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {copia.map((producto, index) => {
            return (
              <tr key={index}>
                <th>
                  <input
                    value={producto.idProductoMedida}
                    type='checkbox'
                    onChange={(event) =>
                      handleCheck(event, producto.idProductoMedida)
                    }
                  />
                </th>
                <th>
                  <span>{producto.Producto}</span>
                </th>
                <th>
                  <span>{producto.Medida}</span>
                </th>
                <th>
                  <span>{producto.Existencia}</span>
                </th>
                <th>
                  <input
                    id={producto.idProductoMedida.toString()}
                    value={producto.precio}
                    onChange={(e) => {
                      setCopia((initialState) => {
                        const state = [...initialState];
                        const value = Number(e?.target?.value);

                        state[index].precio = isNaN(value) ? 0 : value;

                        return state;
                      });
                    }}
                  ></input>
                </th>
                <th>
                  <input
                    value={producto.cantidadSeleccionada}
                    onChange={(e) => {
                      setCopia((initialState) => {
                        const state = [...initialState];
                        const value = Number(e?.target?.value);

                        state[index].cantidadSeleccionada = isNaN(value)
                          ? 0
                          : value;

                        return state;
                      });
                    }}
                  ></input>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ProductModal;
