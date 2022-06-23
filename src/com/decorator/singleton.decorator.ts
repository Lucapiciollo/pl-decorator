/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc Decorator for class code
 */

/*
  decoratore singleton, rende una classe singleton, la prima creata verrà sempre restituita
*/
/****************************************************************************************************************** */
export const SINGLETON_KEY = Symbol();
/****************************************************************************************************************** */
export type Singleton<T extends new (...args: any[]) => any> = T & {
    [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never
};
/****************************************************************************************************************** */
export const Singleton = <T extends new (...args: any[]) => any>(type: T) =>
    new Proxy(type, {
        construct(target: Singleton<T>, argsList, newTarget) {
            console.info(`%c PL-decorator Singleton -  Class: ${type.name} is in singleton mode...`, `color: blue `)
            if (target.prototype !== newTarget.prototype) {
                return Reflect.construct(target, argsList, newTarget);
            }
            if (!target[SINGLETON_KEY]) {
                target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
            }
            return target[SINGLETON_KEY];
        }
    });
/****************************************************************************************************************** */
