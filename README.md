# WiseInvest
WiseInvest is a comprehensive financial app designed to empower users with both the knowledge and tools needed to make informed investment decisions. The app has two primary features: the Education Center and the Investment Manager.

The Education Center is tailored for beginners, offering a curated list of courses, including sample YouTube playlists, that cover the essentials of investing. Users can enroll in courses, mark favorites, and track their learning progress through a dedicated dashboard, making it easy to build a strong foundation in financial literacy.

Once users feel confident, they can apply their knowledge in the Investment Manager. Here, they can purchase stocks, monitor their investments, and view detailed insights in the portfolio dashboard, which displays stock performance over time and a record of all transactions. WiseInvest seamlessly integrates learning with practice, offering users a complete solution for smart investing.


## Distinctiveness and Complexity
WiseInvest stands out as an all-in-one financial platform, designed with a multi-faceted structure to support both learning and investment. Built using the JavaScript framework, React, WiseInvest ensures a seamless user experience with dynamic interactions across its various sections. What truly sets the app apart is its Investment Manager feature, which includes real-time updates through calls to an external API (Yahoo Finance), providing users with the latest stock prices to make timely, informed decisions. This integration of live data with an intuitive learning and investing experience makes WiseInvest a comprehensive and complex solution for aspiring and seasoned investors alike.


## How to run the app
### React Client
Run the following command in the terminal to start the React client:
1. `cd client`
2. `npm install`
3. `npm run dev`

### Django Server
Run the following command in the terminal to start the React client:
1. `pip install`
2. `python managy.py runserver localhost:8000`


## App structure and tech stack
The WiseInvest app is served by endpoints written and managed in Django. The idea of rendering the client/front-end via Django server has been avoided and the decision of using the JavaScript framework React was made to comply with a more modern way of building apps that often keeps client and server separated. This brings the technical complexity of the app to a higher level, though reducing the use of Django to endpoints of different APIs (education, invest, users).
The base path holds the Django server and its usual structure, though it includes an addtional folder for the React client to keep the two parts separated and the entire app more organized.


### Django Server - Walkthough on Structure
The Django server is made of three apps: Users, Education and Invest.

##### Users
The Users app is very simple and mainly contains the models and views concerning the User Management. It has been developed separately so that both main apps could refer to it to have a centralized management of user information and avoid duplication.

All views, excluding the login and register one, are protected by the @login_required decorator.

* users/models.py
    * `User`: This file contains only one model that takes advantage of the Django built-in AbstractUser to store the most common user information, which will be displayed in the "UserProfile" client component.
* users/views.py
    * `login_view()`
        * Login view that uses Django's built-in authentication method. This view is not proteced by CRSF token validation using the @csrf_token decorator, as users will be assigned a token only after the login.
    * `register_view()`
        * Register view that uses Django's built-in authentication method. It automatically triggers the user's login. This view also uses the @csrf_token decorator to skip CSRF token validation, as users will be assigned a token only after the login.
    * `logout_view()`
        * Logout view that also makes use of Django's built-in authentication method. In this case, CSRF token is needed.
    * `user_profile()`
        * This view provides the consumer with a JSON object containing all information on the currently logged in user. Date and time (stored in the database in ISO format) are converted to a more readable format. If the request method doesn't match the expected one, a 405 error will be thrown. Lastly, this view is protected by the @login_required decorator.
    * `edit_user_profile()`
        * This view gives the user the possibility of changing their data (first and last name, email). Whether there are changes to the existing data or not, the server will provide a message about the status of the update accordingly. If the request method doesn't match the expected one, a 401 error will be thrown. This view is also protected by the @login_required decorator.

##### Education
The Education app entails more models and views, making it definitely more complex than the previous app. It serves one of the core sections of the app, the "Education Center". The information on the two courses that have been already imported to the database where extracted separately thanks to the Google YouTube API, these are meant to be samples for display the component on the client side.

CSRF token validation is enabled in all views and login is required (with @login_required decorator) in order to make requests to the Education views.
All views will throw an error if the request method doesn't match the expected one.

