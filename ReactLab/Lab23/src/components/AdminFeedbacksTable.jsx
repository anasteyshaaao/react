import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { useDeleteFeedbackMutation } from './adminApi';

const SortableHeader = ({ header }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: header.column.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    cursor: isDragging ? 'grabbing' : header.column.getCanSort() ? 'pointer' : 'grab',
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    zIndex: isDragging ? 100 : 'auto',
    backgroundColor: isDragging ? '#f8f9fa' : 'inherit',
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      colSpan={header.colSpan}
      onClick={header.column.getToggleSortingHandler()}
      className={header.column.getCanSort() ? 'sortable-column' : ''}
    >
      <div className="d-flex align-items-center">
        {flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getCanSort() && (
          <span className="ms-2">
            {{
              asc: '🔼',
              desc: '🔽',
            }[header.column.getIsSorted()] ?? '↕️'}
          </span>
        )}
      </div>
    </th>
  );
};

const Spinner = () => (
  <div className="text-center my-4">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Загрузка...</span>
    </div>
    <p className="mt-2">Загрузка отзывов...</p>
  </div>
);

const AdminFeedbacksTable = ({ feedbacks, isLoading, isError, error }) => {
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      try {
        await deleteFeedback(id);
        // Данные автоматически обновятся благодаря invalidatesTags в adminApi
      } catch (err) {
        console.error('Ошибка при удалении отзыва:', err);
      }
    }
  };

  const columns = React.useMemo(() => [
    {
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
      enableSorting: true,
      sortingFn: 'alphanumeric',
    },
    {
      id: 'name',
      header: 'Имя',
      accessorKey: 'name',
      enableSorting: true,
      sortingFn: 'alphanumeric',
    },
    {
      id: 'feedback',
      header: 'Текст отзыва',
      accessorKey: 'feedback',
      enableSorting: true,
      sortingFn: 'alphanumeric',
    },
    {
      id: 'date',
      header: 'Дата',
      accessorKey: 'date',
      cell: ({ getValue }) => formatDate(getValue()),
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        return new Date(rowA.original.date) - new Date(rowB.original.date);
      },
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => (
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleDelete(row.original.id)}
          title="Удалить отзыв"
        >
          Удалить
        </button>
      ),
      enableSorting: false,
    },
  ], []);

  const [columnOrder, setColumnOrder] = React.useState(() => 
    columns.map(column => column.id)
  );

  const table = useReactTable({
    data: feedbacks || [],
    columns,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: process.env.NODE_ENV === 'development',
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const onDragEnd = event => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      setColumnOrder(columnOrder => {
        const oldIndex = columnOrder.indexOf(active.id);
        const newIndex = columnOrder.indexOf(over.id);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="alert alert-danger my-4">
        Ошибка при загрузке отзывов: {error.message || error.toString()}
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <DndContext
        sensors={sensors}
        modifiers={[restrictToHorizontalAxis]}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <table className="table table-striped table-hover">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <SortableContext
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {headerGroup.headers.map(header => (
                    <SortableHeader
                      key={header.id}
                      header={header}
                    />
                  ))}
                </SortableContext>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DndContext>
    </div>
  );
};

export default AdminFeedbacksTable;