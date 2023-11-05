const shareLinks = {
  twitter: 'https://twitter.com/intent/tweet?text=',
};

export function shareToTwitter(content: string) {
  const url = `${shareLinks.twitter}${content}`;
  console.log('url===,', url);
  window.open(url);
}

function getOrigin(): string {
  return window.location.origin;
}

export function shareStore(kolAddress: string) {
  const shareUrl = `${getOrigin()}/store/${kolAddress}/projects`;
  shareToTwitter(shareUrl);
}

export function shareProject(kolAddress: string, projectId: number) {
  const shareUrl = `${getOrigin()}/store/${kolAddress}/project/${projectId}`;
  shareToTwitter(shareUrl);
}

export function shareContract(kolAddress: string, projectId: number, bizId: number) {
  const shareUrl = `${getOrigin()}/store/${kolAddress}/project/${projectId}/${bizId}`;
  shareToTwitter(shareUrl);
}

export function shareNft(kolAddress: string, projectId: number, retailId: number, nftType: 1 | 2) {
  const shareUrl = `${getOrigin()}/store/${kolAddress}/nft/:retailId/${nftType}`;
  shareToTwitter(shareUrl);
}
