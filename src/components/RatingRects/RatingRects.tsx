import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '../../constants/colors';

interface RatingRectsProps {
  /**
   * Значение от 1 до 5, определяющее количество закрашенных прямоугольников
   */
  value: number;
  /**
   * Цвет закрашенных прямоугольников (опционально)
   */
  activeColor?: string;
  /**
   * Цвет незакрашенных прямоугольников (опционально)
   */
  inactiveColor?: string;
  /**
   * Размер прямоугольников (опционально)
   */
  size?: number;
  /**
   * Стиль контейнера (опционально)
   */
  style?: ViewStyle;
}

const RatingRects: React.FC<RatingRectsProps> = ({
  value,
  activeColor = Colors.accent2,
  inactiveColor = Colors.disabled,
  size = 25,
  style,
}) => {
  // Проверяем, что значение в допустимом диапазоне
  const validatedValue = Math.min(5, Math.max(1, value));
  
  // Создаем массив из 5 элементов для отрисовки прямоугольников
  const rects = Array.from({ length: 5 }, (_, index) => {    
    // Определяем, должен ли прямоугольник быть закрашен
    // Закрашиваем, если индекс с конца меньше значения (value)
    const isActive = index < validatedValue;
    
    return (
      <View
        key={index}
        style={[
          styles.rect,
          {
            width: size,
            height: size,
            backgroundColor: isActive ? activeColor : inactiveColor,
            marginRight: index < 4 ? 4 : 0, // Добавляем отступ между прямоугольниками
          },
        ]}
      />
    );
  });

  return (
    <View style={[styles.container, style]}>
      {rects}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rect: {
    borderRadius: 4, // Немного скругляем углы для лучшего вида
  },
});

export default RatingRects;