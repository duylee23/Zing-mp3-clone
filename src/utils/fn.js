export const getArrSlider = (start, end, number) => {
    const limit = start > end ? number : end
    let output = []
    for (let i = start; i <= limit; i++) {
        output.push(i)
    }
    if (start > end) {
        for (let i = 0; i <= end; i++) {
            output.push(i)
        }
    }
    return output
}

export const handleNumber = (num) => {
    if (num >= Math.pow(10, 6)) {
        return `${Math.round(num / Math.pow(10, 6))}M`;
    } else {
        return `${Math.round(num / Math.pow(10, 3))}K`;
    }
};