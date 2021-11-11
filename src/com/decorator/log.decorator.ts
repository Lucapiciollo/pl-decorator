/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc   decoratore di metodo Log si occupa di loggare l'inizio la fine dell esecuzione delle funzioni e anche la risposta con i paramentri d'ingresso
 * @example @Log("log" | "debug" | "info" | "warning") 
 */
 const moment = require("moment");

/****************************************************************************************************************** */
export const Log = (mode: "log" | "debug" | "info" | "warn" = "log") => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const colorTrace = (msg: any) => {
                // @ts-ignore
                console[mode]("%c" + msg, "color: white; background:blue");
        }
        let original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            colorTrace([moment().format("HH:mm:ss"), "- Called method START: ", target.constructor.name, "=>", propertyKey,JSON.stringify(args)].join(" "))
            const result = original.apply(this, args);
            colorTrace([moment().format("HH:mm:ss"), " - Called method END: ", target.constructor.name, "=>", propertyKey, result == undefined ? "-NO RESULT-" : JSON.stringify(result)].join(" "))
            return result;
        }
        return descriptor;
     }
};
/****************************************************************************************************************** */
