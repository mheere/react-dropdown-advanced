
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
    public data: any = undefined;           // allow any object to be associated with this item - quite handy!

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
        return (item as ActionItem)
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

    // ensure a 'title' is set if the dropdown item is showing ellipses
    public setTitle(el: any, title: string) {
        if (el == null) return;

        // enure no title is shown if we are within the width (even if the target did specify one)
        el.setAttribute('title', "");

        if (el.offsetWidth < el.scrollWidth)  
            el.setAttribute('title', title);
    }

    public render(imagesAreShown: boolean): JSX.Element {
        return (<span className='dda-dropdown-item'>not implemented</span>)
    }
}

export class SeperatorItem extends DropDownItemBase {

    constructor() {
        super("");
    }

    public render(imagesAreShown: boolean) {
        return <span className='dda-dropdown-item seperator'></span>
    }

}

export class HeaderItem extends DropDownItemBase {

    public header: string = "header";

    constructor(header: string) {
        super("");
        this.header = header;
    }

    public render(imagesAreShown: boolean) {
        return <span className='dda-dropdown-item' ref={(el) => { this.setTitle(el, this.header); }}>{this.header}</span>
    }

}

export class DropDownItem extends DropDownItemBase {
    
    public text: string = "";

    constructor(key: string, text: string) {
        super(key);
        this.text = text;
    }
}

// probably the most often used Item - by default the dropdown closes onClick
export class ActionItem extends DropDownItem {
    public imageLeft: string = "";          // image (either fa or material)
    public imageRight: RightImageInfo[] = [];   // image (either fa or material)
    public className: string = "";          // any additional className info that is appended to the <i> image element
    public clickedImage: string = "";       // the name of the image that raised the clicked event (was clicked)
    public textMarginRight: number = 0;     // if given (> 0) then this margin will be applied to the text portion (in order to create distance between the text and right image or right border)

    constructor(key: string, text: string, image?: string, isDisabled?: boolean) {
        super(key, text);
        this.imageLeft = image || "";
        this.isDisabled = isDisabled || false;
    }

    get hasImg(): boolean { return this.imageLeft.length > 0}

    private isImgFontAwesome(img: string): boolean { return img.startsWith("fa-") }
    private isImgMaterial(img: string): boolean { return !this.isImgFontAwesome(img) }

    public addRightImage(img: string, toolTip?: string) { this.imageRight.push(new RightImageInfo(img, toolTip)); }

    public ToString() {
        return `*ActionItem* ${this.text} [${this.key}]`;
    }

    public render(imagesAreShown: boolean) {
        var cn = "";
        if (this.imageLeft.length == 0 && imagesAreShown) 
            cn = 'increase-left-margin';
        
        let style = {};

        if (this.textMarginRight > 0)
            style = { 
                marginRight: this.textMarginRight + "px"
            };

        return (
            <div className='dda-dropdown-item'>
                { this.renderLeftImage() }
                <span className={'flex ' + cn } ref={(el) => { this.setTitle(el, this.text); }} style={style}>{this.text}</span>
                { this.renderRightImages() }
            </div>
        )
    }

    private renderLeftImage() {
        if (this.imageLeft.length == 0) return null;

        if (this.isImgFontAwesome(this.imageLeft))
            return (<i className={"img-left fa fa-fw " + this.imageLeft + " " + this.className} aria-hidden="true"></i>)
        else if (this.isImgMaterial(this.imageLeft))
            return (<i className={"img-left material-icons material-icons-adjust " + this.className} >{this.imageLeft}</i>)
        else
            return undefined;
    }

    private renderRightImages() {
        if (this.imageRight.length == 0) return null;
        return this.imageRight.map((v, index) => this.renderRightImage(v, index));
    }

    private renderRightImage(image: RightImageInfo, i: number) {

        const style = { 
            title: image.toolTip
        };

        if (this.isImgFontAwesome(image.imageRight))
            return (<i key={i} data-img-right={image.imageRight} title={image.toolTip} className={"img-right fa fa-fw " + image.imageRight + " " + this.className} aria-hidden="true" style={style}></i>)
        else if (this.isImgMaterial(image.imageRight))
            return (<i key={i} data-img-right={image.imageRight} title={image.toolTip} className={"img-right material-icons material-icons-adjust " + this.className}>{image.imageRight}</i>)
        else
            return undefined;
    }

}

export class RightImageInfo {
    public imageRight: string = "";
    public toolTip: string = "";

    constructor(img: string, toolTip?: string) {
        this.imageRight = img;
        this.toolTip = toolTip || "";
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

    public render(imagesAreShown: boolean) {
        return (
            <div className='dda-dropdown-item' style={ { position: 'relative' } }>
                <span className={"img-check " + (this.groupBy.length > 0 ? ' option ' : '') + (this.isChecked ? ' checked ' : '')}></span>
                <span className='flex has-img' ref={(el) => { this.setTitle(el, this.text); }}>{this.text}</span>
            </div>
        )
    }
}
