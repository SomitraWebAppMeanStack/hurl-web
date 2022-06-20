import { useSelector } from "react-redux";

const Token = () => {
const token = useSelector((state)=>state.token);
// const token =  localStorage.getItem('Hurl_token');
;
    return (
        { token }
    )
}

const UserId = () => {
    const user_id = localStorage.getItem('user_id');

    return (
        { user_id }
    )
}

const PathUrl = () => {
    const url = 'http://3.9.246.8/api';
    return (
        { url }
    )
}

export { Token, UserId, PathUrl }