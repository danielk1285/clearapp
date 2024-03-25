import { PressableProps } from "@typedef/native-base.types";

export interface IProfileSettingCard extends PressableProps {
    data: IProfileSettings;
    isActive: boolean;
    onToggle: () => void;
}

export interface IProfileSettings {
    title: string;
    subTitle?: string;
    leftIcon?: string;
    rightIcon?: string;
}