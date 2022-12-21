import { NextPageContext } from 'next';

export const getApiUrl = (context: NextPageContext): string  => {
  return process.env.NODE_ENV === "production" ? 
  `http://${context.req.rawHeaders[1]}` : 
  "http://localhost:3000";
}

export default getApiUrl;