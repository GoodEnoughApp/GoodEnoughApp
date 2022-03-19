# Good Enough

## Structure

Anything related to the application is located in the `src/` directory, the main directories are:

| Directories   | Description                                                                                                                           |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `/components` | In this directory is going to live components that are going to be reused                                                             |
| `/hooks`      | In this directory is going to leave all the react hooks that are used through the entire application                                  |
| `/pages`      | Every page template is going to live inside this directory and is going to be call by `react-router` which is located in the `App.js` |
| `/services`   | All the external dependencias are going to live here, this could be integration with the backend and `IndexDB` storage                |
| `/stories`    | This used by `storybook` to test and play around with different components                                                            |
| `/utils`      | Directory used for different utilities that the application may required                                                              |

Besides this directories there is a `/docs` directory that is used for general purpose documentation for the project, it has nothing to do with the application.

The entry point of the application is located in `App.js` and handles the routing and a general context view for the application, anything that happens at a global state of the application is going to be handled by this file.
