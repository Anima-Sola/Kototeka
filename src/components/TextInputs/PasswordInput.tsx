import { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form";
import RegExps from "../../constants/RegExps";
import fontSizes from "../../constants/fontSizes";
import EyeOpened from "../../../assets/Icons/EyeOpened";
import EyeClosed from "../../../assets/Icons/EyeClosed";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

export default function PasswordInput({
  name = "password",
  placeholder = "Пароль",
  inputProps = {},
  checkFormat = true,
}) {
  const styles = useThemedStyles(createStyles);
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
              <EyeClosed size={24} color={styles.iconColor.color} />
            ) : (
              <EyeOpened size={24} color={styles.iconColor.color} />
            )}
          </TouchableOpacity>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder={placeholder}
            placeholderTextColor={styles.placeholderColor.color}
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

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    input: {
      height: 44,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      paddingLeft: 12,
      paddingRight: 35,
      fontSize: fontSizes.FONT16,
      fontFamily: "ShantellLightItalic",
      backgroundColor: theme.colors.secondary,
      color: theme.colors.mainText,
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      marginTop: 6,
      marginLeft: 5,
      color: theme.colors.error,
      fontSize: fontSizes.FONT13,
      fontFamily: "ShantellLightItalic",
    },
    eyeIcon: {
      position: "absolute",
      right: 10,
      top: 10,
      zIndex: 1,
    },
    placeholderColor: {
      color: theme.colors.placeholder,
    },
    iconColor: {
      color: theme.colors.accent,
    },
  });
