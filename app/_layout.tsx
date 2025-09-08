import Login from '@/Components/Login';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, DefaultTheme, ThemeProvider, useTheme } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import Add from "./Add";
import History from "./History";
import Home from "./Home";
import Setting from "./Setting";
 const Tab=createBottomTabNavigator();
 const darkTheme={
  ...DarkTheme,
  colors: {
    primary: '#9EB8A8',
    background: '#121714',
    card: '#29382E',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  }
  
 }
 const lighttheme={
  ...DefaultTheme,
  colors: {
    primary: '#638773',
    background: 'rgb(242, 242, 242)',
    card: '#F0F5F2',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  }

 }

export default function RootLayout() {
  const [theme,settheme]=useState<boolean>(false);
const [email,setEmail]=useState<String|null>(null);
 const [age,setAge]=useState<Number|null>(null);
 const [name,setname]=useState<String|null>(null);
  const {colors}=useTheme();
  useEffect(()=>{
  const themesetter=async()=>{
    const g=( await AsyncStorage.getItem("theme"));
   
     if (g !== null) {
      settheme(g === "true");   // correct boolean conversion
    }
    
  }
  themesetter()

  },[])
  if(email==null || age==null || name==null){
    return(
      <ThemeProvider value={theme?lighttheme:darkTheme}><Login setemail={setEmail} setAge={setAge} setName={setname}/></ThemeProvider>
    )
  }
  else{
// background color automatic by ThemeProvider
  return(
  <ThemeProvider value={theme?lighttheme:darkTheme}>
  <StatusBar style={colors.text=="rgb(28, 28, 30)"?"light":"dark"}/>
  <Tab.Navigator screenOptions={{ headerShown:false,animation:'shift'}}>
    <Tab.Screen name="Home"  options={{tabBarIcon:()=><Entypo name="home" size={24} color={theme?lighttheme.colors.text:darkTheme.colors.text} />}}>
   {()=><Home email={email}/>}
    </Tab.Screen>
    <Tab.Screen name="Add" component={Add} options={{tabBarIcon:()=><Entypo name="add-to-list" size={24} color={theme?lighttheme.colors.text:darkTheme.colors.text} />}}/>
    <Tab.Screen name="History" options={{tabBarIcon:()=><FontAwesome5 name="history" size={24} color={theme?lighttheme.colors.text:darkTheme.colors.text} />}}>
     {()=><History email={email}/>}
    </Tab.Screen>
    <Tab.Screen name="Settings" options={{tabBarIcon:()=><Feather name="settings" size={24} color={theme?lighttheme.colors.text:darkTheme.colors.text} />}}>
          {() => <Setting settheme={settheme} theme={theme} email={email} />}
     </Tab.Screen>
   
  </Tab.Navigator>
  </ThemeProvider>
  

  )
}
}