* education/models.py
    * `Course`: This model contains the information about courses in the form of YouTube playlists.
    * `CourseItem`: This model contains the information on the playlist items specifically. It refers to its main Course via ForeignKey.
    * `Favorite`: This model is meant to create a relation between a user (ForeignKey) and a list of courses (Many-To-Many Relationship) whenever a user wants to bookmark/mark a course as favourite for later reference. For the User reference, the User model from the Users app has been imported.
    * `Learning`: This model is similar to the above, but shows a one-to-one relationship between the User and a Course they have enrolled in (both ForeignKeys). This was made to also have an additional field to display the "status" of the learning (Enrolled, In Progress, Completed). For the User reference, the User model from the Users app has been imported here as well.
* education/views.py
    * `get_courses()`
        * This view provides the client with a list of all courses that exist in the database. This data will be displayed in the course list and the course page.
    * `get_course_details()`
        * This view provides the client with a list of all courses that exist in the database with the additional insertion of the course status and the list of items that are part of the course. This data will mostly be used for displaying specific information on the course page.
    * `toggle_favorite()` / `toggle_enroll()`
        * These views will add/remove a course to the user's Favorites or Learning list. They are conceived as "toggle", which makes them more flexible to use. They are called by the button components on client-side that enable/disable the "favorite" or "enrolled" status.
    * `get_user_favorites()` / `get_user_learning()`
        * These view will provide the client with a specific list of all users' favorites or enrolled courses to be displayed accordingly in the "Favorites" and "Learning" sections of the app.
    * `edit_course_status()`
        * This view is a "one-way" status update of the course's status saved in the `Learning` model. It is called by another button component on client-side that checked the initial status of the Learning ("Enrolled" by default) and pushes the status "forward" to "In Progress" until "Completed". Toggling off the enrollment to a course will remove the Learning altogether.

##### Invest
The Invest app serves the other core sections of the app, the "Investment Manager". The information on the stocks avaiable in the database has been extracted via RapidAPI and rewored to fit the models. `yfinance` API is being used by one of the views in this app mainly to retrieve the most up-to-date information on the stock price.

CSRF token validation is enabled in all views and login is required (with @login_required decorator) in order to make requests to the Invest views.
All views will throw an error if the request method doesn't match the expected one.

* education/models.py
    * `StockExchange`: This model contains the information about the most important and known stock exchanges.
    * `Stock`: This model contains the information on the stocks. It refers to its Exchange via ForeignKey.
    * `Transaction`: This model is meant to create a relation between a user and a stock (both ForeignKeys) whenever a user purchases a stock. It includes relevant field like the quantity, the date of purchase and the stock price on purchase (to correctly calculating the total investment). The save method has been modified to calculate the "total expense" by multiplying the price and the quantity.
* education/views.py
    * `get_stocks()`
        * This view provides the client with a list of all stocks that exist in the database. This data will be displayed in the stock list page.
    * `get_transactions()`
        * This view provides the client with a list of all puchases made by the user. This data will be used for displaying specific information on the dashboard page.
    * `get_portfolio()`
        * These views provides a JSON object that includes all relevant information needed for displaying the portfolio page.
    * `get_current_price()`
        * This view makes a call via the `yfinance` API to only retrieve the current price of the specified stock symbol. This call will be used in the sotck list page.
    * `purchase_stocks()`
        * This view is called from the stock list page and simulates the purchase of one or more stocks. This will create a new Transaction instance in the database.


### React Client - Walkthough on Structure
The React client presents a folder structure similar to the Django server. Pages and components are grouped based on the Django app they are serving for a more organized folder structure.
React Router has been used for structuring the routes and paths client and creating the urls to the pages. This is shown in the `main.jsx` file that basically contains trhe whole router configuration of the client.
The `App.jsx` file generates a high-level/prent component that holds all the other Page Components. In this files, they are all bundled in the `<Outlet/>` Component.


#### Assets/
This folder includes .png files with the App Logo.

#### Components/
This folder includes all components that are used to build different page components.

