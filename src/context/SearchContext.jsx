import { createContext, useContext, useReducer } from 'react';

// Search context for managing flight search data
const SearchContext = createContext();

// Search actions
export const SEARCH_ACTIONS = {
    SET_SEARCH_DATA: 'SET_SEARCH_DATA',
    CLEAR_SEARCH_DATA: 'CLEAR_SEARCH_DATA',
    SET_LOADING: 'SET_LOADING',
    SET_RESULTS: 'SET_RESULTS',
    SET_ERROR: 'SET_ERROR',
    SET_FORM_DATA: 'SET_FORM_DATA',
    CLEAR_FORM_DATA: 'CLEAR_FORM_DATA',
    SET_FILTERS: 'SET_FILTERS',
    CLEAR_FILTERS: 'CLEAR_FILTERS'
};

// Search reducer
const searchReducer = (state, action) => {
    switch (action.type) {
        case SEARCH_ACTIONS.SET_SEARCH_DATA:
            return {
                ...state,
                searchData: action.payload,
                loading: false,
                error: null
            };
        case SEARCH_ACTIONS.CLEAR_SEARCH_DATA:
            return {
                ...state,
                searchData: null,
                results: null,
                loading: false,
                error: null
            };
        case SEARCH_ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SEARCH_ACTIONS.SET_RESULTS:
            return {
                ...state,
                results: action.payload,
                loading: false,
                error: null
            };
        case SEARCH_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case SEARCH_ACTIONS.SET_FORM_DATA:
            return {
                ...state,
                formData: action.payload
            };
        case SEARCH_ACTIONS.CLEAR_FORM_DATA:
            return {
                ...state,
                formData: null
            };
        case SEARCH_ACTIONS.SET_FILTERS:
            return {
                ...state,
                filters: action.payload
            };
        case SEARCH_ACTIONS.CLEAR_FILTERS:
            return {
                ...state,
                filters: null
            };
        default:
            return state;
    }
};

// Initial state
const initialState = {
    searchData: null,
    results: null,
    loading: false,
    error: null,
    formData: null,
    filters: null
};

// Search provider component
export const SearchProvider = ({ children }) => {
    const [state, dispatch] = useReducer(searchReducer, initialState);

    // Actions
    const setSearchData = (searchData) => {
        dispatch({ type: SEARCH_ACTIONS.SET_SEARCH_DATA, payload: searchData });
    };

    const clearSearchData = () => {
        dispatch({ type: SEARCH_ACTIONS.CLEAR_SEARCH_DATA });
    };

    const setLoading = (loading) => {
        dispatch({ type: SEARCH_ACTIONS.SET_LOADING, payload: loading });
    };

    const setResults = (results) => {
        dispatch({ type: SEARCH_ACTIONS.SET_RESULTS, payload: results });
    };

    const setError = (error) => {
        dispatch({ type: SEARCH_ACTIONS.SET_ERROR, payload: error });
    };

    const setFormData = (formData) => {
        dispatch({ type: SEARCH_ACTIONS.SET_FORM_DATA, payload: formData });
    };

    const clearFormData = () => {
        dispatch({ type: SEARCH_ACTIONS.CLEAR_FORM_DATA });
    };

    const setFilters = (filters) => {
        dispatch({ type: SEARCH_ACTIONS.SET_FILTERS, payload: filters });
    };

    const clearFilters = () => {
        dispatch({ type: SEARCH_ACTIONS.CLEAR_FILTERS });
    };

    const value = {
        ...state,
        setSearchData,
        clearSearchData,
        setLoading,
        setResults,
        setError,
        setFormData,
        clearFormData,
        setFilters,
        clearFilters
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook to use search context
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};

export default SearchContext;
