import { Order } from "@src/types/HotelTypes";
import  { FC } from 'react';

// @ts-ignore
const descComparator: FC<T> = (a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// @ts-ignore
export const sorter: FC<T> = (array: T[], comparator: (a: T, b: T) => number) => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export function getComparator<Key extends keyof any>(order: Order, orderBy: Key,): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    // @ts-ignore
    return order === 'desc' ? (a, b) => descComparator(a, b, orderBy) : (a, b) => -descComparator(a, b, orderBy);
}