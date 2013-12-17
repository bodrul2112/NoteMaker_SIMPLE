
define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/Folders",
    "notemaker/event/EventHub",
    "notemaker/event/Stage"
    ],

    function(jQuery, tpl, Folders, EventHub, Stage) {

        var NoteMaker = function( )
        {
        	//var sMainFolderName = prompt("Enter location of main folder: ");
        	
        	this.m_oFolders = new Folders();
        	this.m_oFolders.loadMainFolder("main");
        	
        }
        
        NoteMaker.prototype._initialise = function()
        {
        	
        }
        
        NoteMaker.prototype.render = function()
        {

        }
        
        return NoteMaker;
});