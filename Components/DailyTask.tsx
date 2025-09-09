import { usersdata } from '@/app/Home';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
type hello={
    title:string,
    icon:React.JSX.Element,
    sub:string
}
type DailyTaskProps = {
  display: hello;
  user: usersdata|null// 👈 wrap hello inside display
};
let width=0;

const DailyTask:FC<DailyTaskProps> = ({display,user}) => {
    const [isChecked,setChecked]=useState(false);
    const {colors}=useTheme()
    useEffect(()=>{
      async function getInitialValue(){
         const today = new Date().toISOString().split("T")[0]; 
         console.log("hello dear")
         console.log("the id of user is " + user?.id)
        const response=await axios.get(`http://192.168.31.103:8080/${display.title}`,{
          params:{id:user?.id,date:today}
        })
        console.log("bye dear")
        
        setChecked(response.data)

      }
      console.log("in daily task")
      getInitialValue();

    },[user])
    const [width,setwidth]=useState();
    const [height2,setheigth2]=useState();
    const [height,setheight]=useState(12);
    const calc=(e:any)=>{
     const {width,height}=e.nativeEvent.layout
     setheight(width);
    }
    const hello=(e:any)=>{
    const {width,height}=e.nativeEvent.layout
    setheigth2(height);
    setwidth(width)
    }
    const updater=()=>{
     const today = new Date().toISOString().split("T")[0]; 
    setChecked((value)=>{
     const newValue=!value;
    async function dbupdate(){
      console.log("in")
      const response =await axios.put("http://192.168.31.103:8080/updateItem",{},{
        params:{value:display.title,user:user?.id,date:today,bool:newValue}
      });
      console.log("out")
    }
    dbupdate()
    return newValue

    });
    
    // async function dbupdate(){
    //   console.log("in")
    //   const response =await axios.put("http://192.168.31.103:8080/updateItem",{},{
    //     params:{value:display.title,user:user?.id,date:today,bool:isChecked}
    //   });
    //   console.log("out")
    // }
    // dbupdate()
   }

  return (
    <View style={{flexDirection:'row',width:'100%',gap:10,marginBottom:20}}>
      <View style={{width:'15%',backgroundColor:colors.card,alignItems:'center',borderRadius:10,height:height,justifyContent:'center'}} onLayout={calc}>
        {display.icon}
      </View>
      <View style={{width:'70%',justifyContent:'space-around'}}>
        <Text style={{fontSize:20,color:colors.text}}>{display.title}</Text>
        <Text style={{fontSize:15,transform:[{translateY:-4}],color:colors.primary}}>{display.sub}</Text>
      </View>
      <View style={{width:'15%',justifyContent:'center'}} >
        <Checkbox  style={{width:23,height:23}}value={isChecked} onValueChange={updater} />
      </View>
    </View>
  )
}

export default DailyTask