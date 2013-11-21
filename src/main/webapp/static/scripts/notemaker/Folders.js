define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/FolderFactory",
    "notemaker/util/UICleaner"
    ],

    function(jQuery, tpl, FolderLoader, FolderFactory, UICleaner) {

        var Folders = function( )
        {
        	
        	window.CONCEPT_COUNTER=1; // I'm ashamed of myself, but this entire project is a hack job so :P
        	
        	this.m_pFolders = [];
        	
        	this.m_oFolderLoader = new FolderLoader();
        	this.m_oFolderFactory = new FolderFactory();
        	this.m_oUICleaner = new UICleaner();
        	
        	this.m_eElement = $(".folders");
        	
        	this.m_sSigniture = "Folders_"+(new Date().getTime());
        	
        }
        
        Folders.prototype.getSigniture = function()
        {
        	return this.m_sSigniture;
        }
        
        Folders.prototype.loadMainFolder = function( sMainFolderName )
        {
        	
        	window.EVENT_HUB.registerEvent("loadFolder", this.m_sSigniture, this.onEvent.bind(this));
        	window.EVENT_HUB.registerEvent("removeFolders", this.m_sSigniture, this.onEvent.bind(this));
        	window.EVENT_HUB.registerEvent("addSubFolder", this.m_sSigniture, this.onEvent.bind(this));
        	window.EVENT_HUB.registerEvent("saveTextView", this.m_sSigniture, this.onEvent.bind(this));
        	
        	this.m_oFolderLoader.loadFolder(sMainFolderName);
        }
        
        Folders.prototype.onEvent = function( sEventName , mData )
        {
        	if( sEventName == "removeFolders")
        	{
        		this.removeFoldersAfter(mData.after);
        	}
        	else if( sEventName == "addSubFolder")
        	{
        		this.addSubFolder(mData);
        	}
        	else if( sEventName == "saveTextView")
        	{
        		if(mData.type && mData.type == "concept")
        		{
        			this.addConceptToFolder( mData );
        		}
        		else
        		{
        			this.resetTextView( mData );
        		}
        		
        	}
        	else if( sEventName == "loadFolder")
        	{
        		var oFolder = this.m_oFolderFactory.createFolder(null, mData);
        		this.m_pFolders.push( oFolder );
        		
        		oFolder.render( this.m_eElement );
        	}
        }
        
        Folders.prototype.resetTextView = function( mData )
        {
        	var oTextView = window.STAGE.getStagedObject( mData.signiture );
        	window.STAGE.unstageObject( mData.signiture );
        	
        	if(mData.action == "saved" || mData.action == "created")
        	{
        		oTextView.removeEditingClass( mData );
        	}
        	else if(mData.action == "deleted")
        	{
        		oTextView.getElement().remove();
        	}
        	
        }
        
        Folders.prototype.addConceptToFolder = function( mData )
        {
        	var oConceptNew = window.STAGE.getStagedObject( mData.signiture );
        	window.STAGE.unstageObject( mData.signiture );
        	
        	oConceptNew.addNewConceptToView( mData );
        	
        }
        
        Folders.prototype.addSubFolder = function( mData )
        {
        	//{signiture: "Folder_1384550197866", folderPath: "D:\_LUCENE_TEST_DIRECTORY\_NOTEMAKER_BLOB_LOB_BLOB\gg", folderName: "gg"}
        	
        	var sSigniture = mData.signiture;
        	var sFolderPath = mData.folderPath;
        	var sFolderName = mData.folderName;
        	
        	for(var key in this.m_pFolders)
        	{
        		var oFolder = this.m_pFolders[key];
        		
        		if(sSigniture == oFolder.getSigniture())
        		{
        			var oSubFolder = this.m_oFolderFactory.createSubFolder(sFolderPath, sFolderName, sSigniture, oFolder);
        			oFolder.addSubFolderAndRender(oSubFolder);
        		}
        	}
        }
        
        Folders.prototype.removeFoldersAfter = function( sSigniture )
        {
        	pRemainingFolders = [];
        	
        	var bFound = false;
        	for(var key in this.m_pFolders)
        	{
        		var oFolder = this.m_pFolders[key];
        		
        		var sig = oFolder.getSigniture();
        		if(!bFound)
        		{
        			if( sSigniture == sig)
        			{
        				bFound = true;
        			}
        			
        			pRemainingFolders.push( oFolder );
        		}
        		else
        		{
        			oFolder.getElement().remove();
        		}
        	}
        	
        	this.m_pFolders = pRemainingFolders;
        }
        
        return Folders;
});