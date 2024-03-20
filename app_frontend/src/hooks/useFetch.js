import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useFetch = (queryKey, url) => {
    const fetch = async() => {
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            return error.message
        }
    }

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: [queryKey],
        queryFn: fetch
    })
    console.log(data)

    return { isLoading, error, isFetching, data, isError }
}

export default useFetch