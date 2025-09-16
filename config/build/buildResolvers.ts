import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
  return {
    alias: {
      "#": options.paths.src,
    },
    modules: [options.paths.src, "node_modules"],
    preferAbsolute: true,
    extensions: [".tsx", ".ts", ".js"],
  };
}
