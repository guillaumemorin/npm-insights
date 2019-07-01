<p align="center">
	<img src='/docs/logo.png' alt='logo' width=50>
</p>
<h1 align="center">
	📦🔮📦 npm-insights 📦🔮📦
</h1>
<p align="center">
	<a href="https://badge.fury.io/js/npm-insights"><img src="https://badge.fury.io/js/npm-insights.svg" alt="npm version" height="18"></a>
    <a href='https://semaphoreci.com/guillaumemorin/npm-insights'> <img src='https://semaphoreci.com/api/v1/guillaumemorin/npm-insights/branches/master/shields_badge.svg' alt='Build Status'></a>
	<a href='https://github.com/prettier/prettier'> <img src='https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square' alt='code style: prettier'></a>
</p>

👉 npm-insights give you a more accurate view of your packages use.

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
	  "postinstall": "npm-insights:log"
  }
}
```

## ⚠️ **Don't forget to bump the version of your package and publish the new version which include `npm-insights` to npm registry** ⚠️

## Visualization

That's it! Go to https://npm-insight-app.now.sh/ **[your_package_name]** (like **https://npm-insight-app.now.sh/react-styled-toggle** for example) and you should now be able to visualize something like this:

![landing](/docs/landing.png)

![home1](/docs/home1.png)

![home2](/docs/home2.png)
