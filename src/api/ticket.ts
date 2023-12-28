import { signMessage } from '@wagmi/core';
import axios from 'axios';

const BASE_URL = 'https://api-qa.join3.top';

export async function postTicketInfo(): Promise<{
  message: string;
  signature: string;
}> {
  const msg = 'I am signing in to verifying the owner of the address ';
  const dateNow = parseInt(`${new Date().valueOf() / 1000}`);
  const msgToSign = `${msg}.\n${dateNow}`;
  const signature = await signMessage({
    message: msgToSign,
  });
  return {
    message: msgToSign,
    signature,
  };
  // return axios.post(
  //   `${BASE_URL}/api/eventOpen/ticketInfo`,
  //   {
  //     msg,
  //     signature,
  //     address,
  //     contractAddress,
  //     tokenId,
  //   },
  //   {
  //     headers: {
  //       Authorization:
  //         'Bearer eyJ0b2tlblR5cGUiOiJhY2Nlc3NUb2tlbiIsImFsZyI6IkhTMjU2In0.eyJqdGkiOiJiZDcyMjAwMS1hZWIzLTQ5NmItYmMxNi1lODA0OGI5MGM3MDkiLCJzdWIiOiIxIiwiaXNzIjoibmZ0IiwiYWRkcmVzcyI6IjB4MTQxOWI1YkJFM0QxNjMxRjVDNmRGYWYxMzNhNzM0OTg5ZkVhQ2M5RiIsImF1dGgiOiJVU0VSIiwidXNlcklkIjoxLCJleHAiOjE3MDEyNDAxNDN9.qA0bD-u0mB4roe03UJUimRmJTKf_N0-NYT3iPzQdHlE',
  //     },
  //   },
  // );
}
