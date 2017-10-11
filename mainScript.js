/**
 * Created by Olga on 10/6/2017.
 */

// window.myPlugins = [];
// window.myPlugins.push(SimpleFigure);
// var activePlugin = window.myPlugins[0];
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
    // Tabs: [],
    // ActiveTab: null,
    // Plugins: [],
    // ActivePlugin: null,

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
            for(let i in Plugins){
                let plugin = Plugins[i];
                let menuItem = plugin.getPluginsMenuItem();
                $("input", menuItem).change({plugin: plugin}, this.TogglePlugin);
                HtmlElements.pluginsInMenu.append(menuItem);
            }
        },
        SetLeftToolBox(){
            for(let i in Plugins){
                let plugin = Plugins[i];
                let item = plugin.getLeftToolBox();
                let pluginManager = this;
                $("button", item).click(pluginManager.ActivatePlugin.bind(pluginManager, plugin)); //pass current tab canvas
                HtmlElements.leftToolBox.append(item);
            }
        },
        TogglePlugin(){
            if(event.target.checked){
                alert("Toggle on plugin: " + event.data.plugin.getName());
            }
            else{
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
            //this.ActivePlugin.activate();
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

    CreateTab(){
        let newTab ={
            Title: null,
            HtmlBody: null,
            HtmlTitle: null,
            SvgWrapper: null,
            Figures: [],
            FigureCreatedCallback(figure){
                this.Figures.push(figure);
            }
        };
        debugger;
        newTab.Title = "Tab " + Tabs.length;
        newTab.HtmlTitle = $.parseHTML('\
                                <li class="active tabTitle">\
                                    <a aria-expanded="true" data-toggle="tab" href="#' + newTab.Title +'">\
                                    <button class="close closeTab" type="button">×</button>\
                                    ' + newTab.Title + '</a>\
                                </li>\
                                    ');

        $('.tabTitle').removeClass('active').attr('aria-expanded', 'false');
        HtmlElements.tabTitlesContainer.append(newTab.HtmlTitle);

        newTab.HtmlBody = $.parseHTML('<div id="'+ newTab.Title +'" class="drawTab tab-pane fade active in"></div>');

        $('.drawTab').removeClass('active').removeClass('in');
        HtmlElements.tabsContainer.append(newTab.HtmlBody);

        $(newTab.HtmlBody).svg();
        newTab.SvgWrapper = $(newTab.HtmlBody).svg("get");

        $("a", newTab.HtmlTitle).on("shown.bs.tab", function(e){
            let targetHref = $(e.target).attr("href");
            alert(targetHref);
            // this.ActivePlugin.activate();
        });

        $(".closeTab", newTab.HtmlTitle).click(function () {
            var tabContentId = $(this).parent().attr("href");
            $(this).parent().parent().remove(); //remove li of tab
            //TODO: Select first tab
            $(tabContentId).remove(); //remove respective tab content
        });

        Tabs.push(newTab);
        ActiveTab = newTab;
        //this.DisplayTab(newTab);
        ActivePlugin.activate($("svg", newTab.HtmlBody), newTab.SvgWrapper, newTab.FigureCreatedCallback);
    },
    // DisplayTab(tab){
    //     $('.tabTitle').removeClass('active').attr('aria-expanded', 'false');
    //     HtmlElements.tabTitlesContainer.append(tab.HtmlTitle);
    //     $('.painterTab').removeClass('active').removeClass('in');
    //     HtmlElements.tabsContainer.append(tab.HtmlBody);
    // }
};

function DisplayTab(tab){
    $('.tabTitle').removeClass('active').attr('aria-expanded', 'false');
    HtmlElements.tabTitlesContainer.append(tab.HtmlTitle);
    $('.painterTab').removeClass('active').removeClass('in');
    HtmlElements.tabsContainer.append(tab.HtmlBody);
}

// var mDownX;
// var mDownY;


// var editInMenu;
// var pluginsInMenu;
// var leftToolBox;
// var rightToolBox;
// var pluginToolBar;
//
// var tNew;
//
// var tabTitlesContainer;
// var tabsContainer;
// var tabTitlePlus;




$(document).ready(function(){
    HtmlElements.Init();
    registerOpenEventForMenuItems();

    XCommand.PluginManager.LoadPlugins();
    HtmlElements.tNew.click(XCommand.CreateTab);

    // registerOpenEventForMenuItems();
    // registerCloseTabEvent();
    //
    // initVariables();
    // setEventHandlers();
    //
    // setPluginsInMenu();
    // setLeftToolBox();
    // setEditInMenu();
    // setToolBar();
});

//
// function initVariables(){
//     editInMenu = $("#editSubMenu");
//     pluginsInMenu = $("#pluginsSubMenu");
//     leftToolBox = $("#leftToolBox");
//     rightToolBox = $("#rightToolBox");
//     pluginToolBar = $("#pluginToolBar");
//
//     tabTitlesContainer = $("#tabTitlesContainer");
//     tabsContainer = $("#tabsContainer");
//     tabTitlePlus = $('#tabTitlePlus');
//     tNew = $('#tNew');
// }

// function setEventHandlers() {
//     tNew.click(createTab);
// }

// function setPluginsInMenu(){
//     for(let i in window.myPlugins){
//         let plugin = window.myPlugins[i];
//         let item = plugin.getPluginsMenuItem();
//         $("input", item).change({plugin: plugin}, togglePlugin);
//         pluginsInMenu.append(item);
//     }
// }
//
// function setLeftToolBox(){
//     for(let i in window.myPlugins){
//         let plugin = window.myPlugins[i];
//         let item = plugin.getLeftToolBox();
//         $("button", item).click({plugin: plugin}, changeActivePlugin);
//         leftToolBox.append(item);
//     }
// }
//
// function setRightToolBox(){
//     rightToolBox.empty();
//     rightToolBox.append(activePlugin.getRightToolBox());
// }
//
// function setEditInMenu(){
//     editInMenu.empty();
//     editInMenu.append(activePlugin.getEditMenu());
//     registerOpenEventForMenuItems();
// }
//
// function setToolBar() {
//     pluginToolBar.empty();
//     pluginToolBar.append(activePlugin.getToolBar());
// }
//
// function togglePlugin(event){
//     if(event.target.checked){
//         alert("Activate plugin: " + event.data.plugin.getName());
//     }
//     else{
//         alert("Deactivate plugin: " + event.data.plugin.getName());
//     }
// }
//
// function changeActivePlugin(event){
//     alert("Change active plugin: " + event.data.plugin.getName());
//     activePlugin = event.data.plugin;
//     setRightToolBox();
//     setEditInMenu();
//     setToolBar();
// }
//
// function createTab(){
//     var newTab ={
//         Title: null,
//         Element: null,
//         SVGwrapper: null,
//         SVGelement: null,
//         Figures: [],
//         AddCreatedFigure(figure){
//             this.Figures.push(figure);
//         }
//     };
//
//     newTab.Title = "Tab " + XCommand.Tabs.length;
//
//     $('.tabTitle').removeClass('active').attr('aria-expanded', 'false');
//     let newTitle = $.parseHTML('\
//                                 <li class="active tabTitle">\
//                                     <a aria-expanded="true" data-toggle="tab" href="#' + newTab.Title +'">\
//                                     <button class="close closeTab" type="button">×</button>\
//                                     ' + newTab.Title + '</a>\
//                                 </li>\
//     ');
//     $(".a", newTitle).on();
//
//     tabTitlesContainer.append(newTitle);
//
//     $('.painterTab').removeClass('active').removeClass('in');
//     let newTabElement = $.parseHTML('<div id="'+ newTab.Title +'" class="drawTab tab-pane fade active in"></div>');
//     tabsContainer.append(newTabElement);
//     newTab.Element = newTabElement;
//
//     $(newTabElement).svg();
//     newTab.SVGwrapper = $(newTabElement).svg("get");
//     newTab.SVGelement = $("svg", newTabElement);
//     //addDrawHandlers(newTab.SVGelement, newTab.SVGwrapper);
//
//     XCommand.Tabs.push(newTab);
//     XCommand.ActiveTab = newTab;
//
//     activePlugin.activate(newTab.SVGelement, newTab.SVGwrapper, newTab.AddCreatedFigure)
//
//     registerCloseTabEvent();
// }

// function addDrawHandlers(svgTag, svgWrapper){
//     $(svgTag).on( "mousedown", Down.bind(null, svgTag, svgWrapper));
//     $(svgTag).on( "mouseup", Up.bind(null, svgTag, svgWrapper));
// }
//
// function Down(svgTag, svgWrapper, e){
//     mDownX = e.pageX - svgTag.offset().left;
//     mDownY = e.pageY - svgTag.offset().top;
// }
//
// function Up(svgTag, svgWrapper, e){
//     var width = e.pageX - svgTag.offset().left - mDownX;
//     var height = e.pageY - svgTag.offset().top - mDownY;
//     svgWrapper.rect(mDownX, mDownY, width, height,
//         {fill: 'yellow', stroke: 'navy', strokeWidth: 5});
// }








// function registerChangeActiveTabEvent(){
//     $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
//         var target = $(e.target).attr("href") // activated tab
//         alert(target);
//     });
// }
//
function registerOpenEventForMenuItems(){
    $('.dropdown-submenu a.subMenuHeader').on("click", function(e){
        $(this).next('ul').toggle();
        return false;
    });
}
//
// function registerCloseTabEvent() {
//
//     $(".closeTab").click(function () {
//
//         //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
//         var tabContentId = $(this).parent().attr("href");
//         $(this).parent().parent().remove(); //remove li of tab
//         $('#myTab a:last').tab('show'); // Select first tab
//         $(tabContentId).remove(); //remove respective tab content
//
//     });
// }