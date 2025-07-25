import { TextInput, Image } from "react-native";
import {Row} from "@/components/Row";
import {useThemeColors} from "@/hooks/useThemeColors";

type Props = {
    value: string,
    onChange: (value: string) => void
}

export function SearchBar({value, onChange}: Props) {
    const colors = useThemeColors();
    return <Row
        gap={8}
        style={[styles.wrapper, {backgroundColor: colors.grayWhite}]}>
        <Image
            source={require('@/assets/images/search.png')}
            width={16}
            height={16}
        />
        <TextInput
            style={[styles.input]}
            onChangeText={onChange}
            value={value}
            placeholder="Search Pokemon"
        />
    </Row>
}

const styles = {
    wrapper: {
        flex: 1,
        borderRadius: 16,
        height: 38,
        paddingHorizontal: 12
    },
    input: {
        flex: 1,
        fontSize: 14,
        lineHeight: 16,
    }
}