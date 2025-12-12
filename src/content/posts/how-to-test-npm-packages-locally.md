---
title: How to test npm pack­ages lo­cal­ly
content: Test your npm packages before publishing them to the npm registry
---

If you've ever created an npm package, you've most likely had the following question: 
"How can I be sure my package really works?"

You might have tests, but you're not sure the code will work when installed.

You might have tests, but you're not sure the code will work when once you install the package.

You could just publish your package and hope for the best. But, this is not 
really a great way to test. What if there's a bug, or you need to debug some code?

Every time you make a change, you need to publish a new version to npm. This gets out
of hand quickly, and you risk users installing broken packages.

Luckily, `yalc` solves this.

## The Solution

With `yalc` we can publish packages locally and other projects
can install the local version of your package.

Using `yalc` is easy. It takes 2 steps:

1. Publish the package locally
2. Install it

Optional: Push updates when you need to make changes.

### Publish

First, publish the package locally.

```sh
npx yalc publish
```

This saves your package to a local store on your computer.

### Install

Now add the package to your project. Go to your project folder and run:

```sh
npx yalc add my-package
```

You'll see a `.yalc` folder. That's where your package is.

> Note: Add `.yalc` and `yalc.lock` to `.gitignore`. Don't commit them.

### Push updates

Sometimes, you find out that there's a bug in the package. You go back to
the package's source code, make your tweaks, and run the `build` command.

Now you need to `push` your changes so that you can see the updated version
inside the other projects.

```sh
npx yalc push
```

> Note: If you're using Vite, it might not pick up the changes.
> To fix that, run: `rm -rf node_modules/.vite`

This updates all projects using your local package at once.
