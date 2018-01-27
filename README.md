
# An advanced React Dropdown Component 
## key features
* caters for different types of dropdown items (action, checks, header, seperator) 
* lazely calls back for dropdown items upon selection
* dropdown items are removed from the markup when dropdown is closed
* a variety of events are raised on check, click, open/close etc
* popup location is configurable (left/right/top/bottom)
* the dropdown can be created through code using any html element as source
* popup is closable through code

# Demo
Have a look at the [demo-page](http://www.reactdropdown.marcelheeremans.com) to see what the dropdown can do for you!

# Typescript
Because I believe in typesafe code!  The code snippets below are extract from a Typescript test project.  An `index.d.ts` file has now been included within the bundle!

# Using the DropDown

## A basic 'fixed' dropdown items

![FixedItems.png](http://www.reactdropdown.marcelheeremans.com/pics/fixeditems.png)
```javascript
...
// specify some fixed items
this.fixedItems.push(new ActionItem("A", "Holiday in France"));
this.fixedItems.push(new ActionItem("B", "Go to California"));
this.fixedItems.push(new ActionItem("C", "Visit London"));
...
private onClick = (item: DropDownItem) => {
    console.log(`Item '${item.text}' was clicked. [key: ${item.key}]`);
}
...
<div id='test-menu-lt'>
    fixed items
    <DropDownMenu items={this.fixedItems} onClick={this.onClick} direction={DropDownDirection.DownRight} />
</div>
```
Bit boring, let's see what else we can do. 
## Dynamic dropdown items (calls back for dropdown items)
![FixedItems.png](http://www.reactdropdown.marcelheeremans.com/pics/dynamicitems.png)
```javascript
...
private getDynamicItems = () => {
    var arr: DropDownItemBase[] = [];
    arr.push(new ActionItem("logout", "Logout", "fa-window-close-o"));
    arr.push(new SeperatorItem());
    arr.push(new ActionItem("profile", "Show Profile", "fa-user-o"));
    arr.push(new ActionItem("shortcuts", "Show Shortcuts", "fa-mail-forward"));
    arr.push(new ActionItem("setting", "System Settings", "fa-cog"));
    return arr;
}

<div id='test-menu-lt'>
    dynamic
    <DropDownMenu getItems={this.getDynamicItems} onClick={this.onClick} direction={DropDownDirection.DownRight} />
</div>
```
Bit more interesting. The code above **calls back for its items** when clicked.  It also demonstrates the use of a seperator item and the dropdown opening towards the bottom/left.

## **Load the CSS!**
Do not forget to require or somehow import the corresponding css of this dropdown!

`require('react-dropdown-advanced/styles/rdropdown.css')`


# How to use this programmatically
In cases where you just want to attach the dropdown to an existing element somewhere on your form using code you must use the DropDownControl class.

1. Simply create a new DropDownControl object passing in the element (or a selector) you wish to attach the dropdown to.  This could be **any** html element.  
2. Create a number of dropdown items to show
3. Attach some event handler(s) 
4. Once configured call 'createMenu()' which will prepare the given element

### In its simplest form it would look something like this:
```javascript
static demo1 = () => {
    
    // 1. create a new DropDownControl for this element
    var dd: DropDownControl = new DropDownControl('#test-menu-lt');

    // 2. specify the dropdown items
    dd.items.push(new ActionItem("logout", "Logout"));
    dd.items.push(new SeperatorItem());
    dd.items.push(new ActionItem("profile", "Show Profile"));
    dd.items.push(new ActionItem("shortcuts", "Show Shortcuts"));
    dd.items.push(new ActionItem("setting", "System Settings"));

    // 3. act on user selecting a dropdown item
    dd.onClick = (item: DropDownItem) => {
        console.log(`Item '${item.text}' was clicked. [key: ${item.key}]`);
    }

    // 4. create the react dropdown
    dd.createMenu();
}
```
### Selecting your target DOM element
You can tell the DropDownControl about the element to attach itself to in three ways:
1. The element you pass in can be the real DOM element already (i.e. using `document.getElementById('my-element-id')`)
2. Pass in a `#id` and the control will find the element or
3. Pass in a classname using the `'document.querySelectorAll'` method (i.e. ".settings" or "div.note, div.alert")

___

# Options - DropDownControl / DropDownMenu
The table below describes all properties and events exposed by the DropDownControl.

Type | Name | args/value (default) | Description |
| ---- | ------ | ----------- | ----------- | 
*event* | onOpened | () => void | raised when Dropdown Menu has opened |
*event* | onClose | (item, checkedOptionItems, allOptionItems) => void | raised when Dropdown Menu closes, first returned item is the last item that was clicked|
*event* | onClick | (item, checkedOptionItems, allOptionItems) => void   | called when user clicks on either an Action or Option item |
*event* | onChecked | (optionItem, checkedOptionItems, allOptionItems) => void   | called when user checks or unchecks an Option item |
*property* | direction | `DownRight` | direction the popup will show when opened |
*property* | alignText | `true` | true will force ActionItems that have no image to be aligned with ActionItems that do have an image or with OptionItems (example given at 'Other' section below)  |
*property* | closeOnActionItemClick | `true` | Set to false for the Dropdown Menu to stay visible on clicking an ActionItem |
*property* | closeOnOptionItemClick | `false` | Set to true for the Dropdown Menu to hide on clicking an OptionItem |
*property* | items   | DropDownItemBase[] | a static list of dropdown items that is presented to the user |
*property* | getItems | () => DropDownItemBase[] | a function callback that allows the user to return a custom set of dropdown items |
*method* | close | () => void | closes the dropdown if in opened state |
___

# Action, Option, Header and SeperatorItems
There are four different types of DropdownItem to choose from 


|DropDownItem| Property | Type | Description|
| ---- | ------ | ----------- | ----------- | 
*ActionItem* | key | string | should be unique, if none is given then one is generated 
*ActionItem* |text | string | the text shown to the user in the item 
*ActionItem* |isDisabled | boolean | if true, the item is shown in disabled state - onClick __is__ still called! 
*ActionItem* |image | string | can either be a font awesome image (i.e. 'fa-user-o') or a google material-design-icon  
--|--|--|--||
*OptionItem* | key | string | should be unique, if none is given then one is generated 
*OptionItem* |text | string | the text shown to the user in the item 
*OptionItem* |isDisabled | boolean | if true, the item is shown in disabled state - onClick __is__ still called! 
*OptionItem* |isChecked | boolean | indicates if this option is in 'checked' state or not 
*OptionItem* |groupBy | string | allows for certain OptionItems to be grouped, items with the same groupBy are mutually exclusive
--|--|--|--||
*HeaderItem* | header | string | the text of the header 
--|--|--|--||
*SeperatorItems* | n/a | n/a | shows a thickened line indicating a seperation between items

___

# OptionItems in action
Option items render themselves differently depending on their mode.

A __square__ (checkbox) image is shown when the `groupBy` property is _not_ set, indicating a toggleable state (on/off).  
A __circle__ (radio button) is shown to indicate that only a single option is allowed within the group of items identified by the same `groupBy` property.

![FixedItems.png](http://www.reactdropdown.marcelheeremans.com/pics/OptionsComplex.png)
```javascript
static getDynamicItems() {
    var arr: DropDownItemBase[] = [];
    arr.push(new OptionItem("keyZ", "My Option 1", "A"));           // groupBy of 'A'
    arr.push(new OptionItem("keyA", "My Option 2", "A", true));     // groupBy of 'A' and set to selected
    arr.push(new SeperatorItem());
    arr.push(new ActionItem("keyB", "Take Action A"));              // dropdown will close when selected
    arr.push(new ActionItem("keyC", "Take Action B"));
    arr.push(new SeperatorItem());
    arr.push(new OptionItem("keyA2", "Buy Apples", "", true));
    arr.push(new OptionItem("keyB2", "Buy Bananas", "", true));
    arr.push(new OptionItem("keyC2", "Buy Pomegranates"));
    arr.push(new SeperatorItem());
    arr.push(new OptionItem("keyO2", "Haarlem is the best place to live", "C"));
    arr.push(new OptionItem("keyO3", "Amsterdam is the best place to live", "C"));
    return arr;
}

static demoComplex = () => {
    
    // 1. create a new DropDownControl for this element
    var dd: DropDownControl = new DropDownControl('#test-menu-lt');

    // 2. specify the dropdown items
    dd.getItems = Test.getDynamicItems;

    // 3. prevent the dropdown from closing when an ActionItem is clicked
    dd.closeOnActionItemClick = false;

    // 4. place event handlers
    dd.onClick = (item: DropDownItem) => {
        console.log(`Item '${item.key}' was clicked. [key: ${item.key}]`);
        //if (item.key == "cancel") dd.
    }
    dd.onChecked = (item: OptionItem, checkedOptionItems: OptionItem[], allCheckedOptionItems: OptionItem[]) => {
        console.log(`'${item.text}' was clicked [checked: ${item.isChecked}]`);
    }
    dd.onClose = (item) => {
        var txt = item ? item.text : " no item was clicked";
        console.log("popup closed - last item: " + txt);
    };

    // 4. create the react dropdown
    dd.createMenu();
}
```

___

## Showtime!
### _A mixtures of Action, Option, Header and Seperator items!_

![FixedItems.png](http://www.reactdropdown.marcelheeremans.com/pics/OptionsComplex2.png)
```javascript
static getDynamicItems() {
    var arr: DropDownItemBase[] = [];
    arr.push(new ActionItem("booknow", "Book now!", "fa-plane"));
    arr.push(new SeperatorItem());
    arr.push(new HeaderItem("Choose your destination:"));
    arr.push(new OptionItem("california", "California and Santa Monica", "A"));
    arr.push(new OptionItem("newyork", "New York", "A"));
    arr.push(new OptionItem("miami", "Miami", "A"));
    arr.push(new SeperatorItem());
    arr.push(new HeaderItem("Mode of transport:"));
    arr.push(new OptionItem("car", "By car", "B"));
    arr.push(new OptionItem("boat", "By boat", "B"));
    arr.push(new OptionItem("plane", "By plane", "B"));
    arr.push(new SeperatorItem());
    arr.push(new HeaderItem("Choose your activities:"));
    arr.push(new OptionItem("beach", "Visit the beach"));
    arr.push(new OptionItem("town", "Walk through town"));
    arr.push(new OptionItem("park", "Visit Parks"));
    arr.push(new OptionItem("hirecar", "Hire a car"));
    arr.push(new OptionItem("nothing", "Do absoluetly nothing!"));
    return arr;
}

static demoComplex = () => {
    
    // 1. create a new DropDownControl for this element
    var dd: DropDownControl = new DropDownControl('#test-menu-lt');

    // 2. specify the dropdown items callback
    dd.getItems = Test.getDynamicItems;

    // 3. prevent the dropdown from closing when an ActionItem is clicked (you may wish to validate options and close the dropdown manually by calling .close())
    dd.closeOnActionItemClick = false;

    // 4. place event handlers
    dd.onClick = (item: DropDownItem) => {
        console.log(`Item '${item.text}' was clicked. [key: ${item.key}]`);
    }
    dd.onChecked = (item: OptionItem, checkedOptionItems: OptionItem[], allCheckedOptionItems: OptionItem[]) => {
        console.log(`'${item.text}' was clicked [checked: ${item.isChecked}]`);
    }
    dd.onClose = (item) => {
        var txt = item ? item.text : " no item was clicked";
        console.log("popup closed - last item: " + txt);
    };

    // 4. create the react dropdown
    dd.createMenu();
}
```


# Further Comments

### Tooltips
If an item does not fit ellipses are introduced and a tooltip will appear on hovering over the item

<img src="http://www.reactdropdown.marcelheeremans.com/pics/Tooltip.png" alt="alt text" width="200px" >

### Wrap display text wrap
If an ActionItem with and without images are shown then their display text is aligned by default (alignText = true).  Setting this to false will 'wrap' the text to fill up as much space as possible.

<img src="http://www.reactdropdown.marcelheeremans.com/pics/AlignTextBoth.png" alt="alt text" width="400px" >

# History

|version | Notes |
| ---- | ------ |
v 1.1.3 | Initial release... (some issues with the prior ones...)
v 1.1.6 | Fix of position of dropdown if the parent has a scrollbar which is scrolled down
v 1.1.7 | TypeScript support (now part of the bundle)
v 1.1.8 | Improved selector (how to target the correct element - updated code and docs)


