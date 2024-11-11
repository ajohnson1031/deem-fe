import CustomInput from "@/components/CustomInput";
import CustomModal, { CustomModalVariant } from "@/components/CustomModal";
import ProfileImage from "@/components/ProfileImage";
import { NAME_VALIDATOR, USERNAME_VALIDATOR } from "@/regex";
import { userState } from "@/state/user";
import { Ionicons } from "@expo/vector-icons";
import cn from "classnames";
import { Link } from "expo-router";
import { Formik } from "formik";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";
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
  const [user, setUser] = [useAtomValue(userState), useSetAtom(userState)];
  const [modalOpen, setModalOpen] = useState({ info: false, warn: false });

  const { firstname, lastname, username, email } = user;

  const handleSubmit = (values: FormValues, errors: any) => {
    // TODO: Complete function that handles updating profile values
    setUser({ ...user, ...values });
    console.log(values, errors);
  };

  return (
    <View className={"flex-1 items-center pt-20"}>
      <CustomModal variant={CustomModalVariant.INFO} open={modalOpen.info} content={InfoBody} onClose={() => setModalOpen({ ...modalOpen, info: false })} />

      {/* Profile Image */}
      <ProfileImage />
      {/* Form */}
      <View className="mt-8 pt-3 border-t border-stone-400 w-85">
        <View className="mb-6 pb-3 border-b border-stone-400 flex flex-row justify-between items-center">
          <Text className="text-lg">User Details</Text>
          <TouchableOpacity onPress={() => setModalOpen({ ...modalOpen, info: true })}>
            <Ionicons name="information-circle-outline" size={24} color="#0284c7" />
          </TouchableOpacity>
        </View>
        <Formik initialValues={{ firstname, lastname, username }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ handleChange, values, errors, touched }) => (
            <View>
              <View className={"flex flex-row"}>
                {/* Name Fields */}
                <CustomInput
                  label="First Name"
                  value={values.firstname}
                  placeholder={"Your first name..."}
                  onChange={(value: string) => {
                    handleChange("firstname")(value);
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
                  value={username.length > 0 ? `@${values.username}` : values.username}
                  placeholder={"Your username..."}
                  onChange={(value: string) => {
                    handleChange("username")(value);
                  }}
                  editable={username.length <= 0}
                  autoCapitalize="none"
                  error={errors.username}
                  icon={<Feather name="at-sign" size={18} color="#1c1917" />}
                />
                {errors.username && <Text className="text-sm text-red-600">Please enter a valid username</Text>}
                <CustomInput label="Email" value={email} editable={false} />
              </View>

              {/* Submit Button */}
              <Pressable
                className={cn("mt-2 p-2 bg-green-500 rounded-md", { "bg-green-500/50": values.firstname.length < 3 || values.lastname.length < 3 })}
                onPress={() => handleSubmit(values, errors)}
                disabled={values.firstname.length < 3 || values.lastname.length < 3}
              >
                <View className="">
                  <Text className="text-base text-white font-bold text-center">Save Changes</Text>
                </View>
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
  <View className="w-[90%]">
    <View className="flex flex-row gap-2 mb-3">
      <Text>&#8226;</Text>
      <Text>First and last name fields only accepts letters, hyphens, spaces and dashes. </Text>
    </View>
    <View className="flex flex-row gap-2 mb-3">
      <Text>&#8226;</Text>
      <Text>Username field only accepts letters, numbers, periods and dashes. </Text>
    </View>
    <View className="flex flex-row gap-2 mb-3">
      <Text>&#8226;</Text>
      <View>
        <Text className="mb-1">Usernames are permanent. Once saved, your username cannot be changed from within the app.</Text>
        <Text>
          For any username change requests, reach out to our support team&nbsp;
          {/* // TODO: Update with proper email address */}
          <Link href="https://www.example.com" className="text-sky-600 underline">
            via email
          </Link>
          .
        </Text>
      </View>
    </View>
  </View>
);
