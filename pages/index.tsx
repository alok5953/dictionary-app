import Header from '@/components/Header';
import Searchbar from '@/components/Searchbar';
import { useState } from 'react';
import WordList from '@/components/Wordlist';

export default function Home() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [suggestedWords, setSuggestedWords] = useState<Array<string>>([]);
  const [mode, setMode] = useState<string>('light');
  const [searchResult, setSearchResult] = useState([]);

  function toggleDarkMode() {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark');
  }

  const fetchResult = (word: string) => {
    fetch(`${process.env.NEXT_PUBLIC_APP_API}${searchWord}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setSearchResult(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResult(searchWord);

    fetch('/api/addWord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: searchWord }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('first');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (word: string) => {
    setSearchWord(word);
    if (!word) return;
    fetch('/api/suggestWords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prefix: word }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.data);
        setSuggestedWords(data.data);
      });
  };

  const acceptSuggestion = (suggestion: string) => {
    setSearchWord(suggestion);
    fetchResult(suggestion);
  };

  return (
    <>
      <Header changeMode={toggleDarkMode} />
      <Searchbar
        suggestedWords={suggestedWords}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        acceptSuggestion={acceptSuggestion}
        word={searchWord}
      />
      {searchResult && <WordList data={searchResult} />}
    </>
  );
}
