package me.pandadev.discordbot;

import me.pandadev.backend.Application;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;

public class Bot {
	private static final String BOT_TOKEN = System.getenv("DISCORD_BOT_TOKEN");
	public static JDA JDA;

	public static void main(String[] args) {
		Application.main(args);

		JDABuilder jdaBuilder = JDABuilder.createDefault(BOT_TOKEN);
		JDA = jdaBuilder.build();
	}
}