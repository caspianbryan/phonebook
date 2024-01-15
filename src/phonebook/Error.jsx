import React from 'react';

const Error = ({ messageSuc, messageErr }) => {
  if (messageSuc === null && messageErr === null) {
    return null;
  }

  return (
    <>
      {messageSuc !== null && (
        <div className='error'>
          {messageSuc}
        </div>
      )}
      {messageErr !== null && (
        <div className='deleted'>
          {messageErr}
        </div>
      )}
    </>
  );
};

export default Error;
