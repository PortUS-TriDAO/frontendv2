const shareLinks = {
  twitter: 'https://twitter.com/intent/tweet?text=',
};

export function shareToTwitter(content: string) {
  const url = `${shareLinks.twitter}${content}`;
  window.open(url);
}
