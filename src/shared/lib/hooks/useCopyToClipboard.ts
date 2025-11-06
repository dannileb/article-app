import { useCallback, useEffect, useRef, useState } from 'react';

export const useCopyToClipboard = () => {
    const [copied, setCopied] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout>(null);

    const copyToClipboard = useCallback(
        async (copyingText: string | undefined) => {
            if (navigator.clipboard && copyingText) {
                try {
                    await navigator.clipboard.writeText(copyingText);
                    setCopied(true);
                    if (timerRef.current) {
                        clearTimeout(timerRef.current);
                    }
                    timerRef.current = setTimeout(() => {
                        setCopied(false);
                    }, 500);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            }
        },
        [],
    );

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);
    return { copied, copyToClipboard };
};
