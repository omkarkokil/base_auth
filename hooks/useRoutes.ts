import { usePathname } from "next/navigation";
import { useMemo } from "react";


const useRoutes = () => {
    const pathname = usePathname()

    const routes = useMemo(() => [
        {
            label: "Dashboard",
            href: "/dashboard",
            active: pathname === "/dashboard",
            isAdmin: true,
        },
        {
            label: "Dashboard",
            href: "/dashboard",
            active: pathname === "/dashboard"
        }
    ], [])

    return routes;
}