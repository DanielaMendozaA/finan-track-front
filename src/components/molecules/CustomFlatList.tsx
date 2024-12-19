import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

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

    const theme = useTheme()
    const styles = createStyles(theme)

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const empyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text
          style={styles.emptyText}
        >{emptyMessage}</Text>
      </View>
    );

  }


  return (
    <FlatList
      ListEmptyComponent={empyComponent}
      data={data || []}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    height: 300,
    borderRadius: 30,
    padding: 20
  },
  emptyText: {
    color: theme.colors.text,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '300'
  }
});

export default ReusableFlatList;
