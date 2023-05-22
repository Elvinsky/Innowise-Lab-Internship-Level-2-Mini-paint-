# Innowise Lab Internship Level:2 - Mini-Paint
### Developer - **Nikita Mikhnevich**
### [Task Link](https://drive.google.com/file/d/19cb4whI_HUVPzuaPyaj5r6hGotIVnhho/view)
### Installation:

 - `git init`
 - `git clone <repo URL>`
 - `npm install`
 - `.env.example --> .env`
 - `npm run serve`
 - Follow localhost:\<port\> (usually localhost:8080)

### DB information:

 - Data Base - **Firebase**
 - Entities: **User**, **Images**
 - User authorization implemented with **Firebase Authentication**
 - User session and sign in/up implemented with JWT token uder the hood
 - Canvas storing implemented with **Firebase Storage**
### Directories:
 - **Root**: configuration files for proper project workflow
 - **src**: 
	 * *assets* - images and icons used in project
	 * *components* - vue components (.vue)
	 * *composables* - logic .ts files controlling states being used in several components
	 * *router* - initial vue-router file with routes
	 * *scripts* - additional scripts used in components
	 * *types* - ts types and interfaces
	 * *views* - vue components (.vue) showed with router
	 * *App.vue* - starting vue file
	 * *firebase.ts* - firebase firestore configuration
	 * *main.ts* - starting project file
	
### Stack:
 - JavaScript ES6
 - TypeScript
 - VueJS
 - vue-router
 - HTML5
 - CSS3
 - SCSS
 - Firebase
 - Firebase Storage
 - Firebase Authentication
