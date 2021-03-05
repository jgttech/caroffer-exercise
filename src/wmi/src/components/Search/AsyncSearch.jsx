import { loadable } from "@wmi/framework";

export const AsyncSearch = loadable("Search", () => import("./Search"), () => <></>);