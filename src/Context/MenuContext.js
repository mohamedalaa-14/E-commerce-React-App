import { createContext, useState } from "react";

export const Menu = createContext("");
export default function MenuContext({children}) {
const [isopen, setIsopen] = useState(true);
return(
    <Menu.Provider value={{isopen, setIsopen}}>{children}</Menu.Provider>
)
}