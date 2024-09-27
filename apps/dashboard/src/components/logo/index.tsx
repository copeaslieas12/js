import { cn } from "@/lib/utils";
import { Stack, VisuallyHidden } from "@chakra-ui/react";

export const IconLogo: React.FC<{ extraClass?: string; color?: string }> = ({
  color,
  extraClass,
}) => {
  return (
    <div className={cn("relative aspect-[516/321]", extraClass || "")}>
      <svg viewBox="0 0 516 321" fill="none">
        <title>thirdweb</title>
        <g clipPath="url(#clip0_3:35)">
          <path
            d="M1.40497 27.0011C-3.73633 14.022 5.84519 0 19.8669 0H106.919C115.098 0 122.342 4.86715 125.381 12.3996L194.671 185.299C196.541 189.935 196.541 195.149 194.671 199.901L151.087 308.484C144.427 325.056 120.823 325.056 114.163 308.484L1.40497 27.0011Z"
            fill={
              typeof color === "string" ? color : "url(#paint0_linear_3:35)"
            }
          />
          <path
            d="M169.547 26.4217C164.873 13.5585 174.454 0 188.242 0H264.077C272.49 0 279.968 5.2148 282.772 12.9791L345.753 185.879C347.272 190.166 347.272 194.918 345.753 199.321L307.894 303.27C301.585 320.652 276.813 320.652 270.503 303.27L169.547 26.4217Z"
            fill={
              typeof color === "string" ? color : "url(#paint1_linear_3:35)"
            }
          />
          <path
            d="M321.331 27.0011C316.19 14.022 325.771 0 339.793 0H426.845C435.024 0 442.269 4.86715 445.307 12.3996L514.597 185.299C516.467 189.935 516.467 195.149 514.597 199.901L471.013 308.484C464.353 325.056 440.75 325.056 434.089 308.484L321.331 27.0011Z"
            fill={
              typeof color === "string" ? color : "url(#paint2_linear_3:35)"
            }
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_3:35"
            x1="7.40492"
            y1="55.24"
            x2="260.485"
            y2="164.437"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F213A4" />
            <stop offset="0.1517" stopColor="#E011A7" />
            <stop offset="0.4554" stopColor="#B20DAF" />
            <stop offset="0.8789" stopColor="#6806BB" />
            <stop offset="1" stopColor="#5204BF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_3:35"
            x1="175.093"
            y1="54.447"
            x2="410.968"
            y2="148.471"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F213A4" />
            <stop offset="0.1517" stopColor="#E011A7" />
            <stop offset="0.4554" stopColor="#B20DAF" />
            <stop offset="0.8789" stopColor="#6806BB" />
            <stop offset="1" stopColor="#5204BF" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_3:35"
            x1="327.331"
            y1="55.24"
            x2="580.411"
            y2="164.437"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F213A4" />
            <stop offset="0.1517" stopColor="#E011A7" />
            <stop offset="0.4554" stopColor="#B20DAF" />
            <stop offset="0.8789" stopColor="#6806BB" />
            <stop offset="1" stopColor="#5204BF" />
          </linearGradient>
          <clipPath id="clip0_3:35">
            <rect width="516" height="321" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

interface ILogoProps {
  hideIcon?: boolean;
  hideWordmark?: boolean;
  forceShowWordMark?: boolean;
  color?: string;
}

export const Logo: React.FC<ILogoProps> = ({
  hideIcon,
  hideWordmark,
  forceShowWordMark,
  color = "var(--chakra-colors-wordmark)",
}) => {
  return (
    <Stack as="h2" align="center" direction="row">
      {hideIcon ?? <IconLogo extraClass="w-9 md:w-10 flex-shrink-0" />}
      {(hideWordmark && !forceShowWordMark) ?? (
        <div
          className={cn(
            "relative aspect-[1377/267] w-24 flex-shrink-0 md:w-28",
            forceShowWordMark ? "block" : "none md:block",
          )}
          style={color ? { color } : undefined}
        >
          <svg viewBox="0 0 1377 267" fill="none">
            <title>thirdweb</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M351.582 2C335.29 2 321.931 15.2034 321.931 32.0377C321.931 48.542 335.29 61.7454 351.582 61.7454C367.874 61.7454 381.233 48.542 381.233 32.0377C381.233 15.2034 367.874 2 351.582 2ZM377.649 76.9285H325.84V254.844H377.649V76.9285ZM23.4605 8.60203H73.9657V76.9296H112.741V124.462H73.9657V187.178C73.9657 196.42 81.1342 203.682 89.9318 203.682H112.415V254.185H89.9318C53.4378 254.185 23.4605 224.147 23.4605 186.848V124.132H0V76.5995H23.4605V8.60203ZM236.234 72.9686C212.774 72.9686 194.201 82.8711 187.032 98.3851V8.60203H135.224V254.515H187.032V154.83C187.032 134.034 200.392 119.511 219.291 119.511C238.515 119.511 249.268 132.054 249.268 153.179V254.845H301.076V146.577C301.076 100.366 277.616 72.9686 236.234 72.9686ZM451.613 76.5995V101.026C459.433 83.2012 478.332 72.9686 502.118 72.6385C505.703 72.6385 510.264 72.9686 515.804 73.6288V123.141C510.59 122.151 504.725 121.491 498.534 121.491C468.883 121.491 451.613 138.325 451.613 167.703V254.515H399.805V76.5995H451.613ZM661.455 100.036C656.242 84.5216 635.714 73.6288 609.321 73.6288C584.557 73.6288 563.703 82.541 547.085 100.366C530.793 117.86 522.322 139.976 522.322 165.722C522.322 191.469 530.793 213.255 547.085 231.409C563.703 248.904 584.557 257.816 609.321 257.816C635.714 257.816 656.242 246.923 661.455 231.409V254.845H713.264V8.60203H661.455V100.036ZM651.029 197.411C642.231 205.993 631.478 209.954 618.77 209.954C606.388 209.954 595.636 205.663 587.164 197.411C578.366 188.498 574.13 177.936 574.13 165.722C574.13 153.509 578.366 142.947 587.164 134.364C595.961 125.452 606.388 121.161 618.77 121.161C631.804 121.161 642.557 125.452 651.029 134.364C660.152 142.947 664.714 153.509 664.714 165.722C664.714 177.936 660.152 188.498 651.029 197.411ZM862.824 77.5887L909.745 162.09L941.352 76.9285H992.183L919.846 265.077L862.824 162.751L805.803 265.077L733.792 76.9285H784.623L815.904 162.09L862.824 77.5887ZM1077.55 72.6385C1050.83 72.6385 1028.35 81.2207 1010.76 98.3851C993.486 115.219 984.688 137.665 984.688 165.392V167.043C984.688 194.77 993.486 217.216 1010.76 234.05C1028.68 250.554 1051.49 259.136 1080.16 259.136C1106.88 259.136 1128.71 253.855 1145.33 242.962V197.08C1129.04 208.633 1108.18 214.245 1083.09 214.245C1055.72 214.245 1037.8 200.711 1036.82 179.586H1165.53C1166.18 174.305 1166.51 168.363 1166.51 162.422C1166.51 137.005 1158.03 115.88 1141.74 98.7152C1125.45 81.2207 1103.62 72.6385 1077.55 72.6385ZM1036.82 145.587C1037.15 137.335 1041.38 130.403 1049.2 124.792C1057.35 119.18 1066.47 116.21 1077.55 116.21C1098.08 116.21 1114.05 129.743 1114.05 145.587H1036.82ZM1290 73.6288C1314.76 73.6288 1335.62 82.541 1351.91 100.366C1368.53 118.19 1377 139.646 1377 165.392C1377 191.139 1368.53 212.925 1351.91 231.079C1335.62 248.574 1314.76 257.486 1290 257.486C1263.61 257.486 1243.08 246.593 1237.87 231.079V254.515H1186.06V8.60203H1237.87V100.036C1243.08 84.5216 1263.61 73.6288 1290 73.6288ZM1280.55 209.954C1292.93 209.954 1303.36 205.993 1312.16 197.411C1320.95 188.498 1325.19 177.936 1325.19 165.722C1325.19 153.509 1320.95 142.947 1312.16 134.364C1303.69 125.452 1292.93 121.161 1280.55 121.161C1267.84 121.161 1257.09 125.452 1247.97 134.364C1239.17 142.947 1234.61 153.509 1234.61 165.722C1234.61 177.936 1239.17 188.498 1247.97 197.411C1256.76 205.663 1267.52 209.954 1280.55 209.954Z"
              fill={color}
            />
          </svg>
        </div>
      )}
      <VisuallyHidden>thirdweb</VisuallyHidden>
    </Stack>
  );
};
