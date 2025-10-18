import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvide = ({ children }) => {

    const [auth, setAuth] = useState({
        keyword: "",
        result: []
    });


    return (
        < SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearch = () => useContext(SearchContext)

export { useSearch, SearchProvide }