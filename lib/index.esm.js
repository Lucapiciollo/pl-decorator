import 'reflect-metadata';

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
const SINGLETON_KEY = Symbol();
/****************************************************************************************************************** */
const Singleton = (type) => new Proxy(type, {
    construct(target, argsList, newTarget) {
        console.info(`%c PL-decorator Singleton -  Class: ${type.name} is in singleton mode...`, `color: blue `);
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

/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc  centralizza la gestione delle eccezioni
 * @example @TryCatch(errorClass:ErrorHandle)
 */
/****************************************************************************************************************** */
const TryCatch = (errorHandle) => {
    return (target, propertyKey, descriptor) => {
        let original = descriptor.value;
        descriptor.value = function (...args) {
            try {
                original.apply(this, args);
            }
            catch (e) {
                let app = new errorHandle();
                app.handleError(e, propertyKey);
            }
        };
        return descriptor;
    };
};
/****************************************************************************************************************** */

/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc   decoratore di metodo Log si occupa di loggare l'inizio la fine dell esecuzione delle funzioni e anche la risposta con i paramentri d'ingresso
 * @example @Log("log" | "debug" | "info" | "warning")
 */
const moment$3 = require("moment");
/****************************************************************************************************************** */
const Log = (mode = "log") => {
    return (target, propertyKey, descriptor) => {
        const colorTrace = (msg) => {
            // @ts-ignore
            console[mode]("%c" + [moment$3().format("HH:mm:ss"), ...msg].join(" "), "color: white; background:blue");
        };
        let original = descriptor.value;
        descriptor.value = function (...args) {
            colorTrace(["- Called method START: ", target.constructor.name, "=>", propertyKey, JSON.stringify(args)].join(" "));
            const result = original.apply(this, args);
            colorTrace([" - Called method END: ", target.constructor.name, "=>", propertyKey, result == undefined ? "-NO RESULT-" : JSON.stringify(result)].join(" "));
            return result;
        };
        return descriptor;
    };
};
/****************************************************************************************************************** */

/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc Decorator for properties class, formatter date vaule
 */
const moment$2 = require("moment");
/**
 *
 * @param format
    *  YYYY: 4-digit year '2019'
    *  YY: 2-digit year '19'
    *  MMMM: Full-length month 'June'
    *  MMM: 3 character month 'Jun'
    *  MM: Month of the year, zero-padded '06'
    *  M: Month of the year '6'
    *  DD: Day of the month, zero-padded '01'
    *  D: Day of the month '1'
    *  Do: Day of the month with numeric ordinal contraction '1st'
    *  HH: hour of day from 0-24, zero-padded, '14'
    *  H: hour of day from 0-24, '14'
    *  hh: hour of day on 12-hour clock, zero-padded, '02'
    *  h: hour of the day on 12 hour clock, '2'
    *  mm: minute, zero-padded, '04'
    *  m: minute, '4'
    *  ss: second, zero-padded
    *  s: second
    *  A: 'AM' or 'PM'
    *  a: 'am' or 'pm'
 * @param localeId
 * @returns
 */
const FormatDate = (format = "DD/MM/yyyy HH:mm:ss", localeId = "it") => {
    return (target, key) => {
        let value = target[key];
        moment$2.locale(localeId);
        Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                try {
                    return moment$2(value).format(format);
                }
                catch (e) {
                    return e;
                }
            },
            set: (v) => {
                try {
                    value = moment$2(v);
                }
                catch (error) {
                    value = moment$2();
                }
            }
        });
    };
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

const moment$1 = require("moment");
let Utils = class Utils {
    constructor() {
        this.log = (msg, mode = "log") => {
            console[mode]("%c" + [moment$1().format("HH:mm:ss"), ...msg].join(" "), "color: blue");
        };
    }
};
Utils = __decorate([
    Singleton
], Utils);

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
/****************************************************************************************************************** */
const Delay = (milliseconds = 0) => {
    return (target, propertyKey, descriptor) => {
        let original = descriptor.value;
        let utils = new Utils();
        utils.log([" - Delay - Class; ", target.constructor.name, "Method:", propertyKey, "REGISTERED"].join(" "));
        descriptor.value = function (...args) {
            return new Promise((ok, ko) => {
                interval(milliseconds).pipe(take(1)).toPromise().then(value => {
                    ok(original && original.apply(this, args));
                    utils.log([" - Delay - Class; ", target.constructor.name, "Method:", propertyKey, "EXCUTED"].join(" "));
                }).catch(error => {
                    ko(error);
                });
            });
        };
        return descriptor;
    };
};

/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc  si occupa di formattare un numero nella seguendo la direttiva nazionale imposta come parametri d'ingresso di default è IT
 * @example @FormatNumber(format: string | string[] = FORMAT_NUMBER.IT, options?: Intl.NumberFormatOptions)
 *
 */
var FORMAT_NUMBER;
(function (FORMAT_NUMBER) {
    FORMAT_NUMBER["EN"] = "en-EN";
    FORMAT_NUMBER["DE"] = "de-DE";
    FORMAT_NUMBER["AF"] = "af-AF";
    FORMAT_NUMBER["AM"] = "am-AM";
    FORMAT_NUMBER["AR"] = "ar-AR";
    FORMAT_NUMBER["BN"] = "bn-BN";
    FORMAT_NUMBER["BG"] = "bg-BG";
    FORMAT_NUMBER["CA"] = "ca-CA";
    FORMAT_NUMBER["CS"] = "cs-CS";
    FORMAT_NUMBER["NL"] = "nl-NL";
    FORMAT_NUMBER["ET"] = "et-ET";
    FORMAT_NUMBER["FR"] = "fr-FR";
    FORMAT_NUMBER["HE"] = "he-HE";
    FORMAT_NUMBER["HI"] = "hi-HI";
    FORMAT_NUMBER["IT"] = "it-IT";
    FORMAT_NUMBER["NB"] = "nb-NB";
    FORMAT_NUMBER["MS"] = "ms-MS";
    FORMAT_NUMBER["ID"] = "id-ID";
    FORMAT_NUMBER["PL"] = "pl-PL";
})(FORMAT_NUMBER || (FORMAT_NUMBER = {}));
const FormatNumber = (format = FORMAT_NUMBER.IT, options) => {
    return (target, key) => {
        let value = target[key];
        let l10nEN = new Intl.NumberFormat(format, options);
        Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                try {
                    if (l10nEN) {
                        return l10nEN.format(value);
                    }
                }
                catch (e) {
                    return e;
                }
            },
            set: (v) => {
                try {
                    value = v;
                }
                catch (error) {
                    value = 0;
                }
            }
        });
    };
};

