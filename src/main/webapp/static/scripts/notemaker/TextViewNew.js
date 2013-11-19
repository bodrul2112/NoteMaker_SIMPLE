define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/persist/FolderPersistance",
    "notemaker/TextView"
    ],

    function(jQuery, tpl, FolderLoader, FolderPersistance, TextView) {

        var TextViewNew = function( sFolderPath, oParentFolder )
        {
        	this.m_oFolderPersistance = new FolderPersistance();
        	
        	this.m_sSigniture = "TextViewNew_"+ (new Date().getTime());
        	this.m_oParentFolder = oParentFolder;
        	
        	this.sFolderPath = sFolderPath;
        	this.sContent = "";
        	
        	this.m_eElement = tpl.getTemplate(".textview")
        	
        	this.m_eElement.find('.textfile_content').val(this.sContent);
        }
        
        TextViewNew.prototype.getParentSigniture = function() 
        {
        	return this.m_sParentSigniture;
        }
        
        TextViewNew.prototype.postProcess = function() 
        {
        	this.m_eElement.on( 'keyup', 'textarea', function (e){
        		
			    $(this).css('height', 'auto' );
			    $(this).height( this.scrollHeight );
			});
        	
        	this.m_eElement.on( 'focusin', function(e){
        		this.addEditingClass();
        	}.bind(this));
        	
        	this.m_eElement.on( 'focusout', function(e){
        		
        		var sContent = this.m_eElement.find('.textfile_content').val();
        		
        		if(sContent.trim() == "")
        		{
        			this.m_eElement.removeClass('editing');
        		}
        		else
        		{
        			window.STAGE.stageObject(this.m_sSigniture, this);
            		var sFilePath = this.sFolderPath + "/" + this.createFileName();
            		this.m_oFolderPersistance.saveTextView(sFilePath, this.m_sSigniture, sContent);
        		}
        		
        	}.bind(this));
        	
        	eTextArea = this.m_eElement.find('.textfile_content');
        	
        	eTextArea.css('height', 'auto' );
        	eTextArea.height( eTextArea[0].scrollHeight );
        	
        }
        
        TextViewNew.prototype.getElement = function() 
        {
        	return this.m_eElement;
        }
        
        TextViewNew.prototype._clicked = function()
        {
        	console.log("ahoy, gotta load some stuff yo");
        }
        
        TextViewNew.prototype.addEditingClass = function()
        {
        	this.m_eElement.addClass('editing');
        }
        
        TextViewNew.prototype.removeEditingClass = function( mData )
        {
        	
        	var filePath = mData.filePath;
        	var content = this.m_eElement.find('.textfile_content').val();
        	var oTextView = new TextView(filePath, content);
        	
        	this.m_oParentFolder.addTextViewAndRender( oTextView );
        	
        	
        	this.m_eElement.find('.textfile_content').val("");
        	this.m_eElement.removeClass('editing');
        }
        
        TextViewNew.prototype.createFileName = function()
        {
        	var d = new Date();
            var dateStr =  d.getDate() +"-"+ (d.getMonth() + 1) +"-"+ d.getFullYear() +" "+ d.getHours()+"_"+d.getMinutes()+"_"+d.getSeconds()+"_"+d.getMilliseconds();
            
            return dateStr + ".txt";
        }
        
        return TextViewNew;
});