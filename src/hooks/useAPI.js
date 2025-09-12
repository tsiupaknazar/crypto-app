import { useState, useEffect } from "react";
import axios from "axios";

export function useAPI(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpoint) return;

        const controller = new AbortController();

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const res = await axios.get(`https://api.coingecko.com/api/v3/${endpoint}`, {
                    signal: controller.signal,
                });
                setData(res.data);
            } catch (err) {
                if (err.name !== "CanceledError") {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => controller.abort();
    }, [endpoint]);

    return { data, loading, error };
}