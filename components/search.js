import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";


// This component is used to provide search bar with the ability to perform a search
function Search (props) {
return(
    <div classNames="mx-4 mt-2 flex flex-col gap-2">
    <form action="/api/searchnoteapi" method='POST'>
        <Input
            name="search" id="search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
                size:"w-16" ,
            }}
            color="primary"
            labelPlacement="outside"
            placeholder="Search by Title or Tags..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
        />
    </form>
    </div>
)
}

export default Search;