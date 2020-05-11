import {createGlobalStyle} from 'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1589162062201'); /* IE9 */
  src: url('iconfont.eot?t=1589162062201#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALIAAsAAAAABnAAAAJ9AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAp4gRYBNgIkAwgLBgAEIAWEbQc0G8AFyK4wbuFJGyLJiu6GkUO+69/l2xcCgiAeHvf7nbvtKyZJNRJFs2gik0iFBJWWCIUsVj2T37DTjukXKfHz7IJmHFGAhdnAtrVmBRa+negCuVYRPrDeucvuAabERjxpQCNeGHaDWy0QCGh+xC47bavI0/bL4uBy+v8VUCDzgHKZY/KYgIGlAY21KbIiibxh7AKXcJxA2xgC7rUG556IwhoXiCtVME8k51YUFmsK9ZqlRdyqaabr9MXjJvx+/ClGhKSWWQWHl03ZU/mEnZB31c6Fj/AQ0OoaMlYAhTitDe/zC0bE2uGAKWBfucEnqsrXir2qBPvrrOxOMALZ98RxubeanUCJ26cAG6NuJQ13Li8/E368lM7vLpjNs2t+7OkpV1lmxVS7dBvW0qj57x4e7j1Bphp/p1vURsnHe7z4/4IWD7NINgOZ/As/YgYM+DueLR5Uz3lzAkQw9vHrPWv/kY4CXv//MHRWz6X6WYHm7i3Bb+L0rCs6z9KkonJqrcnUqLEJbW1UsL3fHSsfuqd4aBq6M2vDaApZ0wxaCCtQ02EV6po2oW2ZXt1hQOMXpYUlE0DotSDpdg9Zr40WwoGaYR/U9YYf2s5jYMsOc6HGdgnZCGUwc8iSbXFHN4pFuacoxgajLC8kXSINVR/IbL4Ya6OFNMeMPhHFMeIQyDZBgdPQMGwoZGsojbJpNHLKPMfr3pS1tumJ2UUQM4JkwJgDmcRm4X7rkVjp86eQMGZgqKWoRn8JkSG1cyAxogfaFlu9iu7llW5CKBpGOBAQmwkoMAgZDDZQ6gdpkGQkK40IOsq43Sz0FWfXl5ofkMXKsBQp7G5Z+5JZQmaa6qs8Hg==') format('woff2'),
  url('iconfont.woff?t=1589162062201') format('woff'),
  url('iconfont.ttf?t=1589162062201') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1589162062201#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-fangdajing:before {
  content: "\e637";
}
`