import { Component,  Output, Input, EventEmitter , OnChanges, SimpleChanges} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-pager',
  templateUrl:'./ngx-pager.component.html',
  styleUrls: ['./ngx-pager.component.scss']
})
export class NgxPagerComponent implements OnChanges {

  @Input() config: any = null; // set the config
  @Input() totalrow = null;
  // @Output('page') page = new EventEmitter();
  pages : Array<any> = []; // get pages
  currentPage : number = 1; // for current page no
  displayPagesCount: number = 3; // set no of display page 
  totalPage: number = 1; // get the total page
  simple:boolean = false; // to set only next and prev link
  firstLastView: boolean = false; // to set that last first button will display or not
  error : boolean = false;
  redirectType: string = '';
  redirectParamName: string = '';

  customContent: any = {
    "prev":"&#10094;",
    "next":"&#x276F;",
    "first":"&#10094;&#10094;",
    "last":"&#x276F;&#x276F;",
  }


  /* Function Name : constructor
	* Author : 
	* Created Date : 06-03-2019 
	* Modified Date : *
	* Purpose : to define the all helpful objects and defin the languages data
	* PARAMS : cService, modalService, translate
	*/
  constructor(private route: Router, private activeRoute: ActivatedRoute) {}
  /* Function Name : ngOnInit
	* Author : 
	* Created Date : 06-03-2019 
	* Modified Date : *
	* Purpose : to get data after html load
	* PARAMS : 
	*/
  ngOnInit() {
    
    if (localStorage.getItem('_nxp') && this.config && !this.config.redirect) {
          
      let localUrl = localStorage.getItem('_nxp');
      let localUrlArr = localUrl.split(":");
      if (localUrlArr[0] == this.route.url) {
        this.currentPage = Number(localUrlArr[1]);
      }
      this.rendering();
    } 
    else if (!localStorage.getItem('_nxp') && this.config && !this.config.redirect) {
      localStorage.setItem('_nxp', this.route.url+':'+this.currentPage);
      this.rendering();
    }
    else if(this.config && this.config.redirect){
      localStorage.removeItem("_nxp");
      if (!this.config.redirect.type) {
        console.error("'type' parameter must be set with 'redirect' parameter");
        this.error = true;
        return false;
      }
      if (!this.config.redirect.param) {
        console.error("'param' parameter must be set with 'redirect' parameter");
        this.error = true;
        return false;
      }
      if (!this.error) {
          let activeRouteObj =  null;
          if (this.config.redirect.type === 'q') { // query string
            activeRouteObj = this.activeRoute.queryParams;
            this.redirectParamName = this.config.redirect.param;
          } else if (this.config.redirect.type === 'p') { // query parameters
            this.redirectParamName = this.config.redirect.param.name;
            activeRouteObj = this.activeRoute.params;
          }

          activeRouteObj.subscribe(params => {
            if (params[this.redirectParamName]) {
              this.currentPage = parseInt(params[this.redirectParamName]);
            } 
            this.rendering();
          })
      }
    }
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.totalrow && this.totalrow)  {
      this.settings();
    }
  }
  settings() {
    if (this.config) {
      
      if (this.config.firstLastView) {
        this.firstLastView = this.config.firstLastView;
      }
      if (this.config.simple) {
        this.simple = this.config.simple;
      }
      if (this.config.displayPageCount) {
        this.displayPagesCount = this.config.displayPageCount;
      }

      if (this.config.customContent) {
        if (this.config.customContent.prev) {
          this.customContent.prev = this.config.customContent.prev;
        }
        if (this.config.customContent.next) {
          this.customContent.next = this.config.customContent.next;
        }
        if (this.config.customContent.first) {
          this.customContent.first = this.config.customContent.first;
        }
        if (this.config.customContent.last) {
          this.customContent.last = this.config.customContent.last;
        }
      }
      
      if (this.error === false && this.totalrow && this.config.perPage) {
        this.totalPage = this.totalrow/this.config.perPage;
        if (this.totalPage%1 != 0) {
          this.totalPage +=1;
          this.totalPage = Math.floor(this.totalPage);
        }
      } else {
        if (!this.totalrow) {
          console.error("'totalrow' parameter must be set");
          this.error = true;
          // return false;
        }
        if (!this.config.perPage) {
          console.error("'perPage' parameter must be set");
          this.error = true;
          // return false;
        }
      }
      
      if (this.error === false && this.displayPagesCount > this.totalPage) {
        this.displayPagesCount = this.totalPage;
      }
      if (this.error === false) {
        this.redefinePager();
      }
     
      
    } else {
      console.error("define 'config' parameters of ngx-pager");
      this.error = true;
      return false;
    }
  }
  /* Function Name : pageClick
	* Author : 
	* Created Date : 06-03-2019 
	* Modified Date : *
	* Purpose : event for click on page
	* PARAMS : pageNo
	*/
  pageClick(event, pageNo) {
    this.currentPage = pageNo;
    // console.log(this.currentPage);
    this.redefinePager();
    if (!this.config.redirect) {
      localStorage.setItem('_nxp', this.route.url+':'+this.currentPage);
      this.rendering();
      
    } else {
      let navigateConfig = {
        relativeTo: this.activeRoute
      }
      if (this.config.redirect.type === 'q') {
        navigateConfig['queryParams'] = {};
        navigateConfig['queryParams'][this.redirectParamName] = this.currentPage;
        navigateConfig['queryParamsHandling'] = 'merge';
        this.route.navigate([], navigateConfig);  
      } else if (this.config.redirect.type === 'p') {
        if (this.config.redirect.param.path) {
          let navigate = [this.config.redirect.param.path];
          for (let p in this.config.redirect.param.params) {
            if (p===this.redirectParamName) {
              navigate.push(this.currentPage);
            } else {
              navigate.push(this.config.redirect.param.params[p]);
            }
          }
          this.route.navigate(navigate);
        } else {
          console.error("'url' parameter must be set with 'config.redirect'");
          this.error = true;
          return false;
        }
        
      }
      
    }
  }
  /* Function Name : redefinePager
	* Author : 
	* Created Date : 06-03-2019 
	* Modified Date : *
	* Purpose : to create pagination html
	* PARAMS : 
	*/
  redefinePager() {
      this.pages = [];
      this.pages.push(this.currentPage);
      let leftCount = 0;
      let rightCount = 0;
      if (this.displayPagesCount%2 == 0) { // if even display number count
        leftCount = Math.floor(this.displayPagesCount/3); // one thard in left
        rightCount = Math.floor((this.displayPagesCount*2)/3); // two thard in right
        if (this.displayPagesCount%6 == 0) {
          leftCount -=1;
        }
      } else { // if odd display number count 
        leftCount = Math.floor((this.displayPagesCount-1)/2); // half in left
        rightCount = Math.floor((this.displayPagesCount-1)/2); // half in right
        
      }
      let leftArr=[], rightArr=[];
      for (let p=1; p<=leftCount; p++) {
        if ((this.currentPage-p) > 0 ) {
          leftArr.push(this.currentPage-p);
        }
      }
      if (leftArr.length < leftCount) {
        rightCount += leftCount-leftArr.length; 
      }
      for (let p=1; p<=rightCount; p++) {
        if (this.currentPage+p <= this.totalPage) {
          rightArr.push(this.currentPage+p);
        }
      }
      if (rightArr.length < rightCount) {
        leftCount += rightCount - rightArr.length  ;
        leftArr = [];
        for (let p=1; p<=leftCount; p++) {
          if ((this.currentPage-p) > 0 ) {
            leftArr.push(this.currentPage-p);
          }
        }
      }
      this.pages = this.pages.concat(leftArr);
      this.pages = this.pages.concat(rightArr);
      
      this.pages.sort((a, b) => a - b);

  }


  rendering() {
    setTimeout(()=>{
      this.config.render(this.currentPage);
    },5)
  }
}
