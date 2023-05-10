/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc  centralizza la gestione delle eccezioni
 * @example @TryCatch(errorClass:ErrorHandle) 
 */



/****************************************************************************************************************** */
/* @Singleton */
export interface   ErrorHandle {
     handleError(error: any,  propertyKey: string);
}
/****************************************************************************************************************** */
export const TryCatch = (errorHandle: new () => ErrorHandle) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        let original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            try {
                return original.apply(this, args);
            } catch (e) {
               let app= new errorHandle();
               app.handleError(e, propertyKey)
            }
        }
        return descriptor;
    }
};
/****************************************************************************************************************** */
