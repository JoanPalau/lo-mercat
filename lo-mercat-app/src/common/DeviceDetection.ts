import { IncomingMessage } from 'http';

import * as Parser from 'ua-parser-js';


export const isMobile = (request: IncomingMessage | undefined) => {
    let userAgent;

    if(request) {
        userAgent = Parser.UAParser(request.headers['user-agent'] || '');
    }

    return userAgent?.device?.type === "mobile";
}