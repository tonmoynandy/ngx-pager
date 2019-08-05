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
      name : "Carla Houston"
    },
    {
      id : 2,
      name : "Kaitlyn Kristy"
    },
    {
      id : 3,
      name : "Sally Selcen Stochliya"
    },
    {
      id : 4,
      name : "Abigail Akon Obro"
    },
    {
      id : 5,
      name : "Candice Cromwell"
    },
    {
      id : 6,
      name : "Samantha Smith"
    },
    {
      id : 7,
      name : "Claire Divas"
    },
    {
      id : 8,
      name : "Ashley Rosa"
    },
    {
      id : 9,
      name : "Jillian Wyatt"
    },
    {
      id : 10,
      name : "Natosha Jacobs"
    },
    {
      id : 11,
      name : "Elizbeth Smith"
    },
    {
      id : 12,
      name : "Priscilla Alexis Canales"
    },
    {
      id : 13,
      name : "Crystal Waston"
    },
    {
      id : 14,
      name : "Janet Chua"
    },
    {
      id : 15,
      name : "Penny Albritton"
    },
    {
      id : 16,
      name : "Jimena Canavesi"
    },
    {
      id : 17,
      name : "Emma Megan"
    },
    {
      id : 18,
      name : "Lisa Resnick"
    },
    {
      id : 19,
      name : "Brittany Jones"
    },
    {
      id : 20,
      name : "Emma Emily"
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
      // redirect: {
      //   // type :'q', // q=query string 
      //   // param : 'page'// param name  

      //   type : 'p', // p= params,
      //   param: {
      //     path : './home',
      //     name : 'page',
      //     params: {
      //       page: null
      //     }
      //   }
        
      // },
      render: (page)=> {
        this.result = this.dataList.slice( (page-1)*this.pagerConfig.perPage,  (page-1)*this.pagerConfig.perPage+this.pagerConfig.perPage);
        this.totalRow = this.dataList.length;
      } 

    }
    
  }
}
