export const convertTimestamp = (time: number) => {
    return new Date(time).toLocaleDateString();
};
