
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DropDownItemBase, HeaderItem, DropDownItem, ActionItem, OptionItem, SeperatorItem, DropDownDirection } from './DropDownItems'
import * as __utils from '../utils';

interface I_Dropdown_Props {
    __element?: any;                // passed in when creating programatically
    __closeHelper?: CloseHelper;    // handler passed to us when creating programatically
    direction?: DropDownDirection;
    closeOnActionItemClick?: boolean;
    closeOnOptionItemClick?: boolean;
    items?: DropDownItemBase[]; 
    getItems?: () => DropDownItemBase[];
    onClick?: (item: DropDownItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
    onClose?:(item: DropDownItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
    onChecked?: (optionItem: OptionItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
    onOpened?: () => void;
    maxHeight?: number;
    alignText?: boolean;
}

interface I_Dropdown_State {
    listVisible: boolean;
    dropDownItems: DropDownItemBase[];
    element: any;
}

export class DropDownMenu extends React.Component<I_Dropdown_Props, I_Dropdown_State> {
    
    // set the default props for this class
    public static defaultProps: Partial<I_Dropdown_Props> = {
        direction: DropDownDirection.DownRight,
        closeOnActionItemClick: true,
        closeOnOptionItemClick: false,
        items: [],
        getItems: undefined,
        onClick: () => {},
        onClose: () => {},
        onChecked: () => {},
        onOpened: () => {},
        maxHeight: 260,
        alignText: true
    }

    constructor(prop: any) {
        super(prop);

        this.state = {
            listVisible: false,
            dropDownItems: [],
            element: this.props.__element
        }

        // bind the closeHelper to the hide method
        if (this.props.__closeHelper)
            this.props.__closeHelper.acceptClose = () => this.hide();

        // bind our show and hide to the current this
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    public isOpen: boolean = false;
    private _lastItem: DropDownItem;

    public componentDidMount() {
        
        // if we don't have an element to attach to then step out (if we are creating programmatically)
        if (this.state.element == undefined) return;

        this.attachClick();
    }

    public componentWillUnmount() {
        //this.props.element.removeEventListener("click", this.show2);
    }

    public componentDidUpdate(prevProps: any, prevState: any) {

    }

    // check if there are only Action items (well.. NO OptionItems..)
    private hasOptionItems(): boolean {
        return this.state.dropDownItems.find(item => item.isOptionItem) != null;
    }

    // check if any images will be shown
    private showingImages(): boolean {
        
        // check for ActionItems that show an image
        var b1 = this.getAllActionItems().find(item => item.hasImg) != null;
        
        // check for OptionItems (if there are then we are showing an 'image', the check itself) 
        var b2 = this.getAllOptionItems().length > 0;

        return b1 || b2;
    }

    // get all ActionItems 
    private getAllActionItems(): ActionItem[] {
        return this.state.dropDownItems.filter((item) => item.isActionItem) as ActionItem[];
    }

    // get all OptionItems 
    private getAllOptionItems(): OptionItem[] {
        return this.state.dropDownItems.filter((item) => item.isOptionItem) as OptionItem[];
    }

    // get all checked OptionItems 
    private getCheckedOptionItems(): OptionItem[] {
        return this.getAllOptionItems().filter((item) => item.isChecked);
    }

    // toggle the clicked optionitem and make sure other checked items behave!
    private toggle(item: OptionItem) {

        // if this item is not part of a 'group' then simply toggle and exit
        if (item.groupBy.length == 0) {
            item.toggle();      // toggle the selected item
        }
        else {
            // I can't 'uncheck' the only checked item!
            if (item.isChecked) return;
            
            item.toggle();      // toggle the selected item

            // uncheck other members of this 'group'
            this.getAllOptionItems().
                filter((oitem: OptionItem) => oitem != item && oitem.groupBy == item.groupBy)
                .forEach((oitem: OptionItem) => oitem.isChecked = false);
        }
    }

    private select(item: DropDownItem, e: any) {
        
        // stop this event bubbling up...
        e.nativeEvent.stopImmediatePropagation();

        // don't process header or seperator items
        if (item.isHeaderItem || item.isSeperatorItem || item.isDisabled) return;

        // if the selected item is an OptionItem then toggle 
        if (item.isOptionItem) {

            // cast to OptionItem
            var oitem: OptionItem = item as OptionItem;

            // if this item is part of a group then 'un-check' the other members
            this.toggle(oitem);

            // inform the user an option item was clicked
            this.raiseOnChecked(oitem);

            // force react to update (done by hand since settings is not part of internal state)
            this.forceUpdate();
        }

        // if a click notification is given by the user then inform
        this.raiseOnClicked(item);

        // hang on to the last item (so we can raise this if popup closes by selecting elsewhere)
        this._lastItem = item;

        // close the dropdown if we were asked to
        if (item.isActionItem && this.props.closeOnActionItemClick) 
            this.hide();
        if (item.isOptionItem && this.props.closeOnOptionItemClick) 
            this.hide();

    }

    private show() {

        // update the internal react state
        this.setState({
            listVisible: true,
            dropDownItems: this.getItems()
        });

        // add a click handler to hide this popup if user clicks anywhere else..
        document.addEventListener("click", this.hide);
    }

    private hide() {

        // update internal react state
        this.setState({ listVisible: false });

        // remove the click handler
        document.removeEventListener("click", this.hide);

        // inform the settings object so it can inform the user etc
        this.raiseOnClosed();
    }

    // ---------------------------------

    private raiseOnOpened() {
        this.isOpen = true;
        this.asyncCallback(() => this.props.onOpened());
    }

    private raiseOnClosed() {
        this.isOpen = false;
        this.asyncCallback(() => this.props.onClose(this._lastItem, this.getCheckedOptionItems(), this.getAllOptionItems()));
    }
    
    private raiseOnClicked(item: DropDownItem) {
        this.asyncCallback(() => this.props.onClick(item, this.getCheckedOptionItems(), this.getAllOptionItems()));
    }

    private raiseOnChecked(optionItem: OptionItem) {
        this.asyncCallback(() => this.props.onChecked(optionItem, this.getCheckedOptionItems(), this.getAllOptionItems()));
    }

    // ensure that the client can't inadvertently keep the drop down logic flow
    private asyncCallback = (cb: any) => {
        setTimeout(() => cb());
    }

    // ---------------------------------

    private getItems(): DropDownItemBase[] {
        var items: DropDownItemBase[] = [];

        // if a fixed number of items are given then simply return these
        if (this.props.items.length > 0) items = this.props.items;

        // if a callback is given then call this to obtain the items to show
        if (this.props.getItems) items = this.props.getItems();

        if (items.length == 0)
        items.push(new ActionItem("a", "No items provided!"));

        // nothing given so inform the user...
        return items;
    }

    private getDropDownClass() {
        var direction = this.props.direction;
        if (direction == DropDownDirection.DownLeft) return "down-left";
        if (direction == DropDownDirection.DownRight) return "down-right";
        if (direction == DropDownDirection.UpLeft) return "up-left";
        if (direction == DropDownDirection.UpRight) return "up-right";
    }

    private getStyle() {

        var coords = __utils.getCoords(this.state.element);

        const styleDownLeft = {
            top: coords.bottom + "px",
            right: coords.rightFromWindow + "px"
          };
        const styleDownRight = {
            top: coords.bottom + "px",
            left: coords.left + "px"
          };
        const styleUpLeft = {
            bottom: coords.topFromWindow + "px",
            right: coords.rightFromWindow + "px"
          };
        const styleUpRight = {
            bottom: coords.topFromWindow + "px",
            left: coords.left + "px"
          };

        var direction = this.props.direction;
        if (direction == DropDownDirection.UpLeft) return styleUpLeft;
        if (direction == DropDownDirection.UpRight) return styleUpRight;
        if (direction == DropDownDirection.DownLeft) return styleDownLeft;
        if (direction == DropDownDirection.DownRight) return styleDownRight;
    }
    
    private attachClick() {
        
        this.state.element.addEventListener("click", () => {

            // if we are open then step out
            if (this.isOpen) return;

            // hang on to the fact we are open (and let user know)
            this.raiseOnOpened();

            // disconected from click event - show the popup
            setTimeout(() => { this.show(); });     // we HAVE to disconnect this otherwise the show is called followed by the hide directly!
        });
    }

    // ensure a 'title' is set if the dropdown item is showing ellipses
    private setTitle(el: any, title: string) {
        if (el == null) return;

        if (el.offsetWidth < el.scrollWidth)  
            el.setAttribute('title', title);
    }

    private lookForParent(el: any) {
        // if nothing is given then exit
        if (!el) return;

        // get the parent node of where 
        this.setState({ element: el.parentElement }, () => this.attachClick());
    }


    private renderListItems() {

        // if we are not showing the items then don't render the list!
        if (!this.state.listVisible) return null;
          
        var seperatorItem = (item: SeperatorItem) => (
            <span className='dropdown-item seperator'></span>
        );

        var headerItem = (item: HeaderItem) => (
            <span className='dropdown-item header' ref={(el) => { this.setTitle(el, item.header); }}>{item.header}</span>
        );

        var faImg = (item: ActionItem) => {
            if (item.hasImgFontAwesome)
                return (<i className={"fa fa-fw " + item.image + " " + item.className} aria-hidden="true"></i>)
            else if (item.hasImgMaterial)
                return (<i className={"material-icons material-icons-adjust " + item.className}>{item.image}</i>)
            else
                return undefined;
        };

        var itemShowImg = (item: ActionItem) => {
            if (item.hasImg) return true;

            // if anywhere else an image is shown then we have to return a 'has-img' to restrict its width...
            if (this.showingImages() && this.props.alignText)
                return true;

            return false;
        }

        var actionItem = (item: ActionItem) => (
            <div className='dropdown-item'>
                <span className={ itemShowImg(item) ? 'img' : '' }  >
                    { faImg(item) }
                </span>
                <span className={'action ' + itemShowImg(item) ? 'has-img' : '' } ref={(el) => { this.setTitle(el, item.text); }}>{item.text}</span>
            </div>
        );

        var optionItem = (item: OptionItem) => (
            <div className='dropdown-item' style={ { position: 'relative' } }>
                <span className={"img-check " + (item.groupBy.length > 0 ? ' option ' : '') + (item.isChecked ? ' checked ' : '')}></span>
                <span className='dropdown-item option has-img' ref={(el) => { this.setTitle(el, item.text); }}>{item.text}</span>
            </div>
        );

        var getItem = (item: DropDownItemBase) => {
            if (item.isSeperatorItem) return seperatorItem(item as SeperatorItem);
            if (item.isActionItem) return actionItem(item as ActionItem);
            if (item.isOptionItem) return optionItem(item as OptionItem);
            if (item.isHeaderItem) return headerItem(item as HeaderItem);
        }

        // callback for any items and map these to something useful
        return this.state.dropDownItems.map(item => (
            <div key={item.key} className={item.ddclass} onClick={this.select.bind(this, item)} style={ { position: 'relative' } }>
                {getItem(item)}
            </div>
        ));
    }

    render() {

        if (this.state.element != null) {
            // get the correct style
            const style = this.getStyle();

            // render the actual drop down
            return <div className={"mh-dropdown-container " + (this.state.listVisible ? "show" : "")} style={style}>
                <div className={'dropdown-list ' + this.getDropDownClass()} >
                    {this.renderListItems()}
                </div>
            </div>;
        }
        else {
            return <div ref={(el) => { this.lookForParent(el); }}> </div>
        }
    }
}

// ----------------------------------------------
// Helper class - use this to create dropdown menu programmatically
// ----------------------------------------------
export class DropDownControl {
    public element: any = undefined;
    public direction: DropDownDirection = DropDownDirection.DownRight;
    public closeOnActionItemClick: boolean = true;
    public closeOnOptionItemClick: boolean = false;
    public onClick: (item: DropDownItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
    public onClose: (item: DropDownItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
    public onChecked: (optionItem: OptionItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
    public onOpened: () => void;
    public alignText: boolean = true;   // if true, we align any ActionItems that have no image with ActionItem(s) that do have an image or OptionItems (since these always have an 'image')
    private __closeHelper: CloseHelper = new CloseHelper();
    
    // called just before the items are needed allowing customising of the items depending on current state
    public getItems: () => DropDownItemBase[] = undefined;

    // given fixed set of items.
    public items: DropDownItemBase[] = [];

    constructor(element: any, items?: DropDownItemBase[], onClick?: (item: DropDownItem) => void, direction?: DropDownDirection) {
        this.element = element;
        this.items = items || [];
        this.onClick = onClick || undefined;
        this.direction = direction || DropDownDirection.DownRight;
    }

    // closes the popup
    public close() {
        this.__closeHelper.close();
    }

    // Called when all settings have been set 
    public createMenu() {

        // check if we need to find the element ourselves 
        if (typeof this.element == 'string' || this.element instanceof String) {
            var el: string = this.element as string;
            
            // make sure a proper selector was given
            if (el.length <= 1)
                throw "Incorrect selector!";

            // check if we are looking for an id or class
            if (el.startsWith('#'))
                this.element = document.getElementById(el.substr(1));

            else if (el.includes(".")) {
                var matches = document.querySelectorAll(el);        // "div.note, div.alert"

                if (matches.length == 1) 
                    this.element = matches[0];
                else if (matches.length > 1) 
                    throw "Multiple targets for DropDownMenu's were identified for class: " + el;
                else
                    throw "The target for this DropDownMenu could not be identified for class: " + el;
            }

            else {
                throw "You have to identify an element either by #id or .classname(s)";
            }
        }

        // if we haven't yet found an element then stop
        if (!this.element) throw "No element could be found to attach the react-dropdown-advanced to!";

        // add a div element we will place this dropdown into - we don't want to disturb the original markup
        var newDiv = document.createElement("div"); 
        newDiv.classList.add("dd-menu-new");

        // add the text node to the newly created div
        this.element.appendChild(newDiv);
        
        ReactDOM.render(<DropDownMenu 
            __element={this.element}
            __closeHelper={this.__closeHelper}
            direction={this.direction}
            alignText={this.alignText} 
            closeOnActionItemClick={this.closeOnActionItemClick}
            closeOnOptionItemClick={this.closeOnOptionItemClick}
            items={this.items}
            getItems={this.getItems}
            onClick={this.onClick}
            onClose={this.onClose}
            onChecked={this.onChecked}
            onOpened={this.onOpened}
            />, newDiv);
    }

}


export class CloseHelper {

    public close() {
        if (this && this.acceptClose) this.acceptClose();
    }

    public acceptClose: () => void;

}
