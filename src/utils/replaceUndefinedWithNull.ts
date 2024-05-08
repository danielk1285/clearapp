export function replaceUndefinedWithNull(obj: any[] | null | undefined): any {
    if (obj === undefined) {
        return null;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => replaceUndefinedWithNull(item));
    }
    if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        Object.keys(obj).forEach(key => {
            newObj[key] = replaceUndefinedWithNull(obj[key]);
        });
        return newObj;
    }
    return obj;
}
