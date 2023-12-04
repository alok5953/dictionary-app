import React, { useCallback } from 'react';
import { MdOutlineWbSunny, FaMoon } from 'react-icons/md';

const Header = ({ changeMode }) => {
  const toggleDarkMode = useCallback(() => {
    changeMode();
  }, [changeMode]);

  return (
    <div className='flex justify-between items-center bg-blue-300 dark:bg-gray-800 p-4'>
      <div>
        <h1 className='text-3xl text-white font-bold dark:text-gray-400'>
          Free Dictionary
        </h1>
      </div>
      <button onClick={toggleDarkMode}>
        <MdOutlineWbSunny className='text-3xl text-white dark:text-gray-400' />
      </button>
    </div>
  );
};

export default Header;
