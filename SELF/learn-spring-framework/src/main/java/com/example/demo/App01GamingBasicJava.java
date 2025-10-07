package com.example.demo;

import com.game.GameRunner;
import com.game.MarioGame;
import com.game.PacmanGame;
import com.game.superContrGame;

public class App01GamingBasicJava {

	public static void main(String[] args) {

		var game = new MarioGame();
//		var game = new superContrGame();
//		var game = new PacmanGame();  // 1. Object Creation
		
		var gameRunner = new GameRunner(game); 
		//2. Object Creation + Wiring of Dependency
		// Game is  a Dependency Here of GameRunner Class
		
		gameRunner.run();
		
		
	}

}
