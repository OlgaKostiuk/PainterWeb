/**
 * Created by Olga on 10/6/2017.
 */
var SimpleFigure = {
    getName(){
        return "SimpleFigurePlugin";
    },

    getPluginsMenuItem(){
        return $('<div/>', {
            "class" : 'checkbox'
        }).append(
            $('<label/>').append(
                $('<input/>', {
                    "type" : 'checkbox',
                    "checked": 'checked'
                })
            ).append("Simple Figure")
        )
        // return $('<div/>', {"class": 'checkbox'})
        //     .append($('<input/>', {
        //         "type": 'checkbox',
        //         "checked": 'checked',
        //         "id": 'ololo'
        //     }))
        //     .append($('<label/>', {
        //             "for": 'ololo'
        //         })
        //             .append("Simple Figure")
        //     )
    },

    getEditMenu() {

    },

    getToolBar() {

    },

    getLeftToolBox(){

    },

    getRightToolBox(){

    }
};

var XCommand = {
    setColor(){
        alert("setColor");
    },
    setType(){
        alert("setType");
    }
};
