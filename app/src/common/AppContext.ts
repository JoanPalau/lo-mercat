import React from 'react';

import type { AppContextInterface } from '../types/AppContext';

const AppContext = React.createContext<AppContextInterface | null>(null);
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;