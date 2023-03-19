# SubscriptionWebsite
A subscription tracking website that stores and calculates total subscriptions and their costs per month and year based on user data. This project utilises Firebase, Javascript, HTML, CSS and Webpack. 

## Setting Up
You will need node.js to setup this project and run on a local host. You will also need to configure your own firebase project and create your own firebase_config file with your API key. Once you have done this, and the connection to your firebase project is working then it should all work!

## Firebase
Firebase was used on the backend to manage user logins and data stored by users. I wanted to explore more with third party authentication methods instead of using PHP. Firebase was free and seemed like an interesting method of authenticating users, that also incorporated Google auth. I then decided to store user data using which was input through the dashboard or index page. User data is stored in a collection and each input creates a unique document which utilises the users account id to then display that information to a logged in user in a table. This data can be edited and deleted. Each user input is unique and has its own unique document id. 

## To Do
- Add Google and Facebook login methods 
- Add an account page for user to change username, add a profile picture, delete their profile, and change their password
- Add notifications for when a subscription is near renewal or setup manually by the user

