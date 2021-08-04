import React from 'react';
import { 
  Accordion, 
  AccordionButton, 
  AccordionIcon, 
  AccordionItem, 
  AccordionPanel, 
  Box, 
  Flex, 
  Heading,  
  Link, } from '@chakra-ui/react';

function AboutBazaar() {
  return(
    <>
    <Heading
      color="brand.darkGray"
      size="md"
      textAlign="center"
      fontFamily="Helvetica"
      pb={12}
      opacity=".8"
    >
      Bazaar Market:
    </Heading>
    <Accordion allowToggle border="none"  mb="3vh">
      <AccordionItem border="none" borderRadius="25px" my="7px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Who is behind Bazaar?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          Geoff (Tezos) McIntyre is the creator of Bazaar. He's an electrical engineer and crypto
          enthusaist. He also enjoys dogs and long walks on the beach.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="7px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              How is this project being funded?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        Currently, Bazaar has been coded in free time without funding. During late Q2 2021,
        we will be selling bDAO Tokens on the website, the proceeds of 
        which will be used to hire developers to finish writing the smart contracts 
        necessary to finish the Beta release.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="7px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              How are you carbon-offsetting the site?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        The (current) Alpha site is carbon-offset via a manual donation to <Link href="https://teamtrees.org?q=Bazaar%20NFTs" isExternal> Team Trees.</Link>
         It will cover the first 50,000 NFTs. In the future, NFTs will be automatically
          offset via a percentage of the standard 2.5% marketplace transaction fee. 
          There will also be the option to make a carbon-offset donation on an NFT during 
          the minting process after the Beta Release.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="7px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What wallets do you support?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          Bazaar Minter uses Beacon and all of it’s supported wallets: Temple, Spire, Galleon, and Kukai
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="7px">
        <h2>
          <AccordionButton 
          _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} 
          borderWidth="1px" 
          borderRadius="25px" 
          minH="75px"
          >
            < Box flex="1" textAlign="left"  padding="10px">
              How will you verify users to prevent copy-minting and malicious behavior?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          After Alpha V2, we will support user verification through TzKT’s verified 
          user system. There will also be additional functionality for flagging NFTs 
          that have copy-minted/illegal content. Users may risk losing verification 
          status due to malicious behavior.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="7px">
        <h2>
          <AccordionButton 
          _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} 
          borderWidth="1px" 
          borderRadius="25px" 
          minH="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Do you plan to include other marketplace’s contracts? (OBJKTs, KALA, $WRAP, Mandalas, Tacos, etc)
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        Yes. Currently we support BATOs and OpenMinter NFTs, but we are working with 
        fellow NFT sites to add support.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="7px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What are the VIP/Charity Drops?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        VIP/Charity drops are special drops that will be chosen by the Community each 
        month. These drops can include mainstream artists and groups, as well as charity 
        organizations and fundraisers. These drops will be located on the Drops page. 
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="7px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
            What are Bazaar Experiments™?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        Bazaar Experiments are special Community-driven events to help promote 
        various causes, bring the community together, and overall just have fun. 
        Think Reddit April Fools, but all year round.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    </>
  );
}

