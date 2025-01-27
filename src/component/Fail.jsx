import { Link } from 'react-router';

const Fail = () => {
  return (
    <div>
      <h1 className='text-3xl'>Payment Failed</h1>
      <p>Your payment was failed.</p>
      <Link to='/dashboard/purchase'>Back to Homepage</Link>
    </div>
  );
};

export default Fail;
