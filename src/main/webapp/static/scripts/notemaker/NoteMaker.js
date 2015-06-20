
define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/Folders",
    "notemaker/event/EventHub",
    "notemaker/event/Stage",
    "notemaker/wall/Wall"
    ],

    function(jQuery, tpl, Folders, EventHub, Stage, Wall) {

        var NoteMaker = function( )
        {
        	//var sMainFolderName = prompt("Enter location of main folder: ");
        	
        	this.m_oFolders = new Folders();
        	this.m_oFolders.loadMainFolder("main");
        	
        	this.m_oWall = new Wall();
        	
        }
        
        NoteMaker.prototype._initialise = function()
        {
        	
        }
        
        NoteMaker.prototype.render = function()
        {

        }
        
        return NoteMaker;
});