* education/
    * `BackToCourseButton.jsx`: This component renders a button with an `onClick` event listener that navigates the user back to the course page. It is used in the `<CoursePage />`.
    * `CourseDetails.jsx`: This component renders a card container with the course title, creator, number of items, description and two button components `<ToggleFavButton />` and `<ToggleEnrollButton />`. A badge component is rendered via `createBadge()` next to the title to display the user's learning status for that specific course('Enrolled', 'In Progress*, 'Completed'). The status can be changed via another button component built by `createStatusButton()`, which conditionally displays 'Start Course' or 'Completed?'. It is used in the `<CoursePage/>`.
    * `Dashboard.jsx`: This components renders a dashboard for the Education Center. It contains for cards which a grouped overview of four categories: 'Not started', 'In Progress', 'Completed' and 'Favorites'. The courses are grouped via filtering the `courses` prop passed along and have a link to their respective `<CoursePage />`. It is used in the main `<EducationPage />` at the `/education` route.
    * `PlaylistItem.jsx`: This components renders a container with the playlist items of the course, displayed as card containers. If clicked, the `onClick` event listener will trigger ther re-render of the item details on the `<CoursePage />`.
    * `ToggleEnrollButton.jsx`: This component renders a button with an `onClick` event listener that toggles the enrollment to a course. It contains a React Icon that is changed accoringly. It is used in the `<CourseListPage />` and `<CoursePage />`.
    * `ToggleFavButton.jsx`: This component renders a button with an `onClick` event listener that toggles the marking a course as favorite. It contains a React Icon that is changed accoringly. It is used in the `<CourseListPage />` and `<CoursePage />`.
* invest/
    * `Dashboard.jsx`: This components renders a dashboard for the Investments Manager. It contains for cards which an overview of three categories: 'My Stocks' , with a table of the user's purchased stocks; an overview of cards of 'Increased', 'Descreased' and 'Stable' stocks. The stocks are grouped via filtering the `portfolio` prop passed along and have a link to their respective page on Yahoo Finance; at the bottmon a table with the user's 'Transactions' is visible. The `<Dashboard />` is used in the main `<InvestPage />` at the `/invest` route.
    * `FilterButtons.jsx`: This component renders a container with buttons, each with an `onClick` event listener that filters the users stocks accroding to the market area. It is used in the `<StockListtPage />` and `<Portfolio />`.
    * `PurchaseForm.jsx`: This component renders a group of elements with conditional rendering. Per default, only a button with a cart icon is displayed, but when clicked it will re-render into an number input with label and a paragrph that keeps the count of the amount of stocks the user wants to buy. When the purchase button is clicked, a POST request is sent to the server. It is used for each stock row in the table of the `<StockListtPage />`.
* users/
    * `LoginForm.jsx`: This component renders a login form. When the login button is clicked, a POST request is sent to the server and the user is redirected to the `<ForkPage />`. It is used in the `<LoginPage />` at the `/login` route.
    * `RegisterForm.jsx`: This component renders a register form. When the login button is clicked, a POST request is sent to the server, the user ist logged in and redirected to the `<ForkPage />`. It is used in the `<RegisterPage />` at the `/register` route.
    * `UserProfile.jsx`: This component renders a container with the user's details. The field 'Firstname', 'Lastname' and 'E-mail' can be edited thanks to an `onClick` event listener that triggers the re-render of the field into an editable input. The `onBlur` event listener on the inputs will cause the re-render back into a non-editable field. At the same time, a call to the server is request the modification in the database. It is used in the `<EducationPage />` and `<InvestPage />`, at the `/education/userprofile` and `/invest/userprofile` routes respectively.
* `BackToDashboardButton.jsx`: This component renders a button with an `onClick` event listener that navigates the user back to the dashboard on the main page. It is used in the `<CoursePage />`, `<CourseListPage/>`, `<StockListPage />` and `<Portfolio />`.
* `NavBar.jsx`: This component renders a navbar with logo, app title and menu with dropdown. The menu item vary based on whether the Eucation Center or Investments Manager is requested. The user can navigate to their userprofile. It is used in all Page components.
* `ToastMessage.jsx`: This component renders a success toast that notifies successful actions to the user, specifically the successful editing of personal information or purchase of stocks. It is used in the `<Userprofile />` and `<StockListPage />`.

