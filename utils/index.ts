export const isBase64Url = (url: string) => {
  // Check if the URL starts with a valid base64 data URI prefix
  const base64Prefixes = ['data:image', 'data:application', 'data:audio', 'data:video'];
  for (const prefix of base64Prefixes) {
    if (url.startsWith(prefix)) {
      // If the URL starts with a valid base64 data URI prefix, it's likely base64-encoded
      return true;
    }
  }

  // Check if the URL contains a base64 marker (data:image/...)
  if (/data:[\w]+\/[\w]+;base64,/.test(url)) {
    return true;
  }

  return false;
};
