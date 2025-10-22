import { IconProps } from '.'

export function IconDatabase({ size, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      {...props}
    >
      {/* Icon from Fluent UI System Color Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE */}
      <g fill="none">
        <path
          fill="url(#fluentColorDatabase160)"
          d="M3 12.5v-9c1.057.926 2.864 1.513 5 1.513s3.943-.587 5-1.513v9c0 1.425-2.149 2.5-5 2.5s-5-1.075-5-2.5"
        />
        <path
          fill="url(#fluentColorDatabase161)"
          fillOpacity=".7"
          d="M3 12.5v-9c1.057.926 2.864 1.513 5 1.513s3.943-.587 5-1.513v9c0 1.425-2.149 2.5-5 2.5s-5-1.075-5-2.5"
        />
        <path
          fill="url(#fluentColorDatabase162)"
          d="M13 3.5C13 4.88 10.761 6 8 6S3 4.88 3 3.5S5.239 1 8 1s5 1.12 5 2.5"
        />
        <defs>
          <linearGradient
            id="fluentColorDatabase160"
            x1="5.361"
            x2="12.114"
            y1=".909"
            y2="13.242"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#29C3FF" />
            <stop offset="1" stopColor="#367AF2" />
          </linearGradient>
          <linearGradient
            id="fluentColorDatabase161"
            x1="9.548"
            x2="12.136"
            y1="4.912"
            y2="16.096"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".533" stopColor="#FF6CE8" stopOpacity="0" />
            <stop offset="1" stopColor="#FF6CE8" />
          </linearGradient>
          <linearGradient
            id="fluentColorDatabase162"
            x1="16.75"
            x2="10.972"
            y1="8.5"
            y2="-2.018"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#58AAFE" />
            <stop offset="1" stopColor="#6CE0FF" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  )
}

export function IconTable({ size, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      {...props}
    >
      {/* Icon from Fluent UI System Color Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE */}
      <g fill="none">
        <rect
          width="36"
          height="36"
          x="6"
          y="6"
          fill="url(#fluentColorTable480)"
          rx="8.5"
        />
        <path
          fill="url(#fluentColorTable481)"
          d="M12.25 6A6.25 6.25 0 0 0 6 12.25v4.25h10.5V6zM19 6v10.5h10V6zm-2.5 13H6v10h10.5zM19 29V19h10v10zm-2.5 2.5H6v4.25A6.25 6.25 0 0 0 12.25 42h4.25zM19 42h10V31.5H19zm12.5 0V31.5H42v4.25A6.25 6.25 0 0 1 35.75 42zM42 19v10H31.5V19zm0-2.5v-4.25A6.25 6.25 0 0 0 35.75 6H31.5v10.5z"
        />
        <defs>
          <linearGradient
            id="fluentColorTable480"
            x1="8.571"
            x2="39.429"
            y1="8.571"
            y2="39.429"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B0F098" />
            <stop offset="1" stopColor="#98F0B0" />
          </linearGradient>
          <linearGradient
            id="fluentColorTable481"
            x1="6"
            x2="42"
            y1="6"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#42B870" />
            <stop offset="1" stopColor="#1A7F7C" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  )
}

export const MySQL = ({ size = 20, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="#5d87a1"
        fillRule="evenodd"
        d="M8.785 6.865a3 3 0 0 0-.785.1V7h.038a6.5 6.5 0 0 0 .612.785c.154.306.288.611.441.917l.038-.039a1.07 1.07 0 0 0 .4-.957a4 4 0 0 1-.23-.4c-.115-.191-.364-.287-.517-.44"
      />
      <path
        fill="#00758f"
        fillRule="evenodd"
        d="M27.78 23.553a8.85 8.85 0 0 0-3.712.536c-.287.115-.745.115-.785.478c.154.153.172.4.307.613a4.5 4.5 0 0 0 .995 1.167c.4.306.8.611 1.225.879c.745.461 1.588.728 2.314 1.187c.422.268.842.612 1.264.9c.21.153.343.4.611.5v-.058a4 4 0 0 0-.291-.613c-.191-.19-.383-.363-.575-.554a9.1 9.1 0 0 0-1.99-1.932c-.613-.422-1.953-1-2.2-1.7l-.039-.039a7.7 7.7 0 0 0 1.321-.308c.65-.172 1.243-.133 1.912-.3c.307-.077.862-.268.862-.268v-.3c-.342-.34-.587-.795-.947-1.116a25 25 0 0 0-3.122-2.328c-.587-.379-1.344-.623-1.969-.946c-.226-.114-.6-.17-.737-.36a7.6 7.6 0 0 1-.776-1.457a47 47 0 0 1-1.551-3.293a20 20 0 0 0-.965-2.157A19.1 19.1 0 0 0 11.609 5a9 9 0 0 0-2.421-.776c-.474-.02-.946-.057-1.419-.075a8 8 0 0 1-.869-.664C5.818 2.8 3.038 1.328 2.242 3.277C1.732 4.508 3 5.718 3.435 6.343A9 9 0 0 1 4.4 7.762c.133.322.171.663.3 1a23 23 0 0 0 .987 2.538a9 9 0 0 0 .7 1.172c.153.209.417.3.474.645a5.4 5.4 0 0 0-.436 1.419a8.34 8.34 0 0 0 .549 6.358c.3.473 1.022 1.514 1.987 1.116c.851-.34.662-1.419.908-2.364c.056-.229.019-.379.132-.53v.184s.483 1.061.723 1.6a10.8 10.8 0 0 0 2.4 2.59A3.5 3.5 0 0 1 14 24.657V25h.427a1.05 1.05 0 0 0-.427-.788a9.4 9.4 0 0 1-.959-1.16a25 25 0 0 1-2.064-3.519c-.3-.6-.553-1.258-.793-1.857c-.11-.231-.11-.58-.295-.7a7.3 7.3 0 0 0-.884 1.313a11.4 11.4 0 0 0-.517 2.921c-.073.02-.037 0-.073.038c-.589-.155-.792-.792-1.014-1.332a8.76 8.76 0 0 1-.166-5.164c.128-.405.683-1.681.461-2.068c-.111-.369-.48-.58-.682-.871a8 8 0 0 1-.663-1.237C5.912 9.5 5.69 8.3 5.212 7.216a10.4 10.4 0 0 0-.921-1.489A9.6 9.6 0 0 1 3.276 4.22c-.092-.213-.221-.561-.074-.793a.3.3 0 0 1 .259-.252c.238-.212.921.058 1.16.174a9.2 9.2 0 0 1 1.824.967c.258.194.866.685.866.685h.18c.612.133 1.3.037 1.876.21a12.3 12.3 0 0 1 2.755 1.32a17 17 0 0 1 5.969 6.545c.23.439.327.842.537 1.3c.4.94.9 1.9 1.3 2.814a12.6 12.6 0 0 0 1.36 2.564c.286.4 1.435.612 1.952.822a14 14 0 0 1 1.32.535c.651.4 1.3.861 1.913 1.3c.305.23 1.262.708 1.32 1.091"
      />
    </svg>
  )
}
