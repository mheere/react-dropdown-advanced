import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownItemBase, HeaderItem, DropDownItem, ActionItem, OptionItem, SeperatorItem, DropDownDirection } from './components/DropDownItems';
import { DropDownMenu, DropDownControl } from './components/DropDownMenu';
import { TestData } from './data';
import * as __utils from './utils';

import './styles/rdropdown.scss';
import './styles/demo.scss';
require('font-awesome/css/font-awesome.css');

// -----------------------------

// 1. create a new DropDownControl for this element
var dd = new DropDownControl('#ex1');
//var dd = new DropDownControl('.ex-right-img');
//var dd = new DropDownControl('#abc001');
dd.setToRelativePositionIfNotSet = true;

// 2. specify the dropdown items
dd.getItems = () => TestData.getItems("simple items");
dd.direction = DropDownDirection.DownRight;

// 3. 
dd.closeOnActionItemClick = true;

// 4. place event handlers
dd.onClick = (item) => {
    console.log(`Item '${item.key}' was clicked. [key: ${item.key}]`);
    //if (item.key == "cancel") dd.
}
dd.onChecked = (item, checkedOptionItems, allCheckedOptionItems) => {
    console.log(`'${item.text}' was clicked [checked: ${item.isChecked}]`);
}
dd.onClose = (item) => {
    var txt = item ? item.text : " no item was clicked";
    console.log("popup closed - last item: " + txt);
};

 // 4. create the react dropdown
 dd.createMenu();

 // -----------------------------

 // 1. create a new DropDownControl for this element
 var el2 = document.getElementById('ex2');
var dd2 = new DropDownControl(el2);

// 2. specify the dropdown items
dd2.getItems = () => TestData.getItems("dynamic items");

// 3. 
dd2.closeOnActionItemClick = true;

// 4. place event handlers
dd2.onClick = (item) => {
    console.log(`Item '${item.key}' was clicked. [key: ${item.key}]`);
    //if (item.key == "cancel") dd.
}
dd2.onChecked = (item, checkedOptionItems, allCheckedOptionItems) => {
    console.log(`'${item.text}' was clicked [checked: ${item.isChecked}]`);
}
dd2.onClose = (item) => {
    var txt = item ? item.text : " no item was clicked";
    console.log("popup closed - last item: " + txt);
};

 // 4. create the react dropdown
dd2.createMenu();


// 1. create a new DropDownControl for this element
//var dd = new DropDownControl('#ex1');
var dd = new DropDownControl('#ex-right-img');
//var dd = new DropDownControl('#abc001');
dd.setToRelativePositionIfNotSet = true;

// 2. specify the dropdown items
dd.getItems = () => TestData.getItems("action-img-items");
dd.direction = DropDownDirection.DownRight;

// 3. 
dd.closeOnActionItemClick = true;

// 4. place event handlers
dd.onClick = (item) => {
    var aitem = item as ActionItem;
    console.log(`Item '${item.key}' was clicked. [key: ${item.key}] - clickedImage: ${aitem.clickedImage}`);
    //if (item.key == "cancel") dd.
}
dd.onChecked = (item, checkedOptionItems, allCheckedOptionItems) => {
    console.log(`'${item.text}' was clicked [checked: ${item.isChecked}]`);
}
dd.onClose = (item) => {
    var txt = item ? item.text : " no item was clicked";
    console.log("popup closed - last item: " + txt);
};

 // 4. create the react dropdown
 dd.createMenu();

// -----------------------------

 // 1. create a new DropDownControl for this element
 var dd3 = new DropDownControl('#ex3');

 // 2. specify the dropdown items
 dd3.getItems = () => TestData.getItems("radiooption");
 
 // 3. 
 dd3.closeOnActionItemClick = true;
 
 // 4. place event handlers
 dd3.onClick = (item) => {
     console.log(`Item '${item.key}' was clicked. [key: ${item.key}]`);
     //if (item.key == "cancel") dd.
 }
 dd3.onChecked = (item, checkedOptionItems, allCheckedOptionItems) => {
     console.log(`'${item.text}' was clicked [checked: ${item.isChecked}]`);
 }
 dd3.onClose = (item) => {
     var txt = item ? item.text : " no item was clicked";
     console.log("popup closed - last item: " + txt);
 };
 
  // 4. create the react dropdown
 dd3.createMenu();


 // ------------------------------------------

 // 1. create a new DropDownControl for this element
 var dd4 = new DropDownControl('#ex4');

 // 2. specify the dropdown items
 dd4.getItems = () => TestData.getItems("showcase");
 
 // 3. 
 dd4.closeOnActionItemClick = true;
 
 // 4. place event handlers
 dd4.onClick = (item) => {
     console.log(`Item '${item.key}' was clicked. [key: ${item.key}]`);
     //if (item.key == "cancel") dd.
 }
 dd4.onChecked = (item, checkedOptionItems, allCheckedOptionItems) => {
     console.log(`'${item.text}' was clicked [checked: ${item.isChecked}]`);
 }
 dd4.onClose = (item) => {
     var txt = item ? item.text : " no item was clicked";
     console.log("popup closed - last item: " + txt);
 };
 
  // 4. create the react dropdown
 dd4.createMenu();


// props this component exposes
interface DropDownDemo1Props { clickHandler: (item: DropDownItem) => void }

// 
class DropDownDemo1 extends React.Component<DropDownDemo1Props, {}> {

    constructor(props: DropDownDemo1Props) {
        super(props);

        this.fixedItems.push(new ActionItem("logout", "Logout", "fa-window-close-o"));
        this.fixedItems.push(new SeperatorItem());
        this.fixedItems.push(new ActionItem("profile", "Show Profile", "fa-user-o"));
        this.fixedItems.push(new ActionItem("shortcuts", "Show Shortcuts", "fa-mail-forward"));

        var item = new ActionItem("setting", "System Settings", "fa-cog");
        item.addRightImage("fa-ellipsis-h", "popup config screen");
        this.fixedItems.push(item);

    }

    private fixedItems: DropDownItemBase[] = [];

    private onClick = (item: DropDownItem) => {
        // show a console log
        console.log(`Item '${item.text}' was clicked. [key: ${item.key}]`);

        // pass it back up to the caller.
        this.props.clickHandler(item);
    }

    render() {
        return <div id='root2'>
                    user: marcel
                    <DropDownMenu items={this.fixedItems} onClick={this.onClick} direction={DropDownDirection.DownLeft} />
                </div>
    }
}

var onClick = (item: DropDownItem) => { console.log("caller click: " + item.key)};

ReactDOM.render(<DropDownDemo1 clickHandler={onClick}  />, document.getElementById('test001'));


