import {useEffect, useState} from "react";

export const useSearch = (setFilters : (value: any) => void, listLoad : () => void)  => {
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setFilters(searchValue)

        let timer = setTimeout(() => {
            listLoad()
        }, 400)

        return () => clearTimeout(timer)
    }, [searchValue])

    return { searchValue, setSearchValue }
}
