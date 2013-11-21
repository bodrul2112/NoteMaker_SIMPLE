define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/features/concept/Concept",
    "notemaker/persist/FolderPersistance"
    ],

    function(jQuery, tpl, FolderLoader, Concept, FolderPersistance) {

        var ConceptNew = function( sParentSigniture, sFilePath, oFolder )
        {
        	this.m_oFolderPersistance = new FolderPersistance();
        	
        	this.m_sParentSigniture = sParentSigniture;
        	this.m_oFolder = oFolder;
        	this.m_sFilePath = sFilePath;
        	
        	this.m_sSigniture = "ConceptNew_"+(Math.random()*Math.random()*1000);
        	
        	this.m_eElement = tpl.getTemplate(".conceptNew");
        	
        }
        
        ConceptNew.prototype.getElement = function()
        {
        	return this.m_eElement;
        }
        
        ConceptNew.prototype.getSigniture = function()
        {
        	return this.m_sSigniture;
        }
        
        ConceptNew.prototype.postProcess = function() 
        {
        	this.m_eElement.on( 'focusout', function(e) {
        		
        		window.STAGE.stageObject(this.m_sSigniture, this);
        		
        		var sNewConcept = this.m_eElement.find('.concept_name').val();
        		
        		if(sNewConcept.trim() == "")
        		{
        			alert("can't enter an empty concept");
        		}
        		else
        		{
        			var mExtra = {
    					"type":"concept"
        			};
        			
        			var sNewConceptContents = this.getConceptsAsString( sNewConcept );
        			this.m_oFolderPersistance.saveTextView(this.m_sFilePath, this.m_sSigniture, sNewConceptContents, mExtra);
        		}
        		
        	}.bind(this));
        }
        
        ConceptNew.prototype.getConceptsAsString = function( sNewConcept ) 
        {
        	return this.m_oFolder.getConcepts().getConceptsAsString()+sNewConcept;
        }
        
        ConceptNew.prototype.addNewConceptToView = function() 
        {
        	var sNewConcept = this.m_eElement.find('.concept_name').val();
        	
        	var oConcept = new Concept( this.m_oFolder.getSigniture(), sNewConcept, this.m_oFolder );
        	this.m_oFolder.addNewConceptToView( oConcept );
        	
        	this.m_eElement.find('.concept_name').val("");
        	
        }
        
        return ConceptNew;
});