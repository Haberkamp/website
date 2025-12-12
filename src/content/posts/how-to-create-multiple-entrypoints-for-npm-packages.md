---
title: How to create multiple entry­points for npm packages
content: Create little "sub-packages" like next/link or next/navigation
---

I've wondered how some packages have "sub-packages" like `next/link` or `next/navigation`.

I naively thought that I was accessing a file path inside the published package. Turns out I was wrong.

I'll show you how you can add multiple entrypoints or "sub-packages" for your own npm packages.

## Why though?

Before I show you the code, I want to tell you what the end-goal is.

I wanted other developers to try out pre-release components for 
the [Design System](https://github.com/shopware/meteor) I maintain. While there are multiple
ways to do that, I decided to create a special entrypoint called `experimental`. So
developers could try out new components by importing them like this:

```ts
import { SomeComponent } from 'component-library/experimental';
```

## How

There are three steps to achieve this: 

1. Define the entrypoints in the `package.json`
2. Create the files for the entrypoint
3. Configure your bundler to export them

### Define the entrypoints

First, define which entrypoints you want to have.

Add a [`exports`](https://nodejs.org/api/packages.html#package-entry-points) property to your `package.json`.

You define the entrypoints by setting the keys on the `exports` property. Each key needs
two properties `import` and `types`. With `import` you point to the compiled JavaScript, and 
with `types` you point to the type declaration file.

```json
// package.json
{
  "name": "component-library",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./experimental": {
      "import": "./dist/experimental.js",
      "types": "./dist/experimental.d.ts"
    }
  }
}
```

> The "." means it's the default entrypoint. Let's say your package is called `foo` then 
that entrypoint will point to the package name like this: `import { Bar } from "foo"`

Note that the paths point to the bundled files which will end up in your package. They don't 
point to the files in your `src` directory.

### Creating the entry points

Next, add those entrypoints to our source code. 

Assuming that our current project already bundles an `index.ts` file, I'll add the
missing `src/experimental/index.ts` file.

```ts
// src/experimental/index.ts
export { MyComponent } from './my-component';
```

### Configuring your bundler

Finally, configure your bundler. I am using Vite for this post.
If you're using a different bundler, then you need to check the documentation of
your bundler.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        experimental: resolve(__dirname, 'src/experimental/index.ts'),
      },
      formats: ['es'],
    },
  },
})
```

Ok, now we're done. Run your build step, open the dist folder and you're going to see
the two entrypoints.

```
dist/
├── index.js
├── index.d.ts
├── experimental.js
└── experimental.d.ts
```

### Testing out the entrypoints

While this step is optional, I recommend that you test your changes
before you publish them to npm.

You can use a tool like [yalc](https://github.com/wclr/yalc) to use your package
in other packages, without publishing to npm.

Feel free to read the [yalc docs](https://github.com/wclr/yalc?tab=readme-ov-file#usage), then create a new project, install 
your new package and try to see if you can import it.

```ts
import { Button } from 'component-library'
import { MyComponent } from 'component-library/experimental'
```

If it works, great. You now know how to add multiple entrypoints
to your package.

