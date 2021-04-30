import axios from "axios";

export default axios.create({
  baseURL: "https://atodolist-api.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});