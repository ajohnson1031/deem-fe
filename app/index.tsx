import Divider from "@/components/Divider";
import { capitalize } from "@/helpers";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React from "react";
import { Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must be valid")
    .email("Invalid email format"),
});

const Home = () => {
  const router = useRouter();

  const handleSubmit = ({ values, errors }: { values: any; errors: any }) => {
    if (errors.email) return;
    else {
      console.log(values);
      router.push("/auth/sign-up");
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <View className={"flex-1 justify-center bg-baseBG"}>
        <View className={"absolute top-0 right-0 bottom-0 left-0 justify-center items-center"}>
          <Text className={"text-white text-6xl font-extrabold"}>Deem</Text>
          <Text className={"text-white text-[13px]"}>Making Every Penny Count</Text>

          <Divider />

          <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={() => {}}>
            {({ handleChange, handleBlur, values, errors, touched }) => (
              <View className={"w-3/4"}>
                <TextInput
                  autoCapitalize={"none"}
                  className={"bg-black/30 w-full p-2 rounded text-white"}
                  placeholder={"Login with email..."}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType={"email-address"}
                  placeholderTextColor={"rgba(255,255,255,0.5)"}
                  onSubmitEditing={() => handleSubmit({ values, errors })}
                />
                {errors.email && touched.email && <Text className={"text-red-300 text-center mt-2"}>{capitalize(errors.email)}</Text>}
              </View>
            )}
          </Formik>
          <View className={"mt-4 border-b border-cyan-300"}>
            <Link href={{ pathname: "/(root)" }}>
              <Text className={"text-cyan-300 pb-4"}>Or Register A New Account</Text>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;
