import {ActivityIndicator, FlatList, Image, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColors} from "@/hooks/useThemeColors";
import {Card} from "@/components/Card";
import {PokemonCard} from "@/components/pokemon/PokemonCard";
import {useInfiniteFetchQuery} from "@/hooks/useFetchQuery";
import {getPokemonId} from "@/functions/pokemons";
import {SearchBar} from "@/components/SearchBar";
import React, {useState} from "react";
import {Row} from "@/components/Row";
import {SortButton} from "@/components/SortButton";
import {RootView} from "@/components/RootView";

export default function Index() {
    const colors = useThemeColors();
    const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery("/pokemon?limit=21");
    const pokemons = data?.pages.flatMap(page => page.results.map(
        result => ({name: result.name, id: getPokemonId(result.url)})
    )) ?? [];
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<"id" | "name">("id");
    const filteredPokemons = [...(search ?
        pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
            pokemon.id.toString() === search
        )
        : pokemons )].sort((a, b) => a[sortKey] < b[sortKey] ? -1 : 1);

    return (
        <RootView>
            <Row style={styles.header} gap={16}>
                <Image source={require('@/assets/images/pokeball.png')} width={24} height={24} />
                <ThemedText variant={"headline"} color="grayWhite">Pokédex</ThemedText>
            </Row>
            <Row gap={16} style={styles.form}>
                <SearchBar value={search} onChange={setSearch} />
                <SortButton value={sortKey} onChange={setSortKey} />
            </Row>
            <Card style={styles.body}>
                <FlatList
                    data={filteredPokemons}
                    numColumns={3}
                    contentContainerStyle={[styles.gridGap, styles.list]}
                    columnWrapperStyle={styles.gridGap}
                    ListFooterComponent={
                        isFetching ? <ActivityIndicator color={colors.tint} /> : null
                    }
                    onEndReached={search ? undefined : () => fetchNextPage()}
                    renderItem={({item}) =>
                        <PokemonCard id={item.id} name={item.name} style={{flex: 1/3}} />
                } keyExtractor={(item) => item.id.toString()} />
            </Card>
        </RootView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 12,
        paddingBottom: 8
    },
    body: {
        flex: 1,
        marginTop: 16
    },
    gridGap: {
        gap: 8
    },
    list: {
        padding: 12,
    },
    form: {
        paddingHorizontal: 12,
    }

})