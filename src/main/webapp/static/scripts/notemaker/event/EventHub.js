define(["thirdparty/jquery",
    "services/TemplateService"
    ],

    function(jQuery, tpl, FolderLoader) 
    {
        var EventHub = function()
        {
        	this.m_mListeners = {};
        }
        
        EventHub.prototype.registerEvent = function( sEventName, sSigniture, fCallback ) 
        {
        	this.ensureCapacityForEvent( sEventName );
        	
        	this.m_mListeners[sEventName][sSigniture] = fCallback;
        }
        
        EventHub.prototype.triggerEvent = function( sEventName, mData )
        {
        	var mCallbacks = this.m_mListeners[sEventName];
        	
        	for(var signiture in mCallbacks)
        	{
        		
//        		try{
        			var fCallback = mCallbacks[signiture];
        			fCallback(sEventName, mData);
//        		}
//        		catch(error)
//        		{
//        			console.log(error);
//        		}
        	}
        }
        
        EventHub.prototype.ensureCapacityForEvent = function( sEventName ) 
        {
        	if(!this.m_mListeners[sEventName])
        	{
        		this.m_mListeners[sEventName] = {};
        	}
        }
        
        if(!window.EVENT_HUB){
        	window.EVENT_HUB = new EventHub();
        }
        
        return window.EVENT_HUB;
});