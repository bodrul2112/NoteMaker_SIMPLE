define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/persist/FolderPersistance",
    "notemaker/TextView",
    "notemaker/features/concept/Concept",
    "notemaker/features/symlink/SymLink"
    ],

    function(jQuery, tpl, FolderLoader, FolderPersistance, TextView, Concept, SymLink) {

        var TextViewNew = function( sFolderPath, oParentFolder )
        {
        	this.m_oFolderPersistance = new FolderPersistance();
        	
        	this.m_sSigniture = "TextViewNew_"+ (new Date().getTime());
        	this.m_oParentFolder = oParentFolder;
        	
        	this.sFolderPath = sFolderPath;
        	this.sContent = "";
        	
        	this.m_eElement = tpl.getTemplate(".textview")
        	this.m_eElement.find('.textfile_content').val(this.sContent);
        	
        	this.m_oBoardViewFolder;
        }
        
        TextViewNew.prototype.setBoardViewFolder = function( oBoardViewFolder )
        {
        	this.m_oBoardViewFolder = oBoardViewFolder;
        }
        
        TextViewNew.prototype.getParentSigniture = function() 
        {
        	return this.m_sParentSigniture;
        }
        
        TextViewNew.prototype.postProcess = function() 
        {
        	this.m_eElement.on( 'keyup', 'textarea', function (e){
        		
        		var eTextFile = this.m_eElement.find('.textfile_content');
        		eTextFile.css('height', 'auto' );
        		eTextFile.height( eTextFile[0].scrollHeight );
        		
        		if(this.m_oBoardViewFolder)
        		{
        			var nOriginalScrollPos = this.m_oBoardViewFolder.getScrollTop();
            		
            		var eTextFile = this.m_eElement.find('.textfile_content');
            		eTextFile.css('height', 'auto' );
            		eTextFile.height( eTextFile[0].scrollHeight );
            		
            		this.m_oBoardViewFolder.setScrollTop( nOriginalScrollPos );
        		}
        		else
        		{
        			this.m_oParentFolder.resetScrollTop();
        		}
			    
			}.bind(this));
        	
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
        			
        			if(sContent.toLowerCase().indexOf("concepts:")==0)
        			{
        				var mExtra = {
            					"type":"concept"
                			};
        				
        				var sNewConcepts = sContent.substring(9, sContent.length);
        				var sNewConceptContents = this.getConceptsAsString( sNewConcepts );
        				
        				var sFilePath = this.sFolderPath + "/list.concepts";
        				this.m_oFolderPersistance.saveTextView(sFilePath, this.m_sSigniture, sNewConceptContents, mExtra);
        			}
        			else if(sContent.toLowerCase().indexOf("link:")==0)
        			{
        				var mExtra = {
            					"type":"symlink"
                			};
        				
        				var sNewSymLinkName = sContent.substring(5, sContent.length);
        				var sNewSymLinksString = this.getSymlinksAsString( sNewSymLinkName, mExtra );
        				
        				if(mExtra.dir=="")
        				{
        					alert("you can't create a link with NO SUBFOLDERS FOLDERS OPENED!")
        					this.m_eElement.removeClass('editing');
        				}
        				else
        				{
        					var sFilePath = this.sFolderPath + "/list.symlinks";
        					this.m_oFolderPersistance.saveTextView(sFilePath, this.m_sSigniture, sNewSymLinksString, mExtra);
        				}
        			}
        			else
        			{
        				var sFilePath = this.sFolderPath + "/" + this.createFileName();
        				this.m_oFolderPersistance.saveTextView(sFilePath, this.m_sSigniture, sContent);
        			}
        			
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
        }
        
        TextViewNew.prototype.addEditingClass = function()
        {
        	this.m_eElement.addClass('editing');
        }
        
        TextViewNew.prototype.removeEditingClass = function( mData )
        {
        	var filePath = mData.filePath;
        	var fileName = mData.fileName;
        	var content = this.m_eElement.find('.textfile_content').val();
        	var oTextView = new TextView(filePath, fileName, content, this.m_oParentFolder );
        	
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
        
        TextViewNew.prototype.getConceptsAsString = function( sNewConcept ) 
        {
                return this.m_oParentFolder.getConcepts().getConceptsAsString()+sNewConcept;
        }
        
        TextViewNew.prototype.getSymlinksAsString = function( sNewSymLinkName, mExtra ) 
        {
        	var sNewSymLinkString = window.ROOT_FOLDER.getLastOpenedFolderPath().replace(/\\/g, "/");
        	var sDir = sNewSymLinkString.substring(this.sFolderPath.length, sNewSymLinkString.length);
        	mExtra["dir"]=sDir;
        	var sNewBit = sNewSymLinkName.trim()+"->"+sDir;
        	
        	return this.m_oParentFolder.getSymLinks().getSymLinksAsString()+sNewBit;
        }
        
        TextViewNew.prototype.addNewSymLinkToView = function( mData ) 
        {
        	var sNewSymLinkName = this.m_eElement.find('.textfile_content').val();
        	sNewSymLinkName = sNewSymLinkName.substring(5, sNewSymLinkName.length).trim();
        	
        	var oSymLink = new SymLink( this.m_oParentFolder.getSigniture(), sNewSymLinkName, mData.dir, this.m_oParentFolder);
        	this.m_oParentFolder.addNewSymLinkToView( oSymLink );
        	
        	this.m_eElement.find('.textfile_content').val("");
        	this.m_eElement.removeClass('editing');
        }
        
        TextViewNew.prototype.addNewConceptToView = function() 
        {
        	var sNewConcepts = this.m_eElement.find('.textfile_content').val();
        	sNewConcepts = sNewConcepts.substring(9, sNewConcepts.length);
        	
        	var pConcepts = sNewConcepts.split(",");
        	
        	for(var key in pConcepts)
        	{
        		var sConcept = pConcepts[key];
        		
        		if(sConcept && sConcept !== "")
        		{
        			var oConcept = new Concept( this.m_oParentFolder.getSigniture(), sConcept, this.m_oParentFolder );
                	this.m_oParentFolder.addNewConceptToView( oConcept );
        		}
        	}
        	
        	this.m_eElement.find('.textfile_content').val("");
        	this.m_eElement.removeClass('editing');
        }
        
        return TextViewNew;
});