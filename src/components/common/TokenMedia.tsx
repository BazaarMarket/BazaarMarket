import React, { useEffect, useState } from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { FiHelpCircle } from 'react-icons/fi';

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

export function TokenMedia(props: { src: string }) {
  const [errored, setErrored] = useState(false);
  const [obj, setObj] = useState<{ url: string; type: string } | null>(null);
  useEffect(() => {
    (async () => {
      let blob;
      try {
        blob = await fetch(props.src).then(r => r.blob());
      } catch (e) {
        return setErrored(true);
      }
      setObj({
        url: URL.createObjectURL(blob),
        type: blob.type
      });
    })();
  }, [props.src]);

  if (errored) {
    return <MediaNotFound />;
  }

  if (!obj) return null;

  if (/^image\/.*/.test(obj.type)) {
    return (
      <Image
        src={props.src}
        objectFit="contain"
        flex="1"
        onError={() => setErrored(true)}
      />
    );
  }

  if (/^video\/.*/.test(obj.type)) {
    return (
      <video
        loop
        onClick={e => e.preventDefault()}
        onMouseEnter={e => e.currentTarget.play()}
        onMouseLeave={e => e.currentTarget.pause()}
      >
        <source src={obj.url} type={obj.type} />
      </video>
    );
  }

  return <MediaNotFound />;
}
