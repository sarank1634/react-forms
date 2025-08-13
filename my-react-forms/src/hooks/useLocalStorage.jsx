import {useState, useEffect} from 'react';

const getLocalValue = (key, initialValue) => {
    //ssr
    if(typeof window === 'undefined') return initialValue;

    // if a value already stored
    const raw = localStorage.getItem(key);
    try {
        if (raw === null || raw === undefined || raw === 'undefined') {
            throw new Error('no-valid-value');
        }
        const parsed = JSON.parse(raw);
        if (parsed !== null && parsed !== undefined) return parsed;
    } catch {
        // ignore and fall back to initialValue below
    }

    // return initial value
    if(initialValue instanceof Function) return initialValue();
    
    return initialValue;
}

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => getLocalValue(key, initialValue));

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage;