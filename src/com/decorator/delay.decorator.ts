/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc  trasforma una funzione in una promessa temporizzata.. l'esecuzione della stessa avviene al tempo stabilito nel parametro d'ingresso
 * @example @Delay(1000) 
 * 
 */


const { interval, take } = require('rxjs');
import { Utils } from "../utils/Utils";


/****************************************************************************************************************** */
export const Delay = (milliseconds: number = 0) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        let original = descriptor.value;
        let utils = new Utils();
        utils.log([" - Delay - Class; ", target.constructor.name, "Method:", propertyKey, "REGISTERED"].join(" "))
        descriptor.value = function (...args) {
            return new Promise<any>((ok, ko) => {
                interval(milliseconds).pipe(
                    take(1)
                ).toPromise().then(value => {
                    ok(original && original.apply(this, args));
                    utils.log([" - Delay - Class; ", target.constructor.name, "Method:", propertyKey, "EXCUTED"].join(" "));
                }).catch(error => {
                    ko(error)
                })
            });
        }
        return descriptor;
    }
};