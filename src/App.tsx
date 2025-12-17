import './App.css';

import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from './store/hooks';

import {
  fetchUsers,
  deleteUser,
  setSearch,
  addUser,
  updateUser,
} from './store/reducers/users/usersSlice';

import { DataTable } from './components/DataTable/index';
import { SearchBar } from './components/SearchBar/index';
import { User } from './types/users.types';
import { AddButton } from './components/AddButton';
import { ModalMode, UserModal } from './components/UserModal';

const App = () => {
  const dispatch = useAppDispatch();

  const { list, loading, error, search } = useAppSelector(state => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = list.filter(
    (user: User) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.address.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleAddUser = (userData: User | Omit<User, 'id'>) => {
    if ('id' in userData) {
      dispatch(updateUser(userData));
    } else {
      const newUser: User = {
        ...userData,
        id: Date.now(),
      };
      dispatch(addUser(newUser));
    }
  };

  const openViewModal = (user: User) => {
    setModalMode('view');
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const openEditModal = (user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setModalMode('add');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="app-header">
          <h1 className="app-title">User Management</h1>
          <SearchBar
            value={search}
            onChange={(value: string) => dispatch(setSearch(value))}
          />
        </div>
        <AddButton onClick={openAddModal} />
        <DataTable
          users={filteredUsers}
          onView={openViewModal}
          onEdit={openEditModal}
          onDelete={handleDeleteUser}
          loading={loading}
          isError={error}
        />

        <UserModal
          isOpen={isModalOpen}
          mode={modalMode}
          initialUser={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddUser}
          onModeChange={setModalMode}
        />
      </div>
    </div>
  );
};

export default App;
