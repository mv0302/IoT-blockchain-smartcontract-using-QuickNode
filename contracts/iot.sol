pragma solidity ^0.8;
// import "./AccessControl.sol";

contract iot{

    struct Information{

        int plantid;
        uint tempreature;
        uint soilMoisture;
        uint height;
        string color;

    }

    Information []inf;
  
   //add information
   function addValues(
     int plantid,uint tempreature, uint soilMoisture,
     uint height,
     string memory color
   ) public{
       Information memory e
         =Information(plantid,tempreature,soilMoisture,height,color);
       inf.push(e);
   }

    //get information using plant id
   function getValues(
     int plantid
     
   ) public view returns(
       uint temperature,
     uint soilMoisture,
     uint height,
     string memory color){
       uint i;
       for(i=0;i<inf.length;i++)
       {
           Information memory e
             =inf[i];
           
           
           if(e.plantid==plantid)
           {
                  return(e.tempreature,
                      e.soilMoisture,
                      e.height,e.color);
           }
       }
       
     
   }
}