import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../../components/ui/Header';

export default function ChoreographyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Choreography" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9EDEF',
    paddingTop: 20,
  },
});
