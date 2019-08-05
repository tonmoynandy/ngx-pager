# ngx-pager

A pagination plugins for **Angular**.


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/BinsSoft/ngx-pager) [![Support](https://img.shields.io/badge/Support-Angular%202%2B-blue.svg?style=flat-square)]() [![Support](https://img.shields.io/badge/Support-Angular%204%2B-blue.svg?style=flat-square)]() [![Support](https://img.shields.io/badge/Support-Angular%205%2B-blue.svg?style=flat-square)]() [![Support](https://img.shields.io/badge/Support-Angular%206%2B-blue.svg?style=flat-square)]() [![Support](https://img.shields.io/badge/Support-Angular%207%2B-blue.svg?style=flat-square)]() [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)]()

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:

 
 - Getting started
   - [Installation](#installation)
   - [Implementation](#implementation)
   - [Settings Option](#settings-option)
- [Demo](#demo)
 - [Creators](#creator)
 - [License](#license)

##  Getting started 

### Installation

> npm install ngx-pager --save

### Implementation

import "**NgxPagerModule**" in your application module. For example: **app.module.ts**

    import {NgxPagerModule} from  'ngx-pager';
    @NgModule({
	    imports:[
		    NgxPagerModule
		    ...
	    ]
    })
    export  class  AppModule { }

add styles in your application stylesheets. For example: **styles.scss**

    @import  "~ngx-pager/themes/ngx-pager";

add configration in your component. For example : **app.component.ts**

	import {HttpClient} from  '@angular/common/http';
	
    export  class  AppComponent  implements  OnInit {
    pagerConfig: any = null;
    totalRow: any = null;
    result: Array<any> = [];
    
    constructor(private  http:  HttpClient){}
    ngOnInit() {
	   this.pagerConfig  = {
		    perPage:3,
			displayPageCount:  3,
			firstLastView:true,
			    render: (page)=> {
   					this.http.get('<API URL>')
   					.subscribe((responseData:any)=>{
   						this.totalRow = responseData.totalRows;
   						this.result = responseData.list;
   					})
   				}
   			};
   	    }
   	}

				
If want to change the url with query string after every page change, append **redirect** parameter with config.For example: url like http://localhost:4200/home?page=1

	redirect : {
	  type :'q', // q=query string
	  param : 'page'// param name
	},

If want to change the url with url parames after every page change, append **redirect** parameter with config. For example: url like http://localhost:4200/home/flag-one/1/flag-two

    redirect: {
		type :  'p',
		param: {
			path :  './home',
			name :  'page',
			params: {
			    flagOne: 'flag-one',
				page:  null,
				flagTwo: 'flag-two'
			}
	   }
	},



Add **ngx-pager** html tag in your component html. For example : **app.component.html**

    <ngx-pager  [config]="pagerConfig"  [totalrow]='totalRow'></ngx-pager>

 - **[config]** : to set the pagination configuration
 - **[totalrow]**: to set the total rows of data list


### Settings Option

|                |Description                          |Default Value                         |Required                         |
|----------------|-------------------------------|-----------------------------|-----------------------------|
|`perPage`| number of records display in every page         |            | `yes`           |
|`displayPageCount`| number of pages show in pagination panel           | 3 |            |
|`simple`| only show `next` and `prev` buttons           | false |            |
|`firstLastView`| `first` `last`  buttons will display          | false |            |
|`redirect`| redirection configuration after click on page button          |  |            |
|`redirect.type`|     page render with query string or page parameter      | `q`=query string, `p`= url params   |            `yes`|
|`redirect.param`|  if **redirect.type**=`q` name of the query string parameter. For example: http://current-url?page=1. **redirect.param**='page'      |    |    `yes`|
|`redirect.param.path`|  if **redirect.type**=`p` name of the url. for example: **redirect.param.path**='./home' |    |    `yes`(only **redirect.type**=`p`)|
| `redirect.param.name` |  if **redirect.type**=`p` name of the url params which content the page no. for example: http://current-url/{page}/{slug_1}/{slug_2}. **redirect.param.name**='page' |    |    `yes`(only **redirect.type**=`p`)|
| `redirect.param.params` |  if **redirect.type**=`p` all url params list. it's object type data. For example: **redirect.param.params** = `{ "page":null, "slug_1":"cont-1", "slug_2":"cont-2" }` |    |    `yes`(only **redirect.type**=`p`)|
| `customContent`|  to change the `prev`,`next`,`first`,`last` button html |  `{"prev":"&#10094;", "next":"&#x276F;", "first":"&#10094; &#10094;", "last":"&#x276F; &#x276F;"}`  |    |
| `render`|  event to rendering the list with paginnation |    |   `yes` |

## Demo
[Click Here](https://stackblitz.com/edit/ngx-pager) for the demo

## Creator

#### [Tonmoy Nandy](tonmoy.nandy@gmail.com)
- [@GitHub](https://github.com/tonmoynandy)

## License

#### The MIT License (MIT)