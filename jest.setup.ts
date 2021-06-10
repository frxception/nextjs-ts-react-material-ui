// jest.setup.ts
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
require("dotenv").config()
import fetch from "isomorphic-unfetch";

// const fetchPolifill = require('whatwg-fetch')
global.fetch = fetch
// global.fetch = fetchPolifill.fetch
// global.Request = fetchPolifill.Request
// global.Headers = fetchPolifill.Headers
// global.Response = fetchPolifill.Respons

process.env = Object.assign(process.env, {
    REMOTE_API_URL: 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io',
    API_URL: 'http://localhost:3000/api'
  });

  jest.setTimeout(50000);
