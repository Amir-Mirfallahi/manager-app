import { Ban } from "lucide-react";

const NotFound = () => {
  return (
    <div className="mx-auto">
      <h3 className="text-lg text-red-600">
        این صفحه در دست ساخته...
        <Ban className="text-red-600 w-24" />
      </h3>
    </div>
  );
};

export default NotFound;
