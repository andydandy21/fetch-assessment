import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export default function (props: PropsWithChildren) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-xl rounded bg-white p-4">
        {props.children}
      </div>
    </div>,
    document.body,
  );
}
