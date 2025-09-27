import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths = {
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    if (config.resolve) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '#': paths.src,
        };
        config.resolve.modules?.push(paths.src);
        config.resolve.extensions?.push('.ts', '.tsx');
    }

    const fileLoaderRule = config.module?.rules?.find((rule) => {
        if (typeof rule === 'object' && rule && 'test' in rule) {
            return rule.test?.toString().includes('svg');
        }
        return false;
    }) as RuleSetRule;

    if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/;
    }

    config.module?.rules?.unshift({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config.module?.rules?.push(buildCssLoader(true));

    return config;
};
