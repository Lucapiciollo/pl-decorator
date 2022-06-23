/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc  centralizza la gestione delle eccezioni
 * @example @TryCatch(errorClass:ErrorHandle)
 */
/****************************************************************************************************************** */
export interface ErrorHandle {
    handleError(error: Error, propertyKey: string): any;
}
/****************************************************************************************************************** */
export declare const TryCatch: (errorHandle: new () => ErrorHandle) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
/****************************************************************************************************************** */
