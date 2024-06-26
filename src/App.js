import { useEffect, useState } from 'react';
import './App.css';
import ToggleButton from './ToggleButton';

function App() {
  const [input, setInput] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [languages, setLanguages] = useState([]);
  const [initialLanguage, setInitialLanguage] = useState('en');

  useEffect(() => {
    if (input) {
      detectLanguage();
    }
  }, [input]);

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

  const detectLanguage = async () => {
    const url =
      'https://deep-translate1.p.rapidapi.com/language/translate/v2/detect';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'b0e89bfd42msh747daaa95fe1c36p134064jsn6a70575154d2',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: input,
        data: {
          detections: [
            {
              language: 'initialLanguage',
              isReliable: false,
              confidence: 0.9867512,
            },
          ],
        },
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setInitialLanguage(result.data.detections[0].language);
    } catch (error) {
      console.error(error);
    }
  };

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
        <p>By Will</p>
      </div>
      <form>
        <div>
          <div>
            <select
              className="setFirstLanguage"
              value={initialLanguage}
              onChange={(e) => setInitialLanguage(e.target.value)}
            >
              {languages.map((language) => (
                <option key={language.language} value={language.language}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
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
      <div>
        <button className="translateButton" onClick={translate}>
          Translate
        </button>
      </div>
      <div>
        <ToggleButton />
      </div>
    </div>
  );
}

export default App;