#### Pages/
This folder includes all page components connected to a specific route as configured in `main.jsx`.

* education/
    * `CourseListPage.jsx`: This page component at `/education/courses` route uses context to get the data from the server. It displays the `<BackToDashboardButton />` and a container with course cards with the main information and both the `<ToggleEnrollButton />` and the `<ToggleFavButton />`. Clicking on a card redirects to its `<CoursePage />`. The `handleClick()` function prevents event bubbling between the card's and the buttons' event listeners.
    * `CoursePage.jsx`: This page component at `/education/courses/:courseId` route uses context to get the data from the server. It displays the `<CourseDetails />`, `<PlayListItem />` in loop and the pre-selected item's title, description and video rendered via `<ReactPlayer/>`.
    * `EducationPage.jsx`: This is the parent page component that containes and renders all other pages. Its route is at `/education`m where it renders the Educations Ceneter's `<Dashboard />`. On render, it requests all necessary information to the server and passed them either as outlet context or as props.
* invest/
    * `InvestPage.jsx`: This is the parent page component that containes and renders all other pages. Its route is at `/invest`, where it displays the Investments Manager's `<Dashboard />`. On render, it requests all necessary information to the server and passed them either as outlet context or as props.
    * `PortfolioPage.jsx`: This page component at `/invest/portfolio` route uses context to get the data from the server. It displays the `<BackToDashboardButton />`, `<FilterButtons />` and a container with a table that sums up all user's purchased stocks and evaluates their progress since the purchase thanks to the `calculateGrowth()` function.
    * `StockListPage.jsx`: This page component at `/invest/stocks` route uses context to get the data from the server. It displays the `<BackToDashboardButton />`, `<FilterButtons />` and a container with a table displaying the information of all stocksin the database. The stocks passed as props are edited with the `getCurrentPrice()` with the most up-to-date price from Yahoo Finance. On each stock row the `<PurchaseForm />` is rendered.
* users/
    * `LoginPage.jsx`: This page component at `/login` route displays the `<LoginForm />`.
    * `RegisterPage.jsx`: This page component at `/register` route displays the `<RegisterForm />`.
* `EntryPage.jsx`: This page component at base route `/`  renders a container with the App Logo and two buttons to navigate the user to either the `<LoginPage />` or `<RegisterPage />`.
* `ErrorPage.jsx`: This page component is set as `errorElement` to all routes and renders a container with the error message.
* `ForkPage.jsx`: This page component at base route `/fork`  renders a container with two buttons to navigate the user to either the `<EducationPage />` or `<InvestPage />`.

#### Styles
This folder contains .css files with the styles used by the app.

* `index.css`
* `education.css`
* `invest.css`
* `users.css`

Each file contains style specific to the section they carry the name of. The `index.css` has style that are applicable to all app sections.


#### Utils
This folder contains .js files with functions and configuration used by the app.

* `axiosConfig.js`: This file contains the axios instance with the necessary configuration. The interceptor serves to update the csrftoken, taken from the browser cookies, on every request.
* `functions.js`: This file contains the `calculateGrowth()`, ``grouspStocks()` and `formatDate()` functions used in the `<Dashboard />` and `<Portfolio />` coponents.

## Challenges
* CSRF validation between Django server and React client.
* React


## Note on future improvements
The app is to be understood as a prototype of a more complex project. It is clear that additionl features on both main sections would make the app more complete. Below some of the features that have been identified as valuable to enhance the user experience and flexibility of the app.

Education Center:
* possibility of creating courses from scratch;
* show data based on users' learning (for ex. learning progress, stock trends);

Investment Manager:
* add more stock types (indexes, etf, fonds, crypto) and filters on the Investment Manager (trends, graphics);
* possibility of selling stocks; 
* add tips from the app as to when it is best to sell or buy specific equities (for example, with in-app notifications);
* integration with payment methods.

These features, as much as they are important to the further development of the app, have been deemed as not necessary to illustrate the concept at the base of the project and therefore, excluded for the time being.



--- ADD SHORT CHAPTER ON TECHNOLOGY USED:   
-- React Bootstrap, CSS, ReactIcons, axios, js-cookies