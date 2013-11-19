define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/util/UICleaner",
    "notemaker/loader/FolderLoader",
    "notemaker/SubFolderNew",
    "notemaker/TextViewNew"
    ],

    function(jQuery, tpl, UICleaner, FolderLoader, SubFolderNew, TextViewNew) {

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
        	this.m_eTextViewsElement.remove();
        	this.m_oUICleaner.removeSingleElement(this.m_oTextViewNew);
        	
        	this.m_eElement.append(this.m_eSubFoldersElement)
        	this.m_oUICleaner.addElements( this.m_eSubFoldersElement, this.m_pSubFolders );
        	this.m_oUICleaner.addSingleElement(this.m_eElement, this.m_oSubFolderNew);
        	
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
        
        return Folder;
});