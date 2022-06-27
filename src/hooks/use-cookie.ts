export function useCookie() {
  const getCookie = (name: string): string | undefined => {
    const matches = document.cookie.match(
      // eslint-disable-next-line
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const setCookie = (name: string, value: string | number | boolean | null, exp = 86400): void => {
    document.cookie = `${name}=${value ? encodeURIComponent(value) : value};path=/; max-age=${exp}`;
  };

  const removeCookie = (name: string): void => {
    setCookie(name, null, 0);
  };

  return { getCookie, setCookie, removeCookie };
}
