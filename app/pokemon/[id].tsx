import {View, StyleSheet, Image, Pressable} from 'react-native';
import {router, useLocalSearchParams} from 'expo-router';
import { RootView } from '@/components/RootView';
import { Row } from '@/components/Row';
import { ThemedText } from '@/components/ThemedText';
import { useFetchQuery } from '@/hooks/useFetchQuery';
import {Colors} from "@/constants/Colors";
import {useThemeColors} from "@/hooks/useThemeColors";
import {formatWeight, getPokemonArtwork, formatSize, basePokemonStats} from "@/functions/pokemons";
import {Card} from "@/components/Card";
import {PokemonType} from "@/components/pokemon/PokemonType";
import {PokemonSpec} from "@/components/pokemon/PokemonSpec";
import {PokemonStat} from "@/components/pokemon/PokemonStat";

export default function Pokemon() {
    const colors = useThemeColors();
    const params = useLocalSearchParams() as { id: string };
    const { data: pokemon } = useFetchQuery("/pokemon/[id]", {id: params.id});
    const { data: species } = useFetchQuery("/pokemon-species/[id]", {id: params.id});
    const mainType = pokemon?.types?.[0].type.name;
    const colorType = mainType ? Colors.type[mainType] : colors.tint;
    const types = pokemon?.types ?? [];
    const bio = species?.flavor_text_entries?.find(({language}) => language.name === "en")?.flavor_text.replaceAll("\n", " ");
    const stats = pokemon?.stats ?? basePokemonStats;

    return <RootView backgroundColor={colorType}>
        <View>
            <Image
                style={styles.pokeball}
                source={require('@/assets/images/pokeball_big.png')}
                width={208}
                height={208}
            />
            <Row style={styles.header}>
                <Pressable onPress={router.back}>
                    <Row gap={8}>
                        <Image
                            source={require('@/assets/images/back.png')}
                            width={32}
                            height={32} />
                        <ThemedText variant="headline" color="grayWhite" style={{textTransform: "capitalize"}}>{pokemon?.name}</ThemedText>
                    </Row>
                </Pressable>
                <ThemedText color="grayWhite" variant="subtitle2">
                    #{params.id.padStart(3, "0")}
                </ThemedText>
            </Row>
            <View style={styles.body}>
                <Image
                    style={styles.artwork}
                    source={{uri: getPokemonArtwork(params.id)}}
                    width={200}
                    height={200}
                />
                <Card style={styles.card}>
                    <Row gap={16} style={{height: 20}}>
                        {types.map((type) => <PokemonType name={type.type.name} key={type.type.name} />)}
                    </Row>
                    <ThemedText variant="subtitle1" style={{color: colorType }}>About</ThemedText>
                    <Row>
                        <PokemonSpec
                            style={{borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight}}
                            title={formatWeight(pokemon?.weight)}
                            description="Weight"
                            image={require('@/assets/images/weight.png')}
                        />
                        <PokemonSpec
                            style={{borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight}}
                            title={formatSize(pokemon?.height)}
                            description="Size"
                            image={require('@/assets/images/straighten.png')}
                        />
                        <PokemonSpec
                            title={pokemon?.moves
                                .slice(0, 2)
                                .map((m) => m.move.name)
                                .join("\n")}
                            description="Moves"
                        />
                    </Row>
                    <ThemedText>{bio}</ThemedText>
                    <ThemedText variant="subtitle1" style={{color: colorType }}>Base stats</ThemedText>
                    <View style={{alignSelf: "stretch"}}>
                        {stats.map(
                            stat => <PokemonStat
                                key={stat.stat.name}
                                color={colorType}
                                value={stat.base_stat}
                                name={stat.stat.name}
                            />)}
                    </View>
                </Card>
            </View>
        </View>
    </RootView>
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 20,
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
    pokeball: {
        position: 'absolute',
        top: 8,
        right: 8,
        opacity: 0.2
    },
    artwork: {
        position: 'absolute',
        top: -140,
        alignSelf: 'center',
        zIndex: 2
    },
    body: {
        marginTop: 144
    },
    card: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        gap: 16,
        alignItems: 'center',
    }
});

