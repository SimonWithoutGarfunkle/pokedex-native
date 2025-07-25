import {type ImageSourcePropType, ViewProps, View, StyleSheet, Image} from "react-native";
import {Row} from "@/components/Row";
import {ThemedText} from "@/components/ThemedText";


type Props = ViewProps & {
    title?: string,
    description?: string,
    image?: ImageSourcePropType
}

export function PokemonSpec({title, description, image, style, ...rest}: Props) {
    return <View style={[style, styles.root]} {...rest}>
        <Row style={styles.row}>
            {image && <Image source={image} width={16} height={16} />}
            <ThemedText
                style={description === "Moves" ? {textTransform: "capitalize"} : {}}
            >
                {title}
            </ThemedText>
        </Row>
        <ThemedText variant="caption" color="grayMedium">{description}</ThemedText>
    </View>

}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        gap: 4,
        alignItems: "center",

    },
    row: {
        height: 32,
        alignItems: "center",
    }

})