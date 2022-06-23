/**
 * @author l.piciollo
 * @email luca.piciollo@gmail.com
 * @create date 2021-11-10 17:49:24
 * @modify date 2021-11-10 17:49:24
 * @desc  si occupa di formattare un numero nella seguendo la direttiva nazionale imposta come parametri d'ingresso di default è IT
 * @example @FormatNumber(format: string | string[] = FORMAT_NUMBER.IT, options?: Intl.NumberFormatOptions)
 *
 */
export declare enum FORMAT_NUMBER {
    'EN' = "en-EN",
    'DE' = "de-DE",
    'AF' = "af-AF",
    'AM' = "am-AM",
    'AR' = "ar-AR",
    'BN' = "bn-BN",
    'BG' = "bg-BG",
    'CA' = "ca-CA",
    'CS' = "cs-CS",
    'NL' = "nl-NL",
    'ET' = "et-ET",
    'FR' = "fr-FR",
    'HE' = "he-HE",
    'HI' = "hi-HI",
    'IT' = "it-IT",
    'NB' = "nb-NB",
    'MS' = "ms-MS",
    'ID' = "id-ID",
    'PL' = "pl-PL"
}
export declare const FormatNumber: (format?: string | string[], options?: Intl.NumberFormatOptions | undefined) => (target: any, key: string) => void;
