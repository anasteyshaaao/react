import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender } from '@tanstack/react-table';

export const SortableHeader = ({ header, table }) => {
  // Добавляем проверку на существование необходимых свойств
  if (!header || !header.column || !header.getContext) {
    console.error('Invalid header prop provided to SortableHeader');
    return null;
  }

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
    transition: isDragging ? 'none' : transition, // Убираем анимацию во время перетаскивания
    cursor: isDragging ? 'grabbing' : 'grab',
    opacity: isDragging ? 0.8 : 1,
    backgroundColor: isDragging ? '#f8f9fa' : 'inherit',
    position: 'relative',
    zIndex: isDragging ? 100 : 'auto',
  };

  // Проверяем, поддерживает ли колонка сортировку
  const canSort = header.column.getCanSort();

  return (
    <th
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      colSpan={header.colSpan}
      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
      className={canSort ? 'sortable-column' : ''}
    >
      <div className="d-flex align-items-center">
        {flexRender(header.column.columnDef.header, header.getContext())}
        {canSort && (
          <span className="ms-1">
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