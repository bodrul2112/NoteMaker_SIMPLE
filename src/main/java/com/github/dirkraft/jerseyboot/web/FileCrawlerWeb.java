package com.github.dirkraft.jerseyboot.web;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.github.dirkraft.jerseyboot.base.BaseJsonResource;
import com.google.gson.Gson;

@Path("/notemaker/")
public class FileCrawlerWeb extends BaseJsonResource {
	
	private String rootFile = "D:/_LUCENE_TEST_DIRECTORY/_NOTEMAKER_BLOB_LOB_BLOB";
	
	public FileCrawlerWeb()
	{
		rootFile = new File("").getAbsolutePath();
	}
	
	@GET
	@Path("/folder")
    @Produces(MediaType.APPLICATION_JSON)
    public Object getTopicWithId(@QueryParam("folderPath") String folderPath) 
	{
		
		if(folderPath.equalsIgnoreCase("main"))
		{
			folderPath = rootFile;
		}
		
		Map<String,Object> result = new HashMap<String,Object>();
		
		List<Object> folders = new ArrayList<Object>();
		List<Object> files = new ArrayList<Object>();
		
		File f = new File(folderPath);
		
		File[] subFiles = f.listFiles();
		
		try 
		{
			for(File file : subFiles)
			{
				if(file.isDirectory())
				{
					Map<String,String> folder = new TreeMap<String,String>();
					folder.put("folderPath", file.getAbsolutePath());
					folder.put("folderName", file.getName());
					
					folders.add(folder);
				}
				else if(file.getAbsolutePath().endsWith(".txt"))
				{
					Map<String,String> fileJson = new TreeMap<>();
					fileJson.put("filePath", file.getAbsolutePath());
					fileJson.put("content", getContent(file));
					files.add(fileJson);
				}
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		result.put("parentFolderPath", folderPath);
		result.put("subFolders", folders);
		result.put("textViews", files);
		
		return result;
		
    }
	
	private String getContent(File fromFile)
	{
		
		try{

			String result = "";
			BufferedReader reader = new BufferedReader(new FileReader(fromFile));

	        String line = null;
	        while ((line=reader.readLine()) != null) {
	        	result+=line + "\n";
	        }

	        reader.close(); 
	        return result;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return "";
	}
	
	@POST
	@Path("/newfolder")
	@Consumes({"application/xml", "application/json"})
	@Produces({"application/xml", "application/json"})
	public Response setSomeProps(Map<String,String> postData) 
	{
		String result = "new subtopic created";
		
		String[] expectedParams = new String[]{"folderPath","folderName"};
		
		for(String key : expectedParams) 
		{
			if(postData.get(key) == null || postData.get(key).equals(""))
			{
				throw new RuntimeException("sad times");
			}
		}
		
		File newFolder = new File(postData.get("folderPath") +"/"+ postData.get("folderName"));
		
		boolean createdFolder = newFolder.mkdir();
		
		postData.put("folderPath", newFolder.getAbsolutePath());
		
		Gson gson = new Gson();
		String json = gson.toJson(postData);
		
		if(createdFolder)
		{
			return Response.status(200).entity(json).build();
		}
		else
		{
			System.out.println("DIDNT WORK");
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("failed to create folder").build();
		}
    }
	
	@POST
	@Path("/savetextview")
	@Consumes({"application/xml", "application/json"})
	@Produces({"application/xml", "application/json"})
	public Response saveTextView(Map<String,String> postData) 
	{
		
		try{
			
    		String[] expectedParams = new String[]{"signiture","filePath","content"};
    		
    		for(String key : expectedParams) 
    		{
    			if(postData.get(key) == null || postData.get(key).equals(""))
    			{
    				throw new RuntimeException("sad times");
    			}
    		}

    		String content = postData.get("content");
    		if(!content.trim().equals("-"))
    		{
    			String action = saveFile(postData.get("filePath"), content);
    			postData.put("action", action);
    		}
    		else{
    			deleteFile(postData.get("filePath"));
    			postData.put("action", "deleted");
    		}
    		
    		postData.remove("content");
    		Gson gson = new Gson();
    		String json = gson.toJson(postData);
    		
    		return Response.status(200).entity(json).build();
		
		}
		catch(Exception e)
		{
			System.out.println("DIDNT WORK");
			e.printStackTrace();
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("failed to save file").build();
		}
    }
	
	private void deleteFile(String filePath)
	{
		File deletedFile = new File(filePath);
		deletedFile.delete();
	}

	private String saveFile(String filePath, String content) throws Exception
	{
		
		String action = "ERROR";
		File f = new File(filePath);
		
		if(f.exists())
		{
			action = "saved";
		}
		else{
			action ="created";
		}
		
        BufferedWriter writer = new BufferedWriter(new FileWriter(filePath));

        writer.write(content);

        writer.close();  // Close to unlock and flush to disk.

        return action;
	}
	
}