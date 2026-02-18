import path from 'node:path';

const layers = new Set(['entities', 'features', 'widgets', 'pages', 'app']);

const isPathRelative = (p) =>
    p === '.' || p.startsWith('./') || p.startsWith('../');

const toPosixPath = (p) => path.normalize(p).split(path.sep).join('/');

const stripAlias = (p) => (p.startsWith('#/') ? p.slice(2) : p);

const getPathFromSrc = (filename) => {
    const normalized = toPosixPath(filename);

    if (!normalized || normalized.startsWith('<')) return null;

    const marker = '/src/';
    const idx = normalized.lastIndexOf(marker);
    if (idx === -1) return null;

    return normalized.slice(idx + marker.length);
};

const shouldBeRelative = (fromFilename, importPath) => {
    if (isPathRelative(importPath)) return false;

    const [toLayer, toSlice] = importPath.split('/');
    if (!toLayer || !toSlice || !layers.has(toLayer)) return false;

    const fromInSrc = getPathFromSrc(fromFilename);
    if (!fromInSrc) return false;

    const [fromLayer, fromSlice] = fromInSrc.split('/');
    if (!fromLayer || !fromSlice || !layers.has(fromLayer)) return false;

    return fromLayer === toLayer && fromSlice === toSlice;
};

export default {
    meta: {
        type: 'problem',
        schema: [],
        messages: { 'invalid-path': 'Path must be relative' },
    },

    create(context) {
        const getFilename = () => context.filename ?? context.getFilename?.();

        return {
            ImportDeclaration(node) {
                const importTo = node.source.value;
                const fromFilename = getFilename();

                if (
                    typeof importTo !== 'string' ||
                    typeof fromFilename !== 'string'
                )
                    return;
                const cleanImportTo = stripAlias(importTo);
                if (shouldBeRelative(fromFilename, cleanImportTo)) {
                    context.report({ node, messageId: 'invalid-path' });
                }
            },
        };
    },
};
