import React from "react"
import { motion } from "framer-motion"

import "./styles.css"
// const transition = { duration: 20, loop: Infinity, ease: "easeInOut" }

function LetterC() {
  return (
    <path
      d="M269.850675,315 C313.613901,315 352.993178,297.497828 381,268.190047 L350.371021,235.813081 C329.800487,256.372708 301.357616,269.06193 269.850675,269.06193 C207.708888,269.06193 160.449454,220.058585 160.449454,157.49609 C160.449454,94.9394603 207.708888,45.9380702 269.850675,45.9380702 C301.357616,45.9380702 330.242401,58.6272916 350.80707,79.186919 L380.563952,46.3740117 C352.993178,17.5021721 313.613901,0 269.850675,0 C177.07991,0 111,70.4387653 111,157.49609 C111,244.561235 177.07991,315 269.850675,315"
      id="LetterC"
    >
      <animateMotion
        dur="10s"
        repeatCount="indefinite"
        path="M169.985027,176.427234 C179.93208,176.19386 267.55662,179.183885 300.100423,168.852611 C326.098801,160.599232 350.861304,147.259155 377.189473,139.487864 C427.031676,124.775929 488.9986,140.375055 532.7473,165.204439 C544.740628,172.011199 558.324876,177.03086 567.997737,186.859779 C587.2836,206.456792 600.675669,231.132087 618.353132,252.1914 C636.256115,273.519377 654.813044,286.42327 668.905831,308.885923 C681.925379,329.637929 669.396596,379.47129 671.445837,402.88202 C674.391117,436.529183 682.93112,463.34501 674.092209,496.80327 C668.094883,519.505174 652.755462,529.889133 633.304262,543.231403 C598.370428,567.19376 552.559033,583.84242 510.618001,588.069586 C482.837012,590.869585 454.444467,570.015905 435.273393,551.795426 C432.657097,549.308859 431.225805,545.616184 428.283744,543.525181 C408.652162,529.572482 416.293133,541.815005 403.292758,527.250571 C388.294668,510.448078 376.292578,490.20441 353.664429,482.634271 C307.50452,467.191696 221.853935,475.458893 170.250535,478.180791 C132.15124,480.190394 93.2050953,489.359102 57.6176381,470.727813 C53.2815232,468.457704 48.7837939,466.270426 45.1100399,463.036416 C26.980268,447.076757 15.2221844,438.555607 5.88118741,419.485398 C-10.0387467,386.98389 10.3981464,334.987867 19.672924,306.110525 C32.4653621,266.280824 46.6006535,241.589229 78.0470055,213.73058 C79.3027381,212.618114 98.6638901,196.353713 106.01837,194.404655 C116.844837,191.535463 128.013844,190.164644 139.011582,188.044638 L169.985027,176.427234 Z"
      />
    </path>
  )
}

function LetterFirstO() {
  return (
    <motion.path
      d="M503.435975,53 C563.073424,53 610,99.3742995 610,157.99609 C610,216.625701 563.073424,263 503.435975,263 L503.435975,263 L502.562066,263 C443.361571,263 396,216.625701 396,157.99609 C396,99.3742995 443.361571,53 502.562066,53 L502.562066,53 Z M502.633821,139 L502.370144,139 C492.191823,139 484,147.192262 484,157.5 C484,167.676884 492.191823,176 502.370144,176 L502.370144,176 L502.633821,176 C512.808177,176 521,167.542064 521,157.5 C521,147.325099 512.808177,139 502.633821,139 L502.633821,139 Z"
      id="LetterFirstO"
    />
  )
}

function LetterL() {
  return (
    <motion.polyline
      id="LetterL"
      points="215 425.582672 45.999307 425.582672 46.0718487 162 0 162 0 469 215 469"
    />
  )
}

function LetterA() {
  return (
    <motion.path
      id="LetterA"
      d="M402.315537,337 C427.547427,337 448,357.39736 448,382.556772 L448,382.556772 L448,492.443228 C448,517.604593 427.547427,538 402.315537,538 L402.315537,538 L348.098401,538 C291.132325,538 246,492.995775 246,437.499024 C246,382.00813 291.132325,337 348.098401,337 L348.098401,337 Z M354.922125,378 L354.075912,378 C321.346494,378 295,404.352384 295,437.498037 C295,470.227454 321.346494,497 354.075912,497 L354.075912,497 L354.922125,497 C387.645653,497 414,469.799439 414,437.498037 C414,404.774509 387.645653,378 354.922125,378 L354.922125,378 Z"
    />
  )
}

