import CustomInput from "@/components/CustomInput";
import CustomModal, { CustomModalVariant } from "@/components/CustomModal";
import ProfileImage from "@/components/ProfileImage";
import { RBSheetRef } from "@/constants/refs";
import { NAME_VALIDATOR, USERNAME_VALIDATOR } from "@/regex";
import { userState } from "@/state/user";
import { Ionicons } from "@expo/vector-icons";
import cn from "classnames";
import { Link } from "expo-router";
import { Formik } from "formik";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "react-native-vector-icons";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().matches(NAME_VALIDATOR, "Invalid first name").min(3, "Please enter 3 chars. min."),
  lastname: Yup.string().matches(NAME_VALIDATOR, "Invalid last name").min(3, "Please enter 3 chars. min."),
  username: Yup.string().matches(USERNAME_VALIDATOR, "Invalid username"),
});

type FormValues = {
  firstname: string;
  lastname: string;
  username: string;
};

const Profile = () => {
  const infoRef = useRef<RBSheetRef>(null);
  const warnRef = useRef<RBSheetRef>(null);

  const [user, setUser] = [useAtomValue(userState), useSetAtom(userState)];
  const { firstname, lastname, username, email } = user;

  const [formValues, setFormValues] = useState({ firstname, lastname, username });

  const handleRBSheetOpen = (ref: React.RefObject<RBSheetRef>) => {
    ref.current?.open();
  };

  const handleSubmit = (values: FormValues, errors: any) => {
    const { firstname, lastname, username } = values;
    // ? Username has not been previously saved
    if (username !== user.username) {
      handleRBSheetOpen(warnRef);
      return;
    }

    // ? Only fires if values have changed
    if (firstname !== formValues.firstname && lastname !== formValues.lastname) {
      // TODO: Complete function that handles updating profile values
      setUser({ ...user, firstname, lastname });
    }
  };

  return (
    <View className={"flex-1 items-center pt-20"}>
      <CustomModal ref={infoRef} variant={CustomModalVariant.INFO} content={InfoBody} footerButtonText="Okay, got it!" />
      <CustomModal
        ref={warnRef}
        variant={CustomModalVariant.WARN}
        content={WarningBody}
        onPress={() => {
          // TODO: Complete function that handles updating profile values
          setUser({ ...user, ...formValues });
        }}
        footerButtonText="Proceed"
      />

      {/* Profile Image */}
      <ProfileImage />
      {/* Form */}
      <View className="mt-8 pt-3 border-t border-stone-400 w-85">
        <View className="mb-6 pb-3 border-b border-stone-400 flex flex-row justify-between items-center">
          <Text className="text-lg">User Details</Text>
          <TouchableOpacity
            onPress={() => {
              handleRBSheetOpen(infoRef);
            }}
          >
            <Ionicons name="information-circle-outline" size={24} color="#075985" />
          </TouchableOpacity>
        </View>
        <Formik initialValues={{ firstname, lastname, username }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ handleChange, values, errors }) => (
            <View>
              <View className={"flex flex-row"}>
                {/* Name Fields */}
                <CustomInput
                  label="First Name"
                  value={values.firstname}
                  placeholder={"Your first name..."}
                  onChange={(value: string) => {
                    handleChange("firstname")(value);
                    setFormValues({ ...formValues, firstname: value });
                  }}
                  size={"half"}
                  side="left"
                  error={errors.firstname}
                />

                <CustomInput
                  label="Last Name"
                  value={values.lastname}
                  placeholder={"Your last name..."}
                  onChange={(value: string) => {
                    handleChange("lastname")(value);
                    setFormValues({ ...formValues, lastname: value });
                  }}
                  size={"half"}
                  side="right"
                  error={errors.lastname}
                />
              </View>
              {/* Username Field */}
              <View>
                <CustomInput
                  label="Username"
                  value={username.length > 0 ? `${values.username}` : values.username}
                  placeholder={"Your username..."}
                  onChange={(value: string) => {
                    handleChange("username")(value);
                    setFormValues({ ...formValues, username: value });
                  }}
                  editable={username.length <= 0}
                  autoCapitalize="none"
                  error={errors.username}
                  icon={<Feather name="at-sign" size={18} color="#44403C" />}
                />
                {errors.username && <Text className="text-sm text-red-600">Please enter a valid username</Text>}
                <CustomInput label="Email" value={email} editable={false} />
              </View>

              {/* Submit Button */}
              <Pressable onPress={() => handleSubmit(values, errors)} disabled={values.firstname.length < 3 || values.lastname.length < 3}>
                {({ pressed }) => (
                  <View
                    className={cn("mt-2 p-2 bg-stone-800 rounded-md", { "bg-stone-800/50": values.firstname.length < 3 || values.lastname.length < 3, "bg-stone-900": pressed })}
                  >
                    <Text className="text-lg text-white text-center">Save Changes</Text>
                  </View>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Profile;

const InfoBody = (
  <View className="w-full">
    <View className="flex flex-row gap-2 mb-3 ">
      <Text className="text-lg">&#8226;</Text>
      <Text className="text-lg">First and last name fields only accept letters, hyphens, spaces and dashes. </Text>
    </View>
    <View className="flex flex-row gap-2 mb-3">
      <Text className="text-lg">&#8226;</Text>
      <Text className="text-lg">Username field only accepts letters, numbers, periods and dashes. </Text>
    </View>
    <View className="flex flex-row gap-2 mb-3">
      <Text className="text-lg">&#8226;</Text>
      <Text className="mb-1 text-lg">Usernames are permanent. Once saved, your username cannot be changed from within the app.</Text>
    </View>
    <View className="flex flex-row gap-2 mb-3">
      <Text className="text-lg">&#8226;</Text>
      <Text className="text-lg">
        For any username change requests, reach out to our support team&nbsp;
        {/* // TODO: Update with proper email address */}
        <Link href="https://www.example.com" className="text-sky-600 underline">
          via email
        </Link>
        .
      </Text>
    </View>
  </View>
);

const WarningBody = (
  <View className="w-[90%] mb-5">
    <View>
      <Text className="text-lg text-center">Your Deem username is about to be permanently set.</Text>
      <Text className="text-lg text-red-600 font-semibold text-center">Are you sure?</Text>
    </View>
  </View>
);
