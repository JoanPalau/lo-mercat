import { IncomingMessage } from 'http';

import * as Parser from 'ua-parser-js';


export const isMobile = (request: IncomingMessage | undefined) => {

    const userAgent = Parser(request.headers['user-agent'] || '')

    console.log(userAgent);

    return userAgent?.device?.type === "mobile";
}