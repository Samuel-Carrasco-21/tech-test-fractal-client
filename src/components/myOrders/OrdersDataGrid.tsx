import { Box } from '@mui/material';
import { DataType, ColumnRegular, RevoGrid } from '@revolist/react-datagrid';
import { CSSProperties, memo } from 'react';
import { OrderStatusEnum } from '@/enums/orderStatusEnum';
import { IOrderListResponse } from '@/schemas/orders';
import { statusTranslator } from '../../utils/myOrders/statusTranslator';

interface Props {
  rows: IOrderListResponse[];
  onEdit: (id: string, status: OrderStatusEnum) => void;
  onDelete: (id: string, status: OrderStatusEnum) => void;
  onChangeStatus: (id: string, prevStatus: OrderStatusEnum) => void;
}

const getStatusStyles = (status: OrderStatusEnum): CSSProperties => {
  const baseStyle: CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    width: 200,
  };

  switch (status) {
    case OrderStatusEnum.COMPLETED:
      return {
        ...baseStyle,
        color: '#1e8e3e',
      };
    case OrderStatusEnum.IN_PROGRESS:
      return {
        ...baseStyle,
        color: '#1967d2',
      };
    case OrderStatusEnum.PENDING:
      return {
        ...baseStyle,
        color: '#e85d04',
      };
    default:
      return {
        ...baseStyle,
        color: '#5f6368',
      };
  }
};

const OrdersDataGrid = memo(
  ({ rows, onEdit, onDelete, onChangeStatus }: Props) => {
    const data: DataType[] = [...rows];
    const columns: ColumnRegular[] = [
      { prop: 'orderNumber', name: 'Order #', size: 200 },
      {
        prop: 'date',
        name: 'Fecha',
        size: 150,
        cellTemplate: (_createElement, props) =>
          new Date(props.model.date).toLocaleDateString(),
      },
      {
        prop: 'status',
        name: 'Estado',
        size: 150,
        cellTemplate: (createElement, props) => {
          const card = createElement(
            'i',
            {
              style: Object.fromEntries(
                Object.entries(getStatusStyles(props.model.status)).map(
                  ([k, v]) => [k, v?.toString()]
                )
              ),
            },
            statusTranslator(props?.value)
          );
          return card;
        },
      },
      {
        prop: 'productCount',
        name: '# Productos',
        size: 120,
        cellProperties: () => ({ style: { textAlign: 'right' } }),
      },
      {
        prop: 'finalPrice',
        name: 'Precio Final',
        size: 150,
        cellProperties: () => ({ style: { textAlign: 'right' } }),
        cellTemplate: (_createElement, props) =>
          `$${props.model.finalPrice.toFixed(2)}`,
      },
      {
        prop: 'options',
        name: 'Opciones',
        size: 250,
        cellTemplate: (createElement, props) => {
          const { id, status } = props.model;

          const editButton = createElement(
            'i',
            {
              class: 'material-icons',
              style: {
                cursor: 'pointer',
                color: '#5f6368',
                marginRight: '10px',
              },
              onClick: () => onEdit(id, status),
            },
            'editar'
          );

          const deleteButton = createElement(
            'i',
            {
              class: 'material-icons',
              style: {
                cursor: 'pointer',
                color: '#d93025',
                marginRight: '10px',
              },
              onClick: () => onDelete(id, status),
            },
            'eliminar'
          );

          const changeStatus = createElement(
            'i',
            {
              class: 'material-icons',
              style: {
                cursor:
                  status !== OrderStatusEnum.COMPLETED
                    ? 'pointer'
                    : 'not-allowed',
                color: '#1976d2',
              },
              onclick: () => onChangeStatus(id, status),
            },
            'cambiar estado'
          );

          return [editButton, deleteButton, changeStatus];
        },
      },
    ];

    return (
      <Box
        sx={{
          height: '60vh',
          width: '100%',
          // Estilizando profundamente el grid para que coincida con el tema MUI
          '.revogr-header-cell': {
            backgroundColor: 'background.paper',
            color: 'text.primary',
            fontWeight: 600,
            border: 'none',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
          },
          '.revogr-cell': {
            border: 'none',
            borderBottom: '1px solid',
            borderColor: 'rgba(224, 224, 224, 1)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
          },
          'revogr-data .revogr-row-r:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <RevoGrid
          source={data}
          columns={columns}
          readonly={true}
          resize={true}
          theme="material" // Tema base de RevoGrid
        />
      </Box>
    );
  },
  (prevProps, nextProps) => prevProps.rows.length !== nextProps.rows.length
);

export default OrdersDataGrid;
