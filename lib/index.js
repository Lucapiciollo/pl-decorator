'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
const moment$1 = require("moment");
/****************************************************************************************************************** */
const Log = (mode = "log") => {
    return (target, propertyKey, descriptor) => {
        const colorTrace = (msg) => {
            // @ts-ignore
            console[mode]("%c" + msg, "color: white; background:blue");
        };
        let original = descriptor.value;
        descriptor.value = function (...args) {
            colorTrace([moment$1().format("HH:mm:ss"), "- Called method START: ", target.constructor.name, "=>", propertyKey, JSON.stringify(args)].join(" "));
            const result = original.apply(this, args);
            colorTrace([moment$1().format("HH:mm:ss"), " - Called method END: ", target.constructor.name, "=>", propertyKey, result == undefined ? "-NO RESULT-" : JSON.stringify(result)].join(" "));
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
const moment = require("moment");
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
        moment.locale(localeId);
        Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                try {
                    return moment(value).format(format);
                }
                catch (e) {
                    return e;
                }
            },
            set: (v) => {
                try {
                    value = moment(v);
                }
                catch (error) {
                    value = moment();
                }
            }
        });
    };
};

exports.FormatDate = FormatDate;
exports.Log = Log;
exports.Singleton = Singleton;
exports.TryCatch = TryCatch;
