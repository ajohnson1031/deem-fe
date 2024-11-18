import { WalletActivity } from "@/state/wallet";
import { FC } from "react";
import { Dimensions, ScrollView } from "react-native";
import ActivityCard from "./ActivityCard";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ALL_ACTIVITY_CONTAINER_HEIGHT = SCREEN_HEIGHT - 290;

interface AllActivityProps {
  activity: WalletActivity[];
  onCardPress: ({ type, activity }: { type: string; activity: WalletActivity }) => void;
}

const AllActivity: FC<AllActivityProps> = ({ activity, onCardPress }) => {
  return (
    <ScrollView className={`flex flex-row flex-wrap w-[132.5%]`} style={{ height: ALL_ACTIVITY_CONTAINER_HEIGHT, width: SCREEN_WIDTH }}>
      {activity.map((item, idx) => (
        <ActivityCard key={idx} activity={item} wrapperClass={"my-2  !h-24 !w-[131.5%]"} onPress={() => onCardPress({ type: "singleActivity", activity: item })} />
      ))}
    </ScrollView>
  );
};

export default AllActivity;
