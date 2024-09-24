import axios from "axios";
import { useState, useEffect } from "react";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** custom hook */
export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        // Début du chargement
        setData((prev) => ({ ...prev, isLoading: true }));

        const { data, status } = await axios.get(`/api/${query}`);

        if (status === 200 || status === 201) {
          // Mise à jour des données et arrêt du chargement
          setData((prev) => ({
            ...prev,
            apiData: data,
            status: status,
            isLoading: false,
          }));
        } else {
          // Si le statut n'est pas OK, arrêtez le chargement
          setData((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        // Gestion des erreurs
        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error,
        }));
      }
    };

    fetchData();
  }, [query]);

  return [getData, setData];
}
