import axios from "axios";

export default axios.create({
    // eslint-disable-next-line no-undef
    baseURL: import.meta.env.REACT_APP_BASE_URL
})