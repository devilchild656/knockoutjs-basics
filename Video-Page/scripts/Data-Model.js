var youTube =function(video) {

    this.videoTube = ko.observable(video);

    this.correctVideo= ko.computed(function(){
        return this.videoTube().replace("https://www.youtube.com/","https://www.youtube.com/embed/")
            .replace("watch?v=","")
    },this);

};

ko.bindingHandlers.returnAction = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        $(element).keydown(function(e) {
            if (e.which === 13) {
                value(viewModel);
            }
        });
    }
};

var ChildViewModel = function(name) {
        this.name = ko.observable(name);
    },
    MainViewModel = function() {
        var self = this;
        self.sendMessage = function(data) {
             var newMessage= function(){$("#container").append('<div class="reply">\
            <div class="feedback" data-bind="foreach: items">\
            <textarea class="reply-text" placeholder="Reply ..."\
                data-bind= "text:name">'+data.name()+'</textarea>\
                </div>\
                </div>')};
                newMessage();
            }

        self.items = ko.observableArray([
            new ChildViewModel("")]);

    }

ko.applyBindings(new MainViewModel(),reply(""),youTube(""));
