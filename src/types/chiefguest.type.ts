

type ChiefGuestType = {
    name:string,
    avatar:string,
    description:string[],
    directorship:string[],
    awards:string[],
    education:string[],
}

type ChiefGuestContextProviderProps = {
  children: React.ReactNode;
};


type ChiefGuestProviderType = {
  guest: ChiefGuestType;
  setGuest: React.Dispatch<React.SetStateAction<ChiefGuestType>>;
};


export type{
    ChiefGuestType,
    ChiefGuestProviderType,
    ChiefGuestContextProviderProps
}