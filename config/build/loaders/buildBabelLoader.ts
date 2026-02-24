import babelRemovePropsPlugin from "../../babel/babelRemovePropsPlugin";
import { BuildOptions } from "../types/config";

interface BuildCssLoaderOptions extends BuildOptions {
  isTsx: boolean;
}

export function buildBabelLoader({isTsx}: BuildCssLoaderOptions){
    return   {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(ts|js)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [
            ["i18next-extract", { locales: ["ru", "en"] }],
            ['@babel/plugin-transform-typescript', {isTsx}],
            "@babel/plugin-transform-runtime",
            isTsx && [
                babelRemovePropsPlugin,
                {props: ["data-testid"]}
            ]
        ].filter(Boolean),
      },
    },
  };
}