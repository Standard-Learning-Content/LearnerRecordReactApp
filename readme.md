# Mulit-Learner Questions 

> A Mobile App that uses the Standard Learning Content, and Learning Records to dynamically
> generate specific question for a user based on their prior knowledge. 


# Program Execution Flow
1. App.js - Creates the App and established the Routes/pages
2. Routes.js - Sets up Navigation and page order
3. NumLearner.js - Allows the modarator to select how many learners are participating 
4. AddPlayers.js - Each learner inputs their name. Using the name, MQL gathers the Learning Record and questions for each player 
5. Main.js - The Brain of the Opperation. Creates the levels and question for the currently player 

# How to build 
1. Install all the dependacies `yarn install`
2. Android - `eas build -p android`