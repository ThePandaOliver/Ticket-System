plugins {
	id("application")
}

application.mainClass = "me.pandadev.discordbot.Bot"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

val jdaVersion: String by project

dependencies {
	implementation("net.dv8tion:JDA:$jdaVersion") {
		exclude(module = "opus-java")
	}

	implementation(project(":Backend"))

    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

tasks.test {
    useJUnitPlatform()
}