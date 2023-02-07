export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const allowTP = ["iAverage", "Royhal", "Klue"];

export const isAllowedTP = (message: string) => {
    return allowTP.some((name) => {
        console.log(message.includes(name));
        return message.includes(name);
    });
};
