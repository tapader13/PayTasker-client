import { Link } from 'react-router';

const Cancel = () => {
  return (
    <div>
      <h1 className='text-3xl'>Payment Cancelled</h1>
      <p>Your payment was cancelled.</p>
      <Link to='/dashboard/purchase'>Back to Homepage</Link>
    </div>
  );
};

export default Cancel;
