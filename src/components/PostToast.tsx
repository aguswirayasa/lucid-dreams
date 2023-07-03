import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import Link from "next/link";

const PostToast = ({ open, setOpen, data }: any) => {
  const timerRef = React.useRef(100);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="down">
      <Toast.Root
        className="bg-gray-600 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="[grid-area:_title] text-teal-400 mb-[5px] font-medium text-slate12 text-[15px]">
          Notification
        </Toast.Title>
        <Toast.Description asChild>
          <p className="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]">
            {data}
          </p>
        </Toast.Description>
        <Toast.Action
          className="[grid-area:_action]"
          asChild
          altText="Goto schedule to undo"
        >
          {data && data.includes("error") ? (
            <button className="inline-flex  border-2 items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px]   hover:bg-teal-600  border-teal-500 transition-colors duration-300 ">
              Close
            </button>
          ) : (
            <Link href={"/showcase"}>
              <button className="inline-flex border-2 items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px]   hover:bg-teal-600 border-teal-500 transition-colors duration-300 ">
                View
              </button>
            </Link>
          )}
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default PostToast;
