// This file, together with the logService, get
//
// npm i axios react-toastify
//
// in App.js:
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// include in the app, just above the NavBar: <ToastContainer />
//
// to use this file, import it in the desired script (import http from './____') and
// then do e.g. http.get('___'), which returns a promise that has to be awaited and saved
// in a variable: const {data} = await http.get()

import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
