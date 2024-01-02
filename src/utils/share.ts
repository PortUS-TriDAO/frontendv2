const shareLinks = {
  twitter: 'https://twitter.com/intent/tweet?text=',
};

export function shareToTwitter(content: string) {
  const url = `${shareLinks.twitter}${content}`;
  window.open(url);
}

function getOrigin(): string {
  return window.location.origin;
}

export function shareStore(kolAddress: string) {
  const shareUrl = `${getOrigin()}/store/${kolAddress}/projects`;
  // shareToTwitter(shareUrl);
  return shareUrl;
}

export function shareProject(kolAddress: string, projectId: number) {
  const shareUrl = `${getOrigin()}/store/${kolAddress}/project/${projectId}`;
  shareToTwitter(shareUrl);
}

export function shareContract(kolAddress: string, projectId: number, bizId: number) {
  const shareUrl = `${getOrigin()}/store/${kolAddress}/project/${projectId}/${bizId}`;
  shareToTwitter(encodeURIComponent(shareUrl));
  return shareUrl;
}

export function shareNft(
  kolAddress: string,
  projectId: number,
  retailId: number,
  nftType: number,
  retailAddress: string,
  bizId: number,
) {
  const shareUrl = `${getOrigin()}/store/${kolAddress}/nft/${retailId}/${nftType}?retailAddress=${retailAddress}&bizId=${bizId}`;
  shareToTwitter(encodeURIComponent(shareUrl));
  return shareUrl;
}

export function shareNftDetail(
  kolAddress: string,
  retailId: number,
  bizId: number,
  skuSpuId: number,
  nftType: number,
) {
  let shareUrl: string;
  if (nftType === 1) {
    shareUrl = `${getOrigin()}/store/${kolAddress}/sku/${retailId}/${skuSpuId}/${bizId}`;
  } else {
    shareUrl = `${getOrigin()}/store/${kolAddress}/spu/${retailId}/${skuSpuId}/${bizId}`;
  }

  shareToTwitter(encodeURIComponent(shareUrl));
  return shareUrl;
}
