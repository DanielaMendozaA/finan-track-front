import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import CustomButton from "./CustomTouchableButton";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ConditionalDatePicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleShowPicker = () => setShowPicker(true);

  const handleChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <View>
      <Text
        style={{color: 'red'}}
      >Fecha inicio:</Text>
      <CustomButton title= {
        selectedDate?.toLocaleDateString() ||  new Date().toISOString().split('T')[0]}
        onPress={handleShowPicker}
        iconName="arrow-drop-down"
        size={30}
        IconComponent={MaterialIcons}
        
        />
    

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="spinner"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default ConditionalDatePicker;
