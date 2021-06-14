import React from 'react';
import {INSTRUCTION_WHITELIST_LINK, WHITELIST_LINK} from "../../../constants";

function WhiteListGuideText(props: any) {
  return (
    <>
      <p style={{ paddingBottom: 10 }}>
        Please fill out the <a style={{ color: '#1a73e8', textDecoration: 'underline' }} href={WHITELIST_LINK} target={'_blank'}>whitelist form</a> to participate in NFTify's IDO.
      </p>
      <p>
        You can read more about the instruction <a style={{ color: '#1a73e8', textDecoration: 'underline' }} href={INSTRUCTION_WHITELIST_LINK} target={'_blank'}>here</a>.
      </p>
    </>
  );
}

export default WhiteListGuideText;
