import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '#': '/src',
            },
        },
        define: {
            __IS_DEV__: JSON.stringify(true),
            __PROJECT__: JSON.stringify('frontend'),
            __BUNDLER__: JSON.stringify('vite'),
            VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
        },
        server: {
            port: 3000,
        },
    });
};
