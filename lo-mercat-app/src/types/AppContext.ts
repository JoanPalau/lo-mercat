import type { NavigationParams } from "./NavigationParams";

export type AppContextInterface = {
    lang: string,
    navigation: NavigationParams,
    data: object, // no data stored at the moment
    handleLangChange: (context: AppContextInterface, newLang: string) => AppContextInterface,
    handleNavigationChange: (context: AppContextInterface, newNavigation: NavigationParams) => AppContextInterface
    handleDataChange: (context: AppContextInterface, newData: object) => AppContextInterface
};