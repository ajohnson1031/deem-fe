import { WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import { _buzzAndShake } from "@/helpers";
import { FontAwesome6 } from "@expo/vector-icons";
import cn from "classnames";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import CurrencySymbol from "./CurrencySymbol";

export enum NumpadVariant {
  CONVERT = "convert",
  WITHDRAW = "withdraw",
}

interface NumberPadProps {
  variant: NumpadVariant;
  currencyType: WALLET_CURRENCY_TYPE;
}

const NumberPad: FC<NumberPadProps> = ({ variant, currencyType }) => {
  const [numpadVal, setNumpadVal] = useState<string>("0");
  const [currSizes, setCurrSizes] = useState<number[]>([35, 95]);
  const [currencyPos, setCurrencyPos] = useState<string>("bottom-3");
  const shakeRef = useRef(new Animated.Value(0)).current;

  const numBtns: string | ReactNode[][] = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "<"],
  ];

  const handleBtnPress = (btn: string) => {
    switch (btn) {
      case ".":
        if (numpadVal.includes(btn)) {
        } // noop if "." already included
        setNumpadVal(numpadVal + btn);
        break;
      case "<":
        if (numpadVal === "0") {
          _buzzAndShake(shakeRef);
          return;
        }
        if (numpadVal.length === 1) {
          setNumpadVal("0");
          return;
        }
        setNumpadVal(numpadVal.slice(0, -1));
        break;
      case "0":
        if (numpadVal === "0") {
          _buzzAndShake(shakeRef);
          return;
        }
        setNumpadVal(numpadVal + btn);
        break;
      default:
        if (numpadVal.length >= 12) return;

        if (numpadVal === "0") setNumpadVal(btn);
        else setNumpadVal(numpadVal + btn);
        break;
    }
  };

  useEffect(() => {
    if (numpadVal.toString().length > 7) {
      setCurrSizes([20, 45]);
    } else if (numpadVal.toString().length > 5) {
      setCurrSizes([30, 70]);
    } else {
      setCurrSizes([35, 95]);
    }
  }, [numpadVal]);

  return (
    <View className="flex flex-1 h-85">
      <View className="h-[90%]">
        {/* Start Numpad Output View */}
        <Animated.View
          style={[
            {
              transform: [{ translateX: shakeRef }],
            },
          ]}
          className="h-32 flex items-center justify-center my-10"
        >
          <View className="flex flex-row items-end">
            <View className={cn("relative", { "bottom-3": currSizes[1] === 95, "bottom-[5px]": currSizes[1] === 70, "bottom-0": currSizes[1] === 45 })}>
              {CurrencySymbol(currencyType)}
            </View>
            <Text
              style={[
                {
                  fontSize: currSizes[1],
                },
              ]}
            >
              {numpadVal}
            </Text>
          </View>
        </Animated.View>
        {/* End Numpad Output View */}

        <View className="flex h-[65%] justify-between">
          {numBtns.map((btnArr: any, idx: number) => (
            <View key={`btnArr_${idx}`} className="flex flex-row w-85 mx-auto justify-between">
              {btnArr.map((btn: string, idx: number) => (
                <TouchableOpacity key={`${btn}_${idx}`} onPress={() => handleBtnPress(btn)}>
                  <View className="bg-base-50 rounded-full border-2 border-base-100 w-20 h-20 flex justify-center">
                    <Text className={cn("text-3xl  text-center", { "ml-0": btn === "0" })}>
                      {/* Swap out lesser sign for icon */}
                      {btn !== "<" ? btn : <FontAwesome6 name="delete-left" size={28} color="black" />}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default NumberPad;
