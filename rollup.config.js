import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";
import obfuscatorPlugin from "rollup-plugin-javascript-obfuscator";
export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./lib/index.esm.js",
      format: "esm",
    },
    plugins: [
      typescript(),
      
/*       obfuscatorPlugin({
        compact: true,sourceMap:false
      }),
      uglify() */
    ],
  },
  {
    input: "./src/index.ts",
    output: {
      file: "./lib/index.js",
      format: "cjs",
    },
    plugins: [
      typescript(),
   
/*       obfuscatorPlugin({
        compact: true,sourceMap:false
      }),
      uglify() */
    ],
  },
];
