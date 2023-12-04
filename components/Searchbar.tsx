import { FaSearch } from 'react-icons/fa';
import { useCallback, useState, useEffect } from 'react';

interface Props {
  handleChange: (word: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  suggestedWords: Array<string>;
  acceptSuggestion: (value: string) => void;
  word: string;
}

const Searchbar = (props: Props) => {
  const { handleChange, handleSubmit, suggestedWords, acceptSuggestion, word } =
    props;

  const [hideSuggestion, setHideSuggestions] = useState<boolean>(true);

  const handleChildSubmit = useCallback(
    (e: React.FormEvent) => {
      handleSubmit(e);
    },
    [handleSubmit]
  );

  const handleChangeChild = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    },
    [handleChange]
  );

  const acceptChildSuggestion = useCallback(
    (value: string) => {
      acceptSuggestion(value);
      setHideSuggestions(true);
    },
    [acceptSuggestion]
  );

  useEffect(() => {
    // Function to hide suggestions when clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.id !== 'searchbar' &&
        target.id !== 'suggestions-container' &&
        target.id !== 'suggestions-box'
      ) {
        setHideSuggestions(true);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative flex justify-center items-center'>
      <form onSubmit={handleChildSubmit}>
        <label htmlFor='searchbar' className='hidden'>
          Search
        </label>
        <input
          className='border-2 dark:bg-gray-400 p-2 rounded-xl w-[250px] sm:w-[300px] md:w-[350px] mt-12 border-black'
          type='text'
          onChange={handleChangeChild}
          value={word}
          onFocus={() => setHideSuggestions(false)}
          id='searchbar'
        />

        <button type='submit' id='submit' className='relative right-8'>
          <FaSearch className='text-black dark:text-gray-800' />{' '}
          <span className='hidden'>Search</span>
        </button>

        {suggestedWords.length > 0 && (
          <div
            id='suggestions-container'
            className={`absolute ${
              hideSuggestion ? 'hidden' : ''
            } z-10 w-[250px] sm:w-[300px] md:w-[350px] bg-white border border-gray-300 rounded-xl mt-1`}
          >
            {suggestedWords.map((suggestion, index) => (
              <div
                id='suggestions-box'
                key={index}
                className='p-2 hover:bg-gray-100 cursor-pointer'
                onClick={() => acceptChildSuggestion(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Searchbar;
