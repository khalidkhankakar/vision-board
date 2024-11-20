'use client'

import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/use-debounce";
import { Search } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from 'query-string'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const deboundedSearchTerm = useDebounce(searchTerm, 500);
    const router = useRouter();

    useEffect(()=>{
        const url = qs.stringifyUrl({
            url: window.location.href,
            query: {
                search: deboundedSearchTerm
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }, [router, deboundedSearchTerm])

  return (
    <div className='max-w-md hidden   border bg-white border-gray-100 relative lg:flex items-center rounded-lg py-1 px-3 gap-x-2 '>
     <Search />
     <Input
     placeholder="Search your boards..."
     onChange={(e)=>setSearchTerm(e.target.value)}
     value={searchTerm}
     className='text-xl focus-visible:ring-0 shadow-none outline-none ring-0 border-none ' /> 
    </div>
  )
}

export default SearchBar
