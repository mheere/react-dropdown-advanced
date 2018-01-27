
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownMenu } from './DropDownMenu';
import * as __utils from '../utils';

export enum DropDownDirection {
    DownRight,
    DownLeft,
    UpRight,
    UpLeft,
}

export class DropDownItemBase {

    public key: string = "";
    public isDisabled: boolean = false;

    constructor(key: string) {
        // if no key was given then we will allocate one
        if (!key) key = __utils.createGuidRight5();
        this.key = key;
    }

    get isActionItem(): boolean {
        return this.constructor.toString() === ActionItem.toString();
    }
    get isOptionItem(): boolean {
        return this.constructor.toString() === OptionItem.toString();
    }
    get isSeperatorItem(): boolean {
        return this.constructor.toString() === SeperatorItem.toString();
    }
    get isHeaderItem(): boolean {
        return this.constructor.toString() === HeaderItem.toString();
    }

    public asActionItem(item: any): ActionItem {
        return (item as ActionItem);
    }

    public asOptionItem(item: any): OptionItem {
        return (item as OptionItem);
    }

    get ddclass(): string {
        var classval = "";
        if (this.isActionItem) classval = "action";
        if (this.isOptionItem) classval = "option";
        if (this.isSeperatorItem) classval = "seperator";
        if (this.isHeaderItem) classval = "header";

        if (this.isDisabled) classval += " disabled ";
        
        return classval;
    }
}

export class SeperatorItem extends DropDownItemBase {

    constructor() {
        super("");
    }

}

export class HeaderItem extends DropDownItemBase {

    public header: string = "header";

    constructor(header: string) {
        super("");
        this.header = header;
    }

}

export class DropDownItem extends DropDownItemBase {
    
    public text: string = "";

    constructor(key: string, text: string) {
        super(key);
        this.text = text;
    }
}

// the base - by default the dropdown closes onClick
export class ActionItem extends DropDownItem {
    public image: string = "";          // image (either fa or material)
    public className: string = "";      // any additional className info that is appended to the <i> image element

    constructor(key: string, text: string, image?: string, isDisabled?: boolean) {
        super(key, text);
        this.image = image || "";
        this.isDisabled = isDisabled || false;
    }

    get hasImg(): boolean { return this.image.length > 0}
    get hasImgFontAwesome(): boolean { return this.hasImg && this.image.startsWith("fa-")}
    get hasImgMaterial(): boolean { return this.hasImg && !this.hasImgFontAwesome}

    public ToString() {
        return `*ActionItem* ${this.text} [${this.key}]`;
    }
}

// a 'checked' item - indicates a check/unchecked state - by default this toggles and does NOT close the dropdown
export class OptionItem extends ActionItem {
    public isChecked: boolean = false;      // 
    public groupBy: string = "";

    constructor(key: string, text: string, groupBy: string = "", isChecked: boolean = false) {
        super(key, text);
        this.isChecked = isChecked;
        this.groupBy = groupBy;
    }

    public toggle() {
        this.isChecked = !this.isChecked;
    }

    public toString() {
        return `*OptionItem* ${this.text} [${this.key}] - ${this.isChecked} [groupBy: ${this.groupBy}]`;
    }
}
