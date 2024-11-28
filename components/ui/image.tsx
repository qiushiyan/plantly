import { Image as RNImage, useWindowDimensions } from "react-native";

type Props = {
  size?: number;
  logo?: boolean;
  imageUri?: string;
};

export function Image({ size, imageUri, logo }: Props) {
  const { width } = useWindowDimensions();

  const imageSize = size || Math.min(width / 1.5, 400);

  if (logo || !imageUri) {
    return (
      <RNImage
        source={require("~/assets/plantly.png")}
        style={{ width: imageSize, height: imageSize, borderRadius: 6 }}
      />
    );
  }

  return (
    <RNImage
      source={{ uri: imageUri }}
      style={{
        width: imageSize,
        height: imageSize,
        borderRadius: 6,
      }}
    />
  );
}
