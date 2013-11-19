define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/persist/FolderPersistance"
    ],

    function(jQuery, tpl, FolderLoader, FolderPersistance) {

        var TextView = function( sFilePath, sContent )
        {
        	this.m_oFolderPersistance = new FolderPersistance();
        	
        	this.m_sSigniture = "TextView_"+ (new Date().getTime());
        	
        	this.sFilePath = sFilePath;
        	this.sContent = sContent;
        	
        	this.m_eElement = tpl.getTemplate(".textview")
        	
        	this.m_eElement.find('.textfile_content').val(this.sContent);
        }
        
        TextView.prototype.postProcess = function() 
        {
        	this.m_eElement.on( 'keyup', 'textarea', function (e){
        		
			    $(this).css('height', 'auto' );
			    $(this).height( this.scrollHeight );
			});
        	
        	this.m_eElement.on( 'focusin', function(e){
        		this.addEditingClass();
        	}.bind(this));
        	
        	this.m_eElement.on( 'focusout', function(e){
        		
        		window.STAGE.stageObject(this.m_sSigniture, this);
        		
        		var sContent = this.m_eElement.find('.textfile_content').val();
        		
        		if(sContent.trim() == "")
        		{
        			sContent="-";
        		}
        		
        		console.log(this.sFilePath, sContent);
        		
        		this.m_oFolderPersistance.saveTextView(this.sFilePath, this.m_sSigniture, sContent);
        		
        	}.bind(this));
        	
        	eTextArea = this.m_eElement.find('.textfile_content');
        	
        	eTextArea.css('height', 'auto' );
        	eTextArea.height( eTextArea[0].scrollHeight );
        	
        }
        
        TextView.prototype.getElement = function() 
        {
        	return this.m_eElement;
        }
        
        TextView.prototype._clicked = function()
        {
        	console.log("ahoy, gotta load some stuff yo");
        }
        
        TextView.prototype.addEditingClass = function()
        {
        	this.m_eElement.addClass('editing');
        }
        
        TextView.prototype.removeEditingClass = function()
        {
        	this.m_eElement.removeClass('editing');
        }
        
        return TextView;
});