/**
 * DO NOT MODIFY UNLESS YOU KNOW WHAT YOU ARE DOING
 * 
 * # CONTENTS OF THE FILE
 * This file contains all the navigation url's of the application
 * once a new page is created, this file SHOULD be updated with the
 * new path to acces the page in order to use constants and not
 * "magic numbers" in the rest of the components
 * 
 * # RULES
 * + The url has to be inserted in alphabetical order
 * + The url cannot be already in this file
 * + The url constant has to be in CAPITAL LETTERS
 * + The url should only contain the static part of it, the rest will be decided in the component
 */

// DO NOT TOUCH: Base app name & Landing Page
const name = 'Lo Mercat';

export const LANDING_PAGE = {
    url : '/',
    title: name,
    nav: ''
};

// Auth URL's
export const LOGIN = {
    url: 'auth/login',
    title: name + ' - Login',
    nav: 'Login'
}
export const SIGN_IN = {
    url: 'auth/signIn',
    title: name + ' - Sign In',
    nav: 'Sign In'
}

// Normal URL's start here
export const ANALYTICS = {
    url: '/analytics',
    title: name + ' - Analytics',
    nav: 'Analytics'
};
export const BUY_PROCESS = {
    url: '/buy',
    title: name + ' - My Purchase',
    nav: 'My Purchase'
};
export const DATA_PROTECTION = {
    url: '/data-protection',
    title: name + ' - LOPD',
    nav: 'Data Protection'
};
export const HOME = {
    url: '/home',
    title: name + ' - Home',
    nav: name
};
export const MARKET_LIST = {
    url: '/markets',
    title: name + '- Markets',
    nav: 'Markets'
};
export const MARKET_SEARCH = {
    url: '/market-search',
    title: name + '- Market Search',
    nav: 'Market Search'
};
export const NOTIFICATIONS = {
    url: '/notifications',
    title: name + ' - Notifications',
    nav: 'Notifications'
};
export const PURCHASES = {
    url: '/purchases',
    title: name + '- Purchases',
    nav: 'Purchases'
};
export const PRODUCT_SEARCH = {
    url: '/product-search',
    title: name + '- Product Search',
    nav: 'Product Search'
};
export const PROFILE = {
    url: '/profile',
    title: name + '- User Profile',
    nav: 'Profile'
};
export const STAND_SEARCH = {
    url: '/stand-search',
    title: name + '- Stand Search',
    nav: 'Stand Search'
};
export const SALES = {
    url: '/sales',
    title: name + '- Sales',
    nav: 'Sales'
};
export const STOCK = {
    url: '/stock',
    title: name + '- Stock',
    nav: 'Stock'
};
export const TERMS_OF_SERVICE = {
    url: '/terms-of-service',
    title: name + '- ToS',
    nav: 'Terms of Service'
};
export const USER_MANAGEMENT = {
    url: '/user-management',
    title: name + ' - User Management',
    nav: 'User Management'
};

// ALWAYS NEEDS TO BE THE LASTTO BE DECLARED
export const DEFAULT = HOME;