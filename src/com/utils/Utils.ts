import { Singleton } from "../decorator/singleton.decorator";
const moment = require("moment");

@Singleton
export class Utils {

    log = (msg, mode: "log" | "debug" | "info" | "warn" = "log") => {
        console[mode]("%c" + [moment().format("HH:mm:ss"), ...msg].join(" "), "color: blue");
    }
}