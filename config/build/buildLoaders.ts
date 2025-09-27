import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoader } from "./loaders/buildCssLoader";
import { svgLoader } from "./loaders/buildSvgLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };
  
  const cssLoader = buildCssLoader(options.isDev)

  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  const babelLoader = {
    test: /\.(ts|js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [["i18next-extract", { locales: ["ru", "en"] }]],
      },
    },
  };

  return [babelLoader, typeScriptLoader, cssLoader, svgLoader, fileLoader];
}
