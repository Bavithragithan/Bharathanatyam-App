import { theoryData } from '@/data';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TheoryDescriptionScreen() {
    const { topic, id } = useLocalSearchParams();
    const router = useRouter();
    const [completed, setCompleted] = useState(false);

    const item = theoryData[topic as keyof typeof theoryData]?.find(i => i.id === id);

    if (!item) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Item not found.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.headerRow}>
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{item.title}</Text>
                </View>

                {item.img && (
                    <Image
                        source={item.img}
                        style={styles.image}
                        resizeMode="cover"
                    />
                )}

                {/* Notes */}
                <Text style={styles.description}>{item.notes}</Text>

                {/* Complete button */}
                <TouchableOpacity
                    style={[styles.completeButton, completed && styles.completeButtonDone]}
                    onPress={() => setCompleted(true)}
                >
                    <Text style={styles.completeButtonText}>
                        {completed ? 'Completed ✔' : 'Mark as Complete'}
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9EDEF',
        paddingTop: 40,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    backButton: { 
        marginRight: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#7A4D3A',
        flexShrink: 1,
        paddingLeft: 8,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    description: {
        fontSize: 16, 
        color: '#333', 
        marginBottom: 24 
    },
    completeButton: {
        backgroundColor: '#BC6135',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    completeButtonDone: { 
        backgroundColor: 'green' 
    },
    completeButtonText: { 
        color: '#fff', 
        fontWeight: 'bold' 
    },
});
