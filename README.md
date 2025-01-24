# Time[less] Travel

Time[less] Travel is a travel blog/website designed to help travelers achieve their dream holidays and to comemorate them afterwards! This website is aiming to help travelers gather all the travel research into a single space, where they can create travel prep checklists, write blog posts about their travels, and much more! The website has a seamless UX design, allowing users to focus on their content and plans in a secure way.

# Table of Contents

1. **[Project Goals](#project-goals)**
2. **[Target Audience](#target-audience)**
3. **[Design](#design)**
    * [Typography](#typography)
    * [Color Scheme](#color-scheme)
4. **[Features](#features)**
    * [Existing Features](#existing-features)
        + [User Profile](#user-profile)
        + [Blog Posts](#blog-posts)
        + [Checklists and Tasks](#checklists-and-tasks)
            * [Progress Tracking](#progress-tracking)
        + [User Authentication](#user-authentication)
            * [Sign Up Page](#sign-up-page)
            * [Sign In Page](#sign-in-page)
            * [Reset Password Feature](#reset-password-feature)
    * [Future Implementations](#future-implementations)
5. **[Technologies](#technologies)**
6. **[Deployment and Local Development](#deployment-and-local-development)**
    * [Deployment](#deployment)
    * [Local Development](#local-development)
7. **[Testing](#testing)**
8. **[Credits](#credits)**
9. **[Acknowledgements](#acknowledgements)**

# Project Goals
# Target Audience
# Design

## Typography

I used Google Fonts for typography. My choice of fonts was **Playwrite AU SA** for main headings and titles:

![Playwrite AU SA font](static/images/README/playwrite-au-sa-font.png)

For the rest of the webpage, I used **Work Sans** font:

![Work Sans](static/images/README/work-sans-font.png)

## Color Scheme

I went with a pretty rich color scheme, specifically I used strong colors for the CRUD buttons, because they emphasize the effect these actions can have on a user's data.

The pastel colors are used for the navbar and the direction buttons, since there are many colorful photos and the main focus should be on these photos rather than on the colors, hence the pastel colors complement the photos in an elegant way.

![Color scheme](static/images/README/color-scheme.png)

## Imagery

I used photos from [Pexels](https://pexels.com) for the blog posts, the hero image is a photo taken by me. These photos are all related to travelling and well-known destinations.

# Features

## Existing Features

### User Profile

The moment they are registered, the website automatically creates a profile for them. They can easily access it in the upper-right side of the navbar. In their profile, they can upload their own profile picture, and update their bio with a few words about themselves. 

On their profile page, they can go and check their draft posts as well. More information on draft posts is found below in the [Blog Posts](#blog-posts).

At the bottom of the profile, there are two sections: on the left side, the *Checklists* section, which contains their own personal checklists (only the users themselves are able to see them) and on the right side, the *Posts* section, which contains all of their published posts.

### Blog Posts

Every user that registers for an account can start writing blog posts to share their experiences and to give advice to those that are seeking to travel. The main blog page consists of a list of all blog posts, ordered from *Newest* to *Oldest*. In the main blog page, every post has a title, the author and an excerpt to offer a little preview into the story. The user can click on any post to read it and/or leave a comment. Users can create, edit or delete their own posts.

When creating a post, users need to add:

* **Title** - Title of the blog post
* **Content** - The content of the blog post
* **Status** - User can save the post as a *Draft* or *Published*
* **Excerpt** - A short introduction offering a preview of the post
* **Featured Image** - An image from the said destination
* **Visibility** - Who can see this post

Posts that are saved as drafts can be accessed on the user's profile page, where they can further edit (or even delete, if they change their mind) their posts and choose to publish them.

Users can set their posts to a few visibility options:

* *Private* - Only the authors can see this post
* *Users Only* - Only registered users can see this post
* *Public* - Everyone can see this post

### Checklists and Tasks

As a registered user, one can create multiple checklists to separate their tasks. Checklists are intuitive to navigate, at the right of the checklist the user can check to see how many tasks are completed how many are still pending. Inside the checklist, users have a list of tasks that can easily edited and checked as complete. Both checklists and tasks have CRUD functionalities, giving the user freedom to create, edit and delete their checklists.

Checklists are located in the lower-left section of a user's profile. There are two different colored circles beside every checklist with a certain number in them. The green circle is giving the user the number of tasks completed within the checklist, whilst the red circle is showing the remaining tasks left to be completed.

![Checklists section](static/images/README/checklists-section.png)

User can easily access a checklist by clicking on the title:

![Select checklist](static/images/README/select-checklist.png)

Clicking on the `Create Checklist` button will prompt the user to a form:

![Create checklist template](static/images/README/create-checklist-template.png)

Once inside the checklist, the user can see a list of tasks. Every task has a title, a priority level (Options are: `Low`, `Medium`, `High`), a button to toggle task completion and an `Edit` button. 

This template also has CRUD functionalities. The user can add tasks, edit or delete the checklist, and they go back to their profile page as well.

![Checklist options](static/images/README/checklist-buttons.png)

Like with checklists, the user can add a task:

![Add task template](static/images/README/create-task-template.png)

Edit the task: 

![Edit task template](static/images/README/edit-task-template.png)

If the user wants to delete a task (or checklist), they will asked to confirm before permanently deleting the task:

![Confirm delete template](static/images/README/delete-task-template.png)

#### Progress Tracking

Below the list of tasks, there is a progress bar that updates dynamically as the user completes these tasks. When there are no tasks completed, the bar is empty:

![Tasks pending](static/images/README/checklist-all-tasks-pending.png)

When a user completes a task, the progress bar is updated:

![25% percent of tasks completed](static/images/README/25-percent-task-completion.png)

As the user progresses through their tasks, the bar updates, giving the user a positive feeling of 'getting things done'. The `Pending` button also changes its color from red to green, and the text will read `Completed`. In case it was wrongfully clicked, the user can always undo by clicking again on the `Completed` button to turn it back to `Pending`.

![50% percent of tasks completed](static/images/README/50-percent-task-completion.png)

![75% percent of tasks completed](static/images/README/75-percent-task-completion.png)

![All tasks completed](static/images/README/all-tasks-completed.png)

### User Authentication

One of the basic features this website has is user authentication. In order for the user to make the most out of the website's functionalitites, they must create an account.

#### Sign Up Page

The sign up form was thoroughly tested and validated. User needs to input their first and last names, respectively, alongside with their email address, username and a strong password. After the form is submitted, the user is successfully registered. 

![Sign up page](static/images/README/sign-up-page.png)

#### Sign In Page

For a returning user, there is a sign in page. In the eventuality they forget their password, they can easily click on the *"Forgot Password?"* link to get their password reset.

![Sign in page](static/images/README/sign-in-page.png)

#### Reset Password Feature

Users can reset their password by inputting their email address. Shortly after they'll receive an email from the website with a link, prompting them to a new tab to reset their password.

## Future Implementations

# Technologies
# Deployment and Local Development

## Deployment

1. Log in to **[Heroku](https://www.heroku.com/)** if you already have an account with them. If not, **[create an account](https://signup.heroku.com/)**.
2. Once signed in, click on the "**Create New App**" button located above your dashboard. Give your app a unique name, choose the region you're in (United States/Europe) and click "**Create app**".
3. Before deploying, you need to go to the **Settings** tab. Once there, scroll down and click on **Reveal Config Vars** to open this section.
4. In this section, enter all of your environment variables that are present in your `env.py` file. Fields like `DATABASE_URL`, `SECRET_KEY`, `CLOUDINARY_URL` (*if using Cloudinary*), `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` if you are planning on sending emails to users (like having a *Reset Password* functionality).
5. After that, make sure to go to the **Resources** tab and make sure Heroku didn't automatically set up a database for you. If that happens, simply remove the PostgreSQL database.
6. Now, go to the **Deploy** tab. Once there, in the **Deployment Method** section, click `GitHub` and if needed, authorize `GitHub` to access your `Heroku` account. Click **Connect to GitHub**.
7. Once connected, look up your GitHub repository by entering the name of it under **Search for a repository to connect to** and click **Search**. After you've found your repo, click **Connect**. 
8. Now, you can click on **Enable Automatic Deploys** (optional, but I'd recommend it to save time and to detect any issues should they arise), and then select **Deploy Branch**. *If you enabled automatic deploys, every time you push changes to GitHub, the app will be automatically deployed every time, just like you would with a webpage deployed on GitHub Pages*.
9. The app can take a couple of minutes until it's deployed. Once it's done, you'll see the message **Your app was successfully deployed** and a **View** button will come up where you can see your deployed app. 


## Local Development

### How to Clone
1. Log into your account on GitHub
2. Go to the repository of this project /petra66orii/timeless-travel/
3. Click on the code button, and copy your preferred clone link
4. Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory
5. Type 'git clone' into the terminal, paste the link you copied in step 3 and press enter

### How to Fork
To fork the repository:
1. Log in (or sign up) to Github.
2. Go to the repository for this project, petra66orii/timeless-travel
3. Click the Fork button in the top right corner

# Testing

## Validation

User is constantly receiving feedback on their actions, starting from the signing up process:

## Manual Testing

|Test Item|Test Carried Out|Expected Outcome|Result|Pass/Fail|
|-------------|------------------|------------------|-------------------|-------|
|**Sign Up Page**|Inputting details and click on *Sign Up* button|User should be signed up and redirected to *Home Page* with feedback from the webpage|User is redirected as expected, and received two messages: `You have successfully registered! Welcome to Time[less] Travel!` and `Successfully signed in as [username]`, welcoming them to the platform|PASS|
||Attempting signing up with an empty field|Form should highlight the empty field and not sign up the account|The empty field is highlighted and displays `Please fill out this field`|PASS|
||Hover over popover toggle (the little purple question mark)|When hovered over, the popover toggle displays password validation rules|A little window pops up and displays password validation rules|PASS|
||`Your password can't be too similar to your other personal information`|Typing a password (`testing22`) resembing the username (`testing2`) and email address (`testing2@yahoo.com`) should stop the sign up process|User is not allowed to sign up and receives feedback accordingly (See [Validation](#validation) above)|PASS|
||`Your password must contain at least 8 characters`|Typing a password shorter than 8 characters should stop the sign up process|User is not allowed to sign up and receives feedback accordingly (See [Validation](#validation) above)|PASS|
||`Your password can't be a commonly used password`|Typing a common password like... `password`. The sign up process is stopped|User is not allowed to sign up and receives feedback accordingly (See [Validation](#validation) above)|PASS|
||`Your password can't be entirely numeric`|Typing a fully numeric password, `1234567890` should fail the sign up process|User is not allowed to sign up and receives feedback accordingly (See [Validation](#validation) above)|PASS|
||`Sign In` link redirects to sign in template|If user clicks on the *sign in* link above the sign up form, they should be redirected to the *sign in* page|User is redirected as expected|PASS|
|             |                   |                    |               |              |
|**Sign In Page**|Inputting details and click on *Sign In* button|User should be signed up and redirected to *Home Page* with feedback from the webpage|User is redirected as expected, and received the message: `Successfully signed in as [username]`, welcoming them to the platform|PASS|
||Enter the wrong password/username|Input is not accepted. The message `The username and/or password you specified are not correct.` should show up and prompt them to input their correct details.|User receives appropriate feedback and the form reloads.|PASS|
||`Sign Up` link redirects to sign up template|If user clicks on the *sign up* link above, they should be redirected to the *sign up* page|User is redirected as expected|PASS|
|             |                   |                    |               |              |
|**Reset Password**|`Forgot Password?` link redirects the user to reset password|User is redirected to said page, where they are required to input their email address so that they can receive a link which will prompt them to reset their password|User is redirected as expected|PASS|
||Input an invalid email address|Input should not be accepted|Input is not accepted. The message `Enter a valid email address.` appears and prompts the user to enter the email address again (See [Validation](#validation) above)|PASS|
||User receives email from Time[less] Travel|User should receive an email with a link from the website prompting them to reset their password|User receives reset password link through an email|PASS|
|             |                   |                    |               |              |
|**Navigation Bar**|*Home* link brings the user to the main page|User should be redirected to *Home* page|User is redirected to home page, and the *Home* link is highlihted to express that|PASS|
||*Blog* link brings the user to the blog page|User should be redirected to *Blog* page|User is redirected to blog page, and the *Blog* link is highlihted to express that|PASS|
||*Login* link brings the user to the *sign in* page|User should be redirected to *Login* page|User is redirected to login page, and the *Login* link is highlihted to express that|PASS|
||*Register* link brings the user to the *register* page|User should be redirected to *Register* page|User is redirected to sign up page, and the *Register* link is highlihted to express that|PASS|
||Navbar changes its links when a user is registered|*Login* and *Register* are changed to *My Profile* and *Logout*, respectively when the user is logged in, and a new *Create Post* link is next to *My Profile*|Registered users have different navbar links than unregistered users|PASS|
||Login status information|Under the navbar, the user should see one of two messages, depending on whether they are logged in or not: `Welcome, traveller! Please log in` or `Welcome, [username]`|When the user is logged in, the message is `Welcome, [username]`. Otherwise, the message displayed is: `Welcome, traveller! Please log in`|PASS|
|             |                   |                    |               |              |
|**Home Page**|*Get Started* button|If the user is logged in, this button shouldn't be displayed. If the user is logged out, the button appears and when clicked on it, it should redirect the user to the *Sign Up*|Button was displayed and hidden as expected and it works as well|PASS|
|             |                   |                    |               |              |
|**My Profile**|Profile picture upload|User should be able to upload a photo as their profile picture|Image is uploaded as expected|PASS|
||Delete profile picture|User can delete their profile picture|The picture is removed successfully and a placeholder image appears instead|PASS| 
||Update bio|User can add text to their bio|Bio is shown in the profile page|PASS|
||*Cancel* button|User should go back to the profile page without any changes|Button works as expected|PASS|
||*Your Drafts* button|Should redirect the user to the *Drafts* page|User is successfully redirected to the *Drafts* page|PASS|
||Draft title link|When the user clicks on the draft title, they should be redirected to the post page|The link works as expected|PASS|
||*Edit* button|When the user clicks on the *Edit* button, they should be redirected to the post editing template|The user is redirected as expected|PASS|
||*Publish* button|When this button is pushed, the post disappears from the drafts list and is instead posted in the *Blog* page|The button works as expected|PASS|



## Fixed Bugs

Of course, since this was a very complex project, bugs were numerous as well. Thankfully, all bugs that appeared were fixed.

### Bug #1: Blog Link Wouldn’t Work

When clicking on the `blog` link in the navbar nothing was happening.

* Solution: project-level `urls.py` was duplicated with `blog/urls.py`, which was "confusing" the server

### Bug #2: User Profile Wouldn't Load 

User profile template wouldn't load when signing in.

* Solution: `user_profiles/urls.py` file had a mismatch in names; the *Base* template had `{% url 'user_profile' %}`, whereas the name parameter in `user_profiles/urls.py` was just `profile`.

### Bug #3 - User Couldn't Log In

Users would input their details but the website was throwing an error when clicking `Sign In`.

* Solution: There was a missing apostrophe within the form element, which affected the "POST" method as seen in the screenshot below:

![Bug 3 Screenshot](static/images/README/bug-3-login.png)

### Bug #4 - User Profile Wasn't Automatically Created 

A user profile wasn't automatically created when a user would register as it was intended;

* *Solution*: There was an indentation error in `apps.py`, the `ready()` function wasn't indented to be part of `UserProfileConfig` class, and I also didn't have `__init.py__ ` set up. After rectifying this, everything worked as intended

### Bug #5 - `Home` Link 

The `Home` link in the navbar was highlighted as if it was active even when the user wouldn’t be on the home page

* *Solution*: Remove `active` class from navbar link

![Bug 5 Screenshot](static/images/README/bug-5-navbar.png)

### Bug #6 - No Confirmation Messages for Deleting Messages  

Checklist would be deleted without any confirmation message showing up, even though there was a template linked to project

* *Solution*: form had method `POST`, instead of `GET`.

### Bug #7 - Everyone Can See Everyone's Checklists 

Checklists would be visible for all users, regardless of whether they created the checklist or not; This wasn’t intended like this as checklists and tasks are meant to be private for each user.

* *Solution*: Defined a function within `ChecklistDetailView` class that filters users; that way the users only get to see their own checklists

### Bug #8 - `Cancel` Button Would Redirect Too Far Back 

When clicking "Cancel" in the "Edit task" view, it would redirect me all the way back to the profile page instead of redirecting me to the respective checklist where the task was in; 

* *Solution*: Add `get_context_data` function in `TaskUpdateView` class and change the url in the template from `profile` to `checklist 'checklist.id'`

### Bug #9 - `Add Task` Button Wasn't Working 

When clicking on `Add task`, the page would fail to load;

* *Solution*: Add `get_context_data` function to `TaskCreateView` class

![Bug 9 Screenshot](static/images/README/bug-9-view.png)

### Bug #10 - Error Loop Would Cause The `Create Task` Template to Crash

After fixing the `TaskCreateView` class, I was getting an error, but this time it was regarding the `*Delete*` button being present in the `create task` view. The `*Delete*` button was looking for an ID for a task that didn’t exist yet because the task itself wasn't created, which drove the website into an existential crisis; 

* *Solution*: Add a conditional statement in the `task_form` template to hide the `Delete` button when creating a task. 
* *Update*: Later on I’ve decided to create two separate templates for creating and editing tasks, respectively. I ended up doing the same for the checklists templates as well to avoid any confusion when rendering these templates.

![Bug 10 Screenshot](static/images/README/bug-10-delete-button.png)

### Bug #11 - Blog Posts Weren't Showing Up

Posts wouldn't appear on the blog list template, even though their visibility was set to 'Users Only' and I was logged in (not to mention I was the “author” of said posts).

* *Solution*: The `VISIBILITY` tuple had both lowercase and uppercase strings, and the database was reading the lowercase strings first, whilst in my `blog/views.py` function the uppercase strings were used; this is what was affecting filtering. By modifying the tuple accordingly, the posts are shown as intended.

![Bug 11 Screenshot](static/images/README/bug-11-visibility.png)

### Bug #12 - Double Display of Messages 

After adding `success.messages` loop in the drafts template when publishing a post, the message would display twice. This is because I already had feedback messages displayed in the *Base* template.

* *Solution*: Add `suppress_messages` to `user_drafts` view and add conditional statement to the *Base* template.

![Bug 12 Screenshot](static/images/README/bug-12-messages.png)


# Credits
# Acknowledgements