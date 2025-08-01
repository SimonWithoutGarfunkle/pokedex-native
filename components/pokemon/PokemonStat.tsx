import {type ViewProps, StyleSheet, View} from "react-native";
import { Row } from "@/components/Row";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColors} from "@/hooks/useThemeColors";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {useEffect} from "react";


type Props = ViewProps & {
    color: string,
    name: string,
    value: number
}

function statShortName(name: string): string {
    return name
        .replaceAll("special", "S")
        .replaceAll("attack", "ATK")
        .replaceAll("defense", "DEF")
        .replaceAll("speed", "SPD")
        .toUpperCase();
}

export function PokemonStat({style, color, name, value, ...rest}: Props) {
    const colors = useThemeColors();
    const sharedValue = useSharedValue(value);
    const barInnerStyle = useAnimatedStyle(() => {
        return {
            flex: sharedValue.value,
        }
        }
    );

    const barBackgroundStyle = useAnimatedStyle(() => {
        return {
            flex: 255 - sharedValue.value,
        }
        }
    );

    useEffect(() => {
        sharedValue.value = withSpring(value);

    }, [sharedValue, value]);

    return <Row gap={8} style={[style, styles.root]} {...rest} >
        <View style={[styles.name, {borderColor: colors.grayLight}]}>
            <ThemedText variant="subtitle3" style={{color: color}}>
                {statShortName(name)}
            </ThemedText>
        </View>
        <View style={styles.number}>
            <ThemedText>
                {value.toString().padStart(3, "0")}
            </ThemedText>
        </View>
        <Row style={styles.bar}>
            <Animated.View style={[styles.barInner, {flex: value, backgroundColor: color}, barInnerStyle]} />
            <Animated.View style={[styles.barBackground, {flex: 255 - value, backgroundColor: color}, barBackgroundStyle]} />
        </Row>
    </Row>;
}

const styles = StyleSheet.create({
    root: {
    },
    name: {
        width: 31,
        borderRightWidth: 1,
        borderStyle: "solid",
    },
    number: {
        width: 23
    },
    bar: {
        flex: 1,
        borderRadius: 20,
        height: 4,
        overflow: "hidden",
        width: 100,
    },
    barInner: {
        height: 4,

    },
    barBackground: {
        height: 4,
        opacity: 0.24

    }

})