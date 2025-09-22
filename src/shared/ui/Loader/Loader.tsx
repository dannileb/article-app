import { CSSProperties } from 'react';
import classes from './Loader.module.scss';

interface LoaderProps {
    color?: CSSProperties['color'];
}

export const Loader = ({ color }: LoaderProps) => {
    return <span className={classes.loader} style={{ color }}></span>;
};
