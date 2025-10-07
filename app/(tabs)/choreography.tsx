import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/ui/Header';

export default function ChoreographyScreen() {
  const router = useRouter();
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<
    null | { name: string; title: string; experience: string; bio: string }
  >(null);

  const teachers: { name: string; title: string; experience: string; bio: string }[] = [
    {
      name: 'Smt. Ananya Iyer',
      title: 'Senior Guru',
      experience: '15+ years teaching',
      bio:
        'Ananya Iyer is a senior Bharatanatyam guru specializing in Nritta and Abhinaya. She has choreographed award-winning pieces and trained students worldwide.',
    },
    {
      name: 'Sri. Karthik Subramanian',
      title: 'Choreographer',
      experience: '12 years stage performance',
      bio:
        'Karthik focuses on rhythm-centric choreography and has led ensemble productions across India and abroad.',
    },
    {
      name: 'Smt. Meera Krishnan',
      title: 'Guru & Mentor',
      experience: '20 years mentoring',
      bio:
        'Meera emphasizes technique with expression and has mentored numerous arangetrams and solo recitals.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#FFF3EE", "#FFE6DB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      <Header title="Choreography" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionCard}>
          <BlurView pointerEvents="none" intensity={30} tint="light" style={styles.blurFill} />
          <Text style={styles.sectionLabel}>Live Class</Text>
          <Text style={styles.liveSubtitle}>Next session: Today, 6:00 PM IST</Text>
          <View style={styles.liveRow}>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
            <Text style={styles.liveStatus}>Bharatanatyam Adavus - Intermediate</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.joinButton}
            onPress={() =>
              router.push({
                pathname: '../live-class',
                params: {
                  name: (selectedTeacher?.name ?? teachers[0].name),
                  title: (selectedTeacher?.title ?? teachers[0].title),
                  experience: (selectedTeacher?.experience ?? teachers[0].experience),
                },
              })
            }
          >
            <Text style={styles.joinButtonText}>Join Class</Text>
          </TouchableOpacity>
        </View>

        {teachers.map((t) => (
          <TouchableOpacity
            key={t.name}
            activeOpacity={0.85}
            style={styles.sectionCard}
            onPress={() => {
              setSelectedTeacher(t);
              setIsAboutVisible(true);
            }}
          >
            <BlurView pointerEvents="none" intensity={30} tint="light" style={styles.blurFill} />
            <Text style={styles.sectionLabel}>Teacher</Text>
            <Text style={styles.teacherName}>{t.name}</Text>
            <Text style={styles.mutedText}>{t.title} • {t.experience}</Text>
            <Text style={styles.linkText}>About teacher</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.joinButton, { marginTop: 10 }]}
              onPress={() =>
                router.push({
                  pathname: '../live-class',
                  params: {
                    name: t.name,
                    title: t.title,
                    experience: t.experience,
                  },
                })
              }
            >
              <Text style={styles.joinButtonText}>Join Class</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        
      </ScrollView>

      <Modal
        visible={isAboutVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsAboutVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>About {selectedTeacher?.name}</Text>
            {!!selectedTeacher && (
              <Text style={styles.modalBody}>
                {selectedTeacher.bio}
              </Text>
            )}
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.closeButton, { flex: 1 }]}
                activeOpacity={0.8}
                onPress={() => setIsAboutVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <View style={{ width: 12 }} />
              <TouchableOpacity
                style={[styles.joinButton, { flex: 1 }]}
                activeOpacity={0.8}
                onPress={() => {
                  if (selectedTeacher) {
                    setIsAboutVisible(false);
                    router.push({
                      pathname: '../live-class',
                      params: {
                        name: selectedTeacher.name,
                        title: selectedTeacher.title,
                        experience: selectedTeacher.experience,
                      },
                    });
                  }
                }}
              >
                <Text style={styles.joinButtonText}>View Live Class</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9EDEF',
    paddingTop: 20,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 16,
    paddingBottom: 120,
  },
  sectionCard: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  blurFill: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionLabel: {
    color: '#7A3E4A',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  teacherName: {
    color: '#2A1E1F',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  mutedText: {
    color: '#6B5E60',
    fontSize: 13,
  },
  linkText: {
    color: '#B8732F',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },
  liveSubtitle: {
    color: '#2A1E1F',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  liveBadge: {
    backgroundColor: '#E84545',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  liveStatus: {
    color: '#443235',
    fontSize: 14,
    flexShrink: 1,
  },
  joinButton: {
    backgroundColor: '#B75F37',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    color: '#2A1E1F',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  modalBody: {
    color: '#443235',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#B75F37',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
});
