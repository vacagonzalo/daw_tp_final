interface DeviceInt{
    id:string;
    name:string;
    description:string;
    state:string;
    type:number;
}

class Main implements GETResponseListener, EventListenerObject, 
    POSTResponseListener
{ 
    myf:MyFramework;
    view:ViewMainPage;

    handleEvent(evt:Event):void
    {
        let element: HTMLElement = this.myf.getElementByEvent(evt);
        console.log(`click en elemento: ${element.id}`);
        switch (element.id) {
            case "btn-todos":
                this.myf.requestGET("devices",this);
                break;
            case "btn-lamparas":
                this.myf.requestGET("lamps",this);
                break;
            case "btn-persianas":
                this.myf.requestGET("blinds",this);
                break;
            default:
                let data:object = 
                    {"id":element.id,
                    "state":this.view.getSwitchStateById(element.id)};
                this.myf.requestPOST("devices",data,this);
        }
    }

    handleGETResponse(status:number,response:string):void{
      if(status==200)
      {
          console.log(response);
          let data:DeviceInt[] = JSON.parse(response);
          console.log(data);
          this.view.showDevices(data);    
          
          for(let i in data)
            this.myf.configClick(`dev_${data[i].id}`,this);      
    
      }
    }

    handlePOSTResponse(status:number,response:string):void{
        if(status==200)
        {
            console.log(response);
        }
    }

    main():void 
    { 
      this.myf = new MyFramework();

      this.view = new ViewMainPage(this.myf);

      this.myf.requestGET("devices",this);

      this.myf.configClick("btn-todos",this);
      this.myf.configClick("btn-lamparas",this);
      this.myf.configClick("btn-persianas",this);
    } 
} 
 
window.onload = () => {
    let obj = new Main(); 
    obj.main();
};
 

