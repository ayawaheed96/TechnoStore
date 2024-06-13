import { SetStateAction } from "react"

interface SearchProps{
    searchedTxt:string
    setSearchedTxt:React.Dispatch<SetStateAction<string>>
}

const SearchBox = ({searchedTxt,setSearchedTxt}:SearchProps) => {
  return (
    <div className="lg:w-[24%] md:[80%] h-[2.5rem] my-4 p-2 border border-grey-600 shadow-md rounded-lg overflow-hidden">
            <div className="w-full flex items-center justify-between">
              <input
                type="text"
                value={searchedTxt}
                onChange={(e)=>setSearchedTxt(e.target.value)}
                className="w-[70%] outline-none"
               />
              <img 
              src="/Search.svg"
              loading="lazy"
              alt="search"
              className="w-[1.35rem] h-[1.35rem]"
              />
            </div>
          </div>
  )
}

export default SearchBox