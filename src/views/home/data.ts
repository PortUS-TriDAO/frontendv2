interface ISwiperItem {
  title1: string
  title2: string
  desc: string
  list: Array<{
    title: string
    desc: string
  }>
}

export const swiperData: ISwiperItem[] = [
  {
    title1: 'DeCPS features',
    title2: '',
    desc: `
      Project owners can mint DeCPS equity NFT at their own liberty.
      `,
    list: [
      {
        title: 'INO',
        desc: 'The minting income/ royalty income from transferring DeCPS NFTs can serve as a financing method for project owners.'
      },
      {
        title: 'Deposit into Smart Contract',
        desc: 'All in-app purchases by users is paid to the DeCPS equity smart contract, which is open and transparent, with data queryable at any time.'
      },
      {
        title: 'Automatic Allocation',
        desc: 'The income generated from the product (top- up/ads) is automatically allocated under the support of the NFT smart contract, without needing to wait for settlement periods.'
      }
    ]
  },
  {
    title1: 'Portal for Web 2 Consumers',
    title2: 'Automated Exchange Settlement Payment Interface',
    desc: 'Partnership with multiple licensed payment institutions, that can provide automated exchange settlement payment interface. This will allow web 2 user can complete transactions without feeling any presence of web 3',
    list: [
      {
        title: 'Frictionless Experience',
        desc: 'Web 2 user can use their most familiar payment methods, without the need to download wallet or CEX apps'
      },
      {
        title: 'Automated Exchange & Settlement',
        desc: 'Upon receieveing fiat currency from web 2 user it can be automatically exchanged into crypto currency'
      },
      {
        title: 'Bridge between web2 and web3',
        desc: 'Through the automated exchange and settlement interface, weeb 2 user can cross the web 3 barrier seamlessly. Thus promoting web 2 user enter into web 3'
      }
    ]
  },
  {
    title1: 'DID',
    title2: '',
    desc: 'The SBTs held in the DIDs of all participants on the platform serve as their identity credentials and equity credentials. All participants of the platform can use these to prove their qualifications and authority to engage in platform business activities.',
    list: [
      {
        title: 'How to Acquire',
        desc: 'Participants initiate applications based on proof of their participation in platform activities, or the platform business activities grant qualifications to the corresponding participants. After approval, platform tokens are paid to mint the SBTs.'
      },
      {
        title: 'Basis for Incentives',
        desc: 'The sole basis for rewarding players with tokens, an important means to eliminate malicious behaviors such as using scripts, bots and brushing fake volume.'
      },
      {
        title: 'Trustless Community',
        desc: 'Identity recognition based on SBTs makes the composition of the user community more clear and orderly, strengthening community functions and making content more authoritative.'
      }
    ]
  },
  {
    title1: 'Private Domain Store',
    title2: '',
    desc: `
      Each private domain KOL can display all of the distribution rights NFTs they have minted in a customized store for their fans/members to browse and download/participate at any time.
      `,
    list: [
      {
        title: 'Personalised App store',
        desc: 'With the platform features supported by PortUS, everyone can open their own App Store, so their fans and guild members can browse personalized product recommendations'
      },
      {
        title: 'Refined Management',
        desc: 'The operation status of private domain store can be checked at any time on a fully-featured, data-rich dashboard, enabling private domain traffic masters to effectively manage them.'
      },
      {
        title: 'Accumilative Reputation',
        desc: 'As the transaction volume of the shops expands, their reputation will continuously accumulate and be clearly displayed through on-chain data, facilitating the effective expansion of business scale.'
      }
    ]
  }
]
