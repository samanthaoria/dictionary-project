import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Results } from "./Results";
import { Photos } from "./Photos";
import "./Dictionary.css";

type Search = {
  keyword: string;
  handleDictionaryResponse: (response: any) => void;
  setResults: (results: any[]) => void;
  handlePexelsResponse: (response: any) => void;
  setPhotos: (photos: any[]) => void;
};

function search({
  keyword,
  handleDictionaryResponse,
  handlePexelsResponse,
  setResults,
  setPhotos,
}: Search) {
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

export default function Dictionary(props: any) {
  const [keyword, setKeyword] = useState(props.defaultKeyword);
  const [results, setResults] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  const handleDictionaryResponse = useCallback(
    (response: any) => {
      setResults(response.data[0]);
    },
    [setResults]
  );

  const handlePexelsResponse = useCallback(
    (response: any) => {
      setPhotos(response.data.photos);
    },
    [setPhotos]
  );

  useEffect(() => {
    if (!loaded) {
      search({
        keyword,
        setResults,
        setPhotos,
        handleDictionaryResponse,
        handlePexelsResponse,
      }).finally(() => setLoaded(true));
    }
  }, [
    loaded,
    keyword,
    setResults,
    setPhotos,
    handleDictionaryResponse,
    handlePexelsResponse,
  ]);

  function handleSubmit(event: any) {
    event.preventDefault();
    search({
      keyword,
      setResults,
      setPhotos,
      handleDictionaryResponse,
      handlePexelsResponse,
    });
  }

  function handleKeywordChange(event: any) {
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
    <div>"Loading..."</div>
  );
}
