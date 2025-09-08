import DailyTask from '@/Components/DailyTask';
import Task from '@/Components/Task';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RouteProp, useFocusEffect, useRoute, useTheme } from '@react-navigation/native';
import axios from 'axios';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
type Task = { task: string | null };

//const data=[{title:"Mediate",icon:<Entypo name="tree" size={32} color="black" />,sub:"Morning"},{title:"Read",icon:<FontAwesome5 name="readme" size={32} color="black" />,sub:'Afternoon'},{title:"Exercise",icon:<FontAwesome5 name="dumbbell" size={32} color="black" />,sub:"Evening"}]
// const task=[{task:'The number 120 is written as "One hundred twenty" in words and is a cardinal number used for counting quantities and expressing measurements. Its a whole, even, and natural number that is crucial in daily communication, such as on bank forms or when discussing amounts of money or items. '},{task:"To do dance"},{task:"To do dance"},{task:"To do dance"},{task:"To do dance"},{task:"To do dance"},{task:"To do dance"},{task:"To do dance"},{task:"To do dance"},{task:"To do dance"}];
//let task:Task[]=[{task:null}];

type RouteParams = {
  task: string | null;
};
type home={
  email:String
}
export type usersdata={
  age:Number,
  email:String,
  name:String,
  id:Number

}


const Home:FC<home> = ({email}) => {
    const insets= useSafeAreaInsets();
    let [task,settask]=useState<Task[]>([{task:null}])
   const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
   const [userdata,setdata]=useState<usersdata|null>(null);
   useEffect(()=>{
     async function hello(){
      console.log("hello")
      console.log(email)
      const response =await axios.get("http://192.168.31.103:8080/getUser",{
        params:{email:email}
      })

      console.log("hi")
      console.log(response.data)
      let Usedata:usersdata={
        age:response.data.age,
        email:response.data.email,
        name:response.data.name,
        id:response.data.id
      }
      const date=new Date();
       const today = new Date().toISOString().split("T")[0];
      const response2=await axios.get("http://192.168.31.103:8080/initizeItem",{
        params:{id:response.data.id,date:today}
      })

      console.log(Usedata)
      setdata(Usedata)
     }
     hello();
   },[])

   // useRoute also causes re-render when navigate calls
    
   const tasker=(route.params);
  // console.log(typeof tasker)

    useFocusEffect(
    useCallback(() => {
        if(tasker!==undefined){
    const notif=()=>{
Toast.show({
      type: 'success',
      text1: 'Saved Successfully',
    });
  }
  
 settask((task)=>[...task,tasker])
 notif();
   }
      // Cleanup function runs when screen loses focus
      return () => {
        Toast.hide(); // hide toast when navigating away
      };
    }, [tasker])
  );
//   useEffect(()=>{
//    if(tasker!==undefined){
//     const notif=()=>{
// Toast.show({
//       type: 'success',
//       text1: 'Saved Successfully',
//     });
//   }
  
//  settask((task)=>[...task,tasker])
//  notif();
//    }
  
//   },[tasker])

    const tabbarheight=useBottomTabBarHeight();
    
    const {colors} = useTheme();
    const data=[{title:"Mediate",icon:<Entypo name="tree" size={32} color={colors.text} />,sub:"Morning"},{title:"Read",icon:<FontAwesome5 name="readme" size={32} color={colors.text} />,sub:'Afternoon'},{title:"Exercise",icon:<FontAwesome5 name="dumbbell" size={32} color={colors.text} />,sub:"Evening"}]
 
  return (
    <ScrollView style={{paddingTop:insets.top,paddingLeft:insets.left+2}} contentContainerStyle={{paddingBottom:tabbarheight/2}}>
     <View style={style.parent}>
        <View style={{width:'70%',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:25,color:colors.text}}>Today</Text></View>
        
        <Pressable style={{alignItems:"flex-end"}}>
            <Text style={{fontSize:30,color:colors.text}}>+</Text>
        </Pressable>
     </View>
     <View style={{padding:12}}><Text style={{fontSize:22,color:colors.text}}>Habits</Text></View>
     
     <FlatList style={{height:"35%",width:'100%',paddingLeft:12}} data={data} scrollEnabled={false} keyExtractor={(item,index)=>String(index)} renderItem={({item})=><DailyTask display={item} user={userdata}/>}/>
      <View style={{padding:12}}><Text style={{fontSize:22,color:colors.text}}>To-Dos</Text></View>
      <View style={{width:'100%',paddingLeft:12}}>
        {task.map((value,index)=>(
          <Task display={value} key={index} user={userdata}/>
        ))}
      </View>
      {/* <FlatList data={task} style={{width:'100%',paddingLeft:12}} keyExtractor={(item,index)=>String(index)} renderItem={({item})=><Task display={item}/>}/> */}
      <Toast/>
    </ScrollView>
  )
}
const style=StyleSheet.create({
    parent:{
        width:'100%',
        justifyContent:"space-evenly",
       
        flexDirection:'row',
        paddingBlock:12,
        marginInline:12,
        gap:2

    }
})

export default Home