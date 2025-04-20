import chief_guest_24 from "@/constants/chiefguest2024";
import { ChiefGuestContext } from "@/hooks/useChiefGuest";
import { ChiefGuestContextProviderProps, ChiefGuestType } from "@/types/chiefguest.type";
import { useState } from "react";


const ChiefGuestContextProvider = ({children}:ChiefGuestContextProviderProps) => {


    const [guest,setGuest] = useState<ChiefGuestType>(chief_guest_24);
    return <ChiefGuestContext.Provider value={{
        guest:guest,
        setGuest:setGuest
    }}>
        {children}
    </ChiefGuestContext.Provider>

}

export default ChiefGuestContextProvider;