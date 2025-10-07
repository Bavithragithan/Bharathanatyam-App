import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LiveClassScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    name?: string;
    title?: string;
    experience?: string;
  }>();


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Live Class</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.liveBadge}>LIVE</Text>
        <Text style={styles.sessionTitle}>Bharatanatyam Adavus - Intermediate</Text>
        <Text style={styles.sessionMeta}>Today • 6:00 PM IST • 60 min</Text>

        {!!params?.name && (
          <View style={styles.teacherBox}>
            <Text style={styles.teacherHeading}>Teacher</Text>
            <Text style={styles.teacherName}>{params.name}</Text>
            <Text style={styles.teacherMeta}>
              {(params.title ?? 'Guru')} • {(params.experience ?? '')}
            </Text>
          </View>
        )}

        <TouchableOpacity activeOpacity={0.85} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Join via Zoom</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9EDEF',
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  backBtn: {
    width: 60,
    paddingVertical: 8,
  },
  backText: {
    color: '#B75F37',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    color: '#2A1E1F',
    fontSize: 20,
    fontWeight: '800',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  liveBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E84545',
    color: '#FFFFFF',
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  sessionTitle: {
    color: '#2A1E1F',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  sessionMeta: {
    color: '#6B5E60',
    fontSize: 13,
    marginBottom: 16,
  },
  primaryBtn: {
    backgroundColor: '#B75F37',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  teacherBox: {
    backgroundColor: '#F7EFF1',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  teacherHeading: {
    color: '#B75F37',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  teacherName: {
    color: '#2A1E1F',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
  },
  teacherMeta: {
    color: '#6B5E60',
    fontSize: 13,
  },
});


