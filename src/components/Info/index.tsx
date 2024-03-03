type InfoType = "error" | "success";

interface IInfo {
  message: string;
  type: InfoType;
}

export default function Info({ message, type, ...rest }: IInfo) {
  const getTypeColor = () => {
    const types = {
      ["success"]: "border-green-900 bg-green-500",
      ["error"]: "border-red-900 bg-red-500",
    };

    return types[type];
  };

  return (
    <div className={`border rounded ${getTypeColor()} text-white`} {...rest}>
      {message}
    </div>
  );
}
