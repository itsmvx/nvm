import { useContext } from "react";
import { AccountContext, AccountContextType } from "@/contexts/AccountProvider";

export const useAccountContext = () => {
    const {
        formState,
        formDispatch,
        fetchState,
        fetchDispatch
    } = useContext(AccountContext) as AccountContextType;

    return {
        formState: formState,
        formDispatch: formDispatch,
        fetchState: fetchState,
        fetchDispatch: fetchDispatch
    };
};
