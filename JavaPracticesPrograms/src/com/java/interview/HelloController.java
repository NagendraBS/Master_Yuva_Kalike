

@RestController
@RequestMapping("/service/v1")
public class HelloController{
	
	
	//   https ://localhost:8080/service/v1/hello?name=Yuva
	
	@GetMapping("/hello")
	public String helloRequestParam(@RequestParam String name) {
		
		return "Hello : " + name;
		
	}
	
	//  https://localhost:8080/service/v1/hello/Yuva
	
	@Getmapping("/hello")
	public String helloPathVariable(@PathVariable String name) {
		
		return "Hello : " + name;
	}
	
	
	
}