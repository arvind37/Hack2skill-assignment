import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit, Trash2, Eye, ArrowUpDown } from 'lucide-react';

// Draggable table header component
export const DraggableHeader = ({ columns, onReorder }) => {
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (e, columnId) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== targetColumnId) {
      const newColumns = [...columns];
      const draggedIndex = newColumns.findIndex(col => col.id === draggedColumn);
      const targetIndex = newColumns.findIndex(col => col.id === targetColumnId);
      
      const [draggedItem] = newColumns.splice(draggedIndex, 1);
      newColumns.splice(targetIndex, 0, draggedItem);
      
      onReorder(newColumns);
    }
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map(column => (
          <th
            key={column.id}
            draggable
            onDragStart={(e) => handleDragStart(e, column.id)}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDrop={(e) => handleDrop(e, column.id)}
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-move border-r ${
              dragOverColumn === column.id ? 'bg-blue-100' : ''
            } ${draggedColumn === column.id ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-2">
              {column.label}
              {column.sortable && <ArrowUpDown size={14} />}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

// Individual table cell component
export const TableCell = ({ column, product, addToCart }) => {
  const renderCellContent = () => {
    switch (column.id) {
      case 'image':
        return <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />;
      
      case 'id':
        return product.id;
      
      case 'name':
        return (
          <div className="flex items-center">
            <span className="font-medium">{product.name}</span>
          </div>
        );
      
      case 'category':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {product.category}
          </span>
        );
      
      case 'price':
        return `$${product.price}`;
      
      case 'stock':
        return (
          <span className={`font-medium ${product.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>
            {product.stock}
          </span>
        );
      
      case 'status':
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            product.status === 'Active' ? 'bg-green-100 text-green-800' :
            product.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
            'bg-red-100 text-red-800'
          }`}>
            {product.status}
          </span>
        );
      
      case 'actions':
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <Edit size={16} />
            </button>
            <button className="text-red-600 hover:text-red-800">
              <Trash2 size={16} />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <Eye size={16} />
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {renderCellContent()}
    </td>
  );
};

// Table row component
export const TableRow = ({ product, columns, addToCart }) => {
  return (
    <tr className="hover:bg-gray-50">
      {columns.map(column => (
        <TableCell
          key={column.id}
          column={column}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </tr>
  );
};

// Pagination controls component
export const PaginationControls = ({ currentPage, totalPages, goToPage, nextPage, prevPage }) => {
  return (
    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 text-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-700">
          Showing page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, currentPage - 2) + i;
            if (pageNum > totalPages) return null;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-3 py-1 text-sm rounded ${
                  pageNum === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Complete product table component
export const ProductTable = ({ columns, currentData, addToCart, onReorder, currentPage, totalPages, goToPage, nextPage, prevPage }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <DraggableHeader columns={columns} onReorder={onReorder} />
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                columns={columns}
                addToCart={addToCart}
              />
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};