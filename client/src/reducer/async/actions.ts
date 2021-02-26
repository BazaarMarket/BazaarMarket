import { createAsyncThunk } from '@reduxjs/toolkit';
import { State } from '..';
import {
  createAssetContract,
  mintToken,
  transferToken
} from '../../lib/nfts/actions';
// import {getNftAssetContract} from '../../lib/nfts/queries'
import { ErrorKind, RejectValue } from './errors';
import { getContractNftsQuery, getWalletAssetContractsQuery } from './queries';
import { validateCreateNftForm } from '../validators/createNft';
import {
  uploadIPFSFile,
  uploadIPFSImageWithThumbnail
} from '../../lib/util/ipfs';
import { SelectedFile } from '../slices/createNft';

type Options = {
  state: State;
  rejectValue: RejectValue;
};

export const readFileAsDataUrlAction = createAsyncThunk<
  { ns: string; result: SelectedFile },
  { ns: string; file: File },
  Options
>('action/readFileAsDataUrl', async ({ ns, file }, { rejectWithValue }) => {
  const readFile = new Promise<{ ns: string; result: SelectedFile }>(
    (resolve, reject) => {
      const { name, type, size } = file;
      const reader = new FileReader();
      reader.onload = e => {
        const buffer = e.target?.result;
        if (!buffer || !(buffer instanceof ArrayBuffer)) {
          return reject();
        }
        const blob = new Blob([new Uint8Array(buffer)], { type });
        const objectUrl = window.URL.createObjectURL(blob);
        return resolve({ ns, result: { objectUrl, name, type, size } });
      };
      reader.readAsArrayBuffer(file);
    }
  );
  try {
    return await readFile;
  } catch (e) {
    return rejectWithValue({
      kind: ErrorKind.UknownError,
      message: 'Could not read file'
    });
  }
});

export const createAssetContractAction = createAsyncThunk<
  { name: string; address: string },
  string,
  Options
>(
  'action/createAssetContract',
  async (name, { getState, rejectWithValue, dispatch }) => {
    const { system } = getState();
    if (system.status !== 'WalletConnected') {
      return rejectWithValue({
        kind: ErrorKind.WalletNotConnected,
        message: 'Cannot create collection: Wallet not connected'
      });
    }
    try {
      const op = await createAssetContract(system, { name });
      await op.confirmation();
      const { address } = await op.contract();
      // TODO: Poll for contract availability on indexer
      dispatch(getWalletAssetContractsQuery());
      return { name, address };
    } catch (e) {
      return rejectWithValue({
        kind: ErrorKind.CreateAssetContractFailed,
        message: 'Collection creation failed'
      });
    }
  }
);

function appendStateMetadata(
  state: State['createNft'],
  metadata: Record<string, string>
) {
  const appendedMetadata = { ...metadata };
  appendedMetadata.name = state.fields.name as string;

  if (state.fields.description) {
    appendedMetadata.description = state.fields.description;
  }

  for (let row of state.metadataRows) {
    if (row.name !== null && row.value !== null) {
      appendedMetadata[row.name] = row.value;
    }
  }

  return appendedMetadata;
}

export const mintTokenAction = createAsyncThunk<
  { contract: string },
  undefined,
  Options
>('actions/mintToken', async (_, { getState, rejectWithValue, dispatch }) => {
  const { system, createNft: state } = getState();
  if (state.selectedFile === null) {
    return rejectWithValue({
      kind: ErrorKind.UknownError,
      message: 'Could not mint token: no file selected'
    });
  } else if (system.status !== 'WalletConnected') {
    return rejectWithValue({
      kind: ErrorKind.WalletNotConnected,
      message: 'Could not mint token: no wallet connected'
    });
  } else if (!validateCreateNftForm(state)) {
    return rejectWithValue({
      kind: ErrorKind.CreateNftFormInvalid,
      message: 'Could not mint token: form validation failed'
    });
  }

  let file: File;
  try {
    const { objectUrl, name, type } = state.selectedFile;
    const fetched = await fetch(objectUrl);
    const blob = await fetched.blob();
    file = new File([blob], name, { type });
  } catch (e) {
    return rejectWithValue({
      kind: ErrorKind.UknownError,
      message: 'Could not mint token: selected file not found'
    });
  }

  let ipfsMetadata: Record<string, string> = {};
  try {
    if (/^image\/.*/.test(file.type)) {
      const imageResponse = await uploadIPFSImageWithThumbnail(file);
      ipfsMetadata.artifactUri = imageResponse.data.ipfsUri;
      ipfsMetadata.displayUri = imageResponse.data.ipfsUri;
      ipfsMetadata.thumbnailUri = imageResponse.data.thumbnail.ipfsUri;
    } else if (/^video\/.*/.test(file.type)) {
      if (state.displayImageFile === null) {
        return rejectWithValue({
          kind: ErrorKind.IPFSUploadFailed,
          message: 'Ipfs upload failed: Video display file not found'
        });
      }
      let displayFile: File;
      try {
        const { objectUrl, name, type } = state.displayImageFile;
        const fetched = await fetch(objectUrl);
        const blob = await fetched.blob();
        displayFile = new File([blob], name, { type });
      } catch (e) {
        return rejectWithValue({
          kind: ErrorKind.UknownError,
          message: 'Could not mint token: video display file not found'
        });
      }
      const fileResponse = await uploadIPFSFile(file);
      const imageResponse = await uploadIPFSImageWithThumbnail(displayFile);
      ipfsMetadata.artifactUri = fileResponse.data.ipfsUri;
      ipfsMetadata.displayUri = imageResponse.data.ipfsUri;
      ipfsMetadata.thumbnailUri = imageResponse.data.thumbnail.ipfsUri;
    } else {
      return rejectWithValue({
        kind: ErrorKind.IPFSUploadFailed,
        message: 'IPFS upload failed: unknown file type'
      });
    }
  } catch (e) {
    return rejectWithValue({
      kind: ErrorKind.IPFSUploadFailed,
      message: 'IPFS upload failed'
    });
  }

  const address = state.collectionAddress as string;
  const metadata = appendStateMetadata(state, ipfsMetadata);

  try {
    const op = await mintToken(system, address, metadata);
    await op.confirmation();
    dispatch(getContractNftsQuery(address));
    return { contract: address };
  } catch (e) {
    return rejectWithValue({
      kind: ErrorKind.MintTokenFailed,
      message: 'Mint token failed'
    });
  }
});

export const transferTokenAction = createAsyncThunk<
  { contract: string; tokenId: number },
  { contract: string; tokenId: number; to: string },
  Options
>('actions/transferToken', async (args, api) => {
  const { getState, rejectWithValue, dispatch } = api;
  const { contract, tokenId, to } = args;
  const { system } = getState();
  if (system.status !== 'WalletConnected') {
    return rejectWithValue({
      kind: ErrorKind.WalletNotConnected,
      message: 'Could not transfer token: no wallet connected'
    });
  }
  try {
    const op = await transferToken(system, contract, tokenId, to);
    await op.confirmation();
    dispatch(getContractNftsQuery(contract));
    return { contract: '', tokenId: 0 };
  } catch (e) {
    return rejectWithValue({
      kind: ErrorKind.TransferTokenFailed,
      message: 'Transfer token failed'
    });
  }
});
