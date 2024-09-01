plugins {
    id("java")
	id("com.github.johnrengelman.shadow") version "8.1.1" apply false

	id("org.springframework.boot") version "3.3.3"
	id("io.spring.dependency-management") version "1.1.6"

}

version = "1.0-SNAPSHOT"

allprojects {
	group = "me.pandadev"

	repositories {
		mavenCentral()
	}
}

val slf4jApiVersion: String by project
val logbackClassicVersion: String by project

subprojects {
	apply(plugin = "java")
	apply(plugin = "com.github.johnrengelman.shadow")

	apply(plugin = "org.springframework.boot")
	apply(plugin = "io.spring.dependency-management")

	dependencies {
		implementation("org.slf4j:slf4j-api:$slf4jApiVersion")
		implementation("ch.qos.logback:logback-classic:$logbackClassicVersion")
	}
}