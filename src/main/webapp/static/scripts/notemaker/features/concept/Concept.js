define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader"
    ],

    function(jQuery, tpl, FolderLoader) {

        var Concept = function( sParentSigniture, sConceptName, oFolder )
        {
        	this.m_sParentSigniture = sParentSigniture;
        	this.m_oFolder = oFolder;
        	
        	this.m_bIsActivated = false;
        	
        	this.m_sConceptName = sConceptName.trim();
        	
        	this.m_sSigniture = "Concept_"+(Math.random()*Math.random()*1000);
        	
        	this.m_eElement = tpl.getTemplate(".concept");
        	
        	this.m_eElement.text(this.m_sConceptName);
        }
        
        Concept.prototype.getElement = function()
        {
        	return this.m_eElement;
        }
        
        Concept.prototype.getConceptName = function()
        {
        	return this.m_sConceptName;
        }
        
        Concept.prototype.getSigniture = function()
        {
        	return this.m_sSigniture;
        }
        
        Concept.prototype.postProcess = function() 
        {
        	this.m_eElement.on("click", function() {
        		
//        		window.EVENT_HUB.triggerEvent("removeFolders", {"after": this.m_sParentSigniture})
//        		
//        		this.m_oFolderLoader.loadFolder(this.m_sFolderPath);
//        		
//        		this.m_oParentFolder.removeClickedClassFromAllSubfolders();
        		
        		this.toggleActivated();
        		
        		console.log("im a clicked class");
        		
        		
        	}.bind(this));
        }
        
        Concept.prototype.toggleActivated = function()
        {
        	if(!this.m_bIsActivated) {
        		this.addClickedClass();
        		this.m_bIsActivated = true;
        	}
        	else{
        		this.removeClickedClass();
        		this.m_bIsActivated = false;
        	}
        	this.m_oFolder.refreshConcepts();
        }
        
        Concept.prototype.isActivated = function()
        {
        	return this.m_bIsActivated;
        }
        
        Concept.prototype.addClickedClass = function()
        {
        	this.m_eElement.addClass('clicked')
        }
        
        Concept.prototype.removeClickedClass = function()
        {
        	this.m_eElement.removeClass('clicked')
        }
        
        return Concept;
});