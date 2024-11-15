import Divider from "@/components/Divider";
import { capitalize } from "@/helpers";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
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
      <View className={"flex-1 justify-center bg-base-50"}>
        <View className={"absolute top-0 right-0 bottom-0 left-0 justify-center items-center"}>
          <Text className={"text-stone-900 text-6xl font-extrabold"}>Deem</Text>
          <Text className={"text-stone-900 text-[13px]"}>Making Every Penny Count</Text>

          <Divider />

          <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={() => {}}>
            {({ handleChange, handleBlur, values, errors, touched }) => (
              <View className={"w-3/4"}>
                <TextInput
                  autoCapitalize={"none"}
                  className={"bg-stone-900/10 w-full p-2 pb-3 rounded text-stone-900 text-base"}
                  placeholder={"Login with email..."}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType={"email-address"}
                  placeholderTextColor={"#57534E"}
                  onSubmitEditing={() => handleSubmit({ values, errors })}
                />
                {errors.email && touched.email && <Text className={"text-red-300 text-center mt-2"}>{capitalize(errors.email)}</Text>}
              </View>
            )}
          </Formik>
          <View className={"mt-4 bg-sky-600 py-2 px-4 rounded-md"}>
            <Link className="no-underline" href={{ pathname: "/(root)" }}>
              <Text className={"text-white pb-4 text-base"}>Or Register</Text>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;
