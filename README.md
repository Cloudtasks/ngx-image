# [ngx-image](https://cloudtasks.io)
[![npm version](https://img.shields.io/npm/v/@cloudtasks/ngx-image.svg?style=flat)](https://www.npmjs.com/package/@cloudtasks/ngx-image)
[![Build Status](https://img.shields.io/travis/Cloudtasks/ngx-image/master.svg?style=flat)](https://travis-ci.org/Cloudtasks/ngx-image)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/606abf5220d94f4f80e94f6c850a6fab)](https://www.codacy.com/app/jonnybgod/ngx-image?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Cloudtasks/ngx-image&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/Cloudtasks/ngx-image/badge.svg?branch=master&service=github)](https://coveralls.io/github/Cloudtasks/ngx-image?branch=master)
[![devDependency Status](https://david-dm.org/Cloudtasks/ngx-image/dev-status.svg)](https://david-dm.org/Cloudtasks/ngx-image#info=devDependencies)

[![Github Releases](https://img.shields.io/github/downloads/Cloudtasks/ngx-image/latest/total.svg)]()

Allows you to serve highly optimized images to your client apps.

angular-cloudtasks helps using [Cloudtasks.io](https://cloudtasks.io) image processing task by substituting your images sources with the processing URL.

With this you can process your images on the fly applying resize, trim, and even filters to your images. In the end you will save a lot of bandwidth for you and your users as well as improve the overall user experience.

You will need a [Cloudtasks.io](https://cloudtasks.io) account to be able to use this module;

## Installation
First you need to install the npm module:
```sh
npm install @cloudtasks/ngx-image --save
```

If you use SystemJS to load your files, you might have to update your config with this if you don't use `defaultJSExtensions: true`:
```js
System.config({
	packages: {
		"ngx-image": {"defaultExtension": "js"}
	}
});
```

Finally, you can use ngx-image in your Angular 2 project.
It is recommended to instantiate `CloudtasksService` in the bootstrap of your application and to never add it to the "providers" property of your components, this way you will keep it as a singleton.
If you add it to the "providers" property of a component it will instantiate a new instance of the service that won't be initialized.

```js
// component
import { Component } from '@angular/core';
import { CloudtasksService } from 'ngx-image';

@Component({
	selector: 'app',
	template: `<img [ctSrc]="'http://example.com/image.jpg'" [ctOptions]="{trim: true, smart: 'face', filters: 'blur(10):flip()'}">`
})
export class AppComponent {
	constructor(private cloudtasks: CloudtasksService) {
		// Required: set your cloudtasks.io client id
		cloudtasks.setId('YOUR_CLIENT_ID');

		// Optional: set global options
		cloudtasks.settings.options = {
			trim: false
		}
		// Optional: set global settings
		cloudtasks.settings.placeholderImage = "http://example.com/placeholderImage.jpg";
	}
}

// bootstrap
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CloudtasksModule } from 'ngx-image';

@NgModule({
  imports: [
  	BrowserModule,
  	CloudtasksModule
  ],
  declarations: [ AppComponent ], 
  bootstrap: [ AppComponent ]
})
```

## API
### CloudtasksService
#### Settings:
- `clientId`: (string) Cloudtasks.io client id
- `dev`: (boolean) Set environment to dev (default: false)
- `options`: (object) Global options for image processing ([Docs](https://cloudtasks.io/docs/image/#image))
- `photoWidths`: (array) Array of 'Ints' to be used for width approximation calculation
- `photoHeights`: (array) Array of 'Ints' to be used for height approximation calculation
- `placeholderImage`: (string) Set global placeholder image url to be used while waiting for original image (default: '')
	
#### Methods:
- `setId(id: string)`: Sets the client id
- `getSettings()`: Gets the settings

### CloudtasksDirective
- `ctSrc`: (string) (required) Sets original image url
- `ctOptions`: (object) (optional) Sets options for image processing ([Docs](https://cloudtasks.io/docs/image/#image))
- `ctPlaceholderImage`: (string) (optional) Sets placeholder image url to be used while waiting for original image
- `ctSize`: (string) (optional) Sets size for image processing (if not set we will try to check the best size automatically)
- `ctForceSize`: (boolean) (optional) Forces the exact size for image processing

Example:
```html
<img [ctSrc]="'{{imgUrl}}'" ctSize="800x600" [ctOptions]="{trim: true, smart: 'face', filters: 'blur(10):flip()'}" ctPlaceholderImage="http://example.com/placeholderImage.jpg" ctForceSize="true">
```

[npm-url]: https://npmjs.org/package/ngx-image
[npm-image]: https://badge.fury.io/js/ngx-image.svg
[travis-url]: https://travis-ci.org/Cloudtasks/ngx-image
[travis-image]: https://travis-ci.org/Cloudtasks/ngx-image.svg?branch=master
