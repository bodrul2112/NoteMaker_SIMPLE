
define(["thirdparty/jquery",
    "services/TemplateService"
    ],

    function(jQuery, tpl) {

        var Wall = function()
        {
        
        	this.m_data = {
        			maxWidth:3000
        	}
        	
        	this.b_show = false;
        	
        	this.width = 25;
        	this.height = 25;
        	
        	this.m_eElement = tpl.getTemplate(".wall");
        	this.m_eShowWall = this.m_eElement.find('.showWall');
        	this.m_eSpace = this.m_eElement.find('.space');
        	
        	this.m_eContainer = $('body');
        	this.m_eContainer.append(this.m_eElement);
        	
        	var w = this.m_eContainer.width()-this.width;
        	var h = this.m_eContainer.height()-this.height;
        	this.m_eShowWall.css('width', this.width+"px");
        	this.m_eShowWall.css('height', this.height+"px");
        	this.m_eShowWall.css('left', w+"px");
        	this.m_eShowWall.css('top', h+"px");
        	
        	this.m_eSpace.width(this.m_eContainer.width());
        	this.m_eSpace.height(this.m_eContainer.height());
        	
        	this.postProcess();
        }
        
        Wall.prototype.postProcess = function()
        {
        	this.m_eShowWall.on("click", function() {
        		
        		if(this.b_show)
        		{
        			this.m_eSpace.css('display', "none");
        			this.b_show = false;
        		}
        		else
        		{
        			this.m_eSpace.css('display', "inline-block");
        			this.b_show = true;
        		}
        		
        	}.bind(this));
        	
        }
        
        return Wall;
});