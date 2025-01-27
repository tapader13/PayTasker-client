import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

const Success = () => {
  const location = useLocation();
  const [transactionId, setTransactionId] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTransactionId(params.get('id'));
  }, [location.search, transactionId]);
  return (
    <div className='text-center min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl'>Payment Successfull</h1>
      <p>Your payment was successful.</p>
      <p>Transaction ID: {transactionId}</p>
      <Link to='/dashboard'>Back to Homepage</Link>
    </div>
  );
};

export default Success;
