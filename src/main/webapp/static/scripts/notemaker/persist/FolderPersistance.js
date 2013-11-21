

define(["thirdparty/jquery",
    "services/TemplateService"
    ],

    function(jQuery, tpl) {

        var FolderPersistance = function( )
        {
        }
        
        FolderPersistance.prototype.createFolder = function( sDirectory, sSigniture, sNewFolderName )
        {
        	
        	var postData = {
        			"signiture": sSigniture,
        			"folderPath": sDirectory,
        			"folderName": sNewFolderName
        	}
        	
        	$.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/notemaker/newfolder",
                data: JSON.stringify(postData),
                dataType: "text"
            }).done(function(data) {
            	window.EVENT_HUB.triggerEvent("addSubFolder", JSON.parse(data));
            }.bind(this))
            .fail(function(xhr, textStatus, thrownError) { alert("error " + textStatus); console.log(xhr, textStatus, thrownError);})
        	
        }
        
        FolderPersistance.prototype.saveTextView = function( sFilePath, sSigniture, sContent, mExtra )
        {
        	var postData = {
        			"signiture": sSigniture,
        			"filePath": sFilePath,
        			"content": sContent
        	}
        	
        	if(mExtra)
        	{
        		for(var key in mExtra)
        		{
        			postData[key] = mExtra[key];
        		}
        	}
        	
        	$.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/notemaker/savetextview",
                data: JSON.stringify(postData),
                dataType: "text"
            }).done(function(data) {
            	window.EVENT_HUB.triggerEvent("saveTextView", JSON.parse(data));
            }.bind(this))
            .fail(function(xhr, textStatus, thrownError) { alert("error " + textStatus); console.log(xhr, textStatus, thrownError);})
        	
        }
        
        return FolderPersistance;
});