

const removeTrailingZero = (value:string) => {
    if (value.includes('.')) {
        return value.replace(/\.?0*$/, '');
    }
    return value;
}

export default removeTrailingZero;