import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MediaScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const type = (params.type as string) || 'video';
  const title = (params.title as string) || 'Media';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#7A4D3A" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.content}>
        <Ionicons
          name={type === 'video' ? 'play-circle' : type === 'audio' ? 'musical-notes' : 'document-text'}
          size={64}
          color="#B25B2A"
        />
        <Text style={styles.placeholderText}>This is a placeholder for {type} content.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9EDEF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backButton: { marginRight: 8 },
  title: { fontSize: 20, fontWeight: '700', color: '#7A4D3A' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { marginTop: 12, color: '#7A4D3A', fontWeight: '600' },
});
