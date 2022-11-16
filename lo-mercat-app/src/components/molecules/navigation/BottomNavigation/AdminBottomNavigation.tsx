import Link from "../../../../common/Link";
import Home from "@mui/icons-material/Home";

import * as URL from "@constants/navigation";

import GenericBottomNavigation from "@common/BottomNavigation";

const options = [
    {
        component: Link,
        label: "Home",
        value: "home",
        icon: <Home />,
        href: URL.DEFAULT.url
    },
    {
        component: Link,
        label: "Home",
        value: "home",
        icon: <Home />,
        href: "/",
    },
    {
        component: Link,
        label: "Home",
        value: "home",
        icon: <Home />,
        href: "/"
    },
    {
        component: Link,
        label: "Home",
        value: "home",
        icon: <Home />,
        href: "/",
    }

];

const AdminBottomNavigation = () => {
    return false;
}