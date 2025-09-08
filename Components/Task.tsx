import { usersdata } from '@/app/Home'
import { useTheme } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import React, { FC, useState } from 'react'
import { Text, View } from 'react-native'
type tasker={
    task:string|null
}
type display={
    display:tasker
    user:usersdata|null
}



const Task:FC<display> = ({display,user}) => {
   const [isChecked, setChecked] = useState(false);
   const updater=()=>{
    setChecked((value)=>!value)
    console.log(user)
   }
   const {colors}=useTheme()
if(display.task==null){
  return;
}
  return (
    <View style={{flexDirection:'row', width:'100%',gap:25,alignItems:'flex-start',marginBottom:10}}>
     <View style={{alignItems:'center',marginBottom:4}}><Checkbox  value={isChecked} onValueChange={updater} /></View>
     <View style={{flexShrink:1,paddingRight:5}}><Text style={{fontSize:17,color:colors.text}} android_hyphenationFrequency='full' >{display.task}</Text></View>
    </View>
  )
}

export default Task