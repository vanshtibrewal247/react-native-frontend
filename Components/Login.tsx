import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { FC, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; //to solve problem when keyboard pop up
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type hello={
  setemail:any,
  setAge:any,
  setName:any
}

const Login:FC<hello> = ({setemail,setAge,setName}) => {
 const insets=useSafeAreaInsets();
 const height=insets.top;
 const [email,setEmail]=useState<String|null>(null);
 const [age,setage]=useState<Number|null>(null); 
 const [name,setname]=useState<String|null>(null);
 const handler= async ()=>{
  const emailtest=email;
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(emailtest?.match(regex)){
    let response;
    const data={
      email:email,
      name:name,
      age:age
    }
    console.log("going to call")
    try{
   response=await axios.post("http://192.168.31.103:8080/putUser",data);
   
    }
    catch(e:any){
      if(e.response.status==400){
        Alert.alert("Credentials not matching")
        return
      }
    }
  
  console.log("inside login")
  console.log(email)
  setemail(email)
  setName(name);
  setAge(age);
  }
  else{
   Alert.alert("plz enter the valid email Id","PLZ PLZ PLZ DEAR")
  }
 

 }

 const {colors}=useTheme();
 
  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex:1}} style={{flex:1}} keyboardShouldPersistTaps="handled" >
    <StatusBar style={colors.text=="rgb(28, 28, 30)"?"dark":"light"}/>

    <View style={{paddingTop:insets.top,flex:1,paddingRight:insets.right,backgroundColor:colors.background}} >
      <View style={{width:'100%',alignItems:'center',height:'7%'}}>
        <Text style={{fontSize:25,color:colors.text}}>Log In</Text>
      </View>
      <View style={{width:'100%',alignItems:'center',height:'7%',justifyContent:'flex-start'}}>
        <Text style={{fontSize:29,fontWeight:600,color:colors.text}}>Welcome Back</Text>
      </View>
      <View style={{height:"7%",width:'85%',borderRadius:15,alignSelf:'center',backgroundColor:colors.card,marginTop:30}}>
        <TextInput style={{width:'100%',fontSize:16,height:"100%",color:colors.text}} maxLength={50} placeholder='Name' inputMode='text' placeholderTextColor={"pink"} onChangeText={(text)=>setname(text)}/>
      </View>
        <View style={{height:"7%",width:'85%',borderRadius:15,alignSelf:'center',marginTop:15,backgroundColor:colors.card}}>
        <TextInput style={{width:'100%',fontSize:16,height:"100%",color:colors.text}} maxLength={100} placeholder='Age' inputMode='numeric' keyboardType='numeric'  placeholderTextColor={"pink"} onChangeText={(text)=>setage(Number(text))} />
      </View>
        <View style={{height:"7%",width:'85%',borderRadius:15,alignSelf:'center',marginTop:15,backgroundColor:colors.card}}>
        <TextInput style={{width:'100%',fontSize:16,height:"100%",color:colors.text}} maxLength={320} placeholder='Email' placeholderTextColor={"pink"}   inputMode='email' onChangeText={(text)=>setEmail(text)} />
      </View>
      <Pressable style={{alignSelf:'center',width:'80%',borderRadius:24,backgroundColor:'#38E07A',alignItems:'center',paddingBlock:10,marginTop:10}} onPress={handler}>
         <Text style={{fontSize:18,fontWeight:"800"}} >Login</Text>
      </Pressable>
      
    </View>
    </KeyboardAwareScrollView>
  )
}

export default Login