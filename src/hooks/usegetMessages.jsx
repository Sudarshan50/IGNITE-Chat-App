import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const usegetMessages = () => {
    const {selectedUser} = useSelector(store => store.user)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:3000/api/v1/message/${selectedUser._id}`);
                console.log(res);
                dispatch(setMessages(res.data));
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessages();
    }, [selectedUser])
}

export default usegetMessages