import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoader } from "./loaders/buildCssLoader";
import { svgLoader } from "./loaders/buildSvgLoader";
import { buildBabelLoader } from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const cssLoader = buildCssLoader(options.isDev)

  const imageLoader = {
    test: /\.(png|jpe?g|gif|webp|svg)$/i,
    type: 'asset', 
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024,
      },
    },
  };

  const codeBabelLoader = buildBabelLoader({...options, isTsx: false});
  const tsxBabelLoader = buildBabelLoader({...options, isTsx: true});


  return [ codeBabelLoader, tsxBabelLoader,cssLoader, svgLoader, imageLoader];
}
