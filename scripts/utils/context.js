export default class Context {

    constructor() {
        if (Context._instance) return Context._instance;
        const ls = localStorage.getItem('likes')
        if (!ls) {
            localStorage.setItem('likes', JSON.stringify([]))
            this._store = []
        } else {
            this._store = JSON.parse(ls);
        }
        Context._instance = this;
    }

    static get instance() {
        if (Context._instance) return Context._instance
        return new Context();
    }

    static get store(){
        return Context.instance._store;
    }

    // Like
    static like(photographerId, mediaId) {
        const ctx = Context.store

        // [{photographerId:213, media:[83, 12, 17]}]
        const photographer = ctx.find(o => o.photographerId === photographerId)
        if (photographer) {
            const mId = photographer.media.find(mId=>mId===mediaId)
            if (mId!==undefined){
                // unlike
                photographer.media = photographer.media.filter(i=>i!==mId)
                localStorage.setItem('likes', JSON.stringify(ctx))
                return -1
            }
            // like
            photographer.media.push(mediaId)
        } else {
            // like
            ctx.push({photographerId, media:[mediaId]})
        }
        localStorage.setItem('likes', JSON.stringify(ctx))
        return 1
    }

    static liked (photographerId, mediaId) {
        // [{photographerId:213, media:[83, 12, 17]}]
        const photographer = Context.store.find(o => o.photographerId === photographerId)
        return photographer && photographer.media.find(mId => mId === mediaId)!==undefined
    }
}