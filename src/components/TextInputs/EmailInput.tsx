import { View, TextInput, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import RegExps from "../../constants/RegExps";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

export default function EmailInput({
  name = "email",
  placeholder = "Электронная почта",
  inputProps = {},
}) {
  const styles = useThemedStyles(createStyles);

  return (
    <Controller
      name={name}
      rules={{
        required: "Email обязателен",
        pattern: {
          value: RegExps.email,
          message: "Введите корректный email",
        },
        maxLength: {
          value: 254,
          message: "Email слишком длинный",
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder={placeholder}
            placeholderTextColor={styles.placeholderColor.color}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
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
      paddingHorizontal: 12,
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
    placeholderColor: {
      color: theme.colors.placeholder,
    },
  });
