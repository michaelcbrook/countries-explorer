# Countries Explorer

## What is this?

This app displays a list of all the countries in the world via the [REST Countries API](https://restcountries.com/) and allows the user to drill into the detail of each country, which includes the native country name, subregion, timezones, currencies, languages, bordering countries, flags, and coat of arms. The app is responsive and mobile friendly. It also features the ability to "favorite" countries, and you can use the search feature to find countries with free text.

## How to run

This app is made with React + Vite. After cloning, make sure to first install dependencies:

```bash
npm install
```

Then run it with:

```bash
npm run dev
```

## Design decisions

- Instead of just displaying a static list of countries, I decided to group them by region in order to make the list more organized and understandable to the end user. Each region/continent can be collapsed and expanded to help the user as they're navigating the list of countries.
- Also instead of just displaying a linear list, I decided to display countries as a grid on larger screens to make better use of the available screen space. On mobile, it displays as a single-column list.
- Pagination is not implemented here for the simple reason that the REST Countries API does not support pagination. Any kind of pagination I created would have been artificial and less performant than just using the API as-is. To make it as performant as possible, I limited the requested fields only to those relevant for the screen being displayed.
- Initially, I attempted to use the [NPM package](https://www.npmjs.com/package/@yusifaliyevpro/countries) for REST Countries, but due to dependency issues, it was ultimately easier to just call the API directly, so this strategy was changed to just call the API directly.
- Moving between different screens (countries list, detailed view, favorites) changes the URL route using react-router. This was done so that the user could copy and paste the URL to share their view with others. The user could also use their back/next buttons in the browser to move between screens.
- Bordering countries isn't just a list of countries but a list of buttons that the user can press to navigate to the details for that specific country. So there is a more intelligent linkage between different country details. We intentionally display the country code for bordering countries instead of the country name, however, because the API does not conveniently expose the bordering country's name in the country details, only the country code. So this was a trade-off because otherwise we would have to issue multiple API calls to get all the necessary bordering country names, which could degrade performance and increase complexity. If this was a need later, though, it could be done.
- Numbers are displayed with thousands separators to improve readability (e.g. population counts).
- Countries can be "favorited" using the Star button, which shows in both the country list and detail view. It only shows on hover of the country card, except on mobile, where it always shows because mobile browsers don't really have a "hover" state. Favorites can also be cleared using the "Clear All" button on the Favorites screen.
- A global header at the top allows the user to easily access their Favorites page as well as go back to the original countries list to help them navigate and easily understand where they are in the app.
- The list of countries is sorted in alphabetical order by common name, also to help the user mentally navigate the list.
- A search bar (which was not explicitly in the requirements) was added to allow the user to search countries using free text. It can search by name, region, capitals, etc. I saw this as a natural progression of the app to help the user find specific countries. It felt like a necessary addition. And since the API doesn't use pagination, it just filters the existing list in memory. Had the API supported pagination, I would have designed it to re-issue a request when the search changes, probably with a debounce function. The search is also intentionally cleared between navigating to different page routes in order to eliminate any possible confusion with previous searches coming back when the user re-navigates back to the countries list.
- Favorites are stored in localStorage in order to persist them across page loads. This makes the app much more usable.
- Accessibility was added, allowing users to use their keyboard for navigation and use screen readers to read content.

## Possible future enhancements

- If this app were for a real company, I'd be more considerate of using appropriate brand colors and the company's logo (probably in the top left corner).
- I'd also make it so if the user clicks on the logo, it takes them back to the home page.
- I would change the default favicon (which is currently the Vite favicon) to reflect the company's logo or branding.
- I would probably add Open Graph tags in case the product were shared on social, and I would add appropriate metatags to improve SEO for search engine rankings.
- If the list of country codes for bordering countries were problematic for the client, I would refactor the code to display country names by making multiple API calls. Just depends on how important this was to the client.
- I would possibly display a link to a map or show a map in the product showing the country, based on latitude/longitude coordinates, which the API provides.
- Right now, the list of favorites re-renders completely when a favorite country is removed from favorites. I would change this to only remove the individual country from the DOM instead of re-rendering the whole list.
- I would add a confirmation dialog when the user clicks the "Clear All" button on the Favorites page.
- I would order the Favorite countries in alphabetical order, like it is on the home page.
- Depending on persistence requirements, I would consider whether to add logins to the product to allow users to save their favorite countries to their account, so they can log in and see their favorite countries from anywhere, instead of only on the same device.
- I would make more sophisticated UI for loading states, like displaying loading spinners instead of just displaying text, for those with slower internet connections who are using the product.
- I would improve accessibility even further by ensuring screen readers can in fact read all the relevant screen content. Some accessibility was added for screen readers, but it could use further testing to ensure it is accessible to everyone, especially since it is a dynamic SPA. If we had issues doing this, we could consider loading a shadow DOM to help screen readers read content.
- I would consider doing something to remember the user's scroll position when moving back to a list of countries after visiting the country detail page, since the list is quite large, and the user could lose their spot. This could be a reason to change the detail view to potentially a lightbox that opens over the list of countries, but extra mitigation would need to be done to ensure that the URL routing remains when viewing country details and manages lightboxes appropriately.