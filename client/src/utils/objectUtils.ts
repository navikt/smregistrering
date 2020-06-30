export const getKeys = <T extends {}>(object: T): Array<keyof T> => Object.keys(object) as Array<keyof T>;
