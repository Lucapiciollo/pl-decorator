/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc  trasforma una funzione in una promessa temporizzata.. l'esecuzione della stessa avviene al tempo stabilito nel parametro d'ingresso
 * @example @Delay(1000)
 *
 */
/****************************************************************************************************************** */
export declare const Delay: (milliseconds?: number) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
