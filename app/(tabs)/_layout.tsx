import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="theory"
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 15,
          paddingHorizontal: 0,
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <LinearGradient
              colors={['#B8732F', '#A0522D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            />
          </View>
        ),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="theory"
        options={{
          title: 'Theory',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image 
                source={require('../../assets/images/icons/theory.png')} 
                style={[styles.iconImage, { tintColor: focused ? '#B8732F' : color }]} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="techniques"
        options={{
          title: 'Techniques',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image 
                source={require('../../assets/images/icons/techniques.png')} 
                style={[styles.iconImage, { tintColor: focused ? '#B8732F' : color }]} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image 
                source={require('../../assets/images/icons/workouts.png')} 
                style={[styles.iconImage, { tintColor: focused ? '#B8732F' : color }]} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image 
                source={require('../../assets/images/icons/community.png')} 
                style={[styles.iconImage, { tintColor: focused ? '#B8732F' : color }]} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="choreography"
        options={{
          title: 'Choreography',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image 
                source={require('../../assets/images/icons/choreography.png')} 
                style={[styles.iconImage, { tintColor: focused ? '#B8732F' : color }]} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarBackground: {
    flex: 1,
    marginHorizontal: 0,
    marginBottom: 0,
    borderRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  gradient: {
    flex: 1,
    borderRadius: 0,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeIconContainer: {
    backgroundColor: '#FFFFFF',
    transform: [{ translateY: -15 }],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 4,
    borderColor: '#B8732F',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});
