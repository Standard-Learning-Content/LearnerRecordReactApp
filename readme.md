# Mulit-Learner Questions 

> A Mobile App that uses the Standard Learning Content, and Learning Records to dynamically
> generate specific question for a user based on their prior knowledge. 


# Program Execution Flow
1. App.js - Creates the App and established the Routes/pages
2. Routes.js - Sets up Navigation and page order
3. NumLearner.js - Allows the modarator to select how many learners are participating 
4. AddPlayers.js - Each learner inputs their name. Using the name, MQL gathers the Learning Record and questions for each player 
5. Main.js - The Brain of the Opperation. Creates the levels and question for the currently player 

# Standard Content 
All the standard content is published at this link: https://docs.google.com/spreadsheets/d/1jVHFCGuw0yabhU-JeuqQZmutD4tTyCX0/edit?usp=sharing&ouid=113939925190518808864&rtpof=true&sd=true

<!-- 
# Reading from the Ontology

In the file `./pages/AddPlayers.js` we send a POST request with players ID to get their learner Record

```JSON
// BODY OF THE POST REQUEST
    { "userID": "ADD USER ID OF THE learner" }
```
```js
  const res = await fetch(`${config["api-location"]}/readFromLearnerRecord`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Method": "POST,GET"
                    },
                    body: JSON.stringify(hashed_id)
                })

                if (!res.ok) {
                    throw new Error("Request returned a non 200 response code")
                }
```

# Writing to the Ontology
In the file `./components/targetButtons.js` we send a PUT request with data to update the Learner Record

```JSON
 {
    "userID": "add the user ID of the player",
    "standardLearnedContent": "The IRI of the Standard Content",
    "correct": true or false ,
    "timestamp": Date.now()
}
``` -->
# Getting Started

## Dependencies
1. nodejs - `sudo apt install nodejs`
2. npm = `sudo apt install npm`
3. yarn = `npm install --global yarn`

## How to Run
1. Install all the dependacies `yarn install`
2. Run the app `yarn start`

> This command requires Expo CLI.
Do you want to install it globally [Y/n]? y

> Notice: MLQ uses the expo framework to run on IOS, Android, and Web Platforms. Once the app runs, expo will open an internet browser. 
> You can then select options to run the app. My prefered option is to download the expo app on your phone and scan the QR code 
> on the web browser. The app will then run locally on your phone. 


# How to build 
1. Install all the dependacies `yarn install`
2. Android - `eas build -p android`
