import { Image, StyleSheet, View } from 'react-native';
import Button from '../../components/ui/Button';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';

export default function SplashScreen() {
  const navigation = useTypedNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('GoalCategory')}
        />
        <Button
          title="Already Have an account"
          onPress={() =>
            navigation.navigate('Login', { onboardingPayload: null })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 24,
    backgroundColor: '#393E46',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
  },
});
