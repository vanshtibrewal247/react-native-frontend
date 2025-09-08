import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';

type hello={
  email:String
}

const History:FC<hello> = ({email}) => {
  return (
    <View style={{flex:1}} >
   <Agenda
  // The list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key has to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  markingType='custom'
  markedDates={{
    '2012-05-22':{
      customStyles: {
        container: {
          backgroundColor: 'green'
        },
        text: {
          color: 'black',
          fontWeight: 'bold'
        }
      }
  }}}
 
items={{
  '2012-05-22': [
    { name: 'item 1 - any js object', height: 50, day: '2012-05-22' }
  ],
  '2012-05-23': [
    { name: 'item 2 - any js object', height: 80, day: '2012-05-23' }
  ],
  '2012-05-24': [],
  '2012-05-25': [
    { name: 'item 3 - any js object', height: 50, day: '2012-05-25' },
    { name: 'any js object', height: 50, day: '2012-05-25' }
  ]
}}
  // Callback that gets called when items for a certain month should be loaded (month became visible)
  loadItemsForMonth={month => {
    console.log('trigger items loading');
  }}

  showOnlySelectedDayItems={true}
  // Callback that fires when the calendar is opened or closed
  onCalendarToggled={calendarOpened => {
    console.log(calendarOpened);
  }}
  // Callback that gets called on day press
  onDayPress={day => {
    console.log('day pressed');
  }}
  // Callback that gets called when day changes while scrolling agenda list
  onDayChange={day => {
    console.log('day changed');
  }}
  // Initially selected day
  selected={'2012-05-16'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2012-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2012-05-30'}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // Specify how each item should be rendered in agenda
  renderItem={(item, firstItemInDay) => {
    return(

       <View style={{ 
        backgroundColor: 'white', 
        margin: 10, 
        padding: 15, 
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 5 
      }}>
        <Text>{item.day}</Text>
        <Text>{item.name}</Text>
        {firstItemInDay && <Text style={{ fontSize: 12, color: 'gray' }}>First event of the day</Text>}
      </View>
    )
  }}
  // Specify how each date should be rendered. day can be undefined if the item is not first in that day
  // renderDay={(day, item) => {
  //   return   <Index/>
  // }}
  // Specify how empty date content with no items should be rendered
  renderEmptyDate={() => {
    return <View />;
  }}
  // Specify how agenda knob should look like

  // Override inner list with a custom implemented component

  // Specify what should be rendered instead of ActivityIndicator
  renderEmptyData={() => {
    return <View />;
  }}
  // Specify your item comparison function for increased performance
 
  // Hide knob button. Default = false
  
  // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
  showClosingKnob={true}
  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
  // markedDates={{
  //   '2012-05-16': {selected: true, marked: true},
  //   '2012-05-17': {marked: true},
  //   '2012-05-18': {disabled: true}
  // }}
  // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
  disabledByDefault={true}
  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
  onRefresh={() => console.log('refreshing...')}
  // Set this true while waiting for new data from a refresh
  refreshing={false}

  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
  refreshControl={null}
  // renderHeader={()=><Setting/>}
  // Agenda theme
  theme={{
    dayTextColor: 'rgba(239, 23, 16, 1)',
    dotColor: '#00adf5',
    agendaDayTextColor: 'yellow',
    agendaKnobColor: 'green',
     selectedDayBackgroundColor: 'hsla(320, 87%, 48%, 1.00)',
      monthTextColor: 'hsla(320, 87%, 48%, 1.00)',

    

  }
  }

/>
    </View>
  )
}

export default History