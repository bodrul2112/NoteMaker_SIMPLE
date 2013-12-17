define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/util/UICleaner",
    "notemaker/features/boardview/BoardViewFolder",
    
    ],

    function(jQuery, tpl, UICleaner, BoardViewFolder) {

        var BoardView = function( )
        {
        	this.m_oUICleaner = new UICleaner();
        	
        	this.m_nWindowHeight = $(window).height();
        	this.m_pCurrentTextViews; 
        	this.m_pCurrentFolderElements; 
        	
        	this.m_bCleared = false;
        	
        	this.m_eCurrentTextViewsElement;
        	
        	this.clear();
        }
        
        BoardView.prototype.isCleared = function()
        {
        	return this.m_bCleared;
        }
        
        BoardView.prototype.getElement = function()
        {
        	return this.m_eCurrentTextViewsElement;
        }
        
        BoardView.prototype.getLatestFolderElement = function()
        {
        	return this.m_pCurrentFolderElements[this.m_pCurrentFolderElements.length-1];
        }
        
        BoardView.prototype.getNumberOfFolders = function()
        {
        	return this.m_pCurrentFolderElements.length;
        }
        
        BoardView.prototype.getLatestElement = function()
        {
        	return this.m_pCurrentTextViews[this.m_pCurrentTextViews.length-1];
        } 
        
        BoardView.prototype.isLatestElementInOverflow = function()
        {
        	var eCurrent = this.getLatestElement();
        	var nBottom = eCurrent.position().top + eCurrent.height();
        	
        	if( nBottom > this.m_nWindowHeight )
        	{
        		return true;
        	}
        	
        	return false;
        }
        
        BoardView.prototype.setUpLatestElement = function( eContainer )
        {
        	if(this.isLatestElementInOverflow())
        	{
        		this.addNewElementToEnd( eContainer );
        	}
        	
        	return this.getLatestElement();
        }
        
        BoardView.prototype.addNewElementToEnd = function( eContainer )
        {
        	
        	var oBoardViewFolder = new BoardViewFolder();
        	
        	this.m_pCurrentFolderElements.push(oBoardViewFolder);
        	var eFolder = oBoardViewFolder.getElement();
        	
        	this.m_oUICleaner.addSingleElement(eContainer, oBoardViewFolder);

        	var eTextViews = tpl.getTemplate(".textviews");
        	this.m_pCurrentTextViews.push(eTextViews);

        	eFolder.append(eTextViews);
        	this.m_eCurrentTextViewsElement = eTextViews;
        } 
        
        BoardView.prototype.clear = function() {
        	
        	for(var key in this.m_pCurrentFolderElements)
        	{
        		var oBoardViewFolder = this.m_pCurrentFolderElements[key];
        		oBoardViewFolder.clear();
        	}
        	
        	this.m_pCurrentFolderElements = [];
        	var oBoardViewFolder = new BoardViewFolder();
        	this.m_pCurrentFolderElements.push(oBoardViewFolder);
        	
        	this.m_pCurrentTextViews = [];
        	
        	this.m_bCleared = true;
        }

        BoardView.prototype.initialFolderCheck = function( eContainerElement )
        {
        	if(this.m_bCleared)
        	{
        		var oBoardViewFolder = this.getLatestFolderElement();
        		this.m_oUICleaner.addSingleElement( eContainerElement, oBoardViewFolder)
        		this.m_bCleared = false;
        	}
        } 
        
        BoardView.prototype.addNewTextViewsContainerForNewFolder = function() 
        {
        	var eFolder = this.getLatestFolderElement().getElement();
        	
        	var eTextView = tpl.getTemplate(".textviews");
        	eFolder.append(eTextView);
        	
        	this.m_pCurrentTextViews.push(eTextView);
        	this.m_eCurrentTextViewsElement = eTextView; 
        }
        
        BoardView.prototype.addTextViews = function( oUICleaner, pTextViews, eContainerElement ) 
        {
        	this.addNewTextViewsContainerForNewFolder();
        	
        	for(var key in pTextViews)
        	{
        		var oTextView = pTextViews[key];
        		this.setUpLatestElement( eContainerElement );
        		oUICleaner.addSingleElement( this.getElement(), oTextView);
        		
        		oTextView.setBoardViewFolder( this.getLatestFolderElement() );
        	}
        	
        	this.setUpLatestElement( eContainerElement );
        }
        
        return BoardView;
});