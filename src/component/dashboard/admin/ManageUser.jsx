import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import UserTable from './UserTable';
import ConfirmationModal from './ConfirmationModal';

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveUser = (user) => {
    // setUserToDelete(user);
    // setShowConfirmModal(true);
  };

  const confirmRemoveUser = async () => {
    // try {
    //   const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
    //     method: 'DELETE',
    //   });
    //   if (!response.ok) {
    //     throw new Error('Failed to delete user');
    //   }
    //   setUsers(users.filter((user) => user.id !== userToDelete.id));
    //   setShowConfirmModal(false);
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  const handleUpdateRole = async (userId, newRole) => {
    // try {
    //   const response = await fetch(`/api/admin/users/${userId}/role`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ role: newRole }),
    //   });
    //   if (!response.ok) {
    //     throw new Error('Failed to update user role');
    //   }
    //   setUsers(
    //     users.map((user) =>
    //       user.id === userId ? { ...user, role: newRole } : user
    //     )
    //   );
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-[#00838C]' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
        <AlertCircle className='h-10 w-10 text-red-500' />
        <h2 className='mt-4 text-xl font-semibold'>Error loading users</h2>
        <p className='mt-2 text-gray-600'>{error}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold'>Manage Users</h1>
      <UserTable
        users={users}
        onRemoveUser={handleRemoveUser}
        onUpdateRole={handleUpdateRole}
      />
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmRemoveUser}
        title='Confirm User Deletion'
        message={`Are you sure you want to delete the user ${userToDelete?.display_name}?`}
      />
    </div>
  );
}