function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="900px" height="700px">
      <g id="Group">
        <g id="Logo-Copy" fill="#1A1919">
          <LetterC />
          <LetterL />
          <LetterA />
          <LetterFirstO />
          <path
            d="M504.225465,333 C516.204495,333 525.911335,342.692777 525.911335,354.65687 L525.911335,354.65687 L525.911335,416.595793 C525.911335,428.557927 535.618175,438.254623 547.595242,438.254623 L547.595242,438.254623 L583.000583,438.254623 C658.979614,438.254623 715.407612,522.118898 664.518811,602.185235 C651.248676,623.064096 619.85989,640 595.097343,640 L595.097343,640 L503.68587,640 C491.708802,640 482,630.305263 482,618.34313 L482,618.34313 L482,355.195793 C482,342.935782 491.952111,333 504.225465,333 Z M583.766932,502 L583.233068,502 C562.606694,502 546,518.609092 546,539.500981 C546,560.127895 562.606694,577 583.233068,577 L583.233068,577 L583.766932,577 C604.38938,577 621,559.858993 621,539.500981 C621,518.877993 604.38938,502 583.766932,502 L583.766932,502 Z"
            id="Combined-Shape"
          ></path>
          <path
            d="M678.437934,228 C738.077343,228 785,274.374299 785,332.99609 C785,391.625701 738.077343,438 678.437934,438 L678.437934,438 L677.565985,438 C618.363531,438 571,391.625701 571,332.99609 C571,274.374299 618.363531,228 677.565985,228 L677.565985,228 Z M678.491914,264 L677.510042,264 C639.555396,264 609,294.561264 609,333.000978 C609,370.953667 639.555396,402 677.510042,402 L677.510042,402 L678.491914,402 C716.438736,402 747,370.456863 747,333.000978 C747,295.0522 716.438736,264 678.491914,264 L678.491914,264 Z"
            id="Combined-Shape"
          ></path>
        </g>
        <path
          d="M169.985027,176.427234 C179.93208,176.19386 267.55662,179.183885 300.100423,168.852611 C326.098801,160.599232 350.861304,147.259155 377.189473,139.487864 C427.031676,124.775929 488.9986,140.375055 532.7473,165.204439 C544.740628,172.011199 558.324876,177.03086 567.997737,186.859779 C587.2836,206.456792 600.675669,231.132087 618.353132,252.1914 C636.256115,273.519377 654.813044,286.42327 668.905831,308.885923 C681.925379,329.637929 669.396596,379.47129 671.445837,402.88202 C674.391117,436.529183 682.93112,463.34501 674.092209,496.80327 C668.094883,519.505174 652.755462,529.889133 633.304262,543.231403 C598.370428,567.19376 552.559033,583.84242 510.618001,588.069586 C482.837012,590.869585 454.444467,570.015905 435.273393,551.795426 C432.657097,549.308859 431.225805,545.616184 428.283744,543.525181 C408.652162,529.572482 416.293133,541.815005 403.292758,527.250571 C388.294668,510.448078 376.292578,490.20441 353.664429,482.634271 C307.50452,467.191696 221.853935,475.458893 170.250535,478.180791 C132.15124,480.190394 93.2050953,489.359102 57.6176381,470.727813 C53.2815232,468.457704 48.7837939,466.270426 45.1100399,463.036416 C26.980268,447.076757 15.2221844,438.555607 5.88118741,419.485398 C-10.0387467,386.98389 10.3981464,334.987867 19.672924,306.110525 C32.4653621,266.280824 46.6006535,241.589229 78.0470055,213.73058 C79.3027381,212.618114 98.6638901,196.353713 106.01837,194.404655 C116.844837,191.535463 128.013844,190.164644 139.011582,188.044638 L169.985027,176.427234 Z"
          id="Path-2"
          stroke="#979797"
          fill="none"
        ></path>
      </g>
      {/* <motion.path
        d="M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5"
        fill="transparent"
        strokeWidth="12"
        stroke="rgba(255, 255, 255, 0.69)"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={transition}
      /> */}
    </svg>
  )
}

export default Logo
