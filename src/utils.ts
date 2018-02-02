
export function getRandomNumber(to: number, from: number = 0) {
    var diff = to - from;
    if (diff <= 0) return 0;
    var r = Math.floor((Math.random() * diff));
    return r + from;
}

export function createGuid() {
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return guid;
}

export function createGuidRight5(pos: number = 5) {
    var guid: string = this.createGuid();
    guid = guid.substr(guid.length - pos);
    return guid;
}

export function instanceOf(typeA: any, typeB: any) {
    return (typeA.constructor.toString() === typeB.toString());
}

// simply get a whole lot of coordinates of where the element is positioned
export function getCoords(elem: any) { // crossbrowser version
    if (!elem) return;

    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    top = Math.round(top);
    var left = box.left + scrollLeft - clientLeft;
    left = Math.round(left);

    var height = elem.offsetHeight;
    var width = elem.offsetWidth;
    
    var bottom = top + height;
    var right = left + width;

    var topFromWindow = window.innerHeight - top;
    //var topFromWindow = window.innerHeight - top - 4;   // NOTE - TODO - why do I need these 10 pixels??? 
    var rightFromWindow = window.innerWidth - right;

    return { top, left, height, width, bottom, right, topFromWindow, rightFromWindow };
}

export function hasParentClassName(el: any, classname: string): boolean {
    if (!el) return false;
    if (el.className.contains(classname))
        return true;
    else {
        return hasParentClassName(el.parentElement, classname);
    }
}

