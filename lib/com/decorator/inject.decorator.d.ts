/**
 * @author l.piciollo
 * @param type
 * @returns
 * @description Decorator class for indicate that propertie is injected
 */
export declare const Inject: <T extends new (...args: any[]) => any>(type: any) => (target: any, key: string) => void;
/**
 * @author l.piciollo
 * @param type
 * @returns
 * @description Decorator class for indicate that class is injectable. All properties that is injected signed.. will be instanced
 */
export declare const Injectable: <T extends new (...args: any[]) => any>(type: any) => any;
