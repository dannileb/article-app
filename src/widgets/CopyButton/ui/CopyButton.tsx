import { ComponentProps, useCallback } from 'react';
import { Button } from '#/shared/ui/Button/Button';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { useCopyToClipboard } from '#/shared/lib/hooks/useCopyToClipboard';

type CopyButtonProps = Omit<
    ComponentProps<typeof Button>,
    'onClick' | 'children'
> & {
    copyingText?: string;
};

export const CopyButton = ({
    copyingText,
    ...buttonProps
}: CopyButtonProps) => {
    const { copied, copyToClipboard } = useCopyToClipboard();

    const handleCopy = useCallback(() => {
        copyToClipboard(copyingText);
    }, [copyToClipboard, copyingText]);

    return (
        <Button {...buttonProps} onClick={handleCopy}>
            {copied ? <CheckOutlined /> : <CopyOutlined />}
        </Button>
    );
};
