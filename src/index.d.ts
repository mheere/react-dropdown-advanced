

    export enum DropDownDirection {
        DownRight,
        DownLeft,
        UpRight,
        UpLeft,
    }

    // -------------------------

    interface DropDownItemBase {
        key: string;
        isDisabled: boolean;
        data: any;

        isActionItem: boolean;
        isOptionItem: boolean;
        isSeperatorItem: boolean;
        isHeaderItem: boolean;
    }

    // -------------------------

    interface SeperatorItem extends DropDownItemBase {}

    interface SeperatorItemConstructor {
        new(): SeperatorItem;
    }

    export var SeperatorItem: SeperatorItemConstructor;

    // -------------------------

    interface HeaderItem extends DropDownItemBase {
        header: string;
    }

    interface HeaderItemConstructor {
        new(header: string): HeaderItem;
    }

    export var HeaderItem: HeaderItemConstructor;

    // -------------------------

    interface DropDownItem extends DropDownItemBase {
        text: string;
    }

    // -------------------------

    interface  RightImageInfo {
        imageRight: string;
        toolTip: string;
    }

    // -------------------------

    interface ActionItem extends DropDownItem {
        imageLeft: string;
        imageRight: RightImageInfo[];
        className: string;
        clickedImage: string;
        textMarginRight: number;
        addRightImage(img: string, tooltip?: string): void;
        clicked: (aitem: ActionItem) => void;
        //static useMaterialImage24: boolean;
    }

    interface ActionItemConstructor {
        new(key: string, text: string, image?: string, isDisabled?: boolean, clicked?: (ai: ActionItem) => void): ActionItem;
    }

    export var ActionItem: ActionItemConstructor;

    // -------------------------

    interface OptionItem extends DropDownItem {
        isChecked: boolean;
        groupBy: string;
        toggle(): void;
    }

    interface OptionItemConstructor {
        new(key: string, text: string, groupBy?: string, isChecked?: boolean): OptionItem;
    }

    export var OptionItem: OptionItemConstructor;

    // -------------------------

    interface DropDownControl {
        element: any;
        direction: DropDownDirection;
        openOnCreate: boolean;
        closeOnActionItemClick: boolean;
        closeOnOptionItemClick: boolean;
        alignText: boolean;
        setToRelativePositionIfNotSet: boolean;
        
        onClick?: (item: DropDownItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
        onClose?: (item: DropDownItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
        onChecked?: (optionItem: OptionItem, checkedOptionItems: OptionItem[], allOptionItems: OptionItem[]) => void;
        onOpened?: () => void;
        onHover?: (item: DropDownItem) => void;

        items: DropDownItemBase[]; 
        getItems: () => DropDownItemBase[];
        getItemsAsync: () => Promise<DropDownItemBase[]>;
        
        close(): void;
        createMenu(): void;
    }

    interface DropDownControlConstructor {
        new(element: any, items?: DropDownItemBase[], onClick?: (item: DropDownItem) => void, direction?: DropDownDirection): DropDownControl;
    }

    export var DropDownControl: DropDownControlConstructor;

    // ------------------------------------

    export var DropDownMenu: any;

    // ------------------------------------

    export var TestData: any;



