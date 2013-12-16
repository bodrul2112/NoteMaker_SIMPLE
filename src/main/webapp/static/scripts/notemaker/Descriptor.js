define(["thirdparty/jquery",
    "services/TemplateService"
    ],

    function(jQuery, tpl) {

        var Descriptor = function( oParentFolder )
        {
        	this.m_oParentFolder = oParentFolder;
        	
        	this.m_eElement = tpl.getTemplate(".descriptor");
        	this.m_sName = this.m_oParentFolder._parseFolderName();
        	this.m_sContent = this._getContent();
        	
        	this.init();
        }
        
        Descriptor.prototype._getContent = function() 
        {
        	var pSubFolders = this.m_oParentFolder.getSubFolders();
        	var sContent = "";
        	for(var key in pSubFolders)
        	{
        		var oSubFolder = pSubFolders[key];
        		sContent += oSubFolder.getFolderName() + ", ";
        	}
        	
        	sContent = sContent.trim();
        	if(sContent.length>0)
        	{
        		sContent = sContent.substring(0, sContent.length-1);
        	}
        	
        	return sContent;
        }
        
        Descriptor.prototype.init = function() 
        {
        	this.m_eElement.find('.name').text(this.m_sName);
        	this.m_eElement.find('.contents').text(this.m_sContent); 
        }
        
        Descriptor.prototype.getElement = function() 
        {
        	return this.m_eElement;
        }
        
        return Descriptor;
});