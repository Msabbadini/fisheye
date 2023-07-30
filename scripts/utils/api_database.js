const getData = async () => {
    const ls = localStorage.getItem('data')
    if (!ls) {
        const a = await fetch('./data/photographers.json')
        if (!a) return {photographers:[], media:[]}
        const data = await a.json()
        localStorage.setItem('data', JSON.stringify(data))
        return data
    }
    return JSON.parse(ls)
}

const api = {
    getPhotographers: async () => (await getData()).photographers,
    getMedia: async () => (await getData()).media
}

export default api