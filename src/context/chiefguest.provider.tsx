import chief_guest_25 from "@/constants/chiefguest2025";
import { ChiefGuestContext } from "@/hooks/useChiefGuest";
import { ChiefGuestContextProviderProps, ChiefGuestType } from "@/types/chiefguest.type";
import { useState } from "react";


const ChiefGuestContextProvider = ({children}:ChiefGuestContextProviderProps) => {


    const [guest,setGuest] = useState<ChiefGuestType>(chief_guest_25);
    return <ChiefGuestContext.Provider value={{
        guest:guest,
        setGuest:setGuest
    }}>
        {children}
    </ChiefGuestContext.Provider>

}

export default ChiefGuestContextProvider;