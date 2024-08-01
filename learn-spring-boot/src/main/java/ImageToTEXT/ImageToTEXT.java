package ImageToTEXT;
import java.io.File;
import java.net.URL;
import com.asprise.ocr.Ocr;

public class ImageToTEXT {

	public static void main(String[] args) {

		// To Reading image
		File file = new File("src\\main\\resources\\snippet\\OCR_Image.jpg");
		
		Ocr.setUp();
		
		try {
		
		Ocr ocr = new Ocr();
		ocr.startEngine("eng", Ocr.SPEED_FAST);

		//Converting image into URL 
		
			URL imageUrl = file.toURI().toURL();
			
			// Need to Pass this URL to OCR Engine to Copy the Text
			String result = ocr.recognize(new URL[]{imageUrl}, Ocr.RECOGNIZE_TYPE_TEXT, Ocr.OUTPUT_FORMAT_PLAINTEXT);
			
			ocr.stopEngine();
			
			System.out.println("-------------------------------------------");
			System.out.println(result);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
