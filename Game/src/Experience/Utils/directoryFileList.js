import axios from 'axios';
export const  getData = async ()=>{
  var fileNames=[];
await axios.get('http://localhost:3000/directory')
    .then(data => {
data=data.data
        console.log(data);
let Object={}
data.forEach(element => {
  Object.name=element.slice(0,element.length-4);
  Object.type="fbx"
  Object.path="/models/FightingGame/Player/Animations/"   +element;
  fileNames.push(Object) 
  Object={};
});

    })
    .catch(error => {
      console.error('Error:', error);
    });
    return   fileNames;
}