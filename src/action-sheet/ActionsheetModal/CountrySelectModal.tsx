import CustomInput from '@components/CustomInput/CustomInput';
import GradientButton from '@components/GradientButton';
import KeyboardAwareView from '@layouts/KeyboardAwareView/KeyboardAwareView';
import {CurrencyValue} from '@screens/WalletScreens/ExchangeScreen';
import colors from '@theme/colors';
import { FlatList, HStack, Image, Pressable, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ICountrySelectModal {
    selectedCountry: CurrencyValue;
    setSelectedCountry: (country: CurrencyValue) => void;
    data: CurrencyValue[];
    handleToCancel: () => void;
}

export default function CountrySelectModal({
    handleToCancel,
    data,
    selectedCountry,
    setSelectedCountry,
}: ICountrySelectModal) {
    const { width, height } = useWindowDimensions();
    const [countryData, setCountryData] = useState(data);
    const [selectedItem, setSelectedItem] = useState(selectedCountry);

    const handleSelectCountry = (item: CurrencyValue) => {
        setSelectedItem(item);
        setSelectedCountry(item);
        console.log(selectedItem)
    }

    const handleSearch = (text: string) => {
        const filteredData = data.filter((item) =>
            item.country.toLowerCase().includes(text.toLowerCase())
        );
        setCountryData(filteredData);
    }

    return (
        <VStack
            backgroundColor={colors.bg}
            w={width - 20}
            h="full"
            pb="20px"
            justifyContent="space-between">
            <CustomInput
                // title="Routing Number"
                placeholder="Search country"
                onChangeText={text => handleSearch(text)}
            />
            {data?.length > 0 ? (
                <FlatList
                    mt="4"
                    data={countryData}
                    renderItem={({ item, index }) => <Pressable onPress={() => handleSelectCountry(item)}>
                        <HStack w="full" bg="#ffffff" borderRadius="8px" my="4px" p="2" key={index} alignItems="center" justifyContent="space-between">
                            <HStack alignItems="center">
                                <Image
                                    source={{
                                        uri: item?.flag,
                                    }}
                                    alt={item.country}
                                    h="24px"
                                    w="24px"
                                    rounded={'full'}
                                    mr={2}
                                />
                                <Text fontSize="md" fontWeight={500} color={colors.black}>{item.country}, </Text>
                                <Text ml="10px" fontSize={'md'} fontWeight={500} color={colors.black}>
                                    {item.currency}
                                </Text>
                            </HStack>
                            {selectedItem?.country === item?.country ? <AntDesign name="check" size={20} color={colors.primary} /> : null}
                        </HStack>
                    </Pressable>}
                    keyExtractor={(item) => item.country}
                />
            ) : (
                <Text textAlign="center" fontSize="md">
                    Data is not available!
                </Text>
            )}
            <GradientButton onPress={handleToCancel}>Done</GradientButton>
        </VStack>
    );
}
