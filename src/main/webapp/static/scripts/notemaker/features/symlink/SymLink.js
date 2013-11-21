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
        	
        	this.m_sSymLinkName = sSymLinkName.trim();
        	this.m_sSymLinkPath = sSymLinkPath.trim();
        	
        	this.m_sSigniture = "SymLink_"+(Math.random()*Math.random()*1000);
        	
        	this.m_eElement = tpl.getTemplate(".symlink");
        	
        	this.m_eElement.text(this.m_sSymLinkName);
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
        	this.m_eElement.on("click", function() {
        		
//        		window.EVENT_HUB.triggerEvent("removeFolders", {"after": this.m_sParentSigniture})
//        		
//        		this.m_oFolderLoader.loadFolder(this.m_sFolderPath);
//        		
//        		this.m_oParentFolder.removeClickedClassFromAllSubfolders();
        		
        		this.activate();
        		
        		console.log("im a clicked class");
        		
        		
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