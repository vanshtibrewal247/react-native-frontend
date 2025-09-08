import { TabActions, useTheme } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Add = () => {
  const insets=useSafeAreaInsets();
  const [data,setdata]=useState<String|null>(null);
  const navigate=useNavigation();
  const ref= useRef<TextInput>(null);
  const handler=(text:String)=>{
    setdata(text);
  }
  const saver=()=>{
    if(data==null) return;
    const bdata=data.trim();
    setdata(null)
  ref.current?.clear();
  const jumpTo=TabActions.jumpTo('Home', { task: bdata });
  navigate.dispatch(jumpTo)
  }
  const {colors}=useTheme()
  return (
    <View style={{paddingTop:insets.top,flex:1,paddingLeft:insets.left+5,position:'relative'}}>
      <View style={{width:'100%',alignItems:'center'}}><Text style={{fontSize:25,color:colors.text}}>Add</Text></View>
      <View style={{width:'100%',paddingLeft:10,marginTop:23}}><Text style={{fontSize:25,color:colors.text}}>Please add </Text></View>
      <View style={{width:'95%',borderRadius:24,marginLeft:5,height:'10%',overflow:'hidden',marginTop:10}}>
      <TextInput placeholder='Add task'  multiline={true} numberOfLines={2} style={{width:'100%',height:'100%',color:colors.text,backgroundColor:colors.card,padding:15}} ref={ref} textAlignVertical='top' placeholderTextColor={'purple'} maxLength={139} onChangeText={handler} onSubmitEditing={saver} />
      </View>

      <Pressable style={{backgroundColor:'#38E07A',position:'absolute',bottom:24,width:'95%',alignItems:'center',borderRadius:24,alignSelf:'center',paddingBlock:12}}  onPress={saver}><Text style={{fontSize:16}}>Save</Text></Pressable>
    </View>
  )
}

export default Add