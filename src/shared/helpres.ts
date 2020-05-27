import moment from "moment";

export const timeFromNow = (time: string): string =>
    moment(time).startOf("hour").fromNow();

export const getTimeMessage = (time: string): string => {
    if(moment(time).isSame(moment(), "day")) {
        return moment(time).format("LT");
    } else {
        return moment(time).format("l");
    }
}

export const getShortenString = (string: string): string => {
    if(string.length > 30) {
        return string.substring(0, 30) + "...";
    }

    return string;
};

export const getDataFromQueryUrl = (query: string) => {
    type DataType = { [key: string]: string };

    return query
        .slice(1)
        .split("&")
        .map(query => query.split("="))
        .reduce((acc, curr) => {
            acc[curr[0]] = curr[1]; return acc;
        }, {} as DataType)
};

export const convertCurrentTime = (number: number) => {
    const mins = Math.floor(number / 60);
    const secs = Number((number % 60).toFixed());
    return `${ mins < 10 ? "0" : "" }${ mins }:${ secs < 10 ? "0" : "" }${ secs }`
};

export const exhaustiveCheck = (_: never) => {};