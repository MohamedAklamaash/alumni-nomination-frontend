import { ChiefGuestProviderType } from "@/types/chiefguest.type";
import { createContext, useContext } from "react";



const ChiefGuestContext = createContext<ChiefGuestProviderType|undefined>(undefined);



const useChiefGuestContext = () => {

    const chief_guest = useContext(ChiefGuestContext);

    if(!chief_guest)
        throw new Error("Chief Guest is not Being defined");
    
    return chief_guest;
}


export{
    useChiefGuestContext,
    ChiefGuestContext
}