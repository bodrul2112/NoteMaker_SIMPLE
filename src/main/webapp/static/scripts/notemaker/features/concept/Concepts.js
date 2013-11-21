define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/features/concept/Concept"
    ],

    function(jQuery, tpl, FolderLoader, Concept) {

        var Concepts = function( sParentSigniture, sFilePath, oFolder )
        {
        	this.m_sParentSigniture = sParentSigniture;
        	
        	this.m_eElement = tpl.getTemplate(".concepts");
        	
        	this.m_sFilePath = sFilePath;
        	
//        	this.m_mConcepts = {};
        	this.m_mConcepts = [];
        }
        
        Concepts.prototype.getElement = function()
        {
        	return this.m_eElement;
        }
        
        Concepts.prototype.getConcepts = function()
        {
        	return this.m_mConcepts;
        }
        
        Concepts.prototype.postProcess = function() 
        {
        	this.m_eElement.on("click", function() {
        		
        	}.bind(this));
        }
        
        Concepts.prototype.addDummyConcept = function( sName ) 
        {
        	var sSig = "Concept_" + (new Date().getTime());
        	var oConcept = new Concept( sSig, sName );

        	this.addConcept( oConcept );
        } 
        
        Concepts.prototype.addConcept = function( oConcept ) {
        	
//        	this.m_pConcepts[ oConcept.getSigniture() ] = oConcept;
        	
        	this.m_mConcepts.push(oConcept);
        }
        
        Concepts.prototype.getActivatedConcepts = function() {
        	
        	var pActivatedConcepts = [];
        	
        	for(var key in this.m_mConcepts)
        	{
        		var oConcept = this.m_mConcepts[key];
        		if(oConcept.isActivated())
        		{
        			pActivatedConcepts.push(oConcept)
        		}
        	}
        	
        	return pActivatedConcepts;
        }
        
        
        Concepts.prototype.getConceptsAsString = function() 
        {
        
        	var sResult = "";
        	
        	for(var key in this.m_mConcepts)
        	{
        		var oConcept = this.m_mConcepts[key];
        		sResult += oConcept.getConceptName()+",";
        	}
        	
        	return sResult;
        	
        }
        
        Concepts.prototype.render = function() {
        	
        	
        }
        
        return Concepts;
});