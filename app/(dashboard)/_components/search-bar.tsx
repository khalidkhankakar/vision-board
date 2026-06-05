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
    <div className='hidden w-full max-w-xl items-center gap-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-1.5 shadow-sm lg:flex'>
     <Search className="h-4 w-4 shrink-0 text-[var(--color-ink-3)]" />
     <Input
     placeholder="Search your boards..."
     onChange={(e)=>setSearchTerm(e.target.value)}
     value={searchTerm}
     className='h-9 border-none bg-transparent px-0 text-sm shadow-none outline-none ring-0 placeholder:text-[var(--color-ink-3)] focus-visible:ring-0' /> 
    </div>
  )
}

export default SearchBar
