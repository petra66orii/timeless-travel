# Time[less] Travel

Time[less] Travel is a travel blog/website designed to help travelers achieve their dream holidays and to comemorate them afterwards! This website is aiming to help travelers gather all the travel research into a single space, where they can create travel prep checklists, write blog posts about their travels, and much more! The website has a seamless UX design, allowing users to focus on their content and plans in a secure way.

# Table of Contents

1. **[Project Goals](#project-goals)**
2. **[Target Audience](#target-audience)**
3. **[Design](#design)**
4. **[Features](#features)**
    * [Existing Features](#existing-features)
        + [User Authentication](#user-authentication)
            * [Sign Up Page](#sign-up-page)
            * [Sign In Page](#sign-in-page)
            * [Reset Password Feature](#reset-password-feature)
        + [User Profile](#user-profile)
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
# Features

## Existing Features

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

### User Profile

The moment they are registered, the website automatically creates a profile for them. They can easily access it in the upper-right side of the navbar. In their profile, they can upload their own profile picture, and update their bio with a few words about themselves. At the bottom of the page, there are two sections: on the left side, the *Checklists* section, which contains their own personal checklists (only the users themselves are able to see them) and on the right side, the *Posts* section, which contains all of their posts.

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
# Credits
# Acknowledgements