import { Components } from "./components.mjs";

export const clamp = (x, minVal, maxVal) => 
    Math.min(Math.max(x, minVal), maxVal);