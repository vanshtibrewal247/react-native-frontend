import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Image, Pressable, Switch, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usersdata } from './Home';
type helli={
  settheme:any,
  theme:any,
  email:String
}


const Setting:FC<helli> = ({settheme,theme,email}) => {
  const insets= useSafeAreaInsets();
  const ref= useRef<TextInput>(null);
  const defaultvALUE=useRef("Vansh Tibrewal")
  const [date,setdate]=useState();
  useEffect(()=>{
    async function fetcher(){
      console.log("i am in settings")
       const response =await axios.get("http://192.168.31.103:8080/getUser",{
        params:{email:email}
      })
      console.log("hi")
      console.log("i am in fetcher")
      console.log(response.data)
      let Usedata:usersdata={
        age:response.data.age,
        email:response.data.email,
        name:response.data.name,
        id:response.data.id
      }
      const creationdate=response.data.creationdate;
      console.log(creationdate)
      setdate(creationdate.split("T")[0])
    }
    fetcher();
  },[])
//  const [isEnabled,setenabled]=useState<boolean>(false);
  const {colors}=useTheme();
  const [height,setheight]=useState();
  const toggleSwitch=()=>{
   // setenabled(!isEnabled)
   const h=!theme;
   console.log(h);
    settheme(!theme)
    const f=async()=>{
      await AsyncStorage.setItem("theme",String(h))
    }
    f();

  }
   const [image, setImage] = useState<string | null>(null);
   const [isEditable,seteditable]= useState(false);
   const handler=(e:any)=>{
   const {width,height}=e.nativeEvent.layout
   setheight(width)
   }
  const pickImage = async (e:any) => {
    // No permissions requeest is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
     if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const focusser=()=>{
       seteditable(true)
     setTimeout(() => {
    ref.current?.focus();
  }, 100);
  }
  const submiiter=(e:any)=>{
    defaultvALUE.current=e.nativeEvent.text
    seteditable(false)
  }
  
  
  return (
    <View style={{paddingTop:insets.top+5 ,flex:1,paddingLeft:insets.left+10}}>
    <View style={{width:'100%',height:'10%',alignItems:'center'}}><Text style={{fontSize:25,color:colors.text}}>Settings</Text></View>
    <View style={{width:'100%',height:'24%',flexDirection:'row',gap:5}}>
    <Pressable style={{height:'100%',borderRadius:'50%',aspectRatio:1,overflow:'hidden'}} onPress={pickImage}>
     {image!==null?<Image source={{ uri: image }} resizeMode='stretch'   style={{height:'100%',width:'100%'}} />:<Image source={require('../assets/images/profile.jpeg')} resizeMode='stretch' style={{height:'100%',width:'100%'}} />}
    </Pressable>
    <View style={{width:'50%'}}>
      <TextInput defaultValue={defaultvALUE.current} textBreakStrategy="highQuality"  textAlignVertical='bottom'  style={{fontSize:22,color:colors.text,height:'50%',paddingBottom:0}} numberOfLines={3} ref={ref}  editable={isEditable}  onSubmitEditing={submiiter} blurOnSubmit={true} multiline={true} />
      <Text style={{fontSize:17,color:colors.text,paddingLeft:5}}>Joined {date} </Text>
    </View>
    </View>

    <View style={{width:'100%',height:'8%',marginTop:10,justifyContent:'center'}}><Text style={{fontSize:25,color:colors.text}}>Account</Text></View>
    <View style={{width:'100%',flex:1,alignItems:'flex-start',gap:20}}>
      <View style={{width:'100%',flexDirection:'row',gap:20}}>
      <View style={{width:'15%',height:height,borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:colors.card}} onLayout={handler}>
      <MaterialCommunityIcons name="theme-light-dark" size={25} color={colors.text} />
      </View>
     
           <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={theme ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={theme}
          style={{ transform:[{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
        </View>
            <View style={{width:'100%',height:'18%',flexDirection:'row',gap:20}}>
      <View style={{width:'15%',height:height,borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:colors.card}} onLayout={handler}>
     <MaterialCommunityIcons name="face-man-profile" size={25} color={colors.text} />
     
      </View>
      <Pressable style={{justifyContent:'center'}} onPress={focusser}><Text style={{fontSize:25,color:colors.text}}>Edit Profile</Text></Pressable>
      </View>

      

    </View>

    </View>
  )
}

export default Setting