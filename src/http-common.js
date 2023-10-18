import axios from "axios";


export default axios.create({
    baseURL: "https://dzanko87-001-site1.dtempurl.com/ap1/v1",
    headers: {
        "Content-Type": "application/json"
    }
});