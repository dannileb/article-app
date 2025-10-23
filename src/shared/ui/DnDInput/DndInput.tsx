import {
    ChangeEvent,
    DragEvent,
    PropsWithChildren,
    useId,
    useState,
} from 'react';
import classes from './DndInput.module.scss';
import classNames from 'classnames';
import { FileOutlined } from '@ant-design/icons';

interface DndInputProps {
    className?: string;
    accept?: string;
    multiple?: boolean;
    onChange?: (files: File[]) => void;
}

export const DndInput = ({
    onChange,
    accept,
    multiple,
    children,
    className,
}: PropsWithChildren<DndInputProps>) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const inputId = useId();

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        onChange?.(Array.from(e.dataTransfer.files));
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(Array.from(e.target.files ?? []));
    };

    return (
        <div
            className={classNames(
                classes.dropZone,
                {
                    [classes.dragging]: isDragging,
                },
                className,
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <label htmlFor={inputId} className={classes.label}>
                {children ?? <FileOutlined />}
            </label>
            <input
                id={inputId}
                type="file"
                multiple={multiple}
                accept={accept}
                onChange={handleFileSelect}
                className={classes.fileInput}
            />
        </div>
    );
};
