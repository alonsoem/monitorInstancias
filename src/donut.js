import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Operaciones por instancia",
  pieHole: 0.4,
  is3D: true,
  pieSliceText: 'value',
};

export default function Donut({titulo,datos}) {

  
  
  return (

    <div className="card">
      <div className="card-header bgdiv ">
          <h2 >{titulo}</h2>      
      </div>
    
  
      <div className="card-body ">
 
        <Chart
           chartType="PieChart"
            width="100%"
            height="800px"
            data={datos}
            options={options}
          />

      </div>
    </div>   
  );
}
