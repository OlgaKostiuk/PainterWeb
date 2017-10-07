/**
 * Created by Olga on 10/6/2017.
 */

window.myPlugins = [];
window.myPlugins.push(SimpleFigure);

var editInMenu;
var pluginsInMenu;

$(document).ready(function(){
    registerOpenEventForMenuItems();
    registerCloseEvent();

    initVariables();

    setPluginsMenu();
});


function initVariables(){
    editInMenu = $("#editSubMenu");
    pluginsInMenu = $("#pluginsSubMenu");
}

function setPluginsMenu(){
    let plugin = window.myPlugins[0];
    let item = plugin.getPluginsMenuItem();
    $("input", item).click({plugin: plugin}, togglePlugin);
    pluginsInMenu.append(item);
}

function togglePlugin(event){
    alert("togglePlugin " + event.data.plugin.getName());
}






function registerOpenEventForMenuItems(){
    $('.dropdown-submenu a.test').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
}

function registerCloseEvent() {

    $(".closeTab").click(function () {

        //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
        var tabContentId = $(this).parent().attr("href");
        $(this).parent().parent().remove(); //remove li of tab
        $('#myTab a:last').tab('show'); // Select first tab
        $(tabContentId).remove(); //remove respective tab content

    });
}