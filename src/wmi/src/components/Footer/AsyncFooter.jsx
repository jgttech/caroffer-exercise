import { loadable } from "@wmi/framework";

export const AsyncFooter = loadable("Footer", () => import("./Footer"), () => <></>);