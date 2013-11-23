define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader"
    ],

    function(jQuery, tpl, FolderLoader) {

        var SymLink = function( sParentSigniture, sSymLinkName, sSymLinkPath, oFolder )
        {
        	this.m_sParentSigniture = sParentSigniture;
        	this.m_oFolder = oFolder;
        	this.m_bIsActivated = false;
        	
        	this.m_oFolderLoader = new FolderLoader();
        	
        	this.m_sSymLinkName = sSymLinkName.trim();
        	this.m_sSymLinkPath = sSymLinkPath.trim();
        	
        	this.m_sSigniture = "SymLink_"+(Math.random()*Math.random()*1000);
        	
        	this.m_eElement = tpl.getTemplate(".symlink");
        	
        	this.m_eElement.find(".symlink_label").text(this.m_sSymLinkName);
        }
        
        SymLink.prototype.getElement = function()
        {
        	return this.m_eElement;
        }
        
        SymLink.prototype.getSymLinkName = function()
        {
        	return this.m_sSymLinkName;
        }
        
        SymLink.prototype.getSymLinkPath = function()
        {
        	return this.m_sSymLinkPath;
        }
        
        SymLink.prototype.getSigniture = function()
        {
        	return this.m_sSigniture;
        }
        
        SymLink.prototype.postProcess = function() 
        {
        	this.m_eElement.find('.symlink_label').on("click", function() {
        		
        		this.activate();
        		
        		var sRootFolderPath = this.m_oFolder.getFolderPath();
        		
        		var pLinkParts = this.m_sSymLinkPath.split("/");
        		var pFolderPaths = [];
        		var pPathInc="";
        		for(var key in pLinkParts)
        		{
        			var sPath = pLinkParts[key];
        			if(sPath !== "")
        			{
        				pPathInc+="/"+sPath;
        				pFolderPaths.push( sRootFolderPath + pPathInc);
        			}
        		}
        		
        		console.log("im a clicked class", this.m_oFolder.getFolderPath(), this.m_sSymLinkPath, pFolderPaths);
        		
        		window.EVENT_HUB.triggerEvent("removeFolders", {"after": this.m_sParentSigniture})
        		
        		this.m_oFolderLoader.loadFolders(pFolderPaths);
        		
        		
        	}.bind(this));
        	
        	this.m_eElement.find(".delete").on("click", function() {

        		this.getElement().remove();
        		this.m_oFolder.getSymLinks().removeSymLink( this );
        		
        	}.bind(this));
        }
        
        SymLink.prototype.activate = function()
        {
        	this.m_oFolder.refreshSymLinks();
        	this.addClickedClass();
        	
        	// load the folder hre
        }
        
        SymLink.prototype.isActivated = function()
        {
        	return this.m_bIsActivated;
        }
        
        SymLink.prototype.addClickedClass = function()
        {
        	this.m_eElement.addClass('clicked')
        }
        
        SymLink.prototype.removeClickedClass = function()
        {
        	this.m_eElement.removeClass('clicked')
        }
        
        return SymLink;
});