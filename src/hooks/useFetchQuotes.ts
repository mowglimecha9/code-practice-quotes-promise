import { useState, useEffect } from "react";
export type Quote = {
    content: string;
    author: string;
}

const BASE_URL = 'https://api.quotable.io/';
export function useFetchQuotes() {

    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        async function getQuotes() {
            try {
                const response = await fetch(BASE_URL + 'random');
                const data = await response.json();
                setQuote(data);
            } catch (error) {
                setError(error as Error)
            } finally {
                setLoading(false)
            }
        }

        getQuotes()
    }, [])

    const fetchNextQuote = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(BASE_URL + 'random');
            const data = await response.json();
            setQuote(data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }

    };



    return { quote, loading, error,fetchNextQuote };



}