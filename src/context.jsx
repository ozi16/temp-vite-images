import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const getInitialDarkMode = () => {
        const preferDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
        const storeDarkMode = localStorage.getItem('darkTheme') === 'true';
        return storeDarkMode || preferDarkMode;
    }

    const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
    const [searchTerm, setSearchTerm] = useState('dog');
    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        localStorage.getItem('darkTheme', newDarkTheme)
    }

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkTheme);

    }, [isDarkTheme]);

    return (
        <AppContext.Provider value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);