import { loadable } from "@wmi/framework";

export const AsyncTable = loadable("Table", () => import("./Table"), () => <></>);