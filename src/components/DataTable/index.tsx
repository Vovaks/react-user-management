import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { User } from '../../types/users.types';
import './DataTable.scss';
interface DataTableProps {
  users: User[];
  loading?: boolean;
  isError?: string | null;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}
export function DataTable({
  users,
  loading,
  isError,
  onView,
  onEdit,
  onDelete,
}: DataTableProps) {
  if (loading) {
    return (
      <div className="data-table-empty">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return <p>{isError}</p>;
  }
  if (users.length === 0) {
    return (
      <div className="data-table-empty">
        <p>Users not found...</p>
      </div>
    );
  }
  return (
    <div className="data-table-container">
      <div className="grid-table-wrapper">
        <div className="grid-table">
          <div className="grid-header">
            <div className="grid-header-cell">Name</div>
            <div className="grid-header-cell">Username</div>
            <div className="grid-header-cell">Email</div>
            <div className="grid-header-cell">City</div>
            <div className="grid-header-cell align-right">Actions</div>
          </div>

          {users.map(user => (
            <div
              key={user.id}
              onClick={() => onView(user)}
              className="grid-row"
            >
              <div className="grid-cell primary">{user.name}</div>
              <div className="grid-cell">{user.username}</div>
              <div className="grid-cell">{user.email}</div>
              <div className="grid-cell">{user.address.city}</div>
              <div className="grid-cell align-right">
                <div className="action-buttons">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onEdit(user);
                    }}
                    className="btn-icon btn-edit"
                    title="Edit"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={e => {
                      onDelete(user.id);
                      e.stopPropagation();
                    }}
                    className="btn-icon btn-delete"
                    title="Delete"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
