import React from 'react';

const WordList = ({ data }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:mx-12 md:my-8 m-4'>
      {data.map((wordItem, index) => (
        <div
          key={index}
          className='p-4 bg-white dark:bg-gray-600 shadow-lg rounded-lg space-y-2'
        >
          <h2 className='text-2xl font-semibold'>
            {wordItem.word}
            <small className='text-sm text-gray-500'>{wordItem.phonetic}</small>
          </h2>
          {wordItem.phonetics.map((phonetic, phoneticIndex) => (
            <div key={phoneticIndex} className='space-y-1'>
              <audio controls src={phonetic.audio}>
                Your browser does not support the audio element.
              </audio>
              <a
                href={phonetic.sourceUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:text-blue-700 underline'
              >
                Source
              </a>
            </div>
          ))}
          {wordItem.meanings.map((meaning, meaningIndex) => (
            <div key={meaningIndex} className='space-y-1'>
              <h3 className='text-xl font-bold'>
                {meaning.partOfSpeech?.slice(0, 1)?.toUpperCase() +
                  meaning.partOfSpeech?.slice(1)}
              </h3>
              <ul className='list-disc list-inside'>
                {meaning.definitions.map((definition, definitionIndex) => (
                  <li key={definitionIndex}>
                    {definition.definition}
                    {definition.example && (
                      <em className='text-gray-600'>
                        {' '}
                        (e.g. {definition.example})
                      </em>
                    )}
                  </li>
                ))}
              </ul>
              <div>
                <span className='text-md font-regular text-gray-500'>
                  Synonyms
                </span>
                : {meaning.synonyms.join(', ') || 'None'}
              </div>
              <div>
                <span className='text-md font-regular text-gray-500'>
                  Antonyms
                </span>
                : {meaning.antonyms.join(', ') || 'None'}
              </div>
            </div>
          ))}
          <div>
            License:{' '}
            <a
              href={wordItem.license.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:text-blue-700 underline'
            >
              {wordItem.license.name}
            </a>
          </div>
          <div>
            Sources:
            {wordItem.sourceUrls.map((url, urlIndex) => (
              <div key={urlIndex}>
                <a
                  key={urlIndex}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:text-blue-700 underline mx-1'
                >
                  {url}
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordList;
