export const convertTimestamp = (time: number, withTime: boolean = false) => {
    return new Date(time)[withTime ? 'toLocaleString' : 'toLocaleDateString']();
};
