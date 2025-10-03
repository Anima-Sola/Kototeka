import { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form";
import RegExps from "../../constants/RegExps";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import EyeOpened from "../../../assets/Icons/EyeOpened";
import EyeClosed from "../../../assets/Icons/EyeClosed";

export default function PasswordInput({
  name = "password",
  placeholder = "Пароль",
  inputProps = {},
  checkFormat = true,
}) {
  const [isSecuredText, setIsSecuredText] = useState(true);

  const rules = checkFormat
    ? {
        required: "Пароль обязателен",
        pattern: {
          value: RegExps.password,
          message: "Минимум одна цифра, заглавная буква и спецсимвол",
        },
        maxLength: {
          value: 30,
          message: "Пароль слишком длинный",
        },
        minLength: {
          value: 10,
          message: "Пароль слишком короткий",
        },
      }
    : {
        required: "Пароль обязателен",
      };

  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <TouchableOpacity
            onPress={() => setIsSecuredText(!isSecuredText)}
            style={styles.eyeIcon}
          >
            {isSecuredText ? (
              <EyeClosed size={24} color={Colors.accent} />
            ) : (
              <EyeOpened size={24} color={Colors.accent} />
            )}
          </TouchableOpacity>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder={placeholder}
            placeholderTextColor={Colors.placeholder}
            secureTextEntry={isSecuredText}
            value={value}
            onChangeText={onChange}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            {...inputProps}
          />
          {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 35,
    fontSize: fontSizes.FONT16,
    fontFamily: "ShantellLightItalic",
    backgroundColor: Colors.secondary,
    color: Colors.mainText,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    marginTop: 6,
    marginLeft: 5,
    color: Colors.error,
    fontSize: fontSizes.FONT13,
    fontFamily: "ShantellLightItalic",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
  },
});
