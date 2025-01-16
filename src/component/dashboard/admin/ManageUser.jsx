import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import UserTable from './UserTable';
import ConfirmationModal from './ConfirmationModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function ManageUser() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axiosSecure.get('/manage-users');
    return response.data?.data;
  };
  const {
    data: allUsers = [],
    refetch: refetchAllUsers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['manage-users'],
    queryFn: fetchUsers,
  });

  const handleRemoveUser = (user) => {
    setUserToDelete(user);
    setShowConfirmModal(true);
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
    try {
      const response = await axiosSecure.patch(`/role-update/${userId}`, {
        role: newRole,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        refetchAllUsers();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-[#00838C]' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
        <AlertCircle className='h-10 w-10 text-red-500' />
        <h2 className='mt-4 text-xl font-semibold'>Error loading users</h2>
        <p className='mt-2 text-gray-600'>{error.message}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold'>Manage Users</h1>
      <UserTable
        users={allUsers}
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
