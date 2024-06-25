import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [translatedText, setTranslatedText] = useState('Loading...');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const url =
        'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            'b0e89bfd42msh747daaa95fe1c36p134064jsn6a70575154d2',
          'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setLanguages(data.languages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLanguages();
  }, []);

  const translate = async () => {
    const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'b0e89bfd42msh747daaa95fe1c36p134064jsn6a70575154d2',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: input,
        source: 'en',
        target: targetLanguage,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setTranslatedText(data.data.translations.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Translate</h1>
        <h5>By Will</h5>
      </div>
      <form>
        <div>
          <input
            type="text"
            className="inputText"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to translate"
          />
        </div>
      </form>
      <p className="translatedText">{translatedText}</p>
      <select
        className="selectLanguage"
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        {languages.map((language) => (
          <option key={language.language} value={language.language}>
            {language.name}
          </option>
        ))}
      </select>
      <button className="translateButton" onClick={translate}>
        Translate
      </button>
    </div>
  );
}

export default App;
