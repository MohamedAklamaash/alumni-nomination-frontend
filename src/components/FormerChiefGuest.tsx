


const GuestCard = () => {

    return <div className="flex flex-col rounded-xl bg-white p-5 border shadow-2xl">
        Sample King
    </div>

};

const FormerChiefGuest = () => {
  return (
    <div className="relative bg-gradient-to-bl from-indigo-800 via-blue-900 to-gray-800 min-h-screen px-10 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_60%)]" />
      <div className="flex flex-col w-[80%] items-center">
        <div>
        <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-platinum-300 to-indigo-200">
          Former Chief Guests
        </span>
      </div>
      </div>
    </div>
  )
}

export default FormerChiefGuest