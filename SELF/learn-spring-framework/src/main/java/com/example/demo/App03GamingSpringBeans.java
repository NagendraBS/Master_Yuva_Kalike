package com.example.demo;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.game.GameRunner;
import com.game.GamingConsole;
import com.game.MarioGame;
import com.game.PacmanGame;
import com.game.superContrGame;

public class App03GamingSpringBeans {

	public static void main(String[] args) {

		try {

			var context = new AnnotationConfigApplicationContext
					(GamingConfiguration.class);

			context.getBean(GamingConsole.class).right();

			context.getBean(GameRunner.class).run();
			
			
			
		} catch (Exception e) {
			// TODO: handle exception
		}

	}

}
