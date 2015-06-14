define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/persist/FolderPersistance",
    "notemaker/util/UICleaner"
    ],

    function(jQuery, tpl, FolderLoader, FolderPersistance, UICleaner) {

        var TextView = function( sFilePath, sFileName, sContent, oParentFolder )
        {
        	this.m_oUICleaner = new UICleaner();
        	this.m_oFolderPersistance = new FolderPersistance();
        	
        	this.m_oParentFolder = oParentFolder;
        	
        	this.m_sSigniture = "TextView_"+ (new Date().getTime());
        	
        	this.sFilePath = sFilePath;
        	this.sFileName = sFileName;
        	this.sContent = sContent;
        	
        	this.m_eElement = tpl.getTemplate(".textview")
        	
        	this.m_eElement.find('.fileName').text(this.sFileName);
        	this.m_eElement.find('.textfile_content').val(this.sContent);
        	this.m_eTextElement = this.m_eElement.find('.textfile_content');
        	
        	this.m_oBoardViewFolder;
        	
        	this.m_eNextElement = this.m_eElement.find('.next');
        	this.m_pReplies = [];
        	
        	this.m_bIsReply = sFileName.startsWith("REP[");
        }
        
        TextView.prototype.renderReplies = function()
        {
        	
        	this.m_pReplies.sort(function(a, b) {
        		  return a.getReplyNumber() - b.getReplyNumber();
        	});
        	
        	for(var i=0; i<this.m_pReplies.length; i++)
        	{
        		var oReply = this.m_pReplies[i];
        		if(i==0)
        		{
        			this.m_oUICleaner.addSingleElement(this.m_eNextElement, oReply);
        		}
        		else
        		{
        			var oPrevReply = this.m_pReplies[i-1];
        			this.m_oUICleaner.addSingleElement(oPrevReply.getNext(), oReply);
        		}
        	}
        }
        
        TextView.prototype.getNext = function()
        {
        	return this.m_eNextElement;
        }
        
        TextView.prototype.isReply = function()
        {
        	return this.m_bIsReply;
        }
        
        TextView.prototype.getReplyNumber = function()
        {
        	var nEnd = this.sFileName.indexOf("]")
        	return this.sFileName.substring(4, nEnd);
        }
        
        TextView.prototype.getName = function()
        {
        	return this.sFileName;
        }
        
        TextView.prototype.getParentName = function()
        {
        	var nStart = this.sFileName.indexOf("]")+1;
        	var nEnd = this.sFileName.length;
        	
        	return this.sFileName.substring(nStart, nEnd);
        }
        
        TextView.prototype.addReply = function( oTextView )
        {
        	this.m_pReplies.push(oTextView);
        }
        
        TextView.prototype.setBoardViewFolder = function( oBoardViewFolder )
        {
        	this.m_oBoardViewFolder = oBoardViewFolder;
        }
        
        TextView.prototype.postProcess = function() 
        {
        	
        	this.m_eTextElement.on( 'keyup', function (e){
        		
        		console.log("dfsggdg");
        		
        		var oContainerObj;
        		
        		if(this.m_oBoardViewFolder){
        			oContainerObj = this.m_oBoardViewFolder;
        		}else{
        			oContainerObj = this.m_oParentFolder;
        		}
        		
        		var eTextFile = this.m_eTextElement;
        		eTextFile.css('height', 'auto' );
        		eTextFile.height( eTextFile[0].scrollHeight );
        		var nOriginalScrollPos = oContainerObj.getScrollTop();
        		oContainerObj.setScrollTop( nOriginalScrollPos );
        		
        		if(!this.isReply())
        		{
        			
        		}
        		else
        		{
        			//var eTextFile = this.m_eElement.find('.textfile_content');
            		//eTextFile.css('height', 'auto' );
            		//eTextFile.height( eTextFile[0].scrollHeight );
        		}
        		
			}.bind(this));
        	
        	this.m_eElement.on( 'focusin', function(e){	
        		this.addEditingClass();
        	}.bind(this));
        	
        	this.m_eElement.on( 'focusout', function(e){
        		
        		window.STAGE.stageObject(this.m_sSigniture, this);
        		
        		var sContent = this.m_eTextElement.val();
        		
        		if(sContent.trim() == "")
        		{
        			sContent="-";
        		}
        		
        		this.m_oFolderPersistance.saveTextView(this.sFilePath, this.m_sSigniture, sContent);
        		
        	}.bind(this));
        	
        	//eTextArea = this.m_eElement.find('.textfile_content');
        	debugger;
        	this.m_eTextElement.css('height', 'auto' );
        	this.m_eTextElement.height( this.m_eTextElement[0].scrollHeight );
        	
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
        	
        	var sContentLowerCased = this.m_eTextElement.val().toLowerCase();
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