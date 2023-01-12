import React from 'react';
import '../node_modules/bootstrap-css-only/css/bootstrap.css';
import Donut from './donut.js';



export default class updates extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interval:null,
            time:null,
            title:"",
            titles:["BONOS","FX","MM","OTROS"],
            posTitle:0,
            data:[],
            remainTime:50,
            isLoaded:false,
        };
    }

    cycle ()  {
      if (this.state.posTitle===3) {
        return 0
      }else {
        return this.state.posTitle+1
      }

    }
    componentDidMount() {

     
      console.log (this.state.data);

      this.state.interval = setInterval(() => 
                                {
                                  this.setState({ time: Date.now(), 
                                    title: this.state.titles[this.state.posTitle] ,
                                    posTitle: this.cycle(),
  
                                  });
                                  

                                  fetch('/out.json')
                                    .then(res => res.json())
                                    .then(
                                            (result) => {
                                                this.setState({
                                                    isLoaded: true,
                                                    data: result.resumen
                                                          .filter((each) => each.tipo===this.state.titles[this.state.posTitle])
                                                          .map(each => [each.nom_instancia, parseInt(each.count)])
                                                });
                                                this.state.data.unshift (["INSTANCIA","OPERACIONES"]);

                                            },
                                            // Note: it's important to handle errors here
                                            // instead of a catch() block so that we don't swallow
                                            // exceptions from actual bugs in components.
                                            (error) => {
                                                        this.setState({
                                                            isLoaded: false,
                                                            data:[["prueba","salida"],["prueba",20]],
                                                            error
                                                        });
                                                      }
                                    )
                                  
                                 /* let preData =require(process.env.PUBLIC_URL +'/out.json');
                                  this.state.data= preData.resumen
                                                  .filter((each) => each.tipo===this.state.titles[this.state.posTitle])
                                                  .map(each => [each.nom_instancia, parseInt(each.count)]);
                                  this.state.data.unshift (["INSTANCIA","OPERACIONES"]);
*/
                                }, 5000);
    }
    componentWillUnmount() {
      clearInterval(this.state.interval);
    }

    

    render() {
      
        return (
            <div className="container-fluid table-scroll-vertical main">

<div className="row">
    <div className="col-sm-12">
      <div className="card">
            <div className="card-header bgdiv ">
                <h2 >Monitor de operaciones - {this.state.time}</h2>      
            </div>
            
          
      <div className="card-body ">

    
          <Donut titulo={this.state.title} datos={this.state.data} />
    
      </div>
     </div>   
    </div>
   
</div>
                    
        
 
      
<div className="progress">
  <div className="progress-bar bg-danger" role="progressbar" aria-valuenow={this.state.remainTime} aria-valuemin="0" aria-valuemax="100"></div>
</div>

            </div>


        );


    }

}