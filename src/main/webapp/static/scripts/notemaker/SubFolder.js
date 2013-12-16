define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader"
    ],

    function(jQuery, tpl, FolderLoader) {

		//TODO: ended up passing in the parent object reference anyway, clean this up later
        var SubFolder = function( sFolderPath, sFolderName, sParentSigniture, oParentFolder )
        {
        	this.m_oFolderLoader = new FolderLoader();
        	
        	this.m_sFolderPath = sFolderPath;
        	this.m_sFolderName = sFolderName;
        	this.m_oParentFolder = oParentFolder;
        	this.m_sParentSigniture = sParentSigniture;
        	
        	this.m_eElement = tpl.getTemplate(".subfolder.directory");
        	this.m_eElement.text(this.m_sFolderName);
        }
        
        SubFolder.prototype.getElement = function()
        {
        	return this.m_eElement; 
        }
        
        SubFolder.prototype.getFolderName = function()
        {
        	return this.m_sFolderName;
        }
        
        SubFolder.prototype.getFolderPath = function()
        {
        	return this.m_sFolderPath;
        }
        
        SubFolder.prototype.postProcess = function() 
        {
        	this.m_eElement.on("click", function() {
        		
        		console.log("subfolder",this.m_sFolderPath, this.m_sFolderName)
        		window.EVENT_HUB.triggerEvent("removeFolders", {"after": this.m_sParentSigniture})
        		
        		this.loadFolder();
        		
        	}.bind(this));
        }
        
        SubFolder.prototype.loadFolder = function()
        {
    		this.m_oFolderLoader.loadFolder(this.m_sFolderPath);
    		this.m_oParentFolder.removeClickedClassFromAllSubfolders();
    		this.addClickedClass();
        }
        
        SubFolder.prototype.addClickedClass = function()
        {
        	this.m_eElement.addClass('clicked');
        }
        
        SubFolder.prototype.removeClickedClass = function()
        {
        	this.m_eElement.removeClass('clicked');
        }
        
        return SubFolder;
});