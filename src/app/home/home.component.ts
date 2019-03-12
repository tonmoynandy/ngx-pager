import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataList:any = [
    {
      id : 1,
      name : "Tonmoy Nandy"
    },
    {
      id : 2,
      name : "Suvojit Seal"
    },
    {
      id : 3,
      name : "Puspendu Mondal"
    },
    {
      id : 4,
      name : "Subham Sarkar"
    },
    {
      id : 5,
      name : "Rajiv Ranjan"
    },
    {
      id : 6,
      name : "Subhro Sankar"
    },
    {
      id : 7,
      name : "Koushik Mondal"
    },
    {
      id : 8,
      name : "Ankur Dey"
    },
    {
      id : 9,
      name : "Sonali Nandi"
    },
    {
      id : 10,
      name : "Biplob"
    },
    {
      id : 11,
      name : "Amit Kumar"
    },
    {
      id : 12,
      name : "Ayan Ghosh"
    },
    {
      id : 13,
      name : "Rahul Roy"
    },
    {
      id : 14,
      name : "Shamik Roy"
    },
    {
      id : 15,
      name : "Kingshuk Biswas"
    },
    {
      id : 16,
      name : "Rituraj paul"
    },
    {
      id : 17,
      name : "Rajkumar Nandi"
    },
    {
      id : 18,
      name : "Rajarsi"
    },
    {
      id : 19,
      name : "Mirtunjoy "
    },
    {
      id : 20,
      name : "Shreya Mandal"
    }
  ];
  result :any = [];
  pagerConfig :any = null;
  totalRow : any = null;
  constructor() {
    
  }

  ngOnInit() {
    this.pagerConfig = {
      page : 1,
      totalRows: this.dataList.length,
      perPage:3,
      displayPageCount: 3,
      simple:false,
      firstLastView:true,
      redirect: {
        // type :'q', // q=query string / p= params,
        // param : 'page'// param name  

        type : 'p',
        param: {
          path : './home',
          name : 'page',
          params: {
            page: null
          }
        }
        
      },
      render: (page)=> {
        this.result = this.dataList.slice( (page-1)*this.pagerConfig.perPage,  (page-1)*this.pagerConfig.perPage+this.pagerConfig.perPage);
        this.totalRow = this.dataList.length;
      } 

    }
    
  }
}