function AboutMinting() {
  return(
    <>
    <Heading
      color="brand.darkGray"
      size="md"
      textAlign="center"
      fontFamily="Helvetica"
      pb={12}
      opacity=".8"
    >
      Minting Tokens:
    </Heading>
    <Accordion allowToggle border="none"  mb="3vh">
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What is an NFT?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        A non-fungible token (NFT) is a special kind of cryptographic token which represents 
        a unique piece of metadata; this means non-fungible tokens are not mutually interchangeable. 
        Consequently, each piece of artwork on Bazaar is represented by one unique token that only exists once
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What are BATOs?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          BATOs (a.k.a. Bazaar Tokens) are Bazaar Market’s custom non-fungible token. 
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Where can I find the BATOs Smart Contract?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          All Bazaar Contracts are based off of&nbsp;
          <Link href="https://github.com/tqtezos/smart-contracts" isExternal color="brand.blue">
            OpenMinter’s open-source smart contracts. 
          </Link>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Where can I find the Bazaar Minter Contract?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        The Bazaar Minter smart contract can be found here on&nbsp;
        <Link href="https://better-call.dev/mainnet/KT1PKvHNWuWDNVDtqjDha4AostLrGDu4G1jy/operations" isExternal color="brand.blue">
          Better Call Dev.
        </Link>

        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              How do I mint my own BATOs?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        Minting a BATO is as simple as connecting your wallet to 
        Bazaar and clicking the blue plus! The rest of the minting 
        process is explained through the minting interface.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              How much will it cost to mint through the Bazaar Minter?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          Right now, it costs ~30¢ (USD) to mint with Bazaar.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What are the supported NFT file types?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        We currently support the following types: JPG, PNG, GIF, WEBP, SVG, 
        MP4, WebM, Ogg, Gltf, and Glb. (There will be more types added in the future!)
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What is the max file size?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          The current max file size is 30MB. This will be increased to 50MB once we release Alpha V2.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Can I set royalties?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          Not yet. We will be adding this feature pre-Alpha V2.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Can I make editions?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          Not yet. We will be adding this feature pre-Alpha V2.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Can I burn my BATOs?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        Yes. Although our UI does not support burning tokens, you can send your tokens 
        to&nbsp;
        <Link href="https://tzkt.io/tz1burnburnburnburnburnburnburjAYjjX/info" isExternal color="brand.blue">
          tz1burnburnburnburnburnburnburjAYjjX&nbsp;
        </Link>
        to burn them.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What is the fee for the marketplace?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          Bazaar Market has a standard 2.5% transaction fee.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Where do the marketplace fees go?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          Marketplace fees go directly to&nbsp;
          <Link href="https://tzkt.io/tz1XWgCkK3fo1udedHBvnoLxgZwrJL4oPD4G/info" isExternal color="brand.blue">
            Bazaar.tez.
          </Link>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              How do the carbon-offsets work?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          4% of the transaction fee is used to automatically 
          offset the NFTs, and the rest goes to Bazaar for website development.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Do I earn bDAO through selling BATOs?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        Currently, no. This may change in the 
        future based on governance proposals from the Community.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Will I be able to auction my BATOs?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          Not yet. We will be adding this feature pre-Beta.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    </>
  );
}

function AboutTokenomics(){
  return(
    <>
    <Heading
      color="brand.darkGray"
      size="md"
      textAlign="center"
      fontFamily="Helvetica"
      pb={12}
      opacity=".8"
    >
      Tokenomics:
    </Heading>
    <Accordion allowToggle border="none" mb="3vh">
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What is bDAO?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          bDAO is Bazaar Market's governance token. It is an FA2 Token, with a max circulation of 500,000. 
          It is unpausable and fixed supply. It can be broken down to 6 decimal places.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              How was bDAO made?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        bDAO was made with&nbsp;
          <Link href="https://fa2-bakery.netlify.app/" isExternal color="brand.blue">
            Tezos Token Factory.
          </Link>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Where can I find the bDAO Smart Contract?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        bDAO can be found&nbsp;
          <Link href="https://better-call.dev/mainnet/KT1GUNKmkrgtMQjJp3XxcmCj6HZBhkUmMbge/tokens" isExternal color="brand.blue">
          here on Better Call Dev.
          </Link>


        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What are the tokenomics for bDAO?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          bDAO breaks down as such: 
          <p>500,000 - Total Circulation (Fixed) </p>
          <p>125,000 - Initial Airdrop - 25%</p>
          <p>5,000 - Tokens set aside for Liquidity Stickers - 1%</p>
          <p>120,000 in DAO Treasury (for future distribution post-Beta) - 24%</p>
          <p>125,000 - Token Sale - 25%</p>
          <p>125,000 - bDAO Farm - 25%</p>       
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What is the QuipuSwap token link?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          The token address is KT1GUNKmkrgtMQjJp3XxcmCj6HZBhkUmMbge. The ID is 0.
          The token can also be found&nbsp;
          <Link href="https://quipuswap.com/swap?from=tez&to=KT1GUNKmkrgtMQjJp3XxcmCj6HZBhkUmMbge_0" isExternal color="brand.blue">
          here.
          </Link>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What is the QuipuSwap LP link?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          The liquidity pool can be found&nbsp;
          <Link href="https://quipuswap.com/invest/add-liquidity/KT1DssMzoSr8fnUUq1WxeSuHfLG4gzS7pgge" isExternal color="brand.blue">
          here.
          </Link>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              How will you increase liquidity?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        Our first increase in liquidity is going to be using Liquidity Stickers. 
        We will be listing several hundred stickers on the Bazaar marketplace for 
        5 XTZ a piece. 75% of all the funds generated by sales will be used to add 
        tokens to the LP. We will also be increasing liquidity via a token farm, 
        more details to come.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Will there be a token farm?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        Yes. Users will be able to stake bDAO LP Tokens to earn bDAO. 
        Currently, there are 125,000 bDAO set aside just for use in the farm. 
        More details to come.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              What are your plans for governance?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        Our DAO is called The Bazaar Community. Community Members (bDAO holders) 
        work together to reach quorum (⅔ majority) on various topics. These include 
        Community initiatives, token distribution strategies, and picking charity/VIP 
        drops. bDAO governance will be run through the open-source platform&nbsp;
          <Link href="https://tqtezos.medium.com/daos-on-tezos-announcing-homebase-80bbecbb9bfe" isExternal color="brand.blue">
          HomebaseDAO.&nbsp;
          </Link>
        They are currently updating their UI to support our FA2 tokens, and after that, 
        we will make on-chain decisions using Homebase. We will also be performing 
        off-chain voting through our&nbsp;
        <Link href="https://discord.com/invite/mnYZwv8s5a" isExternal color="brand.blue">
          Discord.&nbsp;
        </Link>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              How was the first airdrop conducted?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
        The first airdrop was performed on Twitter using a Google Form. 
        It was limited to 70 drops, and consisted of 20% of all tokens 
        in circulation (100,000 bDAO). 10% was distributed amongst the 
        first 20 signups (2500 bDAO each), and the other 10% was distributed 
        amongst the last 50 signups (1000 bDAO each). 
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="none" borderRadius="25px" my="10px">
        <h2>
          <AccordionButton _expanded={{ bg: "brand.blue", color: "white", borderBottomRadius: "0px" }} borderWidth="1px" borderRadius="25px" height="75px">
            < Box flex="1" textAlign="left"  padding="10px">
              Will there be more airdrops?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}  borderWidth="1px" borderTop="none" borderBottomRadius="25px" >
          No. However, this is subject to change based on the Will of the Community.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    </>
  );
}


