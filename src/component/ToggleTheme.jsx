import { useEffect, useState } from 'react';
import { BsToggle2On } from 'react-icons/bs';
import { BsToggle2Off } from 'react-icons/bs';
const ToggleTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <div
      className='cursor-pointer  text-2xl'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <BsToggle2On /> : <BsToggle2Off />}
    </div>
  );
};

export default ToggleTheme;
