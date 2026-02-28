import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '#': '/src',
        },
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000/api'),
        __PROJECT__: JSON.stringify('frontend'),
    },
    server: {
        port: 3000,
    },
});
