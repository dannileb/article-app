declare module '*.module.css';
declare module '*.module.scss';

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module '*.webp' {
    const content: string;
    export default content;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;

/**
 * ⚠️ FSD
 *
 * Its hack way to export redux inferring types from #/app
 * and use it in #/shared/model/hooks.ts
 */
declare type StateSchema =
    import('../providers/ReduxProvider/config/StateSchema').StateSchema;
declare type AppDispatch =
    import('../providers/ReduxProvider/config/store').AppDispatch;
