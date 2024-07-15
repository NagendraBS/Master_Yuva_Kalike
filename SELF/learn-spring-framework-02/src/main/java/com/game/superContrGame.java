package com.game;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("superContrGameQualifier")
public class superContrGame implements GamingConsole {
 
	public void up() {
		System.out.println("UP");
	}
	
	public void down () {
		System.out.println("Sit Down");
	}
	
	public void left() {
		System.out.println("Go Back");
	}
	
	public void right() {
		System.out.println("Shoot Bullet");
	}
}
