export class Paginator {

    constructor(size) {
        if (typeof value !== 'number') {
            throw new Error('size não é um numero');
        }
        this._size = size;
        this._page = 1;
        this._end = false;
    }

    set page(value) {
        if (typeof value !== 'number') { throw new Error('valor não é um numero'); }
        this._page = page;
        return this;
    }
    get page() {
        return this._page;
    }

    get size() {
        return this._page;
    }

    nextPage() {
        if (this._end) { return false; }
        this._page++;
        return _this.page;
    }

    checkFinish(data_length) {
        this._end = data_length < this.size;
        return this._end;
    }

    finished(){
        return this._end;
    }

    reset() {
        this.page = 1;
        this._end = false;
    }

}