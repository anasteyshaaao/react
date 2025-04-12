import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, toggleBlockUser } from '../redux/slices/usersSlice';
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

const AdminUsersTable = () => {
  const dispatch = useDispatch();
  const { items: users = [], loading, error } = useSelector(state => state.users);
  const { isAdmin } = useSelector(state => state.auth);

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
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      enableSorting: true,
      sortingFn: 'alphanumeric',
    },
    {
      id: 'status',
      header: 'Статус',
      accessorKey: 'isBlocked',
      cell: ({ getValue }) => (
        <span className={`badge ${getValue() ? 'bg-danger' : 'bg-success'}`}>
          {getValue() ? 'Заблокирован' : 'Активен'}
        </span>
      ),
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        return rowA.original.isBlocked - rowB.original.isBlocked;
      },
    },
    {
     id: 'admin',
    header: 'Админ',
    accessorKey: 'isAdmin',
    cell: ({ getValue }) => (
      <span className={`badge ${getValue() ? 'bg-primary' : 'bg-secondary'}`}>
        {getValue() ? 'Да' : 'Нет'}
      </span>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId);
      const b = rowB.getValue(columnId);
      if (a === b) return 0;
      return a ? -1 : 1; // Админы сначала
    },
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              if (window.confirm('Удалить пользователя?')) {
                dispatch(deleteUser(row.original.id));
              }
            }}
            disabled={row.original.isAdmin}
          >
            Удалить
          </button>
          <button
            className={`btn btn-sm ${row.original.isBlocked ? 'btn-success' : 'btn-warning'}`}
            onClick={() => dispatch(toggleBlockUser(row.original.id))}
            disabled={row.original.isAdmin}
          >
            {row.original.isBlocked ? 'Разблокировать' : 'Заблокировать'}
          </button>
        </div>
      ),
      enableSorting: false,
    },
  ], [dispatch]);

  const [columnOrder, setColumnOrder] = React.useState(() => 
    columns.map(column => column.id)
  );

  const table = useReactTable({
    data: users,
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

  if (!isAdmin) {
    return <div className="alert alert-warning">Требуются права администратора</div>;
  }

  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-4">
        Ошибка загрузки пользователей: {error}
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

export default AdminUsersTable;