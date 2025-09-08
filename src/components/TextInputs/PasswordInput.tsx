import { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form";
import RegExps from "../../constants/RegExps";
import Colors from "../../constants/colors";
import EyeOpened from "../../../assets/Icons/EyeOpened";
import EyeClosed from "../../../assets/Icons/EyeClosed";

export default function PasswordInput({
  name = "password",
  placeholder = "Пароль",
  inputProps = {},
}) {
  const [isSecuredText, setIsSecuredText] = useState(true);

  return (
    <Controller
      name={name}
      rules={{
        required: "Пароль обязателен",
        pattern: {
          value: RegExps.password,
          message:
            "Пароль должен содержать минимум одну цифру, одну заглавную букву и один спецсимвол",
        },
        maxLength: {
          value: 30,
          message: "Пароль слишком длинный",
        },
        minLength: {
          value: 10,
          message: "Пароль слишком короткий",
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <TouchableOpacity
            onPress={() => setIsSecuredText(!isSecuredText)}
            style={styles.eyeIcon}
          >
            {isSecuredText ? (
              <EyeClosed size={24} color={Colors.onSurface} />
            ) : (
              <EyeOpened size={24} color={Colors.onSurface} />
            )}
          </TouchableOpacity>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder={placeholder}
            placeholderTextColor={Colors.onSurface}
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
    borderColor: Colors.outline,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 35,
    fontSize: 16,
    backgroundColor: Colors.surface,
    color: Colors.onSurface,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    marginTop: 6,
    marginLeft: 5,
    color: Colors.error,
    fontSize: 13,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
  },
});
