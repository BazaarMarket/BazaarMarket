export enum ErrorKind {
  UnknownError,
  WalletNotConnected,
  CreateAssetContractFailed,
  CreateNftFormInvalid,
  MintTokenFailed,
  TransferTokenFailed,
  ListTokenFailed,
  CancelTokenSaleFailed,
  BuyTokenFailed,
  DonateTezFailed,
  GetNftAssetContractFailed,
  GetContractNftsFailed,
  GetWalletNftAssetContractsFailed,
  GetNftAssetContractsFailed,
  GetMarketplaceNftsFailed,
  IPFSUploadFailed,
  WalletAlreadyConnected,
  WalletPermissionRequestDenied
}

export interface RejectValue {
  kind: ErrorKind;
  message: string;
  errorObj?: any;
}