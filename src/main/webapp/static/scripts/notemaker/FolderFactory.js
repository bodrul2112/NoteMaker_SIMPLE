define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/Folder",
    "notemaker/SubFolder",
    "notemaker/TextView",
    "notemaker/features/concept/Concepts",
    "notemaker/features/concept/Concept",
    "notemaker/features/symlink/SymLinks",
    "notemaker/features/symlink/SymLink"
    ],

    function(jQuery, tpl, Folder, SubFolder, TextView, Concepts, Concept, SymLinks, SymLink ) {

        var FolderFactory = function( )
        {
        }
        
        FolderFactory.prototype.createSubFolder = function(sFolderPath, sFolderName, sParentSigniture, oParentFolder)
        {
        	return new SubFolder(sFolderPath, sFolderName, sParentSigniture, oParentFolder);
        }
        
        FolderFactory.prototype.createFolder = function( oParentFolder, mData)
        {
        	var oFolder = new Folder( oParentFolder, mData.parentFolderPath );
        	
        	var pSubFolders = mData.subFolders;
        	var pTextViews = mData.textViews;
        	
        	
        	for(var key in pSubFolders)
        	{
        		var sFolderPath = pSubFolders[key].folderPath;
        		var sFolderName = pSubFolders[key].folderName;
        		
        		var oSubFolder = new SubFolder(sFolderPath, sFolderName, oFolder.getSigniture(), oFolder);
        		
        		oFolder.addSubFolder( oSubFolder );
        	}
        	
        	for(var key in pTextViews)
        	{
        		var sFilePath = pTextViews[key].filePath;
        		var sContent = pTextViews[key].content;
        		
        		var oTextView = new TextView( sFilePath, sContent, oFolder );
        		oFolder.addTextView( oTextView );
        	}
        	
        	var oConcepts = new Concepts( oFolder.getSigniture(), mData.parentFolderPath+"/list.concepts", oFolder );
        	
        	if(mData.concepts)
        	{
        		var pConcepts = mData.concepts.content.split(",");
            	
            	for(var key in pConcepts)
            	{
            		var sConceptName = pConcepts[key];
            		
            		if(sConceptName.trim() != "")
            		{
            			var oConcept = new Concept( oFolder.getSigniture(), sConceptName, oFolder );
                		oConcepts.addConcept( oConcept );
            		}
            		
            	}
        	}
        	
        	oFolder.setConcepts( oConcepts );
        	
        	var oSymLinks = new SymLinks( oFolder.getSigniture(), mData.parentFolderPath+"/list.symlinks", oFolder);
        	
        	if(mData.symlinks)
        	{
        		var pSymLinks = mData.symlinks.content.split(",");
        		
        		for(var key in pSymLinks)
        		{
        			var sSymlinkParts = pSymLinks[key].split("->");
        			var sSymlinkName = sSymlinkParts[0];
        			var sSymlinkPath = sSymlinkParts[1];
        			
        			var oSymLink = new SymLink( oFolder.getSigniture(), sSymlinkName, sSymlinkPath, oFolder );
        			
        			oSymLinks.addSymLink( oSymLink );
        		}
        	}
        	
        	oFolder.setSymLinks( oSymLinks );
        	
        	return oFolder;
        	
        }
        
        return FolderFactory;
});