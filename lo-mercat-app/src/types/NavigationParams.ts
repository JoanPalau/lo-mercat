export type NavigationParams = {
    title: string,  // Used in the Web, title of the page 
    nav: string     // Used in mobile to indicate the current location
    value: string | undefined   // Used to determine where I am right now
};