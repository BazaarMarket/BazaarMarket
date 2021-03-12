import axios from 'axios';

export interface IpfsContent {
  cid: string;
  size: number;
  ipfsUri: string;
  url: string;
  publicGatewayUrl: string;
}

export interface IpfsResponse extends IpfsContent {
  thumbnail: IpfsContent;
}

export async function uploadIPFSJSON(data: any) {
  return axios.post<IpfsResponse>('/ipfs-json-upload', data);
}

export async function uploadIPFSFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post<IpfsResponse>('/ipfs-file-upload', formData);
}

export async function uploadIPFSImageWithThumbnail(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post<IpfsResponse>(
    '/ipfs-image-with-thumbnail-upload',
    formData
  );
}

// URI Utils

export function ipfsUriToCid(uri: string) {
  const baseRegex = /^ipfs:\/\//;
  const ipfsRegex = new RegExp(baseRegex.source + '.+');
  if (ipfsRegex.test(uri)) {
    return uri.replace(baseRegex, '');
  }
  return null;
}

export function ipfsUriToGatewayUrl(network: string, uri: string) {
  const ipfsHost =
    network === 'sandboxnet'
      ? 'http://localhost:8080'
      : 'https://gateway.ipfs.io';
  const cid = ipfsUriToCid(uri);
  return cid ? `${ipfsHost}/ipfs/${cid}` : uri;
}

export function uriToCid(uri: string) {
  const ipfsUriCid = ipfsUriToCid(uri);
  if (ipfsUriCid) {
    return ipfsUriCid;
  }
  const baseRegex = /^https:\/\/.*\/ipfs\//;
  const httpRegex = new RegExp(baseRegex.source + '.+');
  if (httpRegex.test(uri)) {
    return uri.replace(baseRegex, '');
  }
  return null;
}