const moment = require("moment");
let DependencyManager = class DependencyManager {
    constructor() {
        this.deps = {};
    }
    set(k, clazz) {
        if (!(k in this.deps)) {
            this.deps[k] = clazz;
        }
    }
    get(k) {
        if (k in this.deps) {
            return this.deps[k];
        }
        /// @ts-ignore
        return null;
    }
};
DependencyManager = __decorate([
    Singleton
], DependencyManager);
/****************************************************************************************************************** */
const manager = new DependencyManager();
/****************************************************************************************************************** */
const colorTrace = (msg) => {
    // @ts-ignore
    console.log("%c" + [moment().format("HH:mm:ss"), ...msg].join(" "), "color: red; ");
};
/**
 * @author l.piciollo
 * @param type
 * @returns
 * @description Decorator class for indicate that propertie is injected
 */
const Inject = (type) => {
    return (target, key) => {
        let typeClassName = type.name;
        let nameCass = target.constructor.name;
        Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                let myClassInstance = manager.get(typeClassName);
                if (myClassInstance && myClassInstance.injectable) {
                    myClassInstance.singleton = true;
                    return myClassInstance;
                }
                colorTrace([` ${typeClassName} is not injectable, delete @Inject(${typeClassName}) on attribure ${key} in ${nameCass}`].join(" "));
                throw new Error(`### ${typeClassName} is not injectable ###`);
            }
        });
    };
};
/**
 * @author l.piciollo
 * @param type
 * @returns
 * @description Decorator class for indicate that class is injectable. All properties that is injected signed.. will be instanced
 */
const Injectable = (type) => {
    let instance = new type();
    Object.defineProperty(instance, "instanceID", { value: Symbol(), writable: false });
    Object.defineProperty(instance, "injectable", { value: true, writable: false });
    if (manager.get(type.prototype.constructor.name) == null) {
        manager.set(type.prototype.constructor.name, instance);
    }
    return new Proxy(type, {
        construct(target, argsList, newTarget) {
            if (target.prototype !== newTarget.prototype)
                return Reflect.construct(target, argsList, newTarget);
            if (type && type.prototype.injectable == true && type.prototype.singleton == true) {
                target = manager.get(type.prototype.constructor.name);
            }
            else {
                target = Reflect.construct(target, argsList, newTarget);
                Object.defineProperty(target, "instanceID", { value: Symbol(), writable: false });
                Object.defineProperty(target, "injectable", { value: false, writable: false });
            }
            return target;
        }
    });
};

export { Delay, FORMAT_NUMBER, FormatDate, FormatNumber, Inject, Injectable, Log, Singleton, TryCatch };
