/**
 * Created by Olga on 10/6/2017.
 */
var FigureTypes = {
    LINE: "Line",
    RECTANGLE: "Rectangle",
    RRECTANGLE: "RRectangle",
    ELLIPSE: "Ellipse"
};

var mDownX = 0;
var mDownY = 0;

var currentSvgElement = null;
var currentSvgWrapper = null;
var callBackFigureCreated = null;

var typeBtns;
var toolBoxColorPicker;

var Figure = {
    color: null,
    width: null,
    type: null,
    //TODO: add other params
};


var SimpleFigure = {
    getName(){
        return "SimpleFigurePlugin";
    },

    getPluginsMenuItem(){
        return $('<div/>', {
            "class": 'checkbox'
        }).append(
            $('<label/>').append(
                $('<input/>', {
                    "type": 'checkbox',
                    "checked": 'checked'
                })
            ).append("Simple Figure")
        )
    },

    getEditMenu() {
        let editMenu = $.parseHTML('\
							<li class="dropdown-submenu">\
                                <a class="subMenuHeader">Figure<span class="caret"></span></a>\
                                <ul class="dropdown-menu">\
                                    <li class="dropdown-submenu"><a class="subMenuHeader">Type<span class="caret"></span></a>\
                                        <ul class="dropdown-menu">\
                                            <li><a>Line</a></li>\
                                            <li><a>Rectangle</a></li>\
                                            <li><a>RRectangle</a></li>\
                                            <li><a>Ellipse</a></li>\
                                        </ul>\
                                    </li>\
                                    <li>\
                                        <label style="padding: 0 20px">Color\
                                            <input class="form-control" type="color" value="#563d7c" style="display: inline-block">\
                                        </label>\
                                    </li>\
                                    <li class="dropdown-submenu"><a class="subMenuHeader">Width<span class="caret"></span></a>\
                                        <ul class="dropdown-menu">\
                                            <li><a>1</a></li>\
                                            <li><a>5</a></li>\
                                            <li><a>10</a></li>\
                                            <li><a>15</a></li>\
                                            <li><a>20</a></li>\
                                        </ul>\
                                    </li>\
                                </ul>\
                            </li>\
                            ');
        registerOpenEventForMenuItems(editMenu);
        return editMenu;
    },

    getToolBar() {
        return $.parseHTML('\
                            <li>\
                                <label> Figure </label>\
                                <div class="dropdown" style="display: inline-block">\
                                    <a class="dropdown-toggle" data-toggle="dropdown">\
                                        <button class="btn navbar-btn btn-default">\
                                            <span class="glyphicon glyphicon-tree-conifer"></span>\
                                            <br/>\
                                            Type\
                                        </button>\
                                    </a>\
                                    <ul class="dropdown-menu">\
                                        <li><a>Line</a></li>\
                                        <li><a>Rectangle</a></li>\
                                        <li><a>RRectangle</a></li>\
                                        <li><a>Ellipse</a></li>\
                                    </ul>\
                                </div>\
                                <div style="display: inline-grid">\
                                    <select class="form-control lineWidth">\
                                        <option>1</option>\
                                        <option>5</option>\
                                        <option>10</option>\
                                        <option>15</option>\
                                        <option>20</option>\
                                    </select>\
                                    <span class="text-center">Width</span>\
                                </div>\
                                <div style="display: inline-grid">\
                                    <input class="form-control" type="color" value="#563d7c" id="example-color-input">\
                                    <span class="text-center">Color</span>\
                                </div>\
                            </li>')
    },

    getLeftToolBox(){
        return $.parseHTML('\
                        <div class="panel-body pluginElement">\
                            <button type="button" class="btn btn-primary btn-block pluginBtn">Simple figure</button>\
                        </div>\
                        ');
    },

    getRightToolBox(){
        var rightToolBox = $.parseHTML('\
        					<div class="panel-body">\
                                <label>Type:</label>\
                                <div class="btn-group-vertical">\
                                    <button type="button" class="typeBtn btn btn-default" value="Line">Line</button>\
                                    <button type="button" class="typeBtn btn btn-primary" value="Rectangle">Rectangle</button>\
                                    <button type="button" class="typeBtn btn btn-default" value="RRectangle">RRectangle</button>\
                                    <button type="button" class="typeBtn btn btn-default" value="Ellipse">Ellipse</button>\
                                </div>\
                            </div>\
                            <div class="panel-body">\
                                <label>Color</label>\
                                <input class="colorPicker form-control" type="color" value="#563d7c" style="display: inline-block">\
                            </div>\
                            <div class="panel-body">\
                                <label>Width</label>\
                                <select class="form-control lineWidth">\
                                    <option>1</option>\
                                    <option>5</option>\
                                    <option>10</option>\
                                    <option>15</option>\
                                    <option>20</option>\
                                </select>\
                            </div>\
                            ');
        typeBtns = $(".typeBtn", rightToolBox);
        toolBoxColorPicker = $(".colorPicker", rightToolBox);
        $(typeBtns).click(SimpleFigure.XCommand.setType);
        $(toolBoxColorPicker).change(SimpleFigure.XCommand.setColor);
        return rightToolBox;
    },

    XCommand: {
        setColor(e){
            alert(e.target.value);
        },
        setType(){
            $(typeBtns).removeClass('btn-primary').addClass('btn-default');
            $(this).removeClass('btn-default').addClass('btn-primary');
            Figure.type = this.value;
            // switch (this.value){
            //     case FigureTypes.LINE:
            //         Figure.type = FigureTypes.LINE;
            //         break;
            //     case FigureTypes.RECTANGLE:
            //         Figure.type = FigureTypes.RECTANGLE;
            //         break;
            //     case FigureTypes.RRECTANGLE:
            //         Figure.type = FigureTypes.RRECTANGLE;
            //         break;
            //     case FigureTypes.ELLIPSE:
            //         Figure.type = FigureTypes.ELLIPSE;
            //         break;
            // }
        },
        setWidth(){
            alert("setWidth");
        }
    },

    activate(svgElement, svgWrapper, callBack){
        currentSvgElement = svgElement;
        currentSvgWrapper = svgWrapper;
        callBackFigureCreated = callBack;
        this.addDrawHandlers();
    },

    addDrawHandlers(){
        $(currentSvgElement).on( "mousedown", this.Down);
        $(currentSvgElement).on( "mouseup", this.Up);
    },
    Down(e){
        mDownX = e.pageX - currentSvgElement.offset().left;
        mDownY = e.pageY - currentSvgElement.offset().top;
    },

    Up(e){
        var width = e.pageX - currentSvgElement.offset().left - mDownX;
        var height = e.pageY - currentSvgElement.offset().top - mDownY;
        currentSvgWrapper.rect(mDownX, mDownY, width, height,
            {fill: 'yellow', stroke: 'navy', strokeWidth: 5});
    }
};

function registerOpenEventForMenuItems(menu){
    $('.dropdown-submenu a.subMenuHeader', menu).on("click", function(e){
        $(this).next('ul').toggle();
        return false;
    });
}


