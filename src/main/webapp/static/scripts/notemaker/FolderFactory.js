define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/Folder",
    "notemaker/SubFolder",
    "notemaker/TextView"
    ],

    function(jQuery, tpl, Folder, SubFolder, TextView) {

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
        		
        		var oTextView = new TextView( sFilePath, sContent );
        		oFolder.addTextView( oTextView );
        	}
        	
        	return oFolder;
        	
        }
        
        return FolderFactory;
});