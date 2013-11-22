

define(["thirdparty/jquery",
    "services/TemplateService"
    ],

    function(jQuery, tpl) {

        var FolderLoader = function( )
        {
        	this.m_sTestBlob = {
        			
        		parentFolderPath: "yo",	
        		
        		concepts : { 
        			
        			filePath: "path/concepts",
        			content: "burrack,furiday,deal,notes,note,yo",
        		},
        		
        		symlinks : {
        			filePath: "path/symlinks",
        			content: "hello -> path/b, yellow -> path/c"
        		},
        		
    			subFolders: [
		    		{
		    			folderPath: "path/a",
		    			folderName: "notes 1, notes 1, notes 1"
		    		}
		    	],

		    	textViews: [
		    		{
		    			filePath: "path/b",
		    			content: "notes 2, notes 2, notes 2 yo"
		    		}
		    	]
        			    	
        	};
        }
        
        FolderLoader.prototype.loadFolder = function( sDirectory )
        {
        	
        	$.getJSON("http://localhost:6677/notemaker/folder/?folderPath=" + sDirectory, function( mData ) {
		     
        		window.EVENT_HUB.triggerEvent( "loadFolder", mData )
        	});
        	
//        	window.EVENT_HUB.triggerEvent( "loadFolder", this.m_sTestBlob )
        	
        }
        
        FolderLoader.prototype.loadFolders = function( pFolderPaths )
        {
        	if(!window.FOLDER_PIPE)
        	{
        		window.FOLDER_PIPE = pFolderPaths.reverse();
        		this.loadFolderFromPipe();
        	}
        	else
        	{
        		alert("clicking too fast wait for current link to load all folders")
        	}
        	
//        	window.EVENT_HUB.triggerEvent( "loadFolder", this.m_sTestBlob )
        	
        }
        
        FolderLoader.prototype.loadFolderFromPipe = function()
        {
        	if(window.FOLDER_PIPE && window.FOLDER_PIPE.length>0)
        	{
        		var sDirectory = window.FOLDER_PIPE.pop();
        		$.getJSON("http://localhost:6677/notemaker/folder/?folderPath=" + sDirectory, function( mData ) {
          		     
        			var folderName = mData.parentFolderPath.split("/").pop();
        			
        			mData["piped"] = folderName;
        			
            		window.EVENT_HUB.triggerEvent( "loadFolder", mData );
            		this.loadFolderFromPipe();
            	}.bind(this));
        	}
        	else{
        		window.FOLDER_PIPE = null;
        	}
        }
        
        return FolderLoader;
});