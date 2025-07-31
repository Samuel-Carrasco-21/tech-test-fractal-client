import { memo } from 'react';
import { Box } from '@mui/material';
import { DataType, ColumnRegular, RevoGrid } from '@revolist/react-datagrid';
import { IProductResponse } from '@/schemas/products';

interface Props {
  rows: IProductResponse[];
  onEdit: (product: IProductResponse) => void;
  onDelete: (id: string) => void;
}

const ProductsDataGrid = memo(({ rows, onEdit, onDelete }: Props) => {
  const data: DataType[] = [...rows];

  const columns: ColumnRegular[] = [
    { prop: 'name', name: 'Nombre del Producto', size: 400 },
    {
      prop: 'unitPrice',
      name: 'Precio Unitario',
      size: 150,
      cellProperties: () => ({ style: { textAlign: 'right' } }),
      cellTemplate: (_createElement, props) =>
        `$${props.model.unitPrice.toFixed(2)}`,
    },
    {
      name: 'Opciones',
      size: 120,
      cellTemplate: (createElement, props) => {
        const editButton = createElement(
          'i',
          {
            class: 'material-icons',
            style: { cursor: 'pointer', color: '#5f6368', marginRight: '8px' },
            onClick: () => onEdit(props.model as IProductResponse),
          },
          'editar'
        );
        const deleteButton = createElement(
          'i',
          {
            class: 'material-icons',
            style: { cursor: 'pointer', color: '#d93025' },
            onClick: () => onDelete(props.model.id),
          },
          'eliminar'
        );
        return createElement(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            },
          },
          [editButton, deleteButton]
        );
      },
      prop: '',
    },
  ];

  return (
    <Box sx={{ height: '60vh', width: '100%' }}>
      <RevoGrid
        source={data}
        columns={columns}
        readonly={true}
        resize={true}
        theme="material"
      />
    </Box>
  );
});

export default ProductsDataGrid;
