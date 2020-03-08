import axios from "axios";

export default { get: api => axios.get("https://jsonplaceholder.typicode.com" + api) };
