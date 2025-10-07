package com.game;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("com.game")
public class GamingAppLauncherApplication {


	public static void main(String[] args) {


		try {
			var context = new AnnotationConfigApplicationContext
					(GamingAppLauncherApplication.class);

			context.getBean(GamingConsole.class).right();

			context.getBean(GameRunner.class).run();
			
			
			
		} catch (Exception e) {
			// TODO: handle exception
		}

	}

}
