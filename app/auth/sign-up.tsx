import Divider from "@/components/Divider";
import { capitalize } from "@/helpers";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must be valid")
    .email("Invalid email format"),
  confirmEmail: Yup.string()
    .required("Confirm email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must be valid")
    .oneOf([Yup.ref("email")], "Email addresses must match"),
  username: Yup.string()
    .required("Username is required")
    .matches(/^[a-zA-Z0-9_]+$/)
    .min(8, "Minimum of eight (8) characters required"),
});

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = ({ values, errors }: { values: any; errors: any }) => {
    if (errors.email) return;
    console.log(values);
  };

  return (
    <>
      <StatusBar style="light" />
      <View className={"flex-1 justify-center bg-cyan-600"}>
        <View className={"absolute top-0 right-0 bottom-0 left-0 justify-center items-center bg-black/50"}>
          <Text className={"text-white text-6xl font-extrabold"}>Deem</Text>
          <Text className={"text-white text-[13px]"}>Making Every Penny Count</Text>

          <Divider />
          <View>
            <Text className={"text-lg text-white font-semibold"}>Register New Account</Text>
          </View>
          <Divider />

          <Formik initialValues={{ username: "", email: "", confirmEmail: "" }} validationSchema={validationSchema} onSubmit={() => {}}>
            {({ handleChange, handleBlur, values, errors, touched }) => (
              <View className={"w-3/4"}>
                <TextInput
                  autoCapitalize={"none"}
                  className={"bg-black/40 w-full p-2 rounded text-white"}
                  placeholder={"Select your username..."}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  placeholderTextColor={"rgba(255,255,255,0.5)"}
                />
                {errors.username && touched.username && <Text className={"text-red-300 text-center mt-2"}>{capitalize(errors.username)}</Text>}
                <TextInput
                  autoCapitalize={"none"}
                  className={"bg-black/40 w-full p-2 rounded text-white mt-4"}
                  placeholder={"Enter your email..."}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType={"email-address"}
                  placeholderTextColor={"rgba(255,255,255,0.5)"}
                />
                {errors.email && touched.email && <Text className={"text-red-300 text-center mt-2"}>{capitalize(errors.email)}</Text>}
                <TextInput
                  autoCapitalize={"none"}
                  className={"bg-black/40 w-full p-2 rounded text-white mt-4"}
                  placeholder={"Confirm your email..."}
                  onChangeText={handleChange("confirmEmail")}
                  onBlur={handleBlur("confirmEmail")}
                  value={values.confirmEmail}
                  keyboardType={"email-address"}
                  placeholderTextColor={"rgba(255,255,255,0.5)"}
                />
                {errors.confirmEmail && touched.confirmEmail && <Text className={"text-red-300 text-center mt-2"}>{capitalize(errors.confirmEmail)}</Text>}
                <View className={"w-full mt-6"}>
                  <TouchableOpacity onPress={() => handleSubmit({ values, errors })}>
                    <View className={"bg-cyan-500 py-2 rounded"}>
                      <Text className={"text-center text-white font-semibold"}>Create Account</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <View className={"mt-4 border-b border-cyan-300"}>
            <Link href={{ pathname: "/" }}>
              <Text className={"text-cyan-300 pb-4"}>Or Login with Email</Text>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
};

export default SignUp;
