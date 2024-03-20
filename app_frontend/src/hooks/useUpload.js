import { RestartAltOutlined } from "@mui/icons-material"
import { useCallback } from "react"

const useUpload = (url) => {    

    const upload = useCallback( async(body) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body,
            })
            const result = await response.json()
            console.log(result.message)
    
            if(response.status === 200) {return result.message}
            else { return result.message }
            

        } catch (error) {
            console.log(error.message)
        }
    }, [url])

    return { upload }
}

export default useUpload