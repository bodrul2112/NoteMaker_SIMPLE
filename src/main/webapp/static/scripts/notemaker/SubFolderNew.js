define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/persist/FolderPersistance"
    ],

    function(jQuery, tpl, FolderPersistance) {

		//TODO: ended up passing in the parent object reference anyway, clean this up later
        var SubFolderNew = function( sFolderPath, sParentSigniture, oParentFolder )
        {
        	this.m_oParentFolder = oParentFolder;
        	this.m_sFolderPath = sFolderPath;
        	this.m_sParentSigniture = sParentSigniture;
        	this.m_eElement = tpl.getTemplate(".subfolder.new");
        	this.m_eTextArea = this.m_eElement.find(".newfolder_name");
        	this.m_oFolderPersistance = new FolderPersistance();
        }
        
        SubFolderNew.prototype.getElement = function()
        {
        	return this.m_eElement;
        }
        
        SubFolderNew.prototype.postProcess = function() 
        {
        	this.m_eElement.find('.add').on("click", function() {
        		
        		var sFolderName = this.m_eTextArea.val();
        		
        		if(!sFolderName || (sFolderName.trim()==""))
        		{
        			alert("Can't create a folder with an empty name!");
        		}
        		else
        		{
        			this.m_oFolderPersistance.createFolder(this.m_sFolderPath, this.m_sParentSigniture, sFolderName);
            		this.m_eTextArea.val("");
        		}
        		
        	}.bind(this));
        	
        	this.m_eElement.find('.boardModeBtn').on("click", function() {
        		
        		if(this.m_oParentFolder.hasSubFolders())
        		{
        			window.EVENT_HUB.triggerEvent("removeFolders", {"after": this.m_sParentSigniture}); 
        			this.m_oParentFolder.loadAsBoardMode();
        		}
        		else
        		{
        			console.log("no subfolders to board view");
        		}
        		
        	}.bind(this));
        }
        
        return SubFolderNew;
});