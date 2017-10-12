/**
 * Created by Olga on 10/13/2017.
 */


function Tab() {
    let newTab = {
        Title: null,
        HtmlBody: null,
        HtmlTitle: null,
        SvgWrapper: null,
        Figures: [],
        FigureCreatedCallback(figure){
            this.Figures.push(figure);
        }
    };
    newTab.Title = "Tab" + Tabs.length;
    newTab.HtmlTitle = $($.parseHTML('\
                                <li class="active tabTitle">\
                                    <a aria-expanded="true" data-toggle="tab" href="#' + newTab.Title + '">\
                                    <button class="close closeTab" type="button">×</button>\
                                    ' + newTab.Title + '</a>\
                                </li>\
                                    '));

    newTab.HtmlBody = $($.parseHTML('<div id="' + newTab.Title + '" class="drawTab tab-pane fade active in"></div>'));

    $(newTab.HtmlBody).svg();
    newTab.SvgWrapper = $(newTab.HtmlBody).svg("get");

    function displayTab(tabContainerTarget, titleContainerTarget) {
        $('.tabTitle').removeClass('active').attr('aria-expanded', 'false');
        titleContainerTarget.append(newTab.HtmlTitle);
        $('.drawTab').removeClass('active').removeClass('in');
        tabContainerTarget.append(newTab.HtmlBody);
    }

    function closeTab() {
        newTab.HtmlTitle.remove();
        newTab.HtmlBody.remove();
    }

    function hideTab() {

    }

    function refresh() {
        let parent = $(newTab.SvgWrapper.root()).parent();
        $(newTab.SvgWrapper.root()).width(parent.width());
        $(newTab.SvgWrapper.root()).height(parent.height());
    }
    newTab.display = displayTab;
    newTab.close = closeTab;
    newTab.hide = hideTab;
    newTab.refresh = refresh;
    return newTab;
}