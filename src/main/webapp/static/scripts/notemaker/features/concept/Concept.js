define(["thirdparty/jquery",
    "services/TemplateService",
    "notemaker/loader/FolderLoader"
    ],

    function(jQuery, tpl, FolderLoader) {

        var Concept = function( sParentSigniture, sConceptName )
        {
        	this.m_sParentSigniture = sParentSigniture;
        	this.m_sConceptName = sConceptName;
        	
        	this.m_sSigniture = "Concept_"+(new Date().getTime());
        	
        	this.m_eElement = tpl.getTemplate(".concept");
        	
        	this.m_eElement.text(this.m_sConceptName);
        }
        
        Concept.prototype.getElement = function()
        {
        	return this.m_eElement;
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
        		
        		console.log("im a clicked class");
        		
        		this.addClickedClass();
        		
        	}.bind(this));
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