import { useState } from "react";
import useLocalStorage from "./useLocalStorage";


const useToggle = (key, initailValue) => {
    const [value, setvalue] = useLocalStorage(key, initailValue);

    const toggle = (value) => {
        setvalue(prev => {
            return typeof value === "boolean" ? value :!prev ;
        })

    }
    return [value,toggle];

}

export default useToggle;