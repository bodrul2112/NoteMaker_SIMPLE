define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/persist/FolderPersistance",
    "notemaker/util/UICleaner"
    ],

    function(jQuery, tpl, FolderLoader, FolderPersistance, UICleaner) {

        var TextView = function( sFilePath, sFileName, sContent, oParentFolder )
        {
        	this.m_oFolderPersistance = new FolderPersistance();
        	
        	this.m_oParentFolder = oParentFolder;
        	
        	this.m_sSigniture = "TextView_"+ (new Date().getTime());
        	
        	this.sFilePath = sFilePath;
        	this.sFileName = sFileName;
        	this.sContent = sContent;
        	
        	this.m_eElement = tpl.getTemplate(".textview")
        	
        	this.m_eElement.find('.fileName').text(this.sFileName);
        	this.m_eElement.find('.textfile_content').val(this.sContent);
        	
        	this.m_oBoardViewFolder;
        	
        	this.m_eNextElement = this.m_eElement.find('.next');
        	this.m_oNext;
        }
        
        TextView.prototype.isReply = function()
        {
        	return this.sFileName.startsWith("REP[");
        }
        
        TextView.prototype.setNext = function( oTextView )
        {
        	this.m_oNext = oTextView;
        	
        	UICleaner.addSingleElement(this.m_eNextElement, oTextView)
        }
        
        TextView.prototype.setBoardViewFolder = function( oBoardViewFolder )
        {
        	this.m_oBoardViewFolder = oBoardViewFolder;
        }
        
        TextView.prototype.postProcess = function() 
        {
        	
        	this.m_eElement.on( 'keyup', 'textarea', function (e){
        		
        		var oContainerObj;
        		
        		if(this.m_oBoardViewFolder){
        			oContainerObj = this.m_oBoardViewFolder;
        		}else{
        			oContainerObj = this.m_oParentFolder;
        		}
        		
        		var nOriginalScrollPos = oContainerObj.getScrollTop();
        		var eTextFile = this.m_eElement.find('.textfile_content');
        		eTextFile.css('height', 'auto' );
        		eTextFile.height( eTextFile[0].scrollHeight );
        		oContainerObj.setScrollTop( nOriginalScrollPos );
        		
			}.bind(this));
        	
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

        }
        
        TextView.prototype.addEditingClass = function()
        {
        	this.m_eElement.addClass('editing');
        }
        
        TextView.prototype.removeEditingClass = function()
        {
        	this.m_eElement.removeClass('editing');
        }
        
        TextView.prototype.addHasConceptClass = function()
        {
        	this.m_eElement.addClass('hasConcept');
        }
        
        TextView.prototype.removeHasConceptClass = function()
        {
        	this.m_eElement.removeClass('hasConcept');
        }
        
        TextView.prototype.addHasConceptFor = function( pConcepts )
        {
        	
        	var sContentLowerCased = this.m_eElement.find('.textfile_content').val().toLowerCase();
        	for(var key in pConcepts)
        	{
        		var sConcept = pConcepts[key];
        		
        		if( sContentLowerCased.indexOf(sConcept) >= 0)
        		{
        			this.addHasConceptClass();
        		}
        	}
        }
        
        return TextView;
});