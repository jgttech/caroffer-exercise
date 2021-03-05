import { loadable } from "@wmi/framework";

export const AsyncApp = loadable("App", () => import("./App"), () => <></>);