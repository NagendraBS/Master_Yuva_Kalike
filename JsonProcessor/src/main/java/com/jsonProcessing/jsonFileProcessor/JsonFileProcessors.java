package com.jsonProcessing.jsonFileProcessor;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.*;

public class JsonFileProcessors {

	public static void main(String[] args) {

		String jsonInputFilePath = "C:\\Users\\nmurthy\\OneDrive - GalaxE. Solutions, Inc\\Desktop\\JsonDataFile.txt";

		String jsonOutputFilePath = "C:\\Users\\nmurthy\\OneDrive - GalaxE. Solutions, Inc\\Desktop\\JsonOutputDataFile.txt";

		// Map to group JSON objects by memberId
		Map<String, List<Map<String, String>>> groupedJsonObjectData = new HashMap<>();

		try {

			StringBuilder rawFileContent = new StringBuilder();
			
			try (FileReader fileReader = new FileReader(jsonInputFilePath);
					BufferedReader bufferedReader = new BufferedReader(fileReader)) {

				System.out.println("Json File Processor Started....");
				
				String fileLine;
				while ((fileLine = bufferedReader.readLine()) != null) {
//				System.out.println(fileLine);
//				System.out.println(rawFileContent.append(fileLine));

					// JSON data is spread across multiple lines, So to Convert full JSON array as
					// one string for Manipulating on Json Data
					rawFileContent.append(fileLine);
				}
			}

			// To Remove "[" & "]" from Json Array
			String fileContent = rawFileContent.toString().trim();

			if (fileContent.startsWith("["))
				fileContent = fileContent.substring(1);
			if (fileContent.endsWith("]"));
			fileContent = fileContent.substring(0, (fileContent.length() - 1));

			//System.out.println(fileContent);

			// Splitting JSON array into individual JSON objects
			String[] jsonObjects = fileContent.split("(?<=\\}),\\s*(?=\\{)");

			// Parsing Each JsonObject and group by memberId
			for (String jsonLine : jsonObjects) {
				//System.out.println(jsonLine);
				Map<String, String> jsonObject = parseJsonLine(jsonLine);
				String memberId = jsonObject.get("memberId");

				groupedJsonObjectData.putIfAbsent(memberId, new ArrayList<>());
				groupedJsonObjectData.get(memberId).add(jsonObject);

			}
			// Bundling Process

			try (BufferedWriter writer = new BufferedWriter(new FileWriter(jsonOutputFilePath))) {

				for (String memberId : groupedJsonObjectData.keySet()) {
					List<Map<String, String>> group = groupedJsonObjectData.get(memberId);
					Map<String, String> base = group.get(0);

					StringBuilder output = new StringBuilder();
					output.append("{\n");
					output.append("  \"memberId\": \"").append(memberId).append("\",\n");
					output.append("  \"field1\": \"").append(base.get("field1")).append("\",\n");
					output.append("  \"field2\": \"").append(base.get("field2")).append("\",\n");
					output.append("  \"field3\": \"").append(base.get("field3")).append("\",\n");

					output.append("  \"rxInfo\": [\n");

					for (int i = 0; i < group.size(); i++) {
						Map<String, String> entry = group.get(i);
						output.append("    {\n");
						output.append("      \"rx\": \"").append(entry.get("rx")).append("\",\n");
						output.append("      \"description\": \"").append(entry.get("description")).append("\"\n");
						output.append("    }");
						if (i < group.size() - 1)
							output.append(",");
						output.append("\n");
					}

					output.append("  ]\n");
					output.append("}");

					// Print to console
					System.out.println(output.toString());

					// Write to file
					writer.write(output.toString());
					writer.newLine();
				}

			} catch (IOException e) {
				e.printStackTrace();
			}

		} catch (IOException e) {
			e.printStackTrace();

		}

	}

	private static Map<String, String> parseJsonLine(String fileLine) {

		Map<String, String> mapResult = new HashMap<String, String>();
		fileLine = fileLine.trim();

		if (fileLine.startsWith("{"))
			fileLine = fileLine.substring(1);
		if (fileLine.endsWith("}"))
			fileLine = fileLine.substring(0, fileLine.length() - 1);

		String[] pairs = fileLine.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

		for (String pair : pairs) {

			String[] keyValue = pair.split(":", 2);
			if (keyValue.length == 2) {
				String key = keyValue[0].trim().replaceAll("^\"|\"$", "");
				String value = keyValue[1].trim().replaceAll("^\"|\"$", "");

				mapResult.put(key, value);
			}

		}

		return mapResult;
	}

}
