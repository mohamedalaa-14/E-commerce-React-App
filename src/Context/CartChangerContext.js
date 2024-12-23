import { createContext, useState } from "react";

export const cart = createContext("");
export default function CartChangerContext({children}) {
const [isChange, setIschange] = useState(true);
return(
    <cart.Provider value={{isChange, setIschange}}>{children}</cart.Provider>
)
}