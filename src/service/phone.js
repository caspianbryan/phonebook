import axios from 'axios'
const url = 'http://localhost:3001/api/persons'

const getAll = () =>{
    const req = axios.get(url)
    return req.then (res => res.data)
}
const create = (newPhoneNum) =>{
    const req = axios.post(url, newPhoneNum)
    return req.then (res => res.data)
}
const update = (id, newPhoneNum) =>{
    const req = axios.put(`${url}/${id}`, newPhoneNum)
    return req.then (res => res.data)
}
const remove = (id) => {
    const req = axios.delete(`${url}/${id}`);
    return req.then((res) => res.data)
}


export default {getAll, create, update, remove}