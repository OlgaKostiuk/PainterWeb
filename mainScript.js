/**
 * Created by Olga on 10/6/2017.
 */

var Tabs = [];
var ActiveTab = null;
var Plugins = [];
var ActivePlugin = null;

var HtmlElements = {
    editInMenu: null,
    pluginsInMenu: null,
    leftToolBox: null,
    rightToolBox: null,
    pluginToolBar: null,
    tNew: null,
    tabTitlesContainer: null,
    tabsContainer: null,
    tabTitlePlus: null,

    Init()
    {
        this.editInMenu = $("#editSubMenu");
        this.pluginsInMenu = $("#pluginsSubMenu");
        this.leftToolBox = $("#leftToolBox");
        this.rightToolBox = $("#rightToolBox");
        this.pluginToolBar = $("#pluginToolBar");
        this.tabTitlesContainer = $("#tabTitlesContainer");
        this.tabsContainer = $("#tabsContainer");
        this.tabTitlePlus = $('#tabTitlePlus');
        this.tNew = $('#tNew');
    }
};

var XCommand = {

    PluginManager: {
        LoadPlugins(){
            Plugins.push(SimpleFigure);
            ActivePlugin = Plugins[0];
            this.SetEditInMenu();
            this.SetToolBar();
            this.SetPluginsListInMenu();
            this.SetLeftToolBox();
        },
        SetPluginsListInMenu(){
            for (let i in Plugins) {
                let plugin = Plugins[i];
                let menuItem = plugin.getPluginsMenuItem();
                $("input", menuItem).change({plugin: plugin}, this.TogglePlugin);
                HtmlElements.pluginsInMenu.append(menuItem);
            }
        },
        SetLeftToolBox(){
            for (let i in Plugins) {
                let plugin = Plugins[i];
                let item = plugin.getLeftToolBox();
                let pluginManager = this;
                $("button", item).click(pluginManager.ActivatePlugin.bind(pluginManager, plugin)); //pass current tab canvas
                HtmlElements.leftToolBox.append(item);
            }
        },
        TogglePlugin(){
            if (event.target.checked) {
                alert("Toggle on plugin: " + event.data.plugin.getName());
            }
            else {
                alert("Toggle off plugin: " + event.data.plugin.getName());
            }
        },
        DisplayActivePluginTools(){
            this.SetRightToolBox();
            this.SetEditInMenu();
            this.SetToolBar();
        },
        ActivatePlugin(plugin){
            alert("Activate plugin: " + plugin.getName());
            ActivePlugin = plugin;
            this.DisplayActivePluginTools();
        },
        SetRightToolBox(){
            HtmlElements.rightToolBox.empty();
            HtmlElements.rightToolBox.append(ActivePlugin.getRightToolBox());
        },
        SetEditInMenu(){
            HtmlElements.editInMenu.empty();
            HtmlElements.editInMenu.append(ActivePlugin.getEditMenu());
            registerOpenEventForMenuItems();
        },
        SetToolBar(){
            HtmlElements.pluginToolBar.empty();
            HtmlElements.pluginToolBar.append(ActivePlugin.getToolBar());
        }
    },
    CreateTab: function () {
        let tab = new Tab();
        ActiveTab = tab;
        Tabs.push(tab);
        tab.display(HtmlElements.tabsContainer, HtmlElements.tabTitlesContainer);
        tab.refresh();
        ActivePlugin.activate($("svg", tab.HtmlBody), tab.SvgWrapper, tab.FigureCreatedCallback);
        $("a", tab.HtmlTitle).on("shown.bs.tab", SelectTabHandler.bind(null, tab));
        $(".closeTab", tab.HtmlTitle).on('click', tab.close);
    }
};


function SelectTabHandler(tab, e) {
    // let targetHref = $(e.target).attr("href");
    // alert(targetHref);
    ActiveTab = tab;
    ActivePlugin.activate($("svg", tab.HtmlBody), tab.SvgWrapper, tab.FigureCreatedCallback);
}

$(document).ready(function () {
    HtmlElements.Init();
    registerOpenEventForMenuItems();

    XCommand.PluginManager.LoadPlugins();
    HtmlElements.tNew.click(XCommand.CreateTab);
});


function registerOpenEventForMenuItems() {
    $('.dropdown-submenu a.subMenuHeader').on("click", function (e) {
        $(this).next('ul').toggle();
        return false;
    });
}
