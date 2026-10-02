import { socialImage, socialSize } from "@/components/social-image";

export const dynamic = "force-static";

export const alt =
  "Keith Clemmons — Web development, AI systems, and automation";
export const size = socialSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return socialImage();
}
