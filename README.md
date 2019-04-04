# Sitecore JSS Carousel React Component

Creation of a reusable carousel component for JSS build with React

## Compile

Compile the file locally:

` npm pack `

## Include in Sitecore project

Create a folder in the root directory called `localnpm`. Move the newly create file there. 
Eg: `localnpm/jss-carousel-0.0.2.tgz`

## Install the local package

`npm i localnpm/jss-carousel-0.0.2.tgz --save-dev`


# Configure

## Step 1

Reference the definition files of the component

Modify `./scripts/disconnected-mode-proxy.js`

Add in `proxyOptions` Object
```
  sourceFiles: [
    './sitecore/definitions/**/*.sitecore.js',
    './sitecore/definitions/**/*.sitecore.ts',
    './node_modules/jss-carousel/sitecore/definitions/**/*.sitecore.js'
  ],
```

## Step 2

Refrence the imports and future imports in this dedicated file

Create file `./src/external-components.json`

With contents:
```
  {
    "externalComponents": {
      "../node_modules/jss-carousel/dist/components": [
        "CarouselContainer",
        "CarouselSlide"
      ]
    }
  }
```

## Step 3

Register the imports declared in Step 2 in Sitecore component factory

Modify `./scripts/generate-component-factory.js`

Add
```
const config = require("../src/external-components.json");
const externalComponents = config.externalComponents || {};
```
After
```
const componentRootPath = 'src/components';
```

Add
```
const externalModules = Object.keys(externalComponents);

   if (externalModules.length) {
    externalModules.forEach(modulePath => {
      const components = externalComponents[modulePath];
      components.forEach(component => {
        console.debug(`Registering JSS component ${component}`);
        imports.push(`import { ${component} } from '${modulePath}';`);
        registrations.push(`components.set('${component}', ${component});`);
      });
    });
  }
```
After
```
const registrations = [];
```

## Step 4

Ignore the import from node_modules except the newly added module.

Modify `sitecore/definitions/config.js`

Add 
```
ignore: [/node_modules\/(?!jss-carousel)/],
```

Before
```
babelrc: false,
```

## Step 5

Add dummy contents in `data/routes/en.yml`

```
  - componentName: CarouselContainer
    placeholders:
      jss-carousel-slide:
      - componentName: CarouselSlide
        fields:
          imgSrc: '/data/media/img/nature_01.jpg'
          label: 'Nature wins'
          caption: 'Preserve the nature for the younger generation'
      - componentName: CarouselSlide
        fields:
          imgSrc: '/data/media/img/people_01.jpg'
          label: 'The silent people'
          caption: 'Their contributions have helped us so much yet they are not famous'
      - componentName: CarouselSlide
        fields:
          imgSrc: '/data/media/img/tech_01.jpg'
          label: 'The future of technology'
          caption: 'A doom or a crazy situation lies ahead'
```

# Example
Run `npm i` and `jss-start`

https://github.com/umarmw/experiment


# End Note

Happy coding :)
