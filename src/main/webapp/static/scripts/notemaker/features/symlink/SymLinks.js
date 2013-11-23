define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/features/symlink/SymLink",
    "notemaker/persist/FolderPersistance"
    ],

    function(jQuery, tpl, FolderLoader, SymLink, FolderPersistance) {

        var SymLinks = function( sParentSigniture, sFilePath, oFolder )
        {
        	this.m_oFolderPersistance = new FolderPersistance();
        	
        	this.m_sParentSigniture = sParentSigniture;
        	
        	this.m_eElement = tpl.getTemplate(".symlinks");
        	
        	this.m_sSigniture = "SymLinks_"+(Math.random()*Math.random())
        	
        	this.m_sFilePath = sFilePath;
        	
//        	this.m_mSymLinks = {};
        	this.m_mSymLinks = [];
        }
        
        SymLinks.prototype.getElement = function()
        {
        	return this.m_eElement;
        }
        
        SymLinks.prototype.getSigniture = function()
        {
        	return this.m_sSigniture;
        }
        
        SymLinks.prototype.getSymLinks = function()
        {
        	return this.m_mSymLinks;
        }
        
        SymLinks.prototype.postProcess = function() 
        {
        	this.m_eElement.on("click", function() {
        		
        		
        	}.bind(this));
        }
        
        
        SymLinks.prototype.addSymLink = function( oSymLink ) {
        	
        	this.m_mSymLinks.push( oSymLink );
        }
        
        SymLinks.prototype.removeSymLink = function( oSymLinkRemove ) 
        {
        	
        	var sSig = oSymLinkRemove.getSigniture();
        	var pSymLinks = [];
        	
        	for(var key in this.m_mSymLinks)
        	{
        		var oSymLink = this.m_mSymLinks[key];
        		
        		if(oSymLink.getSigniture() !== sSig)
        		{
        			pSymLinks.push(oSymLink);
        		}
        	}
        	
        	this.m_mSymLinks = pSymLinks;
        	
        	this.saveSymLinks();
        }
        
        SymLinks.prototype.saveSymLinks = function()
        {
        	var mExtra = {
					"type":"deletion"
    			};
        	
        	var sSymLinksString = this.getSymLinksAsString();
        	sSymLinksString = sSymLinksString.substring(0, sSymLinksString.length-1);
        	
        	if(sSymLinksString.trim() == "")
        	{
        		sSymLinksString = "-";
        	}
        	
        	this.m_oFolderPersistance.saveTextView(this.m_sFilePath, this.m_sSigniture, sSymLinksString, mExtra);
        }
        
        SymLinks.prototype.getSymLinksAsString = function() 
        {
        
        	var sResult = "";
        	
        	for(var key in this.m_mSymLinks)
        	{
        		var oSymLink = this.m_mSymLinks[key];
        		sResult += oSymLink.getSymLinkName()+"->"+oSymLink.getSymLinkPath()+",";
        	}
        	
        	return sResult;
        	
        }
        
        SymLinks.prototype.render = function() {
        	
        	
        }
        
        return SymLinks;
});