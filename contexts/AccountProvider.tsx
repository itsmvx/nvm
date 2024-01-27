'use client';
import { createContext, Dispatch, ReactNode, useReducer } from "react";

// <--- Deklarasi Types Reducer ---> //
type FormStateType = {
    npm: {
        value: string;
        isValid: boolean;
        isUnique: boolean | null;
    }
    password: {
        value: string;
        isVisible: boolean;
    }
};
type FormActionType = {
    type: 'SET_NPM_VALUE';
    payload: string;
} | {
    type: 'SET_NPM_UNIQUE';
    payload: boolean;
} | {
    type: 'SET_PASSWORD_VALUE';
    payload: string;
} | {
    type: 'SET_PASSWORD_VISIBILITY';
    payload: boolean;
} | {
    type: 'RESET';
};

type FetchStateType = {
    onUniqueCheck: boolean;
    uniqueCheckResult: boolean | null;
    onFormSubmit: boolean;
    formSubmitResult: boolean | null;
};
type FetchActionType = {
    type: 'SET_ON_UNIQUE_CHECK';
    payload: boolean;
} | {
    type: 'SET_UNIQUE_CHECK_RESULT';
    payload: boolean | null;
} | {
    type: 'SET_ON_FORM_SUBMIT';
    payload: boolean;
} | {
    type: 'SET_FORM_SUBMIT_RESULT';
    payload: boolean | null;
} | {
    type: 'RESET';
};

// <--- End of Types -->
export type AccountContextType = {
    formState: {
        npm: {
            value: string;
            isValid: boolean;
            isUnique: boolean | null;
        }
        password: {
            value: string;
            isVisible: boolean;
        }
    };
    formDispatch: Dispatch<FormActionType>;
    fetchState: {
        onUniqueCheck: boolean;
        uniqueCheckResult: boolean | null;
        onFormSubmit: boolean;
        formSubmitResult: boolean | null;
    };
    fetchDispatch: Dispatch<FetchActionType>;
}
export const AccountContext = createContext<AccountContextType | null>(null);

const AccountProvider = ({ children }: { children: ReactNode }) => {
    const formInitialState: FormStateType = {
        npm: {
            value: '',
            isValid: false,
            isUnique: null
        },
        password: {
            value: '',
            isVisible: false
        }
    };
    const formReducer = (state: FormStateType, action: FormActionType) => {
        switch (action.type) {
            case 'SET_NPM_VALUE':
                return {
                    ...state,
                    npm: {
                        ...state.npm,
                        value: action.payload,
                        isValid: !!action.payload.match(/^\d+$/)
                    }
                };
            case 'SET_NPM_UNIQUE':
                return {
                    ...state,
                    npm: {
                        ...state.npm,
                        isUnique: action.payload
                    }
                };
            case 'SET_PASSWORD_VALUE':
                return {
                    ...state,
                    password: {
                        ...state.password,
                        value: action.payload
                    }
                };
            case 'SET_PASSWORD_VISIBILITY':
                return {
                    ...state,
                    password: {
                        ...state.password,
                        isVisible: action.payload
                    }
                };
            case 'RESET':
                return {
                    ...formInitialState
                };
            default:
                return state;
        }
    };
    const [ formState, formDispatch ] = useReducer(formReducer, {
        npm: {
            value: '',
            isValid: false,
            isUnique: null
        },
        password: {
            value: '',
            isVisible: false
        }
    });


    const fetchInitialState: FetchStateType = {
        onUniqueCheck: false,
        uniqueCheckResult: null,
        onFormSubmit: false,
        formSubmitResult: null
    };
    const fetchReducer = (state: FetchStateType, action: FetchActionType) => {
        switch (action.type) {
            case 'SET_ON_UNIQUE_CHECK':
                return {
                    ...state,
                    onUniqueCheck: action.payload
                };
            case 'SET_UNIQUE_CHECK_RESULT':
                return {
                    ...state,
                    uniqueCheckResult: action.payload
                };
            case 'SET_ON_FORM_SUBMIT':
                return {
                    ...state,
                    onFormSubmit: action.payload
                };
            case 'RESET':
                return {
                    ...fetchInitialState
                };
            default:
                return state;
        }
    };

    const [ fetchState, fetchDispatch ] = useReducer(fetchReducer, {
        onUniqueCheck: false,
        uniqueCheckResult: null,
        onFormSubmit: false,
        formSubmitResult: null
    });

    return (
        <>
            <AccountContext.Provider value={{
                formState, formDispatch,
                fetchState, fetchDispatch
            }}>
                { children }
            </AccountContext.Provider>
        </>
    );
};

export default AccountProvider;
