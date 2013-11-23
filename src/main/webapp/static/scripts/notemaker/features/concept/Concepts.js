define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader",
    "notemaker/features/concept/Concept",
    "notemaker/persist/FolderPersistance"
    ],

    function(jQuery, tpl, FolderLoader, Concept, FolderPersistance) {

        var Concepts = function( sParentSigniture, sFilePath, oFolder )
        {
        	this.m_oFolderPersistance = new FolderPersistance();
        	
        	this.m_sSigniture = "Concepts_"+(Math.random()*Math.random())
        	
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
        
        Concepts.prototype.getSigniture = function()
        {
        	return this.m_sSigniture;
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
        	
        	this.m_mConcepts.push(oConcept);
        }
        
        Concepts.prototype.removeConcept = function( oConceptRemove ) 
        {
        	var sSig = oConceptRemove.getSigniture();
        	var pConcepts = [];
        	
        	for(var key in this.m_mConcepts)
        	{
        		var oConcept = this.m_mConcepts[key];
        		
        		if(oConcept.getSigniture() !== sSig)
        		{
        			pConcepts.push(oConcept)
        		}
        	}
        	
        	this.m_mConcepts = pConcepts;
        	
        	this.saveConcepts();
        }
        
        Concepts.prototype.saveConcepts = function() {
        	
        	var mExtra = {
					"type":"deletion"
    			};
			
			var sConceptsString = this.getConceptsAsString();
			sConceptsString = sConceptsString.substring(0, sConceptsString.length-1);
			
			if(sConceptsString.trim() == "")
			{
				sConceptsString = "-"
			}
			
			this.m_oFolderPersistance.saveTextView(this.m_sFilePath, this.m_sSigniture, sConceptsString, mExtra);
        }
        
        Concepts.prototype.getActivatedConcepts = function() {
        	
        	var pActivatedConcepts = [];
        	
        	for(var key in this.m_mConcepts)
        	{
        		var oConcept = this.m_mConcepts[key];
        		if(oConcept.isActivated())
        		{
        			var pConceptParts = oConcept.getConceptName().split(" ");
        			for(var pkey in pConceptParts)
        			{
        				pActivatedConcepts.push(pConceptParts[pkey].toLowerCase());
        			}
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