
define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/Folders",
    "notemaker/event/EventHub",
    "notemaker/event/Stage"
    ],

    function(jQuery, tpl, Folders, EventHub, Stage) {

        var NoteMaker = function( )
        {
        	this.m_oFolders = new Folders();
        	
        	this.m_oFolders.loadMainFolder();
        }
        
        NoteMaker.prototype._initialise = function()
        {
        	
        }
        
        NoteMaker.prototype.render = function()
        {

        }
        
        return NoteMaker;
});