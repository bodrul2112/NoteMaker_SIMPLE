define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/util/UICleaner",
    "notemaker/loader/FolderLoader",
    "notemaker/SubFolderNew",
    "notemaker/TextViewNew",
    "notemaker/features/concept/Concepts"
    ],

    function(jQuery, tpl, UICleaner, FolderLoader, SubFolderNew, TextViewNew, Concepts) {

        var Folder = function( oParentFolder, sFolderPath )
        {
        	this.m_sSigniture = "Folder_"+(new Date().getTime());
        	this.m_sFolderPath = sFolderPath;
        	
        	this.m_oUICleaner = new UICleaner();
        	this.m_oFolderLoader = new FolderLoader();
        	
        	this.m_oParentFolder = oParentFolder;

        	this.m_pSubFolders = [];
        	this.m_pTextViews = [];
        	
        	this.m_oSubFolderNew = new SubFolderNew(this.m_sFolderPath, this.m_sSigniture, this);
        	this.m_oConcepts;
        	
        	this.m_oTextViewNew = new TextViewNew(this.m_sFolderPath, this);
        	
        	this.m_oLoadedSubFolder = null;
        	
        	this.m_eElement = tpl.getTemplate(".folder");
        	this.m_eSubFoldersElement = tpl.getTemplate(".subfolders");
        	this.m_eTextViewsElement = tpl.getTemplate(".textviews");
        }
        
        Folder.prototype.getElement = function()
        {
        	return this.m_eElement;
        }
        
        Folder.prototype.getConcepts = function()
        {
        	return this.m_oConcepts;
        }
        
        Folder.prototype.getSigniture = function()
        {
        	return this.m_sSigniture;
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
        
        Folder.prototype.addConcept = function( oConcept )
        {
        	this.m_oConcepts.addConcept( oConcept );
        }
        
        Folder.prototype.addNewConceptToView = function( oConcept )
        {
        	this.m_oConcepts.addConcept( oConcept );
        	this.m_oConcepts.getConceptNew().getElement().remove();
        	this.m_oUICleaner.addSingleElement(this.m_oConcepts.getElement(), oConcept);
        	this.m_oUICleaner.addSingleElement(this.m_oConcepts.getElement(), this.m_oConcepts.getConceptNew());
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
        	this.m_oUICleaner.addSingleElement( eContainerElement, this);
        	
        	this.m_oUICleaner.removeElements( this.m_pSubFolders );
        	this.m_oUICleaner.removeElements( this.m_pTextViews );
        	
        	this.m_eSubFoldersElement.remove();
        	this.m_oUICleaner.removeSingleElement(this.m_oSubFolderNew);
        	this.m_oUICleaner.removeSingleElement(this.m_oConcepts);
        	this.m_eTextViewsElement.remove();
        	this.m_oUICleaner.removeSingleElement(this.m_oTextViewNew);
        	
        	this.m_eElement.append(this.m_eSubFoldersElement)
        	this.m_oUICleaner.addElements( this.m_eSubFoldersElement, this.m_pSubFolders );
        	this.m_oUICleaner.addSingleElement(this.m_eElement, this.m_oSubFolderNew);
        	
        	this.m_oUICleaner.addSingleElement(this.m_eElement, this.m_oConcepts);
        	
        	this.m_oUICleaner.addElements(this.m_oConcepts.getElement(), this.m_oConcepts.getConcepts());
        	this.m_oUICleaner.addSingleElement(this.m_oConcepts.getElement(), this.m_oConcepts.getConceptNew());
        			
        	this.m_eElement.append(this.m_eTextViewsElement);
        	this.m_oUICleaner.addElements( this.m_eTextViewsElement, this.m_pTextViews );
        	this.m_oUICleaner.addSingleElement(this.m_eElement, this.m_oTextViewNew);
        	
        }
        
        Folder.prototype.postProcess = function() 
        {
        	this.m_eElement.on("click", function() {
        		
        		
        	}.bind(this));
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
        	
        	for(var key in this.m_pTextViews)
        	{
        		var oTextView = this.m_pTextViews[key];
        		oTextView.addHasConceptFor(this.m_oConcepts.getActivatedConcepts());
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
        
        return Folder;
});