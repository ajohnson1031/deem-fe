import CustomInput from "@/components/CustomInput";
import ProfileImage from "@/components/ProfileImage";
import { NAME_VALIDATOR, USERNAME_VALIDATOR } from "@/regex";
import { userState } from "@/state/user";
import { Formik } from "formik";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().matches(NAME_VALIDATOR, "Invalid first name"),
  lastname: Yup.string().matches(NAME_VALIDATOR, "Invalid last name"),
  username: Yup.string().matches(USERNAME_VALIDATOR, "Invalid username"),
});

type FormValues = {
  firstname: string;
  lastname: string;
  username: string;
};

const Profile = () => {
  const [user, setUser] = [useAtomValue(userState), useSetAtom(userState)];
  const { firstname, lastname, username, email } = user;

  const changeHandler = (name: string, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (values: FormValues, errors: any) => {
    // TODO: Complete function that handles updating profile values
    console.log(values, errors);
  };

  return (
    <View className={"flex-1 items-center pt-20"}>
      {/* Profile Image */}
      <ProfileImage />
      {/* Form */}
      <View className="mt-8 w-85">
        <Text className="text-lg mb-6">User Details</Text>
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
                    changeHandler("firstname", value);
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
                    changeHandler("lastname", value);
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
                  value={values.username}
                  placeholder={"Your username..."}
                  onChange={(value: string) => {
                    changeHandler("username", value);
                    handleChange("username")(value);
                  }}
                  error={errors.username}
                />
                {errors.username && touched.username && <Text className="text-sm text-red-600">Please enter a valid username</Text>}
                <CustomInput label="Email" value={email} editable={false} />
              </View>

              {/* Submit Button */}
              <TouchableOpacity className="mt-2" onPress={() => handleSubmit(values, errors)}>
                <View className="p-2 bg-green-500 rounded-md">
                  <Text className="text-base text-white font-semibold text-center">Save Changes</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Profile;
