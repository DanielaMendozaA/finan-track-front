import React from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';

type ReusableFlatListProps = {
  data: any[]; 
  renderItem: (item: any) => JSX.Element; 
  keyExtractor: (item: any) => string 
  isLoading?: boolean; 
  emptyMessage?: string;
};

const ReusableFlatList: React.FC<ReusableFlatListProps> = ({
  data,
  renderItem,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No hay elementos disponibles',
}) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
});

export default ReusableFlatList;
