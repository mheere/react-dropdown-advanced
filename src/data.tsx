import { DropDownItemBase, HeaderItem, DropDownItem, ActionItem, OptionItem, SeperatorItem, DropDownDirection } from './components/DropDownItems';

// Demo class - allow the sample to produce demo output quickly
export class TestData {

    static getItems = (pos: string = '') => {
        var arr: DropDownItemBase[] = [];
        if (pos == 'simple items') {
            arr.push(new ActionItem("A", "Holiday in France"));
            arr.push(new ActionItem("B", "Go to California"));
            arr.push(new ActionItem("C", "Visit London"));
        }
        if (pos == 'left-top' || pos == 'radiooption') {
            arr.push(new OptionItem("keyZ", "My Option 1", "A"));
            arr.push(new OptionItem("keyA", "My Option 2", "A", true));
            arr.push(new SeperatorItem());
            arr.push(new ActionItem("keyB", "Take Action A"));
            arr.push(new ActionItem("keyC", "Take Action B"));
            arr.push(new SeperatorItem());
            arr.push(new OptionItem("keyA2", "Buy Apples", "", true));
            arr.push(new OptionItem("keyB2", "Buy Bananas", "", true));
            arr.push(new OptionItem("keyC2", "Buy Pomegranates"));
            arr.push(new SeperatorItem());
            arr.push(new OptionItem("keyO2", "Haarlem is the best place to live", "C"));
            arr.push(new OptionItem("keyO3", "Amsterdam is the best place to live", "C"));
        }
        if (pos == 'right-top' || pos == 'dynamic items') {
            // var materialicon = new ActionItem("logout", "Logout", "face");
            // materialicon.className = "orange600";
            // arr.push(materialicon);
            arr.push(new ActionItem("logout", "Logout", "fa-window-close-o"));
            arr.push(new SeperatorItem());
            arr.push(new ActionItem("profile", "Show Profile", "fa-user-o"));
            arr.push(new ActionItem("shortcuts", "Show Shortcuts", "fa-mail-forward"));
            arr.push(new ActionItem("setting", "System Settings", "fa-cog"));
        }
        if (pos == 'right-top-2') {
            arr.push(new ActionItem("logout", "Logout", "fa-window-close-o"));
            arr.push(new SeperatorItem());
            arr.push(new ActionItem("profile", "Show Profile"));
            arr.push(new ActionItem("shortcuts", "Show Shortcuts"));
            arr.push(new ActionItem("setting", "System Settings (Admin)"));
        }
        if (pos == 'right-top-3') {
            arr.push(new ActionItem("logout", "Logout", "fa-window-close-o"));
            arr.push(new SeperatorItem());
            arr.push(new ActionItem("profile", "Show Profile"));
            arr.push(new ActionItem("shortcuts", "Show Shortcuts"));
            arr.push(new ActionItem("setting", "System Settings (Admin)"));
        }
        if (pos == 'right-bottom') {
            arr.push(new HeaderItem("Choose your activities:"));
            arr.push(new OptionItem("beach", "Visit the beach"));
            arr.push(new OptionItem("town", "Walk through town"));
            arr.push(new OptionItem("museum", "Visit musea"));
            arr.push(new OptionItem("hirecar", "Hire a car"));
            arr.push(new OptionItem("nothing", "Do absolutely nothing and less then that!"));
        }
        if (pos == 'left-bottom' || pos == "showcase") {
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
            arr.push(new OptionItem("nothing", "Do absolutely nothing !"));
        }
        return arr;
    }

}


