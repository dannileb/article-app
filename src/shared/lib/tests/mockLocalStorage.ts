export const createLocalStorageMock = () => {
    let store: Record<string, string> = {};

    const localStorageMock = {
        getItem: jest.fn((key: string) => {
            return store[key] || null;
        }),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
        key: jest.fn((index: number) => {
            const keys = Object.keys(store);
            return keys[index] || null;
        }),
        get length() {
            return Object.keys(store).length;
        },
    };

    return localStorageMock;
};

export const setupLocalStorageMock = () => {
    const localStorageMock = createLocalStorageMock();

    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
    });

    return localStorageMock;
};
