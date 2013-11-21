define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/features/symlink/SymLink"
    ],

    function(jQuery, tpl, FolderLoader, Concept) {

        var SymLinks = function( sParentSigniture, sFilePath, oFolder )
        {
        	this.m_sParentSigniture = sParentSigniture;
        	
        	this.m_eElement = tpl.getTemplate(".symlinks");
        	
        	this.m_sFilePath = sFilePath;
        	
//        	this.m_mSymLinks = {};
        	this.m_mSymLinks = [];
        }
        
        SymLinks.prototype.getElement = function()
        {
        	return this.m_eElement;
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
        	
//        	this.m_pSymLinks[ oConcept.getSigniture() ] = oConcept;
        	
        	this.m_mSymLinks.push( oSymLink );
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