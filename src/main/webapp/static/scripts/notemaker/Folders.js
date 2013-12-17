define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/FolderFactory",
    "notemaker/util/UICleaner",
    "notemaker/features/boardview/BoardView"
    ],

    function(jQuery, tpl, FolderLoader, FolderFactory, UICleaner, BoardView) {

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
        
        Folders.prototype.getLastOpenedFolderPath = function()
        {
        	var oFolder = this.m_pFolders[this.m_pFolders.length-1];
        	return oFolder.getFolderPath();
        }
        
        Folders.prototype.getSigniture = function()
        {
        	return this.m_sSigniture;
        }
        
        Folders.prototype.loadMainFolder = function( sMainFolderName )
        {
        	window.BOARD_VIEW = new BoardView();
        	
        	window.COUNTER = 1;
        	window.ROOT_FOLDER = this;
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
        		else if(mData.type && mData.type == "symlink")
        		{
        			this.addSymLinkToFolder( mData );
        		}
        		else if(mData.type && mData.type == "deletion")
        		{
        			// do nothig
        		}
        		else
        		{
        			this.resetTextView( mData );
        		}
        		
        	}
        	else if( sEventName == "loadFolder")
        	{
        		
        		if(mData.piped)
        		{
        			var pipedFolderName = mData.piped;
        			var oFolder = this.m_pFolders[this.m_pFolders.length-1];
        			oFolder.selectFolderWithName( pipedFolderName );
        			
        		}
        		
        		var oFolder = this.m_oFolderFactory.createFolder(null, mData);
        		this.m_pFolders.push( oFolder );
        		
        		oFolder.render( this.m_eElement );
        		
        		if(mData.piped)
        		{
        			if(mData.pipeDone)
        			{
        				this.adjustScrollLeft( 600 );
        				
        				if(window.LOADING_BOARD_VIEW)
        				{
        					window.LOADING_BOARD_VIEW = false;
        					window.LOADING_BOARD_VIEW_FOLDER.setAllSubFoldersAsClicked();
        				}
        			}
        		}
        		else
        		{
        			this.adjustScrollLeft( 400 );
        		}
        	}
        }
        
        Folders.prototype.adjustScrollLeft = function( nScrollSpeed ) 
        {
        	var nTotalWidths = 0;
        	var nWidth;
        	for(var key in this.m_pFolders)
        	{
        		var oFolder = this.m_pFolders[key];
        		
        		if(!oFolder.isBoardLoaded())
        		{
        			nWidth = oFolder.getElement().width();
        			nTotalWidths += nWidth;
        		}
        	}
        	
        	if(nWidth && window.LOADING_BOARD_VIEW)
        	{
        		var nBoardFolders = window.BOARD_VIEW.getNumberOfFolders();
        		nTotalWidths += (nBoardFolders*nWidth);
        	}
        	
        	var nSpaceLeft = $('body').width() - nTotalWidths;
        	if(nSpaceLeft >0 )
        	{
        		$('body').animate({scrollLeft: 0}, nScrollSpeed, 'easeOutExpo', function(){} );
        	}
        	else
        	{
//        		$('body').scrollLeft(Math.abs(nSpaceLeft)+150);
//        		$('body').scrollLeft();
        		
        		var nScrollPos = Math.abs(nSpaceLeft)+150;
        		$('body').animate({scrollLeft: nScrollPos}, nScrollSpeed, 'easeOutExpo', function(){} );
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
        	var oTextView = window.STAGE.getStagedObject( mData.signiture );
        	window.STAGE.unstageObject( mData.signiture );
        	
        	oTextView.addNewConceptToView( mData );
        	
        }
        
        Folders.prototype.addSymLinkToFolder = function( mData )
        {
        	var oTextView = window.STAGE.getStagedObject( mData.signiture );
        	window.STAGE.unstageObject( mData.signiture );
        	
        	oTextView.addNewSymLinkToView( mData );
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