import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { RootView } from '@/components/RootView';
import { Row } from '@/components/Row';
import { ThemedText } from '@/components/ThemedText';
import { useFetchQuery } from '@/hooks/useFetchQuery';

export default function Pokemon() {
    const params = useLocalSearchParams() as { id: string };
    const {data} = useFetchQuery("/pokemon/[id]", {id: params.id});

    return <RootView>
        <Row>
            <Row>
                <Image
                    source={require('@/assets/images/back.png')}
                    width={24}
                    height={24} />
                <ThemedText variant="headline" color="grayWhite"></ThemedText>
            </Row>
            <ThemedText color="grayWhite" variant="subtitle2">#{params.id.padStart(3, "0")}</ThemedText>
        </Row>
        <Text>Pokemon {params.id}</Text>
    </RootView>
}

const styles = StyleSheet.create({
    header: {
        margin: 20,
        justifyContent: 'space-between'
    }
});

