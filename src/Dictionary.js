import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary(props) {
  const [keyword, setKeyword] = useState(props.defaultKeyword);
  const [results, setResults] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function search() {
    //documentation: https://dictionaryapi.dev/
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios
      .get(apiUrl)
      .then(handleDictionaryResponse)
      .catch((e) => {
        console.error(e);
        setResults([]);
      });

    const pexelsApiKey =
      "563492ad6f91700001000001d5bad6b6e7664d2ab9a68ebc7f635988";
    const pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=6`;
    const headers = { Authorization: `Bearer ${pexelsApiKey}` };
    return axios
      .get(pexelsApiUrl, { headers })
      .then(handlePexelsResponse)
      .catch((e) => {
        console.error(e);
        setPhotos([]);
      });
  }

  useEffect(() => {
    if (!loaded) {
      search().finally(() => setLoaded(true));
    }
  }, [search]);

  function handleDictionaryResponse(response) {
    setResults(response.data[0]);
  }

  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return loaded ? (
    <div className="Dictionary">
      <section>
        <h1> What word do you want to look up?</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="defaultWord"
            type="search"
            onChange={handleKeywordChange}
            defaultValue={props.defaultKeyword}
          />
        </form>
        <div className="hint">
          Write the word and press enter. Suggested words: sunrise, beer,
          pilates...
        </div>
      </section>
      <Results results={results} />
      <Photos photos={photos} />
    </div>
  ) : (
    "Loading..."
  );
}
