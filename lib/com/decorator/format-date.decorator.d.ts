/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc Decorator for properties class, formatter date vaule
 */
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
export declare const FormatDate: (format?: string, localeId?: string) => (target: any, key: string) => void;
