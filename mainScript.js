/**
 * Created by Olga on 10/6/2017.
 */

window.myPlugins = [];
window.myPlugins.push(SimpleFigure);
var activePlugin = window.myPlugins[0];

var editInMenu;
var pluginsInMenu;
var leftToolBox;
var rightToolBox;

$(document).ready(function(){
    registerOpenEventForMenuItems();
    registerCloseTabEvent();

    initVariables();

    setPluginsInMenu();
    setLeftToolBox();
    setEditInMenu();
});


function initVariables(){
    editInMenu = $("#editSubMenu");
    pluginsInMenu = $("#pluginsSubMenu");
    leftToolBox = $("#leftToolBox");
    rightToolBox = $("#rightToolBox");
}

function setPluginsInMenu(){
    for(let i in window.myPlugins){
        let plugin = window.myPlugins[i];
        let item = plugin.getPluginsMenuItem();
        $("input", item).change({plugin: plugin}, togglePlugin);
        pluginsInMenu.append(item);
    }
}

function setLeftToolBox(){
    for(let i in window.myPlugins){
        let plugin = window.myPlugins[i];
        let item = plugin.getLeftToolBox();
        $("button", item).click({plugin: plugin}, changeActivePlugin);
        leftToolBox.append(item);
    }
}

function setRightToolBox(){
    rightToolBox.empty();
    rightToolBox.append(activePlugin.getRightToolBox());
}

function setEditInMenu(){
    editInMenu.empty();
    editInMenu.append(activePlugin.getEditMenu());
    registerOpenEventForMenuItems();
}

function togglePlugin(event){
    if(event.target.checked){
        alert("Activate plugin: " + event.data.plugin.getName());
    }
    else{
        alert("Deactivate plugin: " + event.data.plugin.getName());
    }
}

function changeActivePlugin(event){
    alert("Change active plugin: " + event.data.plugin.getName());
    activePlugin = event.data.plugin;
    setRightToolBox();
    setEditInMenu();
}








function registerOpenEventForMenuItems(){
    $('.dropdown-submenu a.subMenuHeader').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
}

function registerCloseTabEvent() {

    $(".closeTab").click(function () {

        //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
        var tabContentId = $(this).parent().attr("href");
        $(this).parent().parent().remove(); //remove li of tab
        $('#myTab a:last').tab('show'); // Select first tab
        $(tabContentId).remove(); //remove respective tab content

    });
}