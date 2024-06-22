## Unit Assignment: Kudos Board

Submitted by: **Ian Wafula**

Deployed Application (optional): [Kudos Board Deployed Site](https://kudos-board-xq6y.onrender.com/boards)

### Application Features

#### CORE FEATURES

- [x] **Home Page**
  - [x] Displays header, banner, search, board grid, and footer.
  - [x] Displays preview of all boards on initial page load.
    - [x] Boards previews should show an image/gif and board title.
  - [x] Users can click on a category (recent, celebration, thank you, inspiration) to filter the boards.
    - [x] Recent displays most recently created boards.
    - [x] Other categories display boards of that type.
  - [x] Users can search for a board by name.
  - [x] Users can click on a board to navigate to a new page containing that board.
  - [x] Users can create a new board.
    - [x] Boards should have a title, category, and author (optional).
  - [x] User can delete boards.

- [x] **Board Page**
  - [x] Displays a list of all cards for a board.
    -  [x] Each card features a text message.
    -  [x] Each card features a gif found using the [GIPHY API](https://developers.giphy.com/docs/api/).
    -  [x] Users can optionally sign the card as the author.
-   [x] Cards can be upvoted.
-   [x] Cards can be deleted.


#### STRETCH FEATURES


- [x] **User Accounts**
  - [x] Users should be able to log in with a username and password.
  - [x] Users should be able to sign up for a new account.
  - [x]  Boards and cards should be associated with a user.
    - [x]  Anonymous cards or cards by guest users should still be allowed.
  - [x] Add a new filter option on the home page to display only the current user's boards.
  - [x] Allow boards to be deleted only if they are owned by the user.
- [x] **Deployment**
  - [x] Website is deployed via Render.
- [x] **Comments**
  - [x] Users should be able to comment on cards.


### Walkthrough Video

[!Project Demo](https://youtu.be/XlrNzaiHlUA)


### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

`The discussion on Databases was a great foundation in exploring model relations and integrating front end and back end later. I felt very unprepared for designing SQL models and building relations solely based on Codepath Labs. I was also left in the dark with using routes, as a lot of vital information was implied by the videos by not explicitly discussed.`

<hr>
* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.

`I could have implemented a lot more robust features:`

`Input validation for submitting new forms so that there is consistent data`

`Ensuring that username and password are consistent throughout the components, I was not able to do this since this feature was pulled as a requirement on Thursday. I used Google Firebase for email and password auth instead of username and password`

`Having accessibility features`

`Fixing a lot of bugs consistent with building a full stack application with a 'move fast' approach`

`Creating a separate model for upvotes, so that a user may only upvote cards for other users, not their own`

`...other edge cases`

<hr>
* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

`I noticed a peer using open-source CSS for their styling,rather than designing from scratch. This would save me a lot of time`
<hr>

### Libraries used

- Google Firebase for UserAuth (https://firebase.google.com/)
- Font Awesome Library

### Shout out

- Sammy, for teaching me how to use CSS modules
- Kimberly [Manager], for setting up bi-weekly meetings (twice a week)
- Marvin [Peer], great ideas on how to design API endpoits
