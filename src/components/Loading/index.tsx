import { Loader } from "lucide-react";

interface IProps {
  color?: string;
  size?: number;
}

export default function LoadingComponent({ color, size }: IProps) {
  return (
    <div className="flex items-center justify-center">
      <Loader
        className="animate-spin"
        color={color || "black"}
        size={size || 30}
      />
    </div>
  );
}
