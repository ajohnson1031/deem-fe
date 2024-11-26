import { WalletActivity } from "@/state/wallet";
import dayjs from "dayjs";
import { Animated, Vibration } from "react-native";
/**
 * Capitalize the first letter of a strong
 */
const capitalize = (str: string) => {
  return str.replace(/^./, (match) => match.toUpperCase());
};

/**
 * Splits a date object into formatted date and time parts
 */
const getDateParts = (dateTime: string) => {
  const [date, time] = dayjs(dateTime).format("MMM. DD, YYYY|h:ssa").split("|");
  return [date, time];
};

export type SectionListData = {
  title: string; // Month and Year as string
  data: WalletActivity[]; // Array of wallet activity items
};

/**
 * Groups wallet activity data by month and year for use with SectionList
 */
const groupWalletActivityByMonthAndYear = (data: WalletActivity[]): SectionListData[] => {
  // Helper function to format a date to "Month Year"
  const getMonthYear = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Create a map to group items by month and year
  const groupedData: Record<string, WalletActivity[]> = data.reduce((acc, item) => {
    const monthYear = getMonthYear(item.dateTime);
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(item);
    return acc;
  }, {} as Record<string, WalletActivity[]>);

  // Convert the map to an array of section objects
  return Object.entries(groupedData).map(([title, data]) => ({
    title,
    data,
  }));
};

const getSectionTitles = (sections: SectionListData[]) => {
  const titles = ["All"];
  sections.forEach((section) => titles.push(section.title));
  return titles;
};

const _shakeAnimation = (ref: Animated.Value) => {
  Animated.sequence([
    Animated.timing(ref, {
      toValue: 5,
      duration: 20,
      useNativeDriver: true,
    }),
    Animated.timing(ref, {
      toValue: -5,
      duration: 20,
      useNativeDriver: true,
    }),
    Animated.timing(ref, {
      toValue: 5,
      duration: 20,
      useNativeDriver: true,
    }),
    Animated.timing(ref, {
      toValue: 0,
      duration: 20,
      useNativeDriver: true,
    }),
  ]).start();
};

const _causeBuzz = (buzzDuration: number = 250) => {
  Vibration.vibrate(buzzDuration);
};

const _buzzAndShake = (ref: Animated.Value, buzzDuration: number = 250) => {
  _causeBuzz(buzzDuration);
  _shakeAnimation(ref);
};

export { _buzzAndShake, _causeBuzz, _shakeAnimation, capitalize, getDateParts, getSectionTitles, groupWalletActivityByMonthAndYear };