export default function FAQPage() {

  return (
    <Flex
      align="center"
      w="100%"
      flex="1"
      flexDir="column"
      bg="#ffffff"
      minH="90vh"
      overflowY="scroll"
    >

      <Flex flexDir="column" align="center" maxW="90vw">
        <Heading color="brand.darkGray" size="xl" mt="5vh" mb="2vh" textAlign="center">
          FAQ Section:
        </Heading>

        <Heading
          color="brand.blue"
          size="sm"
          textAlign="center"
          fontFamily="Helvetica"
          opacity=".8"
          marginX='20vw'
        >
          (Please reach out on our Discord if you feel that a question is missing)
        </Heading>
      </Flex>

      <Flex 
      display={{
        base: 'none',
          lg: 'flex',
          md: 'none',
          sm: 'none'
      }}>
        <Flex flexDir="row" maxW="90vw" mt="5vh"> 
          <Flex flexDir="column" width="25vw" pr="2vw">
            <AboutBazaar/>
          </Flex>

          <Flex flexDir="column" width="25vw" pr="2vw">
            <AboutMinting/>
          </Flex>

          <Flex flexDir="column" width="25vw">
            <AboutTokenomics/>
          </Flex>
        </Flex>
      </Flex>

      <Flex 
      display={{
        base: 'none',
          lg: 'none',
          md: 'flex',
          sm: 'none'
      }}>
        <Flex flexDir="row" maxW="90vw" mt="5vh"> 
          <Flex flexDir="column" width="35vw" pr="2vw">
            <AboutBazaar/>
            <AboutTokenomics/>
          </Flex>
          <Flex flexDir="column" width="35vw" pr="2vw">
            <AboutMinting/>
          </Flex>
        </Flex>
      </Flex>

      <Flex 
      display={{
        base: 'block',
        md: 'none'
      }}>
        <Flex flexDir="row" maxW="90vw" mt="5vh"> 
          <Flex flexDir="column" width="85vw" pr="2vw">
            <AboutBazaar/>
            <AboutMinting/>
            <AboutTokenomics/>
          </Flex>
        </Flex>
      </Flex>

    </Flex>
  );
}