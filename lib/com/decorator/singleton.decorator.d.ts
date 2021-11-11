/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc Decorator for class code
 */
/****************************************************************************************************************** */
export declare const SINGLETON_KEY: unique symbol;
/****************************************************************************************************************** */
export declare type Singleton<T extends new (...args: any[]) => any> = T & {
    [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};
/****************************************************************************************************************** */
export declare const Singleton: <T extends new (...args: any[]) => any>(type: T) => T;
/****************************************************************************************************************** */
