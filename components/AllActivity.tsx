import { getSectionTitles, groupWalletActivityByMonthAndYear, SectionListData } from "@/helpers";
import { WalletActivity } from "@/state/wallet";
import { Ionicons } from "@expo/vector-icons";
import { FC, useState } from "react";
import { Dimensions, SectionList, StyleSheet, Text, View } from "react-native";
import SelectDropdown from "../node_modules/react-native-select-dropdown/index";
import ActivityCard from "./ActivityCard";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ALL_ACTIVITY_CONTAINER_HEIGHT = SCREEN_HEIGHT - 290;

interface AllActivityProps {
  activity: WalletActivity[];
  onCardPress: ({ type, activity }: { type: string; activity: WalletActivity }) => void;
}

const AllActivity: FC<AllActivityProps> = ({ activity, onCardPress }) => {
  const sectionList = groupWalletActivityByMonthAndYear(activity);
  const [sections, setSections] = useState<SectionListData[]>(sectionList);
  const options = getSectionTitles(sectionList);

  const handleSelect = (selectedItem: string) => {
    switch (selectedItem) {
      case "All":
        setSections(sectionList);
        break;
      default:
        setSections(sectionList.filter((section) => section.title === selectedItem));
    }
  };

  return (
    <View className="flex mx-auto w-full">
      <SelectDropdown
        data={options}
        onSelect={(selectedItem: string, index: number) => {
          handleSelect(selectedItem);
        }}
        renderButton={(selectedItem: string, isOpened: boolean) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>{(selectedItem && selectedItem) || "Find by month & year"}</Text>
              <Ionicons name={isOpened ? "chevron-up" : "chevron-down"} style={styles.dropdownButtonArrowStyle} color="white" />
            </View>
          );
        }}
        renderItem={(item: string, index: number, isSelected: boolean) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: "#c8c3c1" }) }}>
              <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      {/* List of Wallet Activity Items */}
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <ActivityCard activity={item} wrapperClass={"my-2 !h-24 w-85"} onPress={() => onCardPress({ type: "singleActivity", activity: item })} />}
        renderSectionHeader={({ section: { title } }) => (
          <View className="bg-base-200 py-2 px-4 rounded-md w-85">
            <Text className="text-xl font-normal">{title}</Text>
          </View>
        )}
        style={{
          height: ALL_ACTIVITY_CONTAINER_HEIGHT,
          width: SCREEN_WIDTH,
          marginTop: 10,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: 50,
    backgroundColor: "#969291",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  dropdownButtonArrowStyle: {
    fontSize: 24,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#FAF4F1",
    borderRadius: 6,
    marginTop: 5,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default AllActivity;
