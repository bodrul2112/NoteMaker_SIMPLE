define(["thirdparty/jquery",
    "services/TemplateService"
    ],

    function(jQuery, tpl) {

        var BoardViewFolder = function( )
        {
        	this.m_eElement = tpl.getTemplate(".folder");
        	this.m_eElement.addClass("boardItem");
        	
        	this.m_nScrollTop;
        }
        
        BoardViewFolder.prototype.clear = function()
        {
        	this.m_eElement.remove();
        }
        
        BoardViewFolder.prototype.getElement = function()
        {
        	return this.m_eElement;
        }
        
        BoardViewFolder.prototype.getScrollTop = function() 
        {
        	return this.m_nScrollTop;
        }
        
        BoardViewFolder.prototype.setScrollTop = function( nScrollPos ) 
        {
        	this.m_eElement[0].scrollTop = nScrollPos;  
        }
        
        BoardViewFolder.prototype.postProcess = function() 
        {
        	this.m_eElement.on("scroll", function() {
        		
        		this.m_nScrollTop = this.m_eElement[0].scrollTop;
        		
        	}.bind(this));
        }
        
        return BoardViewFolder;
});