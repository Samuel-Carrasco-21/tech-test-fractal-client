import { Box } from '@mui/material';
import { DataType, ColumnRegular, RevoGrid } from '@revolist/react-datagrid';
import { IOrderItemResponse } from '@/schemas/orders';

interface Props {
  rows: IOrderItemResponse[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const OrderItemsGrid = ({ rows, onUpdateQuantity, onRemoveItem }: Props) => {
  // 👇 --- LA SOLUCIÓN CLAVE --- 👇
  // Creamos una copia profunda (deep copy) de las filas.
  // JSON.parse(JSON.stringify(rows)) es una forma sencilla de hacerlo
  // para objetos que no contienen funciones, undefined, etc. que es nuestro caso.
  // Esto rompe la referencia con el estado de Redux.
  const editableData: DataType[] = JSON.parse(JSON.stringify(rows));

  const columns: ColumnRegular[] = [
    { prop: 'productName', name: 'Producto', readonly: true, size: 300 },
    {
      prop: 'priceAtOrder',
      name: 'Precio Unitario',
      readonly: true,
      cellTemplate: (_createElement, props) =>
        `$${props.model.priceAtOrder.toFixed(2)}`,
    },
    {
      prop: 'quantity',
      name: 'Cantidad',
      type: 'number', // Habilita la edición nativa para números
    },
    {
      prop: 'totalPrice',
      name: 'Precio Total',
      readonly: true,
      cellTemplate: (_createElement, props) =>
        `$${props.model.totalPrice.toFixed(2)}`,
    },
    {
      prop: 'options',
      name: 'Opciones',
      readonly: true,
      size: 100,
      cellTemplate: (createElement, props) => {
        const wrapper = createElement(
          'div',
          { style: { textAlign: 'center' } },
          createElement(
            'i',
            {
              class: 'material-icons',
              style: {
                cursor: 'pointer',
                color: '#d93025',
                verticalAlign: 'middle',
              },
              onClick: () => onRemoveItem(props.model.productId),
            },
            'delete'
          )
        );
        return wrapper;
      },
    },
  ];

  return (
    <Box sx={{ height: '300px', width: '100%', mb: 2 }}>
      <RevoGrid
        // Pasamos la copia mutable al grid
        source={editableData}
        columns={columns}
        theme="material"
        // El evento para notificar del cambio
        onAfteredit={e => {
          // El detalle del evento contiene el índice de la fila y el nuevo valor
          const { rowIndex, prop, val } = e.detail as any;
          if (prop === 'quantity') {
            // Usamos el rowIndex para encontrar el productId en nuestro array original (rows)
            const productId = rows[rowIndex].productId;
            // Llamamos a la función del padre para actualizar el estado de React
            onUpdateQuantity(productId, Number(val));
          }
        }}
      />
    </Box>
  );
};

export default OrderItemsGrid;
