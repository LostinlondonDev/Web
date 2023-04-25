import { useState } from "react"

interface Params {
    language: string
}

export function useHref(props:Params){
    const [language, setLanguage] = useState(props.language)
    const [url, setUrl] = useState(`/${language}/`)

    const setStateLink = (href:string) => {
        setUrl(url => `${url}/${href}`)
    }
    
    return [url, setStateLink]
}