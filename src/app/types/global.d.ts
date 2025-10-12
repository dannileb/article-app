declare module '*.module.css';
declare module '*.module.scss';

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare const __IS_DEV__: boolean;

/**
 * ⚠️ FSD
 *
 * Its hack way to export redux inferring types from #/app
 * and use it in #/shared/model/hooks.ts
 */
declare type RootState = import('../store/store').RootState;
declare type AppDispatch = import('../store/store').AppDispatch;
