/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc  centralizza la gestione delle eccezioni
 * @example @TryCatch(errorClass: ErrorHandle)
 */

/****************************************************************************************************************** */
/* @Singleton */
export interface ErrorHandle {
    handleError(error: Error, className: string, methodName: string): void;
}
/****************************************************************************************************************** */
export const TryCatch = (ErrorHandlerType: new () => ErrorHandle) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            // Nome della classe: prima provo da this, poi da target
            const className =
                (this && this.constructor && this.constructor.name) ||
                (target && target.constructor && target.constructor.name) ||
                'UnknownClass';

            try {
                const result = original.apply(this, args);
                if (result instanceof Promise) {
                    return result.catch((e: any) => {
                        const handler = new ErrorHandlerType();
                        handler.handleError(e, className, propertyKey);

                    });
                }


                return result;
            } catch (e: any) {
                const handler = new ErrorHandlerType();
                handler.handleError(e, className, propertyKey);

            }
        };

        return descriptor;
    };
};
/****************************************************************************************************************** */
