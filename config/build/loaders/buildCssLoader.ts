import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildCssLoader(isDev: boolean){
    return {
    test: /\.s[ac]ss$/i,
    use: [
        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            namedExport: false,
            auto: (resPath: string) => {
              return Boolean(resPath.includes(".module."));
            },
            exportLocalsConvention: 'asIs',
            localIdentName: isDev
              ? "[hash:base64:8]__[local]"
              : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  }
}