import axios from "axios"


const handleDelete = async(id, refetchFn, location) => {
    const keywords = ['/house', '/tenants']
    const keyword = keywords.includes(location.pathname) && keywords[keywords.indexOf(location.pathname)]
    console.log(keyword)
    const url = `http://localhost:5000/api${keyword}/remove/${id}`
    try {
        const res = await axios.delete(url)
        console.log(res.data)
        refetchFn()
    } catch (error) {
        console.log(error)
    }
}

export default handleDelete