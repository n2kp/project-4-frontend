![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Justo Readme
#### Installation and setup

- Download or clone the repo
- `yarn` to install dependencies
- `gulp` to compile the source code and open in browser

> **Note**: You'll need to have `gulp-cli` installed globally
> `npm i -g gulp-cli`

- [GitHub APP link] (https://github.com/n2kp/project-4-frontend)
- [GitHub API link] (https://github.com/n2kp/project-4-api)

Justo App is available to view and register [here.](https://justo-app.herokuapp.com/)

## Project Description

The inspiration and overall aim for this project was to create an application which small businesses and solo traders can use to create projects of work that developers could subseqently bid on to win and then create. The idea stemmed from the need for all businesses to have an online presence, in one form or another, but the relativly high prices some of these sites can get to.

The purpose for the app was to allow individuals to tell the developer community what kind of app or website they want, the features they needed and a guideline as to how much they have for their budget. Then developers can see the projects that are needed and from there, determine the amount of work needed to develop it and the price they can produce it for. It also incompasses a form of bidding where developers are forced to give their best price otherwise someone else will win the tender by offereing a better price. This way the business submitting the project gets the best price and developers can get regular freelance work.

![Landing Page](http://i.imgur.com/mVkh1ad.png)  

When the user first arrives at the page, they are greeted with the landing page. Users do not have to be logged in to view the projects index page, but should they want more information, would require to either register or log in to see details.

![Project Index](http://i.imgur.com/5s1oeBV.png)

There are two different types of users on the page, customers and developers. Customers are able to create new projects and view, reject and accept bids on their own projects. Developers are able to view the projects index page, as well as the individual project pages and are able to make, edit and delete bids for them projects. Both users are able to review one another and the internal messaging system can be used by any user to communicate with any other user.

![Registraion](http://i.imgur.com/cP07PZk.png)

On registration for the first time, users are asked whether they wish to join the site as a developer or customer. Depending upon their answer, different registration questions are asked and different details taken. 

Customers are asked basic questions, such as email address and name. Developers are asked additional question such as tech stacks they use and links to their GitHub and Portfolio.

The index page is a divided into two sections, the main index of projects and a priority section on the righh. The reason their is a priority section is in the future, this section could be used to provide an area where customers can pay to have their projects show up at the top of the page at all times.

![Priority](http://i.imgur.com/XMUPJBP.png)

A filter and search feature were also included on this page to be able to find specific projects, based on bid deadline, keywords or budget.

![Filter & Search](http://i.imgur.com/gPp0JMu.png) 

A project show page has further details about the project and depending on what kind of user you are, either a list of current bids or a way to make or edit a bid. If you are a customer, and the project is not yours, you can not see anything but the amounts of bids made on the project and details of the project. If however you are the customer who owns the project, you see a detailed list of all bids currently pending on the project, with the ability to aaccept or reject any particular bid. Accepting one bid will automatically reject all other bid.

![Project Show Page](http://i.imgur.com/MnITEfT.png)

If you are a developer, you can tender a new bid if you have not already done so on that project, or you can edit your bid to make it more attractive to the customer.


The user profile pages are similar to the project show pages in that the view is different depending on what kind of user you are. Customers have a list of all active and previous projects they have created, from which they can go to any individual project. 

Developers have a list of all the bid they have ever created, and the status of the bid (pending, accepted or rejected). 

![Developer Profile Page](http://i.imgur.com/3ey27G5.png)

The final part of the site is the internal messaging system where users can communicate between themselves. This can be useful for customers to talk directly to developers and ask questions, or for developer to speak to customers about bids they have made or won, and progess on work they have undertaken of that customer.

![Internal Messaging](http://i.imgur.com/zblZV6n.png)

## Technologies Used
Below is a list of the technologies that were used to create this project. In addition to them, there were a number of dependancies that were used, which are availavle to view in the code.

- HTML5
- CSS3
- JavaScript ES6
- AngularJS
- Ruby
- Ruby on Rails
- PostgreSQL
- Satellizer
- Bootstrap UI
- SASS
- JSON
- JWT
- HTTParty
- AWS
- GULP
- Git
- GitHub
- Yarn

![HTML5](http://i.imgur.com/1MbhOJx.png)
![CSS3](http://i.imgur.com/Hk0uKkj.png)
![JavaScript](http://i.imgur.com/DFkzUyL.png)
![AngularJS](http://i.imgur.com/oUEwalYt.png)
![Ruby](http://i.imgur.com/Ile6Vk6t.png))
![RubyOnRails](http://i.imgur.com/I6Vs0uht.png))
![PostgreSQL](http://i.imgur.com/eNi8msQt.png))
![BootStrap UI](http://i.imgur.com/48ggAgm.png)
![SASS](http://i.imgur.com/dM2it0p.png)
![JSON](http://i.imgur.com/XWzRqztt.png))
![JWT](http://i.imgur.com/4UQZTwPt.png))
![AWS](http://i.imgur.com/cJUvoHt.png)
![Gulp](http://i.imgur.com/mE9yJPB.png)
![Git](http://i.imgur.com/nSNx9rI.png)
![GitHub](http://i.imgur.com/My76ZR3.png)

## Challenges and Innovations

The main challenge of this project was the instant messaging functionality, which allowed users to communicate with one another in the app. This involved moving parts on both the front and back end. As the conversation and messages were not fully RESTful, the back end had to be built using custom migrations. In addition to this, the application had to track the status of each message within a conversation and whether it had been read or not.

We built out the messaging functionality. Firstly, we ensured that the data being sent from the Rails API was what we would expect. To do this, we tested the routes thoroughly using Insomnia. Once this had been done, we could be confident that the back end was working. This made the later tasks easier because all the data was being sent through to the page. As a result, we then had to render the data correctly on the page and overlay styling.

Another challenge was the addition of Oauth sign in. Whilst adding the oauth was quite sraightforward, the problem arose once the user had entered the site. As the application requires the user to be either a customer or developer, when entering the site through Facebook or GitHub, the user is not defined. We had to create a way of forcing the user to say whihc kind of user they were which turned out to be more difficult then expected. When the user enters, their session token has a boolean "is_dev". It is initially set as undefined, but once the user has entered and indicated which user they are, the model changes to reflect the choice. But the issue was that the session token was still set as undefined, meaning the views for certain pages were incorrect. We therefore had to create a session token refresh function which reissued the token with the correct boolean.

## Future Improvments
There are a number of features we would like to add to the site, these include:

#### Developer Index Page
One of the future improvments that we would like to add to the site is to have a developer index page so customers can see all the developers who are currently registered on the site and search through them by technology they have indicated they are proficient in, or sort through them by average rating. This way customers can contact them directly and offer them work before have to create a new project. It allows customers and developers who ahve worked together previously to do so again.

#### Expand Notifications
Currently notifications are only active on new and unread meassages. Going forward, we would like to expand the functionalitiy to include notifications to be sent when customers accept or reject a bid so developers can see directly the status of their bid.

#### Developer Creating Projects
One of the funtions we would like to add is for developers to be able to add projects, as customers. There are times when a developer might want to outsource some work to another developer, however, currently, as they have indicated they are a developer, they would not be able to create a new project.



This project was created by:

- [**Nimesh Patel**](https://github.com/n2kp)
- [**Tim Rooke**] (https://github.com/timrooke1991)
- [**James Clarke**] (https://github.com/JamesRClarke)
- [**Simon Amor**] (https://github.com/simonrramor)

##Using The Site
Justo App is available to view and register [here.](https://justo-app.herokuapp.com/)


