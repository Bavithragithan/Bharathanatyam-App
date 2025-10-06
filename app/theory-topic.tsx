import { theoryData } from '@/data';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TheoryTopicScreen() {
    const { topic } = useLocalSearchParams();
    const router = useRouter();
    const [search, setSearch] = useState('');

    const items = theoryData[topic as keyof typeof theoryData] || [];

    const filteredItems = useMemo(() => {
        return items
            .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => a.title.localeCompare(b.title));
    }, [items, search]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>{topic}</Text>

            <TextInput
                style={styles.searchInput}
                placeholder={`Search ${topic}`}
                value={search}
                onChangeText={setSearch}
            />

            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={item.img || require('../assets/images/Theory/anjali.png')}
                            style={styles.cardImage}
                        />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.shortDesc}>
                            {item.description.length > 50
                                ? item.description.slice(0, 50) + '...'
                                : item.description}
                        </Text>
                        <TouchableOpacity
                            style={styles.learnMoreButton}
                            onPress={() =>
                                router.push({
                                    pathname: '/theory-description',
                                    params: { topic, id: item.id },
                                } as any)
                            }
                        >
                            <Text style={styles.learnMoreText}>Learn More</Text>
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9EDEF',
        padding: 16,
        paddingTop: 40,
    },
    header: {
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 12, 
        color: '#7A4D3A' 
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#BC6135',
        borderRadius: 12,
        padding: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    card: {
        flex: 1,
        backgroundColor: '#B25B2A',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        marginHorizontal: 4,
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 8,
    },
    title: { 
        fontSize: 16, 
        color: '#fff', 
        fontWeight: 'bold', 
        marginBottom: 6 
    },
    shortDesc: { 
        fontSize: 13, 
        color: '#F2DBD7', 
        marginBottom: 8 
    },
    learnMoreButton: {
        backgroundColor: '#F2DBD7',
        borderRadius: 8,
        paddingVertical: 6,
        alignItems: 'center',
    },
    learnMoreText: { 
        fontWeight: '700', 
        color: '#7A4D3A' 
    },
});