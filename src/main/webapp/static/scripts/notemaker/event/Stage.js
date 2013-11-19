define(["thirdparty/jquery",
    "services/TemplateService"
    ],

    /** Some experimental hacking **/
    function(jQuery, tpl, FolderLoader) 
    {
        var Stage = function()
        {
        	this.m_oStagedObjects = {};
        }
        
        Stage.prototype.stageObject = function( sSigniture, oObject ) 
        {
        	this.m_oStagedObjects[sSigniture] = oObject;
        }
        
        Stage.prototype.getStagedObject = function( sSigniture )
        {
        	return this.m_oStagedObjects[sSigniture];
        }
        
        Stage.prototype.unstageObject = function( sSigniture )
        {
        	delete this.m_oStagedObjects[sSigniture];
        }
        
        if(!window.STAGE){
        	window.STAGE = new Stage();
        }
        
        return window.STAGE;
});