import { StyledProps } from "native-base";
import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";

export interface ICardInfo extends IVStackProps {
    icon: string;
    iconStyle?: StyledProps;
}