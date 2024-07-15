package com.springcore.beanLifeCyclebyXML;

public class HelloWorld {

	//This method executes Automatically as the Bean initiated
	public void init() throws Exception
    {
        System.out.println(
            "Bean HelloWorld has been "
            + "instantiated and I'm "
            + "the init() method");
    }
 
	
    // This method executes when the spring container is closed
    public void destroy() throws Exception
    {
        System.out.println(
            "Container has been closed "
            + "and I'm the destroy() method");
    }
}
