function StationModel(statInit) {

    this.stationInitials = ko.observable(statInit);
    this.stationName = ko.observable('Moody Radio Cleavland');
    this.stationCommitted = ko.observable ('90');


    this.stationRemaining = ko.observable ('10');


    this.stationGoal = ko.observable ('2.08M');
}

function AppViewModel(){
    var self = this
    self.getData= function() {
        $.ajax({
            url: "/home/PosterPlace",
            data: JSON.stringify({Words: "MoreWords"}),
            contentType: "application/json",
            dataType: 'json',
            type:"POST",
            success: function (data) { 
                console.log(data);
                self.stations()[0].stationCommitted(data);
            }
        });
    };

    if (location.hash == "") location.hash = 'page1';
    self.currentPage = ko.observable(location.hash.slice(1));

	self.stations = ko.observableArray();
	self.stations.push(new StationModel('MRCJ'));
	self.stations.push(new StationModel('YWfO'));
	self.stations.push(new StationModel('UFOs'));
	self.titles={
		page1: "Executive Summary",
		page2: "Settings"
	};
}

ko.bindingHandlers.gotoPage = {
    init: function (element, valueAccessor) {
        $(element).click(function () {
            vm.currentPage(valueAccessor());
            location.hash = valueAccessor();

            //specific instructions for loading of each page

            
        });
        $(element).css("cursor", "pointer");
    }
}

var vm = new AppViewModel();
$(document).ready ( function () {ko.applyBindings(vm)});

 $('#setting-menu').click(function () {
        $('#settings-body').removeClass("hidden").addClass("show");
    });
