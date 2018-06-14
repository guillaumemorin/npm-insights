<p align="center">
	<img src='/docs/logo.png' alt='logo' width=50>
</p>
<h1 align="center">
	npm-insights
</h1>
<p align="center">
    <a href='https://semaphoreci.com/guillaumemorin/npm-insights'> <img src='https://semaphoreci.com/api/v1/projects/8550083f-5b8e-478b-85be-03362f7da16c/2020699/shields_badge.svg' alt='Build Status'></a>
	<a href='https://github.com/prettier/prettier'> <img src='https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square' alt='code style: prettier'></a>
</p>

npm-insights give you a more detailed and accurate view of your packages use.

## Installation

Install npm-insights into the package you want to get analytics for.

```
npm i --save npm-insights
```

## Configuration

Add a postinstall script to your package.json `"scripts"`

```
},
  "scripts": {
	  "lint": "eslint src/",
	  "test": "jest",
	   ...
	  "postinstall": "package-install-report:log"
  }
}
```

## Visualization

That's it! Go to https://npm-insights.live/ [your_package_name] and you should now be able to visualize something like this:

![landing](/docs/landing.png)

![home1](/docs/home1.png)

![home2](/docs/home2.png)
