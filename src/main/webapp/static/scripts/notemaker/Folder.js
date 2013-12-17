define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/util/UICleaner",
    "notemaker/loader/FolderLoader",
    "notemaker/SubFolderNew",
    "notemaker/TextViewNew",
    "notemaker/features/concept/Concepts",
    "notemaker/Descriptor",
    ],

    function(jQuery, tpl, UICleaner, FolderLoader, SubFolderNew, TextViewNew, Concepts, Descriptor) {

        var Folder = function( oParentFolder, sFolderPath )
        {
        	this.m_sSigniture = "Folder_"+(new Date().getTime()) + ( ++window.COUNTER );
        	this.m_sFolderPath = sFolderPath;
        	
        	this.m_oUICleaner = new UICleaner();
        	this.m_oFolderLoader = new FolderLoader();
        	
        	this.m_oParentFolder = oParentFolder;

        	this.m_pSubFolders = [];
        	this.m_pTextViews = [];
        	
        	this.m_oSubFolderNew = new SubFolderNew(this.m_sFolderPath, this.m_sSigniture, this);
        	this.m_oConcepts;
        	this.m_oSymLinks;
        	
        	this.m_oTextViewNew = new TextViewNew(this.m_sFolderPath, this);
        	this.m_oDescriptor;
        	
        	this.m_oLoadedSubFolder = null;
        	
        	this.m_eElement = tpl.getTemplate(".folder");
        	this.m_eSubFoldersElement = tpl.getTemplate(".subfolders");
        	this.m_eTextViewsElement = tpl.getTemplate(".textviews");
        	
        	this.m_nScrollTop;
        	this.m_bBoardLoaded = false;
        	
        	if(window.LOADING_BOARD_VIEW)
        	{
        		this.m_bBoardLoaded = true;
        		this.m_eElement.addClass("boardItem");
        	}
        }
        
        Folder.prototype.isBoardLoaded = function()
        {
        	return this.m_bBoardLoaded;
        }
        
        Folder.prototype.getElement = function()
        {
        	return this.m_eElement;
        }
        
        Folder.prototype.getSubFolders = function()
        {
        	return this.m_pSubFolders;
        }
        
        Folder.prototype.hasSubFolders = function()
        {
        	if(this.m_pSubFolders && this.m_pSubFolders.length>0)
        	{
        		return true;
        	}
        	else
        	{
        		return false;
        	}
        }
        
        Folder.prototype.getFolderPath = function()
        {
        	return this.m_sFolderPath;
        }
        
        Folder.prototype._parseFolderName = function() 
        {
        	var pPathParts = this.m_sFolderPath.split("\\");
        	return pPathParts[pPathParts.length-1];
        }
        
        Folder.prototype.getConcepts = function()
        {
        	return this.m_oConcepts;
        }
        
        Folder.prototype.getSymLinks = function()
        {
        	return this.m_oSymLinks;
        }
        
        Folder.prototype.getSigniture = function()
        {
        	return this.m_sSigniture;
        }
        
        Folder.prototype.getScrollTop = function()
        {
        	return this.m_nScrollTop;  
        }
        
        Folder.prototype.setScrollTop = function( nScrollPos )
        {
        	this.m_eElement[0].scrollTop = nScrollPos;  
        }
        
        Folder.prototype.resetScrollTop = function()
        {
        	this.m_eElement[0].scrollTop = this.m_eElement[0].scrollHeight; 
        }
        
        Folder.prototype.resetScrollToLock = function()
        {
        	this.m_eElement[0].scrollTop = this.m_nScrollTop;
        }
        
        Folder.prototype.addSubFolder = function( oFolder )
        {
        	this.m_pSubFolders.push( oFolder );
        }
        
        Folder.prototype.addTextView = function( oTextView )
        {
        	this.m_pTextViews.push( oTextView )
        }
        
        Folder.prototype.setConcepts = function( oConcepts )
        {
        	this.m_oConcepts = oConcepts;
        }
        
        Folder.prototype.setSymLinks = function( oSymLinks )
        {
        	this.m_oSymLinks = oSymLinks;
        }
        
        Folder.prototype.addConcept = function( oConcept )
        {
        	this.m_oConcepts.addConcept( oConcept );
        }
        
        Folder.prototype.removeConcept = function( oConcept )
        {
        	this.m_oConcepts.removeConcept( oConcept );
        }
        
        Folder.prototype.addNewConceptToView = function( oConcept )
        {
        	this.m_oConcepts.addConcept( oConcept );
        	this.m_oUICleaner.addSingleElement(this.m_oConcepts.getElement(), oConcept);
        }
        
        Folder.prototype.addNewSymLinkToView = function( oSymLink )
        {
        	this.m_oSymLinks.addSymLink( oSymLink );
        	this.m_oUICleaner.addSingleElement(this.m_oSymLinks.getElement(), oSymLink);
        }
        
        Folder.prototype.addSubFolderAndRender = function( oSubFolder )
        {
        	this.m_pSubFolders.push(oSubFolder);
        	this.m_oUICleaner.addSingleElement(this.m_eSubFoldersElement, oSubFolder);
        }
        
        Folder.prototype.addTextViewAndRender = function( oTextView )
        {
        	this.m_pTextViews.push(oTextView);
        	this.m_oUICleaner.addSingleElement(this.m_eTextViewsElement, oTextView);
        }
        
        Folder.prototype.render = function( eContainerElement )
        {
        	if(!window.LOADING_BOARD_VIEW)
        	{
        		this.m_oUICleaner.addSingleElement( eContainerElement, this);
        	}
        	
        	this.m_oUICleaner.removeElements( this.m_pSubFolders );
        	this.m_oUICleaner.removeElements( this.m_pTextViews );
        	
        	this.m_eSubFoldersElement.remove();
        	this.m_oUICleaner.removeSingleElement(this.m_oSubFolderNew);
        	this.m_oUICleaner.removeSingleElement(this.m_oSymLinks);
        	this.m_oUICleaner.removeSingleElement(this.m_oConcepts);
        	this.m_eTextViewsElement.remove();
        	this.m_oUICleaner.removeSingleElement(this.m_oTextViewNew);
        	
        	if(window.LOADING_BOARD_VIEW)
        	{
        		window.BOARD_VIEW.initialFolderCheck( eContainerElement );
        		this.m_eElement = window.BOARD_VIEW.getLatestFolderElement().getElement();
        	}
        	
        	this.m_eElement.append(this.m_eSubFoldersElement)
        	
        	if(window.LOADING_BOARD_VIEW)
        	{
        		if(this.m_oDescriptor)
        		{
        			this.m_oUICleaner.removeSingleElement(this.m_oDescriptor);
        		}
        		this.m_oDescriptor = new Descriptor(this);
        		this.m_oUICleaner.addSingleElement(this.m_eSubFoldersElement, this.m_oDescriptor);
        	}
        	else
        	{
            	/** Subfolders **/
            	this.m_oUICleaner.addElements( this.m_eSubFoldersElement, this.m_pSubFolders );
            	this.m_oUICleaner.addSingleElement(this.m_eElement, this.m_oSubFolderNew);
            	
            	/** Symlinks **/
            	this.m_oUICleaner.addSingleElement(this.m_eElement, this.m_oSymLinks);
            	this.m_oUICleaner.addElements(this.m_oSymLinks.getElement(), this.m_oSymLinks.getSymLinks());
        	}
        	
        	/** Concepts **/
        	this.m_oUICleaner.addSingleElement(this.m_eElement, this.m_oConcepts);
        	this.m_oUICleaner.addElements(this.m_oConcepts.getElement(), this.m_oConcepts.getConcepts());
        	
        	if(window.LOADING_BOARD_VIEW)
        	{
        		window.BOARD_VIEW.addTextViews(this.m_oUICleaner, this.m_pTextViews, eContainerElement);
        		this.m_eTextViewsElement = window.BOARD_VIEW.getElement();
        		var oBoardViewFolder = window.BOARD_VIEW.getLatestFolderElement();
        		this.m_eElement = oBoardViewFolder.getElement();
        		
        		this.m_oUICleaner.addSingleElement(this.m_eElement, this.m_oTextViewNew);
        		this.m_oTextViewNew.setBoardViewFolder( oBoardViewFolder );
        	}
        	else
        	{
        		
        		this.m_eElement.append(this.m_eTextViewsElement);
        		this.m_oUICleaner.addElements( this.m_eTextViewsElement, this.m_pTextViews );
        		this.m_oUICleaner.addSingleElement(this.m_eElement, this.m_oTextViewNew);
        	}
        }
        
        Folder.prototype.postProcess = function() 
        {
        	this.m_eElement.on("click", function() {
        		
        		
        	}.bind(this));
        	
        	this.m_eElement.on("scroll", function() {
        		
        		this.m_nScrollTop = this.m_eElement[0].scrollTop;
        		
        	}.bind(this));
        	
        }
        
        Folder.prototype.selectFolderWithName = function( sName ) 
        {
        	this.removeClickedClassFromAllSubfolders();
        	
        	for(var key in this.m_pSubFolders)
        	{
        		var oSubFolder = this.m_pSubFolders[key];
        		if(oSubFolder.getFolderName() == sName)
        		{
        			oSubFolder.addClickedClass();
        		}
        	}
        }
        
        Folder.prototype.removeClickedClassFromAllSubfolders = function() 
        {
        	for(var key in this.m_pSubFolders)
        	{
        		var oSubfolder = this.m_pSubFolders[key];
        		oSubfolder.removeClickedClass();
        	}
        }
        
        Folder.prototype.refreshConcepts = function() 
        {
        	this.removeHasConceptClassFromAllTextViews();
        	
        	var pActivatedConcepts = this.m_oConcepts.getActivatedConcepts();
        	
        	for(var key in this.m_pTextViews)
        	{
        		var oTextView = this.m_pTextViews[key];
        		oTextView.addHasConceptFor( pActivatedConcepts );
        	}
        }
        
        Folder.prototype.removeHasConceptClassFromAllTextViews = function() 
        {
        	for(var key in this.m_pTextViews)
        	{
        		var oTextView = this.m_pTextViews[key];
        		oTextView.removeHasConceptClass();
        	}
        }
        
        Folder.prototype.refreshSymLinks = function() 
        {
        	var pSymLinks = this.m_oSymLinks.getSymLinks();
        	
        	for(var key in pSymLinks)
        	{
        		var oSymLink = pSymLinks[key];
        		oSymLink.removeClickedClass();
        	}
        }
        
        Folder.prototype.loadAsBoardMode = function() 
        {
        	window.BOARD_VIEW.clear();
        	
        	var pFolderPaths = [];
        	for(var key in this.m_pSubFolders)
        	{
        		var oSubFolder = this.m_pSubFolders[key];
        		pFolderPaths.push( oSubFolder.getFolderPath() );
        	}
        	
        	window.LOADING_BOARD_VIEW = true;
        	window.LOADING_BOARD_VIEW_FOLDER = this;
        	this.m_oFolderLoader.loadFolders( pFolderPaths );
        }
        
        Folder.prototype.setAllSubFoldersAsClicked = function() 
        {
        	for(var key in this.m_pSubFolders)
        	{
        		var oSubFolder = this.m_pSubFolders[key];
        		oSubFolder.addClickedClass();
        	}
        }
        
        return Folder;
});