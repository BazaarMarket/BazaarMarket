import React, { useEffect, useState } from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { FiHelpCircle } from 'react-icons/fi';
import { IpfsGatewayConfig, ipfsUriToGatewayUrl } from '../../lib/util/ipfs';
import { Token } from '../../reducer/slices/collections';

interface TokenMediaProps extends Token {
  config: IpfsGatewayConfig;
  maxW?: string;
  class?: string;
}

function MediaNotFound() { 
  return (
    <Flex
      flexDir="column"
      align="center"
      justify="center"
      flex="1"
      bg="gray.100"
      color="gray.300"
      height="100%"
    >
      <FiHelpCircle size="70px" />
    </Flex>
  );
}

export function TokenMedia(props: TokenMediaProps) {
  const src = ipfsUriToGatewayUrl(props.config, props.artifactUri);
  const [errored, setErrored] = useState(false);
  const [obj, setObj] = useState<{ url: string; type: string } | null>(null);
  useEffect(() => {
    (async () => {
      let blob;
      try {
        blob = await fetch(src).then(r => r.blob());
      } catch (e) {
        return setErrored(true);
      }
      setObj({
        url: URL.createObjectURL(blob),
        type: blob.type
      });
    })();
  }, [src]);

  if (errored) {
    return <MediaNotFound />;
  }

  if (!obj) return null;

  if (/^image\/.*/.test(obj.type)) {
    return (
      <Image
        src={src}
        objectFit="scale-down"
        width="100%"
        flex="1"
        maxWidth={props.maxW}
        style={{ objectFit: 'scale-down' }}
        onError={() => setErrored(true)}
      />
    );
  }

  if (/^video\/.*/.test(obj.type)) {
    return (
      <video
        loop
        autoPlay
        muted
        onClick={e => e.preventDefault()}
        onMouseEnter={e => e.currentTarget.muted = false}
        onMouseLeave={e => e.currentTarget.muted = true}
        width="100%"
        style={{ maxWidth: props.maxW, backgroundColor: "brand.darkGray"}}
      >
        <source src={obj.url} type={obj.type} />
      </video>
    );
  }

  if (props.metadata.formats?.length) {
    if (props.metadata.formats[0].mimeType === 'model/gltf-binary' ||
      props.metadata.formats[0].mimeType === 'model/gltf+json'
    ) {
      return (
        <>
          <model-viewer
            auto-rotate
            rotation-per-second="30deg"
            width="100%"
            maxWidth={props.maxW}
            src={obj.url}
            class={props.class}
          ></model-viewer>
        </>
      );
    }
  }

  return <MediaNotFound />;
}
