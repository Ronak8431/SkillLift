import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-black" />,
        info: <InfoIcon className="size-4 text-black" />,
        warning: <TriangleAlertIcon className="size-4 text-black" />,
        error: <OctagonXIcon className="size-4 text-black" />,
        loading: <Loader2Icon className="size-4 animate-spin text-black" />,
      }}
      style={{
        "--normal-bg": "#ffffff",        // 🔥 white background
        "--normal-text": "#000000",      // 🔥 black text
        "--normal-border": "#e5e7eb",    // light gray border
        "--border-radius": "8px",
      }}
      {...props}
    />
  );
};

export { Toaster };
