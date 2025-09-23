import { View, TextInput, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import RegExps from "../../constants/RegExps";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";

export default function SimpleTextInput({
  name = "",
  placeholder = "",
  maxLength = 50,
  inputProps = {},
}) {
  return (
    <Controller
      name={name}
      rules={{
        required: "Обязательное поле",
        maxLength: {
          value: maxLength,
          message: "Значение слишком длинное",
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
            keyboardType="default"
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
    fontSize: fontSizes.FONT16,
    fontFamily: 'ShantellLightItalic',
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
    fontFamily: 'ShantellLightItalic',
  },
});
