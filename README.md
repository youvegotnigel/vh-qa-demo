# VH QA Demo for Playwright

Hi 👋🏽!

## Dependencies

- Playwright v1.38.1
- Node v20.3.0
- npm v9.6.5
- VSCode Version: 1.79.1 (Universal)

> Pre requirements: 
- [Node setup](https://nodejs.dev/en/learn/how-to-install-nodejs/)
- [VS Code setup](https://code.visualstudio.com/learn/get-started/basics)
- [iTerm setup](https://iterm2.com/documentation-one-page.html)

## Fork and clone the project

1. Copy the project URL `https://github.com/youvegotnigel/vh-qa-demo.git`;
1. Fork the project following the [GitHub instructions](https://docs.github.com/en/get-started/quickstart/fork-a-repo) - (use the parameter --clone=true);
1. Access the forked project `cd vh-qa-demo`

NOTE: Remember to add the secrets & variables to your local repo.

## Instal the project

IMPORTANT: Create your [.env](.env) file following the [.env.example](.env.example). The `APPLITOOLS_API_KEY` is the only param you'll need to uptdate to your credentials.

On your terminal, type:

1. `npm i`

## Run the project
Take a look at the [package.json](package.json) - scripts for more details.
The tests are using https://demoqa.com/

- `npm run test-ui-c` runs all tests on chromium (except the auth)
- `npm run test-ui-auth-admin` runs profile-stored-auth-multi-role-admin.spec.ts
- `npm run test-ui-auth-user` runs profile-stored-auth-multi-role-user.spec.ts
- `npm run test-ui-auth` runs profile-stored-auth-multi-role-example.spec.ts (test will fail due to application limitations)
- `npm run test-vrt` runs visual-regression.spec.ts - visual regression testing with applitools 


Happy Testing 🎭
