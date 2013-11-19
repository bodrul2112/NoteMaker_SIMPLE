define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/features/concept/Concept"
    ],

    function(jQuery, tpl, FolderLoader, Concept) {

        var Concepts = function( sParentSigniture )
        {
        	this.m_sParentSigniture = sParentSigniture;
        	this.m_eElement = tpl.getTemplate(".concepts");
        	
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
        		
        		console.log("im a clicked class");
        		
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
        
        Concepts.prototype.render = function() {
        	
        	
        }
        
        return Concepts;
});