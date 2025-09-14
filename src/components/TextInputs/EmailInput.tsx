import { View, TextInput, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import RegExps from "../../constants/RegExps";
import Colors from "../../constants/colors";

export default function EmailInput({
  name = "email",
  placeholder = "Электронная почта",
  inputProps = {},
}) {
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
            placeholderTextColor={Colors.placeholder}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            {...inputProps}
          />
          {error ? (
            <Text style={styles.errorText}>
              {error.message}
            </Text>
          ) : null}
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
    paddingHorizontal: 12,
    fontSize: 16,
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
    fontSize: 13,
  },
});
