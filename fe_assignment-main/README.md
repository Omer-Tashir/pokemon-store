# Mine Frontend Engineer Coding Assignment

## Briefing

This repo contains a coding assignment, which reflects some of the challanges a frontend engineer at Mine is expected to solve.

In this assignment, you will add a new feature to our Pokemon web app that is based on Angular & TypeScript.

The Pokemon web app currently allows a user to see the list of available Pokemons, as well as login and logout of the app.

The new feature you will add will allow the user to add Pokemons to a shopping cart. To help our users decide which Pokemons they want to buy, you will also have to add their pictures to the view, as the app currently only displays their names.

## Requirements:
### General
- Add a new 'Cart' page to the app that will allow the user to see all the Pokemons in the cart.
- Add a link to the new 'Cart' page in the Navbar.
- The Cart view has to show the Pokemons the same way as the home page shows them (name & picture).
- If the cart is empty, you should show a message telling the user to add Pokemons to the cart.
- In the Navbar: the new Cart link should have a badge showing how many items there are in the cart.
- Add a 'clear cart' button in the Cart page. When the user presses this button, a confirmation dialog will ask him if he is sure. If he presses 'yes' the cart will be cleared, if he presses 'no' the dialog closes and all items stay in the cart.
### Pokemon list
- Add a '+' button next to each Pokemon that will add it to the cart.
- If a Pokemon was already added to the cart, dont  show the '+' button.
- Each Pokemon in the cart should have a '-' button to remove it from the cart.
- When a Pokemon is removed from the cart you should use an animated transition to disappear the item.
- Each Pokemon should have it's image shown next to it's name. To obtain the image, use the following API method: `https://pokeapi.co/docs/v2#pokemon` to retrieve additional data for a specific Pokemon by its name. Inside the JSON response you will find `sprites/front_default` which is the image.
### Persistency
- For a user that is logged in, the cart should be stored to local storage (without an explicit button).
- When a user logs in, any previous persisted cart should be loaded, and overwrite the existing one.
- Adding to the cart is allowed for all users; logged in / logged out.


## Design Specifications
- See attached design specification files under `design-spec` folder.
- Elements that appear/disapper on the screen should have animated transitions (you can pick which).
- The design should be responsive across an acceptable range of popular screen sizes (from mobile to desktop).
- If something does not have a design spec - you are free to decide on the design. Make sure to choose a design that is simple and clean & blends with existing look and feel as much as possible.

## Things to pay attention to:
- Reuse and define new/shared components/methods when possible.
- Functionality - the code works across a range of acceptable use-cases.
- Edge cases & exception handling.
- Performance - Write code that is efficient, fast and smooth.
- Logging.
- Readable, maintainable code with consistent naming conventions - you will have to align with the existing conventions in the app.
- Unit testing - add unit testing to your new code.


## Development Environment

You will need to have [NodeJS 12.6](https://nodejs.org/en/download/) or later. We recommend installing and using NodeJS through [NVM](https://github.com/nvm-sh/nvm).

Once you have NodeJS installed, simply go to this repo's direcory and type `npm install` to have all the required dependencies installed.
Once installation is finished you should be able to run `ng serve` and point your browser to `http://localhost:4200` and see the Pokemon web app.

As an IDE, we recommend Microsoft's free cross-platform editor [VSCode](https://code.visualstudio.com/), but feel free to use anything you like.