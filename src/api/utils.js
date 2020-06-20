export const getCount = (count) => {
    if (count < 0) return;
    if (count < 10000) {
        return count;
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count / 1000) / 10 + "万"
    } else {
        return Math.floor(count / 1000000) / 10 + "亿"
    }
    //TODO: i18 this part!
}

export const debounce = (func, delay) => {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this.args)
            clearTimeout(timer)
        }, delay)
    }
}

export const findGlobal = rankList => {
    for(let i =0 ; i < rankList.length - 1; i++) {
        if(rankList[i].tracks.length && !rankList[i + 1].tracks.length){
            return i + 1
        }
    }
}

// TODO try join
export const getName = list => {
    let str = ""
    list.map ((item, index) => {
        str += index === 0? item.name: "/" + item.name
    })
    return str
}

export const getNameByJoin = list => {
    return list.map(a => a.name).join('/')
}
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;